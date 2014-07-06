module.exports = function (app) {
  var todo = require('../app/controllers/todo');
  app.get('/todo/:id', todo.todo);
  app.get('/todo', todo.list);
  app.post('/todo', todo.add);
  app.delete('/todo/:id', todo.delete);
};
