# Services

```javascript
myModule.factory('myService', ['$http', function ($http) {
  //some logic here
}]);
```

```javascript
myModule.service('myService', ['$http', function ($http) {
  //...
  this.prop = val;
  this.method = function () {
  };
  //...
}]);
```
