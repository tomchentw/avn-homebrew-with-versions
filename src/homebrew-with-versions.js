import semverRegExpFactory from 'semver-regex';

import {
  satisfies,
  gt,
  major,
  minor,
  valid,
  parse,
} from 'semver';

import Promise from 'any-promise';

import {
  exec,
} from 'child-process-promise';

const VERSION_REGEX = /(\w+)(?:-|@)(.+)/;

/**
 * Extract a name from a version (to support iojs)
 *
 * @function
 * @param {string} version
 * @return {string}
 */
function versionName(version) {
  const matchResult = version.match(VERSION_REGEX);
  const name = matchResult ? matchResult[1] : null;
  if (name && name === `iojs`) {
    return `io`;
  } else {
    return `node`;
  }
}

/**
 * Extract just the version number from a version.
 *
 * @function
 * @param {string} version
 * @return {string}
 */
function versionNumber(version) {
  const matchResult = version.match(VERSION_REGEX);
  return matchResult ? matchResult[2] : version;
}

const HOMEBREW_VERSIONS_NODE = /^homebrew\/versions\/node(\d+(-lts)?)$/;
const HOMEBREW_NODE = /^node$/;

/**
 * Sanitize raw output of 'brew search node' and return names list.
 *
 * @function
 * @param {string} raw
 * @return {Array[string]}
 */
function _parseNames(raw) {
  return raw.split(`\n`).filter(line =>
    HOMEBREW_VERSIONS_NODE.test(line) ||
    HOMEBREW_NODE.test(line)
  );
}

const SEMVER_REGEXP = semverRegExpFactory();

/**
 * Sanitize raw output of 'brew info node' and return a semver version.
 *
 * @function
 * @param {string} raw
 * @return {string}
 */
function _parseVersion(raw) {
  const firstLine = raw.split(`\n`)[0];
  if (SEMVER_REGEXP.test(firstLine)) {
    return firstLine.match(SEMVER_REGEXP)[0];
  } else {
    throw new Error(`Parse semver error: unknown version from (${firstLine})`);
  }
}

/**
 * Find current version.
 *
 * @function
 * @return {Promise<String>
 */
function _findCurrentVersion() {
  return Promise.resolve()
    .then(() => exec(`node -v`))
    .then(({ stdout }) => parse(stdout.toString().trim()).version)
    .catch(error => false);
}

/**
 * Search available versions list.
 *
 * @function
 * @return {Promise<Array[String]>
 */
function _SearchAvailableVersions() {
  return Promise.resolve()
    .then(() => exec(`brew tap homebrew/versions && brew search node`))
    .then(({ stdout, stderr }) => _parseNames(stdout.toString()));
}

/**
 * List all versions.
 *
 * @function
 * @return {Promise<Array[{String, String}]>
 */
function _listVersions() {
  return Promise.all([
    _findCurrentVersion(),
    _SearchAvailableVersions(),
  ])
    .then(([currentVersion, availableVersions]) => {
      function transformToNameVersionTuple(name) {
        return exec(`brew info ${name}`)
          .then(({ stdout, stderr }) => _parseVersion(stdout.toString()))
          .then(version => ({
            name,
            version,
            isCurrent: currentVersion && major(version) === major(currentVersion),
          }));
      }

      return Promise.all(availableVersions.map(transformToNameVersionTuple));
    });
}

function _isVersionSatisfies(version, mNumber) {
  if (satisfies(version, mNumber)) {
    return true;
  }
  if (valid(mNumber) && major(version) === major(mNumber)) {
    return (
      major(version) !== 0 ||
      minor(version) === minor(mNumber)
    );
  }
  return false;
}

/**
 * Find a highest matched version from installed versions.
 *
 * @param {Array[{String, String}]} installed versions
 * @param {string} matching
 * @return {{String, String}}
 */
function _findVersion(versions, matching) {
  const mName = versionName(matching);
  const mNumber = versionNumber(matching);

  return versions.reduce((acc, v) => {
    const current = v.isCurrent ? v : acc.current;
    let { next } = acc;

    if (v.name.match(mName) && _isVersionSatisfies(v.version, mNumber)) {
      if (!next) {
        next = v;
      } else if (gt(v.version, next.version)) {
        next = v;
      }
    }
    return {
      current,
      next,
    };
  }, {
    current: null,
    next: null,
  });
}

/**
 * Get installed version matching a given version.
 *
 * @param {string} matching
 * @return {Promise}
 */
function _installedVersion(matching) {
  return Promise.resolve()
    .then(() => _listVersions())
    .then(versions => _findVersion(versions, matching));
}

/**
 * Match a specific version.
 *
 * @public interface used by avn
 * @param {string} matching
 * @return {Promise}
 */
export function match(matching) {
  return Promise.resolve()
    .then(() => _installedVersion(matching))
    .then(({ current, next }) => {
      if (!next) {
        throw new Error(`no version matching ${matching}`);
      }
      let command = (
`
brew install --without-npm ${next.name} > /dev/null
 && 
brew link ${next.name} > /dev/null
`.replace(/\n/g, ``)
      );
      if (current && current !== next) {
        command = `brew unlink ${current.name} > /dev/null && ${command}`;
      }

      return {
        version: next.version,
        command,
      };
    });
}
