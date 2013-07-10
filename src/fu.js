/* global define */

(function (undefined) {
  var fu = {};
  var hasModule = (typeof module !== 'undefined' && module.exports);

  var _ = _;
  if (hasModule) {
    _ = require('lodash');
  }

  /*
  If value is defined construct a new Object with given constructor.
  */
  fu.construct = function (Target, value) {
    if (typeof value !== 'undefined') {
      return new Target(value);
    } else {
      return undefined;
    }
  };

  /*
  Returns a deep copy of object with empty or undefined properties removed.
  */
  fu.compact = function compact(object) {
    var r = {};

    for (var key in object) {
      var value = object[key];

      if (_.isPlainObject(value)) {
        value = compact(value);
        if (_.isEmpty(value)) {
          value = undefined;
        }
      }

      if (typeof value !== 'undefined') {
        r[key] = value;
      }
    }

    return r;
  };

  /*
  Prepends data to a array.
  */
  fu.prepend = function (collection, data) {
    if (_.isArray(data)) {
      Array.prototype.splice.bind(collection, 0, 0).apply(data);
    } else {
      collection.splice(0, 0, data);
    }
    return collection;
  };

  /*
  Append data to a array.
  */
  fu.append = function (collection, data) {
    if (_.isArray(data)) {
      Array.prototype.push.apply(collection, data);
    } else {
      collection.push(data);
    }
    return collection;
  };

  /*
  Remove a object from collection.
  */
  fu.removeFirst = function (collection, where) {
    var cb = _.createCallback(where);

    if (_.isObject(where)) {
      var j = null;
      for (var i = 0; !j && i < collection.length; ++i) {
        if (cb(collection[i])) {
          j = i;
        }
      }
      where = j;
    }

    if (where !== null) {
      collection.splice(where, 1);
    }
    return collection;
  };

  /*
  Set property in target object to given value
  */
  fu.set = function (target, key, value) {
    target[key] = value;
    return target;
  };

  /*
  Get a property from object if it exists.
  */
  fu.get = function (object, key) {
    if (object && object.hasOwnPropery(key)) {
      return object[key];
    } else {
      return undefined;
    }
  };

  //
  if (hasModule) {
    module.exports = fu;
  }
  if (typeof define === 'function' && define.amd) {
    define('fu', ['lodash'], function () {
      return fu;
    });
  }
}).call(this);
