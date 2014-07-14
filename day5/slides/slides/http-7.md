## $http interceptors

```javascript
// register the interceptor as a service
$provide.factory('myHttpInterceptor', function($q, dependency1, dependency2) {
  return {
    // optional method
    'request': function(config) {
    },
    // optional method
   'requestError': function(rejection) {
    },
    // optional method
    'response': function(response) {
    },
    // optional method
   'responseError': function(rejection) {
    }
  };
});

$httpProvider.interceptors.push('myHttpInterceptor');
```
