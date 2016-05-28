'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.match = match;

var _semverRegex = require('semver-regex');

var _semverRegex2 = _interopRequireDefault(_semverRegex);

var _semver = require('semver');

var _anyPromise = require('any-promise');

var _anyPromise2 = _interopRequireDefault(_anyPromise);

var _childProcessPromise = require('child-process-promise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION_REGEX = /(\w+)(?:-|@)(.+)/;

/**
 * Extract a name from a version (to support iojs)
 *
 * @function
 * @param {string} version
 * @return {string}
 */
function versionName(version) {
  var matchResult = version.match(VERSION_REGEX);
  var name = matchResult ? matchResult[1] : null;
  if (name && name === 'iojs') {
    return 'io';
  } else {
    return name;
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
  var matchResult = version.match(VERSION_REGEX);
  return matchResult ? matchResult[2] : version;
}

var HOMEBREW_VERSIONS_NODE = /^homebrew\/versions\/node(\d+(-lts)?)$/;
var HOMEBREW_NODE = /^node$/;

/**
 * Sanitize raw output of 'brew search node' and return names list.
 *
 * @function
 * @param {string} raw
 * @return {Array[string]}
 */
function _parseNames(raw) {
  return raw.split('\n').filter(function (line) {
    return HOMEBREW_VERSIONS_NODE.test(line) || HOMEBREW_NODE.test(line);
  });
}

var SEMVER_REGEXP = (0, _semverRegex2.default)();

/**
 * Sanitize raw output of 'brew info node' and return a semver version.
 *
 * @function
 * @param {string} raw
 * @return {string}
 */
function _parseVersion(raw) {
  var firstLine = raw.split('\n')[0];
  if (SEMVER_REGEXP.test(firstLine)) {
    return firstLine.match(SEMVER_REGEXP)[0];
  } else {
    throw new Error('Parse semver error: unknown version from (' + firstLine + ')');
  }
}

/**
 * Find current version.
 *
 * @function
 * @return {Promise<String>
 */
function _findCurrentVersion() {
  return _anyPromise2.default.resolve().then(function () {
    return (0, _childProcessPromise.exec)('node -v');
  }).then(function (_ref) {
    var stdout = _ref.stdout;
    return (0, _semver.parse)(stdout.toString().trim()).version;
  }).catch(function (error) {
    return false;
  });
}

/**
 * Search available versions list.
 *
 * @function
 * @return {Promise<Array[String]>
 */
function _SearchAvailableVersions() {
  return _anyPromise2.default.resolve().then(function () {
    return (0, _childProcessPromise.exec)('brew tap homebrew/versions && brew search node');
  }).then(function (_ref2) {
    var stdout = _ref2.stdout;
    var stderr = _ref2.stderr;
    return _parseNames(stdout.toString());
  });
}

/**
 * List all versions.
 *
 * @function
 * @return {Promise<Array[{String, String}]>
 */
function _listVersions() {
  return _anyPromise2.default.all([_findCurrentVersion(), _SearchAvailableVersions()]).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var currentVersion = _ref4[0];
    var availableVersions = _ref4[1];

    function transformToNameVersionTuple(name) {
      return (0, _childProcessPromise.exec)('brew info ' + name).then(function (_ref5) {
        var stdout = _ref5.stdout;
        var stderr = _ref5.stderr;
        return _parseVersion(stdout.toString());
      }).then(function (version) {
        return {
          name: name,
          version: version,
          isCurrent: currentVersion && (0, _semver.major)(version) === (0, _semver.major)(currentVersion)
        };
      });
    }

    return _anyPromise2.default.all(availableVersions.map(transformToNameVersionTuple));
  });
}

/**
 * Find a highest matched version from installed versions.
 *
 * @param {Array[{String, String}]} installed versions
 * @param {string} matching
 * @return {{String, String}}
 */
function _findVersion(versions, matching) {
  var mName = versionName(matching);
  var mNumber = versionNumber(matching);

  return versions.reduce(function (acc, v) {
    var current = v.isCurrent ? v : acc.current;
    var next = acc.next;


    if (v.name.match(mName) && (0, _semver.satisfies)(v.version, mNumber)) {
      if (!next) {
        next = v;
      } else if ((0, _semver.gt)(v.version, next.version)) {
        next = v;
      }
    }
    return {
      current: current,
      next: next
    };
  }, {
    current: null,
    next: null
  });
}

/**
 * Get installed version matching a given version.
 *
 * @param {string} matching
 * @return {Promise}
 */
function _installedVersion(matching) {
  return _anyPromise2.default.resolve().then(function () {
    return _listVersions();
  }).then(function (versions) {
    return _findVersion(versions, matching);
  });
}

/**
 * Match a specific version.
 *
 * @public interface used by avn
 * @param {string} matching
 * @return {Promise}
 */
function match(matching) {
  return _anyPromise2.default.resolve().then(function () {
    return _installedVersion(matching);
  }).then(function (_ref6) {
    var current = _ref6.current;
    var next = _ref6.next;

    if (!next) {
      throw new Error('no version matching ' + matching);
    }
    var command = 'brew install ' + next.name + ' > /dev/null';
    if (current && current !== next) {
      command = 'brew unlink ' + current.name + ' > /dev/null && ' + command;
    }

    return {
      version: next.version,
      command: command
    };
  });
}