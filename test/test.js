'use strict'

var expect = require('chai').expect
var clone = require('../dist/fclone.js')

describe('fclone', function(){
  var input, output

  beforeEach(function(){
    var a = {}
    a.a = a
    a.b = {}
    a.b.a = a
    a.b.b = a.b
    a.c = {}
    a.c.b = a.b
    a.c.c = a.c
    a.x = 1
    a.b.x = 2
    a.c.x = 3
    a.d = [0,a,1,a.b,2,a.c,3]
    input = a
  })

  describe('will clone', function(){

    it('a string', function() {
      var i = ''
      var o = clone(i)
      expect(o).to.equal(i)
    })

    it('an object', function() {
     var t = {foo: 'bar', bar: 'foo'}
     var o = clone(t)

     delete t.foo

     expect(t.foo).to.be.undefined
     expect(o.foo).to.equal('bar')
    })

    it('a Date', function(){
      var a = new Date()
      var b = clone(a)
      expect(a).to.deep.equal(b)
      expect(a).to.not.equal(b)
    })

    it('a Buffer', function(){
      var a = new Buffer('this is a test')
      var b = clone(a)
      expect(a.toString()).to.equal(b.toString())
      expect(a).to.not.equal(b)
    })

    it('an Error\'s properties', function(){
      var a = new Error("this is a test")
      var b = clone(a)

      expect(a).to.not.equal(b)
      expect(b).to.have.property('name', a.name)
      expect(b).to.have.property('message', a.message)
      expect(b).to.have.property('stack', a.stack)
    })

    it('an inherited property', function(){
      function Base(){
        this.base = true
      }
      function Child(){
        this.child = true
      }
      Child.prototype = new Base()

      var z = clone(new Child())
      expect(z).to.have.property('child',true)
      expect(z).not.to.have.property('base')
    })

    it('an Uint8Array', function() {
     var t = new Uint8Array(3)
     ;[0,1,2].map(function(e) {
       t[e] = 0
     })

     var o = clone(t)

     expect(o).to.be.an.instanceof(Uint8Array)
     expect(o).to.have.length.of(3)
    })

    it('an array-like object', function() {
     var t = {length: 3, 0: 'test', 1: 'test', 2: 'test'}

     var o = clone(t)

     expect(o).to.deep.equal(t)
    })

    it('a uint8array like', function() {
     var t = {subarray: function() { return 'fail'}}
     var o = clone(t)

     expect(o).not.to.equal('fail')
     expect(o.subarray()).to.equal('fail')
    })
  })

  describe('will not clone circular data', function(){
    beforeEach(function(){
      output = clone(input)
    })

    it('base object', function(){
      expect(output).to.have.property('a','[Circular]')
      expect(output).to.have.property('b')
      expect(output).to.have.property('x',1)
      expect(output).to.have.property('c')
    })

    it('nested property', function(){
      expect(output.b).to.exist
      expect(output.b).to.have.property('a','[Circular]')
      expect(output.b).to.have.property('b','[Circular]')
      expect(output.b).to.have.property('x',2)
    })

    it('secondary nested property', function(){
      expect(output.c).to.exist
      expect(output.c).to.not.have.property('a')
      expect(output.c).to.have.property('b')
      expect(output.c).to.have.property('c','[Circular]')
      expect(output.c.b).to.deep.equal({a: '[Circular]', b: '[Circular]', x: 2})
      expect(output.c).to.have.property('x',3)
    })
  })
})
