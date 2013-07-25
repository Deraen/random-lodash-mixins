(function (undefined) {
  var _;
  if (typeof require === 'function') {
    _ = require('lodash');
  } else {
    _ = window._;
  }

  var mixins = {};

  /*
  If value is defined use given constructor to create a new Object.

  new Date(undefined) => Invalid Date

  vs.

  _.construct(Date, undefined) => undefined
  */
  mixins.construct = function construct(Target, value) {
    if (typeof value !== 'undefined') {
      return new Target(value);
    } else {
      return undefined;
    }
  };

  /*
  Returns a deep copy of the object with empty or undefined properties removed.

  Use case: Mongo query

  var q = {user: user._id};
  if (request.params.from) q.from = {$lt: new Date(request.params.from)};

  vs.

  var q = _.clean({
    user: user._id,
    from: {$lt: _.construct(Date, request.params.from)}
  });
  */
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

  /*
  Prepends data to a array.

  socket.on('users:new', _.partial(_.prepend, $scope.users));
  */
  mixins.prepend = function prepend(collection, data) {
    if (_.isArray(data)) {
      _.partial(Array.prototype.splice, 0, 0).apply(collection, data);
    } else {
      collection.splice(0, 0, data);
    }
    return collection;
  };

  /*
  Append data to a array.

  socket.on('users:list', _.partial(_.append, $scope.users));
  */
  mixins.append = function append(collection, data) {
    if (_.isArray(data)) {
      Array.prototype.push.apply(collection, data);
    } else {
      collection.push(data);
    }
    return collection;
  };

  /*
  Internal helper
  */
  function indexOf(callback) {
    if (_.isPlainObject(callback)) {
      return _.findIndex;
    } else {
      return _.indexOf;
    }
  }

  /*
  Remove the first matching object from collection.

  // Event data eg. {_id: '...'}
  socket.on('user:removed', _.partial(_.removeFirst, $scope.users));
  */
  mixins.removeFirst = function removeFirst(collection, callback) {
    var i = indexOf(callback)(collection, callback);

    if (i >= 0) {
      collection.splice(i, 1);
    }
    return collection;
  };

  /*
  Remove all matching objects from collection.
  */
  mixins.remove = function remove(collection, callback) {
    var i;
    var find = indexOf(callback);

    while ((i = find(collection, callback)) >= 0) {
      collection.splice(i, 1);
    }
    return collection;
  };

  /*
  Set property in target object to given value

  socket.on('state', function (data) {
    $scope.state = data;
  });

  vs.

  socket.on('state', _.partial(_.set, $scope, 'state'));
  */
  mixins.set = function set(target, key, value) {
    target[key] = value;
    return target;
  };

  /*
  Get a property from object if it exists.
  */
  mixins.get = _.result;

  /*
  Pattern matching

  var a = undefined; a = {}; a = 5; a = "running"; a = [{a: 'collection'}]
  _.match(a, [
    ["running", function () console.log('...')],
    [_.isUndefined, function () console.log('Input was undefined')],
    [_.isEmpty, function () console.log('Input was empty')],
    [Number, function () console.log('Input was a number')],
    [_.and(_.isArray, _.partialRight(_.all, _.partial(_.has, 'a'))), function () console.log('Collections every element has property \'a\'')],
    function () console.log('Default')
  ]);
  */
  mixins.match = function match(input, patterns) {
    patterns = _.rest(arguments);

    _.some(patterns, function (pattern) {
      // Default case
      if (_.isFunction(pattern)) {
        pattern(input);
        return true;
      }

      // pattern.length should always be 2
      var test = pattern[0];
      var cb = pattern[1];
      if (
        _.isFunction(test) && (
          (input !== undefined && input !== null && input.constructor === test) || // (5).constructor === Number
          test(input) // _.isEmpty({})
        ) ||
        input.valueOf() === test.valueOf() // "running".valueOf() === "running".valueOf()
      ) {
        cb(input);
        return true; // stop forEach
      }
    });

    return input;
  };

  _.mixin(mixins);
}).call(this);
