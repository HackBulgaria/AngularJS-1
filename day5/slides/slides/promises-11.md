## $q.all

```javascript
var xhrs = [
  $http.get('/foo'),
  $http.get('/bar'),
  $http.get('/baz')
];

$q.all(xhrs)
.then(function (data) {
  data[0]; // foo
  data[1]; // bar
  data[2]; // baz
});
```
