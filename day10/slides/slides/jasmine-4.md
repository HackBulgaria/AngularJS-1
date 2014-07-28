## Jasmine

```
describe('bar', function () {
  beforeEach(function () {
    this.bar = 42;
  });
  it('should has value of 42', function () {
    expect(this.bar).toBe(42);
    this.bar = 38;
  });
  it('should not has value 42', function () {
    expect(this.bar).not.toBe(42);
  });
  afterEach(function () {
    console.log('cleaning the mess...');
  });
});
```
