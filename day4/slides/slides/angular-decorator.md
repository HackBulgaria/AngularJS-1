## AngularJS Decorator

```javascript
myModule.config(['$provide', function ($provide) {
  $provide.decorator('myService', ['$decorator', function ($decorator) {
    var originalMethod = $decorator.method;
    $decorator.method = function () {
      //logic
      originalMethod.apply(this, arguments);
      //logic
    };
  });
}]);
```

