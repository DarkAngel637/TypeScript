//// [tests/cases/conformance/salsa/reExportJsFromTs.ts] ////

//// [constants.js]
module.exports = {
  str: 'x',
};

//// [constants.ts]
import * as tsConstants from "../lib/constants";
export { tsConstants };

//// [constants.js]
module.exports = {
    str: 'x'
};
//// [constants.js]
"use strict";
exports.__esModule = true;
exports.tsConstants = void 0;
var tsConstants = require("../lib/constants");
exports.tsConstants = tsConstants;
