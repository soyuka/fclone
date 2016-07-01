'use strict'
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

let arr = new Array(100).fill(0).map(e => Math.random())
let arr2 = new Array(100).fill(0).map(e => Math.random())

suite
.add('pop', function() {
  while(arr.length) {
    arr.pop()
  }
})
.add('length--', function() {
  while(arr.length && arr.length--) {
  }
})
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run({ 'async': true })
