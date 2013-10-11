var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
require('../src/random-lodash-mixins');

describe('_.removeFirst', function() {
  it('should remove first matched Number', function() {
    var a = [1, 1, 2];
    _.removeFirst(a, 1);
    a.should.deep.equal([1, 2]);
  });

  it('should remove first matched Object', function() {
    var a = [{a: 0}, {a: 0}, {a: 1}];
    _.removeFirst(a, {a: 0});
    a.should.deep.equal([{a: 0}, {a: 1}]);
  });
});

describe('_.remove', function() {
  it('should remove matched Numbers', function() {
    var a = [1, 1, 2];
    _.remove(a, 1);
    a.should.deep.equal([2]);
  });

  it('should remove matched Objects', function() {
    var a = [{a: 0}, {a: 0}, {a: 1}];
    _.remove(a, {a: 0});
    a.should.deep.equal([{a: 1}]);
  });

  it('should remove elements for which a custom function returns true', function() {
    var a = [1, 2, 3, 4, 5, 6];
    _.remove(a, function(val) {
      return val % 2 === 0;
    });
    a.should.deep.equal([1, 3, 5]);
  });
});
