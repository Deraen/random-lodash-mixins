var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
require('../src/random-lodash-mixins');

describe('_.flattenObj', function () {
  it('should do nothing with flat object', function() {
    var a = {a: 1, b: 2};
    _.flattenObj(a).should.deep.equal(a);
  });

  it('should flatten object recursively', function() {
    var a = {a: {b: 1, c: 2}};
    _.flattenObj(a).should.deep.equal({'a.b': 1, 'a.c': 2});
  });

  it('should flatten object recursively 2', function() {
    var a = {a: {b: {c: {d: 1}}}, e: {f: {g: 2}, c: 3}};
    _.flattenObj(a).should.deep.equal({'a.b.c.d': 1, 'e.f.g': 2, 'e.c': 3});
  });

  it('it should be possible to set separator', function() {
    var a = {a: {b: 1, c: 2}};
    _.flattenObj(a, '-').should.deep.equal({'a-b': 1, 'a-c': 2});
  });
});
