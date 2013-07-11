var _ = require('lodash');
require('../src/fu');

exports.set = function (test) {
  test.expect(1);

  var a = {};
  _.set(a, 'a', 1);
  test.ok(_.isEqual(a, {a: 1}));

  test.done();
};
