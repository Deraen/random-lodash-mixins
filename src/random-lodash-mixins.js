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

  mixins.prepend = function prepend(collection, data) {
    if (_.isArray(data)) {
      _.partial(Array.prototype.splice, 0, 0).apply(collection, data);
    } else {
      collection.splice(0, 0, data);
    }
    return collection;
  };

  mixins.append = function append(collection, data) {
    if (_.isArray(data)) {
      Array.prototype.push.apply(collection, data);
    } else {
      collection.push(data);
    }
    return collection;
  };

  function indexOf(callback) {
    if (_.isPlainObject(callback)) {
      return _.findIndex;
    } else {
      return _.indexOf;
    }
  }

  mixins.removeFirst = function removeFirst(collection, callback) {
    var i = indexOf(callback)(collection, callback);

    if (i >= 0) {
      collection.splice(i, 1);
    }
    return collection;
  };

  mixins.remove = function remove(collection, callback) {
    var i;
    var find = indexOf(callback);

    while ((i = find(collection, callback)) >= 0) {
      collection.splice(i, 1);
    }
    return collection;
  };

  mixins.set = function set(target, key, value) {
    target[key] = value;
    return target;
  };

  mixins.get = _.result;

  _.mixin(mixins);
}).call(this);
