## $resource custom methods

```javascript
// Define CreditCard class
var CreditCard = $resource('/user/:userId/card/:cardId', {
    userId:123,
    cardId:'@id'
  }, {
  charge: {
    method: 'POST',
    params: {
      charge: true
    }
  }
});
```
