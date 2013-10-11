var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
require('../src/random-lodash-mixins');

describe('_.append', function() {
  it('append a number into array', function() {
    var a = [1];
    _.append(a, 2);
    a.should.deep.equal([1, 2]);
  });

  it('append array of numbers into array', function() {
    var a = [1];
    _.append(a, [2, 3]);
    a.should.deep.equal([1, 2, 3]);
  });
});
