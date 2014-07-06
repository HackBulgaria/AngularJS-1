# Controllers

Quite similar to the code-behind in ASP.NET. They attach properties and methods to the scope, exposing them to the view.

```javascript
function MainCtrl($scope) {
  //...
}
```

But better:

```javascript
myModule.controller('MainCtrl', ['$scope', function ($scope) {
  //...
}]);
```
Why?
