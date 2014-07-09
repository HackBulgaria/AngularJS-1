# Todo App

Do not forget to run `bower install` before trying to use the application.

## index.html

1. Add appropriate directives to the `body` element in order to bootstrap the application and associate the `TodoCtrl` to it.
2. Add appropriate data binding directive to the input element `input[name="title-input"]`. to property called `todoTitle`.
3. Add appropriate expression in `ng-click` directive to the button element in order to add new todo items in the `TodoCtrl`. The expression should invoke method called `add` attached to the scope in the `TodoCtrl`.
4. Iterate over all todo items using the appropriate directive and print the title of each directive inside the content of `li` item.
5. Add appropriate directive to the delete button for each todo item. The directive should invoke the `remove` method attached to the scope, with argument the current `todo`item.

## app.js

1. Define new global variable called `TodoApp`. As value it should accept the module created by invoking `angular.module` with module name `todo` and without any dependent modules.

## TodoCtrl

1. Define new controller called `TodoCtrl`. The controller should be defined through the exposed global `TodoApp`. The controller should not be exposed to the global scope.
2. The controller should have two dependencies: `$scope` and `Todo`.
3. Attach property to the scope called `todos`. It should be equals to the result of the invocation of `Todo.getList`.
4. Attach new method called `add` to the scope. It should create new todo item with title equals to the value of `$scope.todoTitle` and date - the current date. The add method should reset the value of `todoTitle` and should update the value of `$scope.todos`.
5. Add new method to the scope, called `remove`. It should accept a single argument called `todo`. When invoked `remove` should remove the current todo, passed as argument and should update the value of `$scope.todos`.

## storage

1. Define new provider called `storage`.
2. In the local scope of the function define variable called `keyName`. This variable will be the value of the key, in which the `localStorage` will save all the data.
3. Add method called `setKey`, to the provider definition, which accepts a single argument called `key` and set the value of `keyName`.
4. Define method called `$get`. Inside the `$get` method define local variable called `data`, which as initial value accepts the result of the invocation `JSON.parse(localStorage.getItem(keyName)) || {}`. The `$get` method should return an object with the following properties:
  1. `put(key, value)` - This method should set the value of the property with key - `key` to the `data` variable and after that save the JSON serialized value of the `data` variable to `localStorage`.
  2. `get` - should return the `key` property of the `data` variable.

## Todo

Inside the factory method of the service add local variable called `todos`. It should be array and as initial value it should accept the value of `storage.get`, with key `todos`. Make sure all items in the `todos` array are instance of `Todo` (i.e. invoke the `Todo` constructor function with each item received from the invocation of `storage.get`).

1. Define service called `Todo`, through the exposed global `TodoApp`. You should use the `factory` method.
2. The `Todo` constructor function should accept object with the following properties:
  1. `title` - title of the todo
  2. `date` - date when the todo was created
  3. `id` - id of the current todo, this value could be equals to undefined.
3. The `Todo` constructor function, which should add the following methods to it's prototype:
  1. `save` - method responsible for saving the current todo item. This method should assign `id` to the current todo item, based on its index in the `todos` array and invoke `storage.put` with key `todos` and value the current value of the `todos` array (with the new item included).
  2. `destroy` - method responsible for removing the current todo item. It should remove it from the `todos` array and invoke `storage.put` with key `todos` and value the current value of the `todos` array.
4. Add static method called `getList`. This method should return an array with all todo items.
5. The actual service should be the defined `Todo` constructor function described above.


After implementing the functionality above the application should work properly.

## storageDecorator

1. Define new `decorator` of the `storage` service.
2. As dependencies the decorator should accept two arguments `$delegate` - a local dependency and `$log` - a logging service.
3. Override the put method of the `storage` service. Before saving any data in the service log the message: `"Storing data in key', key, 'with value', value"`, using the `log` method of the `$log` service. (Do not forget to invoke the original `put` definition with the appropriate context).

