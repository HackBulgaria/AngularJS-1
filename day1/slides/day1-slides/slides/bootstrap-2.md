## Manual Bootstrap

Used when scripts needs to be loaded asynchronously or additional work should be done before the DOM tree is compiled.

All modules with the associated filters, controllers, directives and services should be defined before the manual bootstrap is started:

```
angular.module('myApp', [])
  .controller('MyController', ['$scope', function ($scope) {
    $scope.greetMe = 'World';
  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp']);
});
```
