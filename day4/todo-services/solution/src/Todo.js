/* global TodoApp */

TodoApp.factory('Todo', function (storage) {
  'use strict';
  var todos = storage.get('todos') || [];
  todos = todos.map(function (t) {
    return new Todo(t);
  });

  function Todo(data) {
    this.title = data.title;
    this.date = data.date;
    this.id = data.id;
  }
  Todo.prototype.save = function () {
    var idx = todos.push(this);
    this.id = idx;
    storage.put('todos', todos);
  };
  Todo.prototype.destroy = function () {
    todos.splice(this.id, 1);
    storage.put('todos', todos);
  };

  Todo.getList = function () {
    return todos.map(function (todo, idx) {
      return new Todo({
        title: todo.title,
        id: idx,
        completed: todo.completed
      });
    });
  };

  return Todo;
});
