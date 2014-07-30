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

  it('should initialize certain properties', inject(function (Todo) {
    var todo = new Todo({
      id: 1,
      title: 2,
      description: 3,
      completed: 4
    });
    expect(todo.id).toBe(1);
    expect(todo.title).toBe(2);
    expect(todo.description).toBe(3);
    expect(todo.completed).toBe(4);
    expect(todo.created instanceof Date).toBeTruthy();
  }));

  describe('instance', function () {
    var todo;
    beforeEach(inject(function (Todo) {
      todo = new Todo({
        title: 2,
        description: 3,
        completed: 4
      });
    }));

    it('should has method save, which sets an id', inject(function ($httpBackend) {
      $httpBackend.whenPOST('/todo')
        .respond(function (method, url, data) {
          data = JSON.parse(data);
          data.id = 2;
          return [200, data];
        });
      todo.save();
      $httpBackend.flush();
      expect(todo.id).toBe(2);
    }));

    it('should has method update, which updates the item and sends new request',
        inject(function ($httpBackend, Todo) {
      todo.id = 1;
      todo.title = 'new title';
      $httpBackend.whenPOST('/todo/1')
        .respond(function (method, url, data) {
          data = JSON.parse(data);
          return [200, data];
        });
      todo.update();
      $httpBackend.flush();
      Todo.getList().then(function (data) {
        expect(data[0].title).toBe('new title');
      });
    }));

  });

});
