var _ = require('lodash');
require('../src/fu');

exports.match = function (test) {
  test.expect(2);

  var success = function () {
    test.ok(true);
  };
  var fail = function () {
    test.ok(false);
  };

  var a = 'running';
  _.match(a,
    ['running', success],
    fail
  );

  var b = {};
  _.match(b,
    [_.isEmpty, success],
    fail
  );

  test.done();
};
