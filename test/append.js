var _ = require('lodash');
require('../src/fu');

exports.append = function (test) {
  test.expect(2);
  var a = [1];
  _.append(a, 2);
  test.ok(_.isEqual(a, [1, 2]));

  var b = [1];
  _.append(b, [2, 3]);
  test.ok(_.isEqual(b, [1, 2, 3]));

  test.done();
};
