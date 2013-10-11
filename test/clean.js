var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
require('../src/random-lodash-mixins');

describe('_.clean', function() {
  it('should not remove properties with value of 0', function() {
    var a = {a: 0};
    _.clean(a).should.have.property('a', 0);
  });

  it('should remove properties with undefined values', function(){
    var a = {a: 0, b: undefined};
    _.clean(a).should.not.have.property('b');
  });
});
