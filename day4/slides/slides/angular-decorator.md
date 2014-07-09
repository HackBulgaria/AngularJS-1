## AngularJS Decorator

```javascript
myModule.config(['$provide', function ($provide) {
  $provide.decorator('myService', ['$delegate', function ($delegate) {
    var originalMethod = $decorator.method;
    $decorator.method = function () {
      //logic
      originalMethod.apply(this, arguments);
      //logic
    };
  });
}]);
```

