## With promises...

```javascript
$.ajax({
})
.then(function (data, status, jqXHR) {
  return $.ajax({
  });
})
.then(function (data, status, jqXHR) {
  return $.ajax({
  });
});
```

Callbacks could be called multiple times, while promises resolve functions only once.
