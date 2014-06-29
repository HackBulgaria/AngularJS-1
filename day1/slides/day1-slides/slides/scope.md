## Variable Scope

Global
```
var foo = 42;
window.foo //42
foo //42
```
Local
```
(function () {
  var foo = 42;
  window.foo //undefined
  foo //42
}());
```
Loop
```
for (var i = 1; i < 3; i += 1) {}
i //3
```
Condition
```
if (true)
  var baz = 6;
baz //6
```
