## Chaining promises

```javascript
var deferred = $q.defer();
deferred.promise
.then(function resolve () {
  return 1 + 1;
})
.then(function (res) {
  return res + 40;
})
.then(function (res) {
  return alert('Foo is ' + res);
});
```
