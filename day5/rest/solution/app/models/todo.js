var todos = [],
    counter = 0;

function Todo(data) {
  this.id = data.id;
  this.title = data.title;
  this.created = data.created;
  this.until = data.until;
}

Todo.prototype.save = function () {
  var id = todos.push(this);
  this.id = counter;
  counter += 1;
  console.log(this.id);
  return this;
};

Todo.prototype.destroy = function () {
  todos.splice(this.id, 1);
  return this;
};

Todo.find = function (id) {
  return todos[id] || null;
};

Todo.getList = function () {
  return todos.map(function (t) {
    return {
      title: t.title,
      id: t.id
    };
  });
};

module.exports = Todo;
