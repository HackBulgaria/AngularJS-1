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
    todos.push(this);
    var self = this;
    $http.post('/todo', this)
    .then(function (d) {
      self.id = d.data.id;
    });
  };

  Todo.prototype.update = function () {
    // In case of server error may have inconsistencies
    todos = todos.map(function (todo) {
      if (todo.id === this.id) {
        return this;
      }
      return todo;
    }, this);
    // PUT would be better
    $http.post('/todo/' + this.id, this);
  };

  Todo.prototype.updateState = function () {
    $http.post('/todo/state/' + this.id, this);
  };

  Todo.prototype.destroy = function () {
    todos = todos.filter(function (todo) {
      return todo.id !== this.id;
    }, this);
    $http.delete('/todo/' + this.id);
  };

  Todo.getList = function () {
    if (todos) {
      return $q.when(todos);
    }
    return $http.get('/todo')
    .then(function (res) {
      todos = [];
      res.data.forEach(function (t) {
        todos.push(new Todo(t));
      });
      return todos;
    });
  };

  Todo.get = function (id) {
    return $http.get('/todo/' + id)
      .then(function (res) {
        return res.data;
      });
  };

  return Todo;
});
