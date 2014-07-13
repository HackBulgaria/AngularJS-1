var Todo = require('../models/todo');

exports.todo = function (req, res) {
  var todo = Todo.find(parseInt(req.params.id));
  res.json(todo);
};

exports.list = function (req, res) {
  var todos = Todo.getList();
  res.json(todos);
};

exports.save = function (req, res) {
  var todo = new Todo(req.body);
  res.json(todo.save());
};

exports.update = function (req, res) {
  var todo = new Todo(req.body);
  res.json(todo.update());
};

exports.updateState = function (req, res) {
  var todo = new Todo(req.body);
  res.json(todo.updateState());
};


exports.delete = function (req, res) {
  var todo = new Todo.find(parseInt(req.params.id));
  res.json(todo.destroy());
};
