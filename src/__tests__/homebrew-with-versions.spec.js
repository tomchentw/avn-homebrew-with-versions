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
const UNLINK_CURRENT_NODE = `brew unlink homebrew/versions/node5 > /dev/null && `;

describe(`homebrew-with-versions`, function describeHomebrewWithVersions() {
  describe(`match`, function describeMatch() {
    context(`no node installed`, function contextCurrentNode5() {
      before(function before() {
        this.timeout(ASYNC_REQUEST_TIMEOUT);
        return exec(`brew uninstall node5`);
      });

      context(`requesting node@0.10`, function contextNode4() {
        it(`should show install`, async function it() {
          this.timeout(ASYNC_REQUEST_TIMEOUT);
          const {
            command,
          } = await match(`node@0.10`);

          expect(command).toEqual(
            `brew install homebrew/versions/node010 > /dev/null`
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
            `brew install homebrew/versions/node012 > /dev/null`
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
            `brew install homebrew/versions/node4-lts > /dev/null`
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
            `brew install homebrew/versions/node5 > /dev/null`
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
            `brew install node > /dev/null`
          );
        });
      });
    });

    context(`current installed node@5`, function contextCurrentNode5() {
      before(function before() {
        this.timeout(ASYNC_REQUEST_TIMEOUT);
        return exec(`brew install node5`);
      });

      context(`requesting node@0.10`, function contextNode4() {
        it(`should show install`, async function it() {
          this.timeout(ASYNC_REQUEST_TIMEOUT);
          const {
            command,
          } = await match(`node@0.10`);

          expect(command).toEqual(
            `${UNLINK_CURRENT_NODE}brew install homebrew/versions/node010 > /dev/null`
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
            `${UNLINK_CURRENT_NODE}brew install homebrew/versions/node012 > /dev/null`
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
            `${UNLINK_CURRENT_NODE}brew install homebrew/versions/node4-lts > /dev/null`
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
            `brew install homebrew/versions/node5 > /dev/null`
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
            `${UNLINK_CURRENT_NODE}brew install node > /dev/null`
          );
        });
      });
    });
  });
});
