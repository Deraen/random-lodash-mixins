var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
_.mixin(require('../src/random-lodash-mixins'));

describe('_.construct', function () {
  it('should give Object if parameter is defined', function() {
    _.construct(String, 'test').should.equal('test');
  });

  it('should return undefined if parameter is not defined', function() {
    should.not.exist(_.construct(String));
  });
});
