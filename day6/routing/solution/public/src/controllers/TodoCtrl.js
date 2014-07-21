/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, $location, Todo, todo) {
  'use strict';
  $scope.todo = new Todo(todo);

  $scope.update = function () {
    $scope.todo.update();
    $location.path('/');
  };

  $scope.save = function () {
    $scope.todo.save();
    $location.path('/');
  };

  $scope.remove = function () {
    $scope.todo.destroy();
    $location.path('/');
  };
});
