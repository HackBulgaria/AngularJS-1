/* global TodoApp */

TodoApp.factory('Todo', function ($http, $q) {
  'use strict';
  var todos = null;

  function Todo(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.completed = data.completed;
    this.created = new Date();
  }

  Todo.prototype.save = function () {
    //...
  };

  Todo.prototype.update = function () {
    //...
  };

  Todo.prototype.updateState = function () {
    //...
  };

  Todo.prototype.destroy = function () {
    //...
  };

  Todo.getList = function () {
    //...
  };

  Todo.get = function (id) {
    //...
  };

  return Todo;
});
