/* eslint-disable prefer-arrow-callback */

import {
  default as expect,
} from "expect";

import {
  exec,
} from 'child-process-promise';

import {
  match,
} from "../homebrew-with-versions";

const ASYNC_REQUEST_TIMEOUT = 60 * 1000;

describe(`homebrew-with-versions`, function describeHomebrewWithVersions() {
  describe(`match`, function describeMatch() {
    context(`current linked node@5`, function contextCurrentNode5() {
      before(function before() {
        this.timeout(ASYNC_REQUEST_TIMEOUT);
        return exec(`brew link node5`);
      });

      context(`requesting node@0.10`, function contextNode4() {
        it(`should show install`, async function it() {
          this.timeout(ASYNC_REQUEST_TIMEOUT);
          const {
            command,
          } = await match(`node@0.10`);

          expect(command).toEqual(
`
brew unlink homebrew/versions/node5 > /dev/null
 && 
brew install --without-npm homebrew/versions/node010 > /dev/null
 && 
brew link homebrew/versions/node010 > /dev/null
`.replace(/\n/g, ``)
          );
        });
      });

      context(`requesting node@0.12`, function contextNode4() {
        it(`should show install`, async function it() {
          this.timeout(ASYNC_REQUEST_TIMEOUT);
          const {
            command,
          } = await match(`node@0.12`);

          expect(command).toEqual(
`
brew unlink homebrew/versions/node5 > /dev/null
 && 
brew install --without-npm homebrew/versions/node012 > /dev/null
 && 
brew link homebrew/versions/node012 > /dev/null
`.replace(/\n/g, ``)
          );
        });
      });

      context(`requesting node@4`, function contextNode4() {
        it(`should show install`, async function it() {
          this.timeout(ASYNC_REQUEST_TIMEOUT);
          const {
            command,
          } = await match(`node@4`);

          expect(command).toEqual(
`
brew unlink homebrew/versions/node5 > /dev/null
 && 
brew install --without-npm homebrew/versions/node4-lts > /dev/null
 && 
brew link homebrew/versions/node4-lts > /dev/null
`.replace(/\n/g, ``)
          );
        });
      });

      context(`requesting node@5`, function contextNode5() {
        it(`should show install`, async function it() {
          this.timeout(ASYNC_REQUEST_TIMEOUT);
          const {
            command,
          } = await match(`node@5`);

          expect(command).toEqual(
`
brew install --without-npm homebrew/versions/node5 > /dev/null
 && 
brew link homebrew/versions/node5 > /dev/null
`.replace(/\n/g, ``)
          );
        });
      });

      context(`requesting node@6`, function contextNode5() {
        it(`should show install`, async function it() {
          this.timeout(ASYNC_REQUEST_TIMEOUT);
          const {
            command,
          } = await match(`node@6`);

          expect(command).toEqual(
`
brew unlink homebrew/versions/node5 > /dev/null
 && 
brew install --without-npm node > /dev/null
 && 
brew link node > /dev/null
`.replace(/\n/g, ``)
          );
        });
      });
    });
  });
});
