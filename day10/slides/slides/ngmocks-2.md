## ngMocks + Jasmine

```
describe('StorageObserver', function () {

  beforeEach(function () {
    angular.mock.module('App.services');
  });


  it('should detect changes in shallow properties', inject(function (StorageObserver, LocalCache) {
    var changed, key, oldValue, newValue;

    jasmine.Clock.useMock();

    changed = false;
    LocalCache.setItem('key', 'value');
    StorageObserver.onKeyChange('key', function (cKey, newVal, oldVal) {
      key = cKey;
      oldValue = oldVal;
      newValue = newVal;
      changed = true;
    });
    LocalCache.setItem('key', 'value2');
    jasmine.Clock.tick(101);

    expect(changed).toBeTruthy();
    expect(key).toBe('key');
    expect(oldValue).toBe('value');
    expect(newValue).toBe('value2');
  }));

  it('should not trigger event when key is not changed', inject(function (StorageObserver, LocalCache) {
    var changed;

    jasmine.Clock.useMock();

    changed = false;
    LocalCache.setItem('key', 'value');
    StorageObserver.onKeyChange('key', function (cKey, newVal, oldVal) {
      changed = true;
    });
    LocalCache.setItem('key', 'value');
    jasmine.Clock.tick(101);

    expect(changed).toBeFalsy();

  }));
```

