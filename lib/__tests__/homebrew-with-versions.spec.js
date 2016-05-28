"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _childProcessPromise = require("child-process-promise");

var _homebrewWithVersions = require("../homebrew-with-versions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable prefer-arrow-callback */

var ASYNC_REQUEST_TIMEOUT = 60 * 1000;
var UNLINK_CURRENT_NODE = "brew unlink homebrew/versions/node5 > /dev/null && ";

describe("homebrew-with-versions", function describeHomebrewWithVersions() {
  describe("match", function describeMatch() {
    context("no node installed", function contextCurrentNode5() {
      before(function before() {
        this.timeout(ASYNC_REQUEST_TIMEOUT);
        return (0, _childProcessPromise.exec)("brew uninstall node5");
      });

      context("requesting node@0.10", function contextNode4() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var _ref, command;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context.next = 3;
                    return (0, _homebrewWithVersions.match)("node@0.10");

                  case 3:
                    _ref = _context.sent;
                    command = _ref.command;


                    (0, _expect2.default)(command).toEqual("brew install homebrew/versions/node010 > /dev/null");

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });

      context("requesting node@0.12", function contextNode4() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
            var _ref2, command;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context2.next = 3;
                    return (0, _homebrewWithVersions.match)("node@0.12");

                  case 3:
                    _ref2 = _context2.sent;
                    command = _ref2.command;


                    (0, _expect2.default)(command).toEqual("brew install homebrew/versions/node012 > /dev/null");

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });

      context("requesting node@4", function contextNode4() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var _ref3, command;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context3.next = 3;
                    return (0, _homebrewWithVersions.match)("node@4");

                  case 3:
                    _ref3 = _context3.sent;
                    command = _ref3.command;


                    (0, _expect2.default)(command).toEqual("brew install homebrew/versions/node4-lts > /dev/null");

                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });

      context("requesting node@5", function contextNode5() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
            var _ref4, command;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context4.next = 3;
                    return (0, _homebrewWithVersions.match)("node@5");

                  case 3:
                    _ref4 = _context4.sent;
                    command = _ref4.command;


                    (0, _expect2.default)(command).toEqual("brew install homebrew/versions/node5 > /dev/null");

                  case 6:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });

      context("requesting node@6", function contextNode5() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
            var _ref5, command;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context5.next = 3;
                    return (0, _homebrewWithVersions.match)("node@6");

                  case 3:
                    _ref5 = _context5.sent;
                    command = _ref5.command;


                    (0, _expect2.default)(command).toEqual("brew install node > /dev/null");

                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });
    });

    context("current installed node@5", function contextCurrentNode5() {
      before(function before() {
        this.timeout(ASYNC_REQUEST_TIMEOUT);
        return (0, _childProcessPromise.exec)("brew install node5");
      });

      context("requesting node@0.10", function contextNode4() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
            var _ref6, command;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context6.next = 3;
                    return (0, _homebrewWithVersions.match)("node@0.10");

                  case 3:
                    _ref6 = _context6.sent;
                    command = _ref6.command;


                    (0, _expect2.default)(command).toEqual(UNLINK_CURRENT_NODE + "brew install homebrew/versions/node010 > /dev/null");

                  case 6:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });

      context("requesting node@0.12", function contextNode4() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
            var _ref7, command;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context7.next = 3;
                    return (0, _homebrewWithVersions.match)("node@0.12");

                  case 3:
                    _ref7 = _context7.sent;
                    command = _ref7.command;


                    (0, _expect2.default)(command).toEqual(UNLINK_CURRENT_NODE + "brew install homebrew/versions/node012 > /dev/null");

                  case 6:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });

      context("requesting node@4", function contextNode4() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
            var _ref8, command;

            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context8.next = 3;
                    return (0, _homebrewWithVersions.match)("node@4");

                  case 3:
                    _ref8 = _context8.sent;
                    command = _ref8.command;


                    (0, _expect2.default)(command).toEqual(UNLINK_CURRENT_NODE + "brew install homebrew/versions/node4-lts > /dev/null");

                  case 6:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });

      context("requesting node@5", function contextNode5() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
            var _ref9, command;

            return regeneratorRuntime.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context9.next = 3;
                    return (0, _homebrewWithVersions.match)("node@5");

                  case 3:
                    _ref9 = _context9.sent;
                    command = _ref9.command;


                    (0, _expect2.default)(command).toEqual("brew install homebrew/versions/node5 > /dev/null");

                  case 6:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });

      context("requesting node@6", function contextNode5() {
        it("should show install", function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
            var _ref10, command;

            return regeneratorRuntime.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    this.timeout(ASYNC_REQUEST_TIMEOUT);
                    _context10.next = 3;
                    return (0, _homebrewWithVersions.match)("node@6");

                  case 3:
                    _ref10 = _context10.sent;
                    command = _ref10.command;


                    (0, _expect2.default)(command).toEqual(UNLINK_CURRENT_NODE + "brew install node > /dev/null");

                  case 6:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this);
          }));

          function it() {
            return ref.apply(this, arguments);
          }

          return it;
        }());
      });
    });
  });
});