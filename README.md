# FClone

Clone objects by dropping circular references

[![Build Status](https://travis-ci.org/soyuka/fclone.svg?branch=master)](https://travis-ci.org/soyuka/fclone)

This module clones a Javascript object in safe mode (eg: drops circular values) recursively. Circular values are replaced with a string: `'[Circular]'`.

Ideas from [tracker1/safe-clone-deep](https://github.com/tracker1/safe-clone-deep). I improved the workflow a bit by:
- refactoring the code (complete rewrite)
- fixing node 6+
- micro optimizations
- use of `Array.isArray` and `Buffer.isBuffer`

Node 0.10 compatible, distributed files are translated to es2015.

## Installation

```bash
npm install fclone
# or
bower install fclone
```

## Usage

```javascript
const fclone = require('fclone');

let a = {c: 'hello'};
a.b = a;

let o = fclone(a);

console.log(o);
// outputs: { c: 'hello', b: '[Circular]' }

//JSON.stringify is now safe
console.log(JSON.stringify(o));
```

## Benchmarks

Some benchs:

```
fclone x 13,206 ops/sec ±1.61% (87 runs sampled)
fclone + json.stringify x 6,366 ops/sec ±4.00% (81 runs sampled)
fast-safe-stringify x 6,373 ops/sec ±2.01% (82 runs sampled)
fast-safe-stringify + stringify x 5,633 ops/sec ±1.65% (84 runs sampled)
util.inspect (outputs a string) x 1,519 ops/sec ±2.31% (78 runs sampled)
jsan x 3,739 ops/sec ±1.08% (85 runs sampled)
circularjson x 3,435 ops/sec ±0.93% (85 runs sampled)
deepcopy x 4,635 ops/sec ±2.67% (85 runs sampled)
json-stringify-safe x 6,251 ops/sec ±2.44% (89 runs sampled)
clone x 7,839 ops/sec ±1.52% (87 runs sampled)
Fastest is fclone
```
