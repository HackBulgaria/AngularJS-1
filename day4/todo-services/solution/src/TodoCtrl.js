/* global TodoApp */

TodoApp.controller('TodoCtrl', function ($scope, Todo) {
  'use strict';

  $scope.todos = Todo.getList();

  $scope.add = function () {
    new Todo({
      title: $scope.todoTitle,
      date: new Date(),
    }).save();
    $scope.todoTitle = '';
    $scope.todos = Todo.getList();
  };

  $scope.remove = function (todo) {
    todo.destroy();
    $scope.todos = Todo.getList();
  };
});
