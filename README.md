# Random functions

Some functions Lodash is missing but I have found useful.

Documentation contains some usage examples.
In addition to simple examples there are some particulary
good use cases using AngularJS + Socket.io.


## Array manipulation

Angularjs data-binding breaks if you try to replace array in
$scope with a copy of array e.g. a new Object.
So if you want to append or prepend data to a collection in the scope you
should modify the current Array.

### _.prepend(array, element)

```
var a = [1, 2];
_.prepend(a, -1); // a = [-1, 1, 2];
_.prepend(a, [3, 4]); // a = [3, 4, -1, 1, 2];

socket.on('users:new', _.partial(_.prepend, $scope.users));
```

### _.append(array, element)

```
var a = [1, 2];
_.append(a, -1); // a = [1, 2, -1];
_.append(a, [3, 4]); // a = [1, 2, -1, 3, 4];

socket.on('users:list', _.partial(_.append, $scope.users));
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
