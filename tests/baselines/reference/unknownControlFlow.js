//// [unknownControlFlow.ts]
type T01 = {} & string;  // string
type T02 = {} & 'a';  // 'a'
type T03 = {} & object;  // object
type T04 = {} & { x: number };  // { x: number }
type T05 = {} & null;  // never
type T06 = {} & undefined;  // never
type T07 = undefined & void;  // undefined

type ThisNode = {};
type ThatNode = {};
type ThisOrThatNode = ThisNode | ThatNode;

function f01(u: unknown) {
    let x1: {} = u;  // Error
    let x2: {} | null | undefined = u;
    let x3: {} | { x: string } | null | undefined = u;
    let x4: ThisOrThatNode | null | undefined = u;
}

function f10(x: unknown) {
    if (x) {
        x;  // {}
    }
    else {
        x;  // unknown
    }
    if (!x) {
        x;  // unknown
    }
    else {
        x;  // {}
    }
}

function f11<T>(x: T) {
    if (x) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (!x) {
        x;  // T
    }
    else {
        x;  // T & {}
    }
}

function f12<T extends {}>(x: T) {
    if (x) {
        x;  // T
    }
    else {
        x;  // T
    }
}

function f20(x: unknown) {
    if (x !== undefined) {
        x;  // {} | null
    }
    else {
        x;  // undefined
    }
    if (x !== null) {
        x;  // {} | undefined
    }
    else {
        x;  // null
    }
    if (x !== undefined && x !== null) {
        x;  // {}
    }
    else {
        x;  // null | undefined
    }
    if (x != undefined) {
        x;  // {}
    }
    else {
        x;  // null | undefined
    }
    if (x != null) {
        x;  // {}
    }
    else {
        x;  // null | undefined
    }
}

function f21<T>(x: T) {
    if (x !== undefined) {
        x;  // T & ({} | null)
    }
    else {
        x;  // T
    }
    if (x !== null) {
        x;  // T & ({} | undefined)
    }
    else {
        x;  // T
    }
    if (x !== undefined && x !== null) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x != undefined) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x != null) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
}

function f22<T extends {} | undefined>(x: T) {
    if (x !== undefined) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x !== null) {
        x;  // T
    }
    else {
        x;  // T
    }
    if (x !== undefined && x !== null) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x != undefined) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x != null) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
}

function f23<T>(x: T | undefined | null) {
    if (x !== undefined) {
        x;  // T & {} | null
    }
    if (x !== null) {
        x;  // T & {} | undefined
    }
    if (x != undefined) {
        x;  // T & {}
    }
    if (x != null) {
        x;  // T & {}
    }
}

function f30(x: {}) {
    if (typeof x === "object") {
        x;  // object
    }
}

function f31<T>(x: T) {
    if (typeof x === "object") {
        x;  // T & object | T & null
    }
    if (x && typeof x === "object") {
        x;  // T & object
    }
    if (typeof x === "object" && x) {
        x;  // T & object
    }
}

function f32<T extends {} | undefined>(x: T) {
    if (typeof x === "object") {
        x;  // T & object
    }
}

function possiblyNull<T>(x: T) {
    return !!true ? x : null;  // T | null
}

function possiblyUndefined<T>(x: T) {
    return !!true ? x : undefined;  // T | undefined
}

function possiblyNullOrUndefined<T>(x: T) {
    return possiblyUndefined(possiblyNull(x));  // T | null | undefined
}

function ensureNotNull<T>(x: T) {
    if (x === null) throw Error();
    return x;  // T & ({} | undefined)
}

function ensureNotUndefined<T>(x: T) {
    if (x === undefined) throw Error();
    return x;  // T & ({} | null)
}

function ensureNotNullOrUndefined<T>(x: T) {
    return ensureNotUndefined(ensureNotNull(x));  // T & {}
}

function f40(a: string | undefined, b: number | null | undefined) {
    let a1 = ensureNotNullOrUndefined(a);  // string
    let b1 = ensureNotNullOrUndefined(b);  // number
}

type QQ<T> = NonNullable<NonNullable<NonNullable<T>>>;

function f41<T>(a: T) {
    let a1 = ensureNotUndefined(ensureNotNull(a));  // T & {}
    let a2 = ensureNotNull(ensureNotUndefined(a));  // T & {}
    let a3 = ensureNotNull(ensureNotNull(a));  // T & {} | T & undefined
    let a4 = ensureNotUndefined(ensureNotUndefined(a));  // T & {} | T & null
    let a5 = ensureNotNullOrUndefined(ensureNotNullOrUndefined(a));  // T & {}
    let a6 = ensureNotNull(possiblyNullOrUndefined(a));  // T & {} | undefined
    let a7 = ensureNotUndefined(possiblyNullOrUndefined(a));  // T & {} | null
    let a8 = ensureNotNull(possiblyUndefined(a));  // T & {} | undefined
    let a9 = ensureNotUndefined(possiblyNull(a));  // T & {} | null
}

// Repro from #48468

function deepEquals<T>(a: T, b: T): boolean {
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
        return false;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        return false;
    }
    if (Object.keys(a).length !== Object.keys(b).length) { // Error here
        return false;
    }
    return true;
}


//// [unknownControlFlow.js]
"use strict";
function f01(u) {
    var x1 = u; // Error
    var x2 = u;
    var x3 = u;
    var x4 = u;
}
function f10(x) {
    if (x) {
        x; // {}
    }
    else {
        x; // unknown
    }
    if (!x) {
        x; // unknown
    }
    else {
        x; // {}
    }
}
function f11(x) {
    if (x) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (!x) {
        x; // T
    }
    else {
        x; // T & {}
    }
}
function f12(x) {
    if (x) {
        x; // T
    }
    else {
        x; // T
    }
}
function f20(x) {
    if (x !== undefined) {
        x; // {} | null
    }
    else {
        x; // undefined
    }
    if (x !== null) {
        x; // {} | undefined
    }
    else {
        x; // null
    }
    if (x !== undefined && x !== null) {
        x; // {}
    }
    else {
        x; // null | undefined
    }
    if (x != undefined) {
        x; // {}
    }
    else {
        x; // null | undefined
    }
    if (x != null) {
        x; // {}
    }
    else {
        x; // null | undefined
    }
}
function f21(x) {
    if (x !== undefined) {
        x; // T & ({} | null)
    }
    else {
        x; // T
    }
    if (x !== null) {
        x; // T & ({} | undefined)
    }
    else {
        x; // T
    }
    if (x !== undefined && x !== null) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x != undefined) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x != null) {
        x; // T & {}
    }
    else {
        x; // T
    }
}
function f22(x) {
    if (x !== undefined) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x !== null) {
        x; // T
    }
    else {
        x; // T
    }
    if (x !== undefined && x !== null) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x != undefined) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x != null) {
        x; // T & {}
    }
    else {
        x; // T
    }
}
function f23(x) {
    if (x !== undefined) {
        x; // T & {} | null
    }
    if (x !== null) {
        x; // T & {} | undefined
    }
    if (x != undefined) {
        x; // T & {}
    }
    if (x != null) {
        x; // T & {}
    }
}
function f30(x) {
    if (typeof x === "object") {
        x; // object
    }
}
function f31(x) {
    if (typeof x === "object") {
        x; // T & object | T & null
    }
    if (x && typeof x === "object") {
        x; // T & object
    }
    if (typeof x === "object" && x) {
        x; // T & object
    }
}
function f32(x) {
    if (typeof x === "object") {
        x; // T & object
    }
}
function possiblyNull(x) {
    return !!true ? x : null; // T | null
}
function possiblyUndefined(x) {
    return !!true ? x : undefined; // T | undefined
}
function possiblyNullOrUndefined(x) {
    return possiblyUndefined(possiblyNull(x)); // T | null | undefined
}
function ensureNotNull(x) {
    if (x === null)
        throw Error();
    return x; // T & ({} | undefined)
}
function ensureNotUndefined(x) {
    if (x === undefined)
        throw Error();
    return x; // T & ({} | null)
}
function ensureNotNullOrUndefined(x) {
    return ensureNotUndefined(ensureNotNull(x)); // T & {}
}
function f40(a, b) {
    var a1 = ensureNotNullOrUndefined(a); // string
    var b1 = ensureNotNullOrUndefined(b); // number
}
function f41(a) {
    var a1 = ensureNotUndefined(ensureNotNull(a)); // T & {}
    var a2 = ensureNotNull(ensureNotUndefined(a)); // T & {}
    var a3 = ensureNotNull(ensureNotNull(a)); // T & {} | T & undefined
    var a4 = ensureNotUndefined(ensureNotUndefined(a)); // T & {} | T & null
    var a5 = ensureNotNullOrUndefined(ensureNotNullOrUndefined(a)); // T & {}
    var a6 = ensureNotNull(possiblyNullOrUndefined(a)); // T & {} | undefined
    var a7 = ensureNotUndefined(possiblyNullOrUndefined(a)); // T & {} | null
    var a8 = ensureNotNull(possiblyUndefined(a)); // T & {} | undefined
    var a9 = ensureNotUndefined(possiblyNull(a)); // T & {} | null
}
// Repro from #48468
function deepEquals(a, b) {
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
        return false;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        return false;
    }
    if (Object.keys(a).length !== Object.keys(b).length) { // Error here
        return false;
    }
    return true;
}


//// [unknownControlFlow.d.ts]
declare type T01 = {} & string;
declare type T02 = {} & 'a';
declare type T03 = {} & object;
declare type T04 = {} & {
    x: number;
};
declare type T05 = {} & null;
declare type T06 = {} & undefined;
declare type T07 = undefined & void;
declare type ThisNode = {};
declare type ThatNode = {};
declare type ThisOrThatNode = ThisNode | ThatNode;
declare function f01(u: unknown): void;
declare function f10(x: unknown): void;
declare function f11<T>(x: T): void;
declare function f12<T extends {}>(x: T): void;
declare function f20(x: unknown): void;
declare function f21<T>(x: T): void;
declare function f22<T extends {} | undefined>(x: T): void;
declare function f23<T>(x: T | undefined | null): void;
declare function f30(x: {}): void;
declare function f31<T>(x: T): void;
declare function f32<T extends {} | undefined>(x: T): void;
declare function possiblyNull<T>(x: T): T | null;
declare function possiblyUndefined<T>(x: T): T | undefined;
declare function possiblyNullOrUndefined<T>(x: T): T | null | undefined;
declare function ensureNotNull<T>(x: T): T & ({} | undefined);
declare function ensureNotUndefined<T>(x: T): T & ({} | null);
declare function ensureNotNullOrUndefined<T>(x: T): T & {};
declare function f40(a: string | undefined, b: number | null | undefined): void;
declare type QQ<T> = NonNullable<NonNullable<NonNullable<T>>>;
declare function f41<T>(a: T): void;
declare function deepEquals<T>(a: T, b: T): boolean;
