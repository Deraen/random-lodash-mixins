var _ = require('lodash');
require('../src/fu');

exports.remove = function (test) {
  test.expect(2);
  var success;

  var a = [1, 1, 2];
  success = [2];
  _.remove(a, 1);
  test.ok(_.isEqual(a, success), a + ' !== ' + success);

  var b = [{a: 0}, {a: 0}, {b: 1}];
  _.remove(b, {a: 0});
  test.ok(_.isEqual(b, [{b: 1}]));

  test.done();
};

exports.removeFirst = function (test) {
  test.expect(2);

  var a = [1, 3, 1, 2];
  _.removeFirst(a, 1);
  test.ok(_.isEqual(a, [3, 1, 2]));

  var b = [{a: 0}, {c: 2}, {a: 0}, {b: 1}];
  _.removeFirst(b, {a: 0});
  test.ok(_.isEqual(b, [{c: 2}, {a: 0}, {b: 1}]));

  test.done();
};
