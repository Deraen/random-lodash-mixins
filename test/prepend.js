var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
require('../src/random-lodash-mixins');

describe('_.prepend', function() {
  it('should prepend a number into array', function() {
    var a = [1];
    _.prepend(a, 2);
    a.should.deep.equal([2, 1]);
  });

  it('should prepend array of numbers into array', function() {
    var a = [1];
    _.prepend(a, [2, 3]);
    a.should.deep.equal([2, 3, 1]);
  });
});
