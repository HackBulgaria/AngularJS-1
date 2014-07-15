/* global TodoApp */

TodoApp.factory('Todo', function ($http) {
  'use strict';
  var todos = [];
  $http.get('/todo')
  .then(function (res) {
    res.data.forEach(function (t) {
      todos.push(new Todo(t));
    });
  });

  function Todo(data) {
    this.title = data.title;
    this.created = data.date;
    this.until = data.until;
    this.id = data.id;
  }

  Todo.prototype.save = function () {
    var idx = todos.push(this),
        self = this;
    $http.post('/todo', this)
    .then(function (d) {
      self.id = d.data.id;
    });
  };

  Todo.prototype.destroy = function () {
    todos = todos.filter(function (todo) {
      return todo.id !== this.id;
    }, this);
    $http.delete('/todo/' + this.id);
  };

  Todo.getList = function () {
    return todos;
  };

  Todo.get = function (id) {
    return $http.get('/todo/' + id);
  };

  return Todo;
});
