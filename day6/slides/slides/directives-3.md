## Ok, but what about?

```javascript
module.service('AwesomeService', function () {
  this.name = 'Bar';
  this.showName = function () {
    document.getElementById('name-div').innerHTML = this.name;
  };
});
```
