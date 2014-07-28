* Use the original names of the controller's dependencies. This will help you produce more readable code:

```JavaScript
module.controller('MyCtrl', ['$scope', function (s) {
  //...body
}]);
```

which is less readable than:

```JavaScript
module.controller('MyCtrl', ['$scope', function ($scope) {
  //...body
}]);
```

This especially applies to a file that has so much code that you'd need to scroll through. This would possibly cause you to forget which variable is tied to which dependency.
