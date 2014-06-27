##n application

Extend `Function.prototype` by including a method which applies given function `n` times:

```javascript
> var addTwo = function (arg1, arg2) { console.log(arg1, arg2); };
> var addSix = addTwo.times(3);
> addSix('foo', 'bar');
"foo" "bar"
"foo" "bar"
"foo" "bar"
```
 * If the argument of `times` is less than 0 throw an exception (TypeError, or extend Error for throwing InvalidArgument error)

##Array to set
Extend `Array.prototype` with the method `unique` which returns a list of the unique elements in the original array.
Two objects are unique of `a === b` is evaluated to false.

```javascript
> var l1 = [1, 2, 3, 4, 5, 5, 5, 4, 6, 4];
> l1.unique();
[1, 2, 3, 4, 5, 6] //order IS NOT important
```

##array intersection
Extend `Array.prototype` with the method `intersection` which when applied with given argument returns the intersection between the current list and the method's argument.

The order does not matters.

```javascript
> var someNumbers = [1, 2, 3, 4, 5];
> var someOtherNumbers = [5, 4, 7, 10, 12, 2, 1];
> someOtherNumbers.intersect(someNumbers);
[1, 4, 2, 5] //order IS NOT important
```