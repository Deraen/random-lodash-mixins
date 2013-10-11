var chai = require('chai');
var should = chai.should();
var _ = require('lodash');
require('../src/random-lodash-mixins');

describe('_.removeFirst', function() {
  it('should remove first matched Number', function(done) {
    var a = [1, 1, 2];
    _.removeFirst(a, 1);
    a.should.deep.equal([1, 2]);
    done();
  });

  it('should remove first matched Object', function(done) {
    var a = [{a: 0}, {a: 0}, {a: 1}];
    _.removeFirst(a, {a: 0});
    a.should.deep.equal([{a: 0}, {a: 1}]);
    done();
  });
});

describe('_.remove', function() {
  it('should remove matched Numbers', function(done) {
    var a = [1, 1, 2];
    _.remove(a, 1);
    a.should.deep.equal([2]);
    done();
  });

  it('should remove matched Objects', function(done) {
    var a = [{a: 0}, {a: 0}, {a: 1}];
    _.remove(a, {a: 0});
    a.should.deep.equal([{a: 1}]);
    done();
  });
});
