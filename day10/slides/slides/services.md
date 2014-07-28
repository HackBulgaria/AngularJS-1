# Services

This section includes information about the service component in AngularJS. It is not dependent of the way of definition (i.e. as provider, `.factory`, `.service`), except if explicitly mentioned.

* Use camelCase to name your services.
  * UpperCamelCase (PascalCase) for naming your services, used as constructor functions i.e.:

```JavaScript
module.controller('MainCtrl', function ($scope, User) {
  $scope.user = new User('foo', 42);
});

module.factory('User', function () {
  return function User(name, age) {
    this.name = name;
    this.age = age;
  };
});
```

  * lowerCamelCase for all other services.
