currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/commonFile1.ts]
let x = 1

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

//// [/a/b/tsconfig.json]
{}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[[90m12:00:18 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js]
var x = 1;



FsWatches::
/a/b/commonfile1.ts: *new*
  {}
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Program root files: [
  "/a/b/commonFile1.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/commonfile1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Create commonFile2

Input::
//// [/a/b/commonFile2.ts]
let y = 1


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:21 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:27 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/commonFile1.js] file written with same contents
//// [/a/b/commonFile2.js]
var y = 1;



FsWatches::
/a/b/commonfile1.ts:
  {}
/a/b/commonfile2.ts: *new*
  {}
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}


Program root files: [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Shape signatures in builder refreshed for::
/a/b/commonfile2.ts (computed .d.ts)
/a/b/commonfile1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
