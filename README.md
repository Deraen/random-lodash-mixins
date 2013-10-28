# Random functions

Some functions Lo-Dash is missing but I have found useful.

Documentation contains some usage examples.
In addition to simple examples there are some particulary
good use cases using AngularJS + Socket.io.


## Array manipulation

I removed these functions as Lo-Dash already provides [_.remove](http://lodash.com/docs#remove)
and append and prepend can be done with native JS and Lo-Dash.

Below are examples to use Array.unshift and push.

### prepend

```
var a = [1, 2];
var arrayRef = [];
var unshift = arrayRef.unshift;

// Single element
a.unshift(-1); // a = [-1, 1, 2];

// Callback
socket.on('users:new', _.bind(_.call, $scope.users.unshift, $scope.users)); // or
socket.on('users:new', _.bind(_.call, unshift, $scope.users));

// Multiple elements
unshift.apply(a, [-3, -2]); // a = [-3, -2, -1, 1, 2];

// Callback
socket.on('users:list', _.bind(_.apply, $scope.users.unshift, $scope.users)); // or
socket.on('users:list', _.bind(_.apply, unshift, $scope.users));
```

### append

```
var push = arrayRef.push;

// Use $scope.users.push / .push / etc.
```

## Object manipulation

### _.set(object, key, value)

Set property in target object to given value

```
var a = {a: 1, b: 2};
_.set(a, 'a', 3); // a = {a: 3, b: 2};
```

```
socket.on('state', function (data) {
  $scope.state = data;
});
// or
socket.on('state', _.partial(_.set, $scope, 'state'));
```

### _.get(object, key)
Alias for [_.result](http://lodash.com/docs#result).

## Misc

### _.construct(Constructor, value)

If value is defined use given constructor to create a new Object else return undefined.

```
new Date(undefined) // = Invalid Date
// or
_.construct(Date, undefined) // = undefined
```

### _.clean

Returns a deep copy of the object with empty or undefined properties removed.

```
var q = {user: user._id};
if (request.params.from) q.from = {$lt: new Date(request.params.from)};
// or
var q = _.clean({
  user: user._id,
  from: {$lt: _.construct(Date, request.params.from)} // request.params.from = undefined
}); // q = {user: 'foo'}
```

Though in this case the first in fact looks better...
