## Filters

Definition
```javascript
myModule.filte('uppercase', function () {
  return function (val) {
    return (val || '').toUpperCase();
  };
});
```
Dependency Injection
```javascript
function Ctrl(uppercaseFilter) {
  uppercaseFilter('foo'); //FOO
}
```
Partials
```html
<span ng-bind="'foo' | uppercase"></span>
```
