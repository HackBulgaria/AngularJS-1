/* global window, angular */

(function () {
  'use strict';
  window.TodoApp = angular.module('todo', ['ngRoute']);
  TodoApp.config(function ($routeProvider) {
    $routeProvider.when('/todo/:id', {
      templateUrl: 'partials/todo.html',
      controller: 'TodoCtrl',
      resolve: {
        todo: function (Todo, $route) {
          return Todo.get(parseInt($route.current.params.id));
        }
      }
    })
    .when('/todos', {
      templateUrl: 'partials/todos.html',
      controller: 'TodosCtrl',
      resolve: {
        todos: function (Todo) {
          return Todo.getList();
        }
      }
    })
    .when('/edit/:id', {
      templateUrl: 'partials/edit.html',
      controller: 'TodoCtrl',
      resolve: {
        todos: function (Todo) {
          return Todo.getList();
        },
        todo: function (Todo, $route) {
          return Todo.get(parseInt($route.current.params.id));
        }
      }
    })
    .when('/add', {
      templateUrl: 'partials/add.html',
      controller: 'TodoCtrl',
      resolve: {
        todos: function (Todo) {
          return Todo.getList();
        },
        todo: function ($q) {
          return $q.when({});
        }
      }
    })
    .otherwise({ redirectTo: '/todos' });
  });
}());

