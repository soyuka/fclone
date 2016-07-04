# FClone

Fastest JSON cloning module that handles circular references

[![Build Status](https://travis-ci.org/soyuka/fclone.svg?branch=master)](https://travis-ci.org/soyuka/fclone)

This module clones a Javascript object in safe mode (eg: drops circular values) recursively. Circular values are replaced with a string: `'[Circular]'`.

Ideas from [tracker1/safe-clone-deep](https://github.com/tracker1/safe-clone-deep). I improved the workflow a bit by:
- refactoring the code (complete rewrite)
- fixing node 6+
- micro optimizations
- use of `Array.isArray` and `Buffer.isBuffer`

## Installation

```bash
npm install fclone
# or
bower install fclone
```

## Usage

```javascript
const fclone = require('fclone')

let a = {c: 'hello'}
a.b = a

let o = fclone(a)

console.log(o)
// outputs: { c: 'hello', b: '[Circular]' }
```

## Benchmarks

Some benchs:

```
fclone x 13,342 ops/sec ±3.83% (79 runs sampled)
fclone + json.stringify x 7,311 ops/sec ±3.99% (77 runs sampled)
jsan x 4,419 ops/sec ±3.11% (86 runs sampled)
circularjson x 4,294 ops/sec ±0.82% (91 runs sampled)
deepcopy x 5,298 ops/sec ±0.76% (83 runs sampled)
json-stringify-safe x 5,201 ops/sec ±0.82% (84 runs sampled)
Fastest is fclone
```
