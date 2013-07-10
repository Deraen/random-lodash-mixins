var fu = require('../src/fu');

exports.construct = {
  'Construct': function (test) {
    var a = 'test';
    test.expect(2);
    test.equal(fu.construct(String, a).valueOf(), a);
    test.equal(fu.construct(String, undefined), undefined);
    test.done();
  }
};
