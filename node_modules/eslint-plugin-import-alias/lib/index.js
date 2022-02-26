'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rules = undefined;

var _importAlias = require('./rules/import-alias');

var ImportAliasRule = _interopRequireWildcard(_importAlias);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var rules = exports.rules = {
  'import-alias': ImportAliasRule
};