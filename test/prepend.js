var _ = require('lodash');
require('../src/fu');

exports.prepend = function (test) {
  test.expect(2);
  var a = [1];
  _.prepend(a, 2);
  test.ok(_.isEqual(a, [2, 1]));

  var b = [1];
  _.prepend(b, [2, 3]);
  test.ok(_.isEqual(b, [2, 3, 1]));

  test.done();
};
