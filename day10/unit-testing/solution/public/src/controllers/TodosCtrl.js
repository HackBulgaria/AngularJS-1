/* global TodoApp */

TodoApp.controller('TodosCtrl', function ($scope, todos, Todo) {
  'use strict';
  $scope.todos = todos;
  $scope.updateState = function (todo) {
    todo = new Todo(todo);
    todo.updateState();
  };
});
