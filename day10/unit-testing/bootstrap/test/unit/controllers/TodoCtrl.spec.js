describe('TodoCtrl', function () {
  var Todo;
  beforeEach(function () {
    angular.mock.module('todo');
    Todo = function Todo() {};
    Todo.prototype.update = function () {
    };
    spyOn(Todo.prototype, 'update');
  });

  function instantiate($controller, config) {
    config = config || {};
    var ctrl = $controller('TodoCtrl', {
      $scope: config.scope || {},
      $location: config.$location || {},
      Todo: Todo,
      todo: {}
    });
    return ctrl;
  }

  it('should be defined', inject(function ($controller) {
    expect(function () {
      instantiate($controller);
    }).not.toThrow();
  }));

  it('should attach certein properties to the scope', inject(function ($controller) {
    var scope = {};
    var ctrl = instantiate($controller, { scope: scope });
    expect(scope.todo).toBeDefined();
    expect(scope.todo instanceof Todo).toBeTruthy();
    expect(typeof scope.update).toBe('function');
    expect(typeof scope.save).toBe('function');
    expect(typeof scope.remove).toBe('function');
  }));

  describe('scope methods', function () {

    describe('update', function () {

      it('should invoke $location.path and todo.update', inject(function ($controller) {
        var scope = {};
        var $location = {};
        $location.path = function () {};
        spyOn($location, 'path');
        var ctrl = instantiate($controller, { scope: scope, $location: $location });
        scope.update();
        expect(scope.todo.update).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/');
      }));

    });

  });
});
