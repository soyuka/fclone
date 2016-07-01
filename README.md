# Clone

[![Build Status](https://travis-ci.org/soyuka/clone.svg?branch=master)](https://travis-ci.org/soyuka/clone)

This module clones a Javascript object in safe mode (eg: drops circular values) recursively. Circular values are replaced with a string: `'[Circular]'`.

Ideas from [tracker1/safe-clone-deep](https://github.com/tracker1/safe-clone-deep). I improved the workflow a bit by:
- refactoring the code (complete rewrite)
- fixing node 6+
- minor performance tweaks
- use of `Array.isArray` and `Buffer.isBuffer`

## Installation

```
npm install @soyuka/clone
# or
bower install soyuka-clone
```

## Usage

```
const clone = require('@soyuka/clone')

let a = {b: a, c: 'hello'}
let o = clone(a)

console.log(o)
// outputs: { c: 'hello', b: '[Circular]' }
```

## Browser

You can use bower or npm.

Amd defines 'soyuka-clone'
It'll be `window.clone` if amd is not used or `require('@soyuka/clone')`

## Benchmarks

Some benchs:

```
@soyuka/clone x 13,891 ops/sec ±0.86% (88 runs sampled)
@soyuka/clone + json.stringify x 7,267 ops/sec ±3.26% (79 runs sampled)
jsan x 4,458 ops/sec ±2.26% (87 runs sampled)
circularjson x 4,075 ops/sec ±2.77% (85 runs sampled)
deepcopy x 5,009 ops/sec ±4.59% (76 runs sampled)
json-stringify-safe x 4,883 ops/sec ±2.62% (85 runs sampled)
Fastest is @soyuka/clone
```
