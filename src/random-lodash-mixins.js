(function (undefined) {
  var _;
  if (typeof require === 'function') {
    _ = require('lodash');
  } else {
    _ = window._;
  }

  var mixins = {};

  mixins.construct = function construct(Target, value) {
    if (typeof value !== 'undefined') {
      return new Target(value);
    } else {
      return undefined;
    }
  };

  mixins.clean = function clean(object) {
    var r = {};

    for (var key in object) {
      var value = object[key];

      if (_.isPlainObject(value)) {
        value = clean(value);
        if (_.isEmpty(value)) {
          value = undefined;
        }
      }

      if (!_.isUndefined(value)) {
        r[key] = value;
      }
    }

    return r;
  };

  mixins.set = function set(target, key, value) {
    target[key] = value;
    return target;
  };

  mixins.get = _.result;

  _.mixin(mixins);
}).call(this);
