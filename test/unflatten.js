var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
_.mixin(require('../src/random-lodash-mixins'));

describe('_.unflattenObj', function () {
  it('should do nothing if object has no properties containing separator', function() {
    var a = {a: 1, b: 2};
    _.unflattenObj(a).should.deep.equal(a);
  });

  it('should unflatten object recursively', function() {
    var a = {'a.b': 1, 'a.c': 2};
    _.unflattenObj(a).should.deep.equal({a: {b: 1, c: 2}});
  });

  it('should unflatten object recursively 2', function() {
    var a = {'a.b.c.d': 1, 'e.f.g': 2, 'e.c': 3};
    _.unflattenObj(a).should.deep.equal({a: {b: {c: {d: 1}}}, e: {f: {g: 2}, c: 3}});
  });

  it('it should be possible to set separator', function() {
    var a = {a: {b: 1, c: 2}};
    _.unflattenObj(a, '-').should.deep.equal({a: {b: 1, c: 2}});
  });
});
