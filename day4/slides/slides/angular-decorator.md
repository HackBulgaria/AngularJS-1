## AngularJS Decorator

```javascript
myModule.config(['$provide', function ($provide) {
  $provide.decorator('myService', ['$delegate', function ($delegate) {
    var originalMethod = $delegate.method;
    $delegate.method = function () {
      //logic
      originalMethod.apply(this, arguments);
      //logic
    };
    // return the decorated item
    return $delegate;
  });
}]);
```

