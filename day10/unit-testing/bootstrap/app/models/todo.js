var todos = [],
    counter = 0;

function Todo(data) {
  this.id = data.id;
  this.title = data.title;
  this.created = data.created;
  this.description = data.description;
  this.completed = data.completed || false;
}

Todo.prototype.save = function () {
  todos.push(this);
  this.id = counter;
  counter += 1;
  return this;
};

Todo.prototype.update = function () {
  todos = todos.map(function (todo) {
    if (todo.id === this.id) {
      return this;
    }
    return todo;
  }, this);
};

Todo.prototype.updateState = function () {
  var todo = Todo.find(this.id);
  todo.completed = this.completed;
  return todo;
};

Todo.prototype.destroy = function () {
  todos = todos.filter(function (todo) {
    return todo.id !== this.id;
  }, this);
  return this;
};

Todo.find = function (id) {
  return todos.filter(function (todo) {
    return todo.id === id;
  })[0];
};

Todo.getList = function () {
  return todos.map(function (t) {
    return {
      title: t.title,
      completed: t.completed,
      id: t.id
    };
  });
};

module.exports = Todo;
