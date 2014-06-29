## Object creation

Constructor function
```
function Baz(bar) {
  this.foo = bar;
}
Baz.prototype = { foobar: 42 };
var o = new Baz(1.618);
o.foo //1.618
o.foobar //42
```

Object literal
```
var o = Object.create({ foobar: 42 });
o.foo = 1.618;
o.foo //1.618
o.foobar //42
```
* How to add privacy?
