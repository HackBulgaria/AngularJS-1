## RESTful TODO app

In this example we will create a RESTful TODO application, which will use the API provided by express (node) back-end, defined in the source code in the bootstrap directory.

To start the application use:

```bash
cd app_root
npm install
cd public
bower install
cd ..
node app.js
```

Once the application is started open the url: [http://localhost:3000](http://localhost:3000).

## Domain objects

We have pretty simple domain:

Todo
- id - id of the todo item
- title - title of the todo item
- created - date when the todo item was created
- until - date when the todo item should be completed

## API

In this section is described the API provided by the application:

* GET `/todo` - returns a list of all todos, each entry in the list contains title and id
* GET `/todo/:id` - returns details for given TODO item (including its until date, title, created date and id)
* POST `/todo` - creates new TODO item, returns the todo item, including its assigned id
* DELETE `/todo/:id` - deletes given todo item, returns the removed todo item.


## index.html

1. Bootstrap the application and add appropriate controller (`TodoCtrl`) to the body.
2. Add appropriate binding between the `input[name="title-input"]` and model called `todoTitle`.
3. Add appropriate binding between the date input and model called `todoDate`.
4. Add appropriate binding between the time input and model called `todoTime`.
5. Invoke the `add` method, attached to the scope, when the user clicks on the `Add` button.
6. Iterate over all `todos` and render list items with each of them. For each list item there should be two links:
  * Remove button, which once clicked invokes the `remove` button attached to the scope with argument - the current todo item.
  * Details button - a hyper link, which value is the todo title and once clicked invokes the `details` method attached to the scope.
7. Add appropriate `ng-show` expression to the `div#todo-details`. When property with name `todo` exists and is attached to the scope the div should be visible.

## Todo

Define array called `todos`. It should be in the local scope of the service's factory method. As initial value it should accept an empty array. The invocation of the service's factory method should lead to initiation of HTTP get request, requesting all todo items. If the request completes successfully you should populate the todos array with the received todo items.

1. Define service called `Todo`, using the `factory` method of the `TodoApp`. Once the service is injected into any component it should provide a constructor function with the following static methods:
  * `get` - a method which accepts id and requests todo item associated with the given id
  * `getList` - a method, which once invoked requests the list of todo items
2. The constructor function should add the following methods to its `prototype`:
  * `save` - a method which once invoked creates new todo item using a `post` request, assigns id to the current todo item and adds the todo item to the local todos collection.
  * `destroy` - a method, which once invoked removes the current todo item from the local todos collection and from the server, using appropriate request to the RESTful API.
 3. The constructor function should initialize the following properties:
  * `title` - title of the current todo item
  * `created` - date when the todo was created
  * `until` - deadline for the todo
  * `id` - id of the current todo item. This property could be undefined. 

## TodoCtrl

1. Define controller called `TodoCtrl`. As dependencies it should accept `$scope` and `Todo`.
2. Attach property called `todos` to the scope. As initial value it should accept the result of the invocation of the static method `getList` of the `Todo` service.
3. Attach method called `add` to the `$scope`. Once invoked it should create new todo item with the following properties:
  * title equals to `$scope.todoTitle`
  * date equals to the current date
  * until equals to the result of the concatenation `$scope.todoDate + '/' + $scope.todoTime`, casted to `Date`.
The method should also update the `todos` property and reset the values of the `todoTitle`, `todoDate` and `todoTime`.
4. Attach method called `remove` to the scope. It should invoke the `destroy` method of its argument and update the value of the `todos` property.
5. Attach method called `details` to the scope. When invoked it should create new `get` request to the API, requesting the todo item with the passed id, as argument. Once the request is completed successfully it should set the value of the `$scope.todo` property, to the received data from the request.
