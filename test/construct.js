var _ = require('lodash');
require('../src/fu');

exports.construct = function (test) {
  var a = 'test';
  test.expect(2);
  test.strictEqual(_.construct(String, a).valueOf(), a);
  test.strictEqual(_.construct(String, undefined), undefined);
  test.done();
};
