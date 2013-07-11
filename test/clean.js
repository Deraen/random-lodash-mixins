var _ = require('lodash');
require('../src/fu');

exports.clean = function (test) {
  test.expect(2);

  var a = {a: 0};
  test.ok(_.isEqual(_.clean(a), a));

  var b = {a: 0, b: undefined};
  test.ok(_.isEqual(_.clean(b), a));

  test.done();
};
