## $resource

Active Record-like pattern for developing SPA.

```javascript
var User = $resource('/user/:id');
var user = User.get({ id: 1 });
var user2 = new User({
  name: 'foo',
  age: 42
});
user2.$save();
```
