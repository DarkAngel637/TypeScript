currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/f1.ts]
export * from "./f2"

//// [/a/b/f2.ts]
export * from "../c/f3"

//// [/a/c/f3.ts]
export let y = 1;

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


/a/lib/tsc.js -w /a/b/f1.ts /a/c/f3.ts --noImplicitAny
Output::
>> Screen clear
[[90m12:00:19 AM[0m] Starting compilation in watch mode...

[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/c/f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 1;


//// [/a/b/f2.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("../c/f3"), exports);


//// [/a/b/f1.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./f2"), exports);



FsWatches::
/a/b/f1.ts: *new*
  {}
/a/b/f2.ts: *new*
  {}
/a/c/f3.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Program root files: [
  "/a/b/f1.ts",
  "/a/c/f3.ts"
]
Program options: {
  "watch": true,
  "noImplicitAny": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/c/f3.ts
/a/b/f2.ts
/a/b/f1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/c/f3.ts
/a/b/f2.ts
/a/b/f1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/c/f3.ts (used version)
/a/b/f2.ts (used version)
/a/b/f1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Delete f2

Input::
//// [/a/b/f2.ts] deleted

Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...

[96ma/b/f1.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module './f2'. '/a/b/f2.js' implicitly has an 'any' type.

[7m1[0m export * from "./f2"
[7m [0m [91m              ~~~~~~[0m

[[90m12:00:32 AM[0m] Found 1 error. Watching for file changes.



//// [/a/b/f1.js] file written with same contents

PolledWatches::
/a/b/f2: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f1.ts:
  {}
/a/c/f3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/f2.ts:
  {}


Program root files: [
  "/a/b/f1.ts",
  "/a/c/f3.ts"
]
Program options: {
  "watch": true,
  "noImplicitAny": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/c/f3.ts

Semantic diagnostics in builder refreshed for::
/a/b/f1.ts

Shape signatures in builder refreshed for::
/a/b/f1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
