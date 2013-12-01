(function (undefined) {
  var _;
  var mixins = {};
  if (typeof require === 'function') {
    _ = require('lodash');
    module.exports = mixins;
  } else {
    _ = window._;
  }

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

  function flatten(obj, separator, into, prefix) {
    _.each(obj, function(v, k) {
      if (_.isPlainObject(v)) {
        flatten(obj[k], separator, into, prefix + k + separator);
      } else {
        into[prefix + k] = v;
      }
    });
    return into;
  }

  mixins.flattenObj = function(obj, separator) {
    separator = separator || '.';
    return flatten(obj, separator, {}, '');
  };

  mixins.unflattenObj = function(obj, separator) {
    separator = separator || '.';

    var r = {};
    _.each(obj, function(v, k) {
      var s = k.split(separator);
      var c = r;
      var len = s.length - 1;
      _.each(s, function(k, i) {
        c = c[k] = (i === len ? v : (c[k] || {}));
      });
    });

    return r;
  };

  _.mixin(mixins);
}).call(this);
