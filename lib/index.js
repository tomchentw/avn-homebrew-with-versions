'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../package.json');

Object.defineProperty(exports, 'name', {
  enumerable: true,
  get: function get() {
    return _package.name;
  }
});

var _homebrewWithVersions = require('./homebrew-with-versions');

Object.defineProperty(exports, 'match', {
  enumerable: true,
  get: function get() {
    return _homebrewWithVersions.match;
  }
});
Object.defineProperty(exports, '_findVersion', {
  enumerable: true,
  get: function get() {
    return _homebrewWithVersions._findVersion;
  }
});