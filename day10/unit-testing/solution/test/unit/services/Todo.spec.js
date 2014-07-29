describe('Todo', function () {

  beforeEach(function () {
    angular.mock.module('todo');
  });

  it('should be a function', inject(function (Todo) {
    expect(typeof Todo).toBe('function');
  }));

  it('should define certain methods to its prototype', inject(function (Todo) {
    expect(typeof Todo.prototype.save).toBe('function');
    expect(typeof Todo.prototype.update).toBe('function');
    expect(typeof Todo.prototype.updateState).toBe('function');
    expect(typeof Todo.prototype.destroy).toBe('function');
  }));

  it('should define certain static methods', inject(function (Todo) {
    expect(typeof Todo.getList).toBe('function');
    expect(typeof Todo.get).toBe('function');
  }));

});
