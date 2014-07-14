function TodoCtrl($scope) {
  'use strict';
  $scope.todos = [];
  $scope.add = function () {
    $scope.todos.push({
      title: $scope.currentTodo,
      completed: false
    });
    $scope.currentTodo = '';
  };
  $scope.remove = function (idx) {
    $scope.todos.splice(idx, 1);
  };
}
