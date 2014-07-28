## Jasmine

```
//...
it('should...', function () {
  expect(foo).toEqual(bar);
  expect(baz).not.toBeDefined();
  expect(message).toMatch(/regex/);
  expect(foobar).toBeNull();
  expect(foobaz).toContains('bar');
  expect(function bar() {
    throw new Error('Just throwing...coz bored');
  }).toThrow();
});
//...
```
