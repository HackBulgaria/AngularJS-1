## Example in AngularJS

Common pattern is to use `$q.when`:

```javascript
if (cache[key]) {
  return $q.when(cache[key]);
} else {
  return $http.get('/url')
    .then(function (res) {
      cache[key] = res.data;
      return res.data;
    });
}
```
