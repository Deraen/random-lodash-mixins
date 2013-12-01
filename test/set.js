var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
_.mixin(require('../src/random-lodash-mixins'));

describe('_.set', function() {
  it('should add propery into object', function() {
    var a = {};
    _.set(a, 'a', 1);
    a.a.should.equal(1);
  });

  it('should change value of object', function() {
    var a = {a: 1};
    _.set(a, 'a', 2);
    a.a.should.equal(2);
  });
});
