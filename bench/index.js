'use strict'
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

function Complex() {
  this.bar = 'foo'
}

Complex.prototype.foo = function() {}

const a = {b: 'hello', c: {foo: 'bar', bar: 'foo', error: new Error('Test')}, complex: new Complex()}

a.a = a
a.c.complex = a.complex
a.env = process.env

const soyuka_clone = require('../dist/clone.js')
const clone = require('clone')
const deepclone = require('deep-clone')
const deepcopy = require('deepcopy')
const jsonstringifysafe = require('json-stringify-safe')

suite
.add('@soyuka/clone', function() {
  let b = soyuka_clone(a)
})
.add('deepcopy', function() {
  let b = deepcopy(a)
})
.add('deep-clone', function() {
  let b = deepclone(a)
})
.add('json-stringify-safe', function() {
  let b = jsonstringifysafe(a)
})
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run({ 'async': true })
