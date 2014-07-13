# RESTful SPA with routing

In this exercise we are going to implement a RESTful TODO application with routing.

## Setup

You need to complete the following steps in order to run the app:

```bash
cd app_root
npm install
cd public
bower install
cd ..
node app.js
```

## Initial setup

1. Create module called `todo`, which depends on the `ngRoute` module.
2. Automatically bootstrap the application by using the `todo` module.

## Routing

1. Add `ng-view` directive to the container in `index.html` associated with the class name `page-wrapper`.
2. Configure the created `todo` module by passing a callback, which depends on [`$routeProvider`](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider). Inside the callback register the following routes:

* `/todo/:id`, with controller `TodoCtrl` and `resolve` property called `todo`, which as value accepts a function, which returns the result of the invocation of `Todo.get` with the current `id` passed as route parameter. The resolve function may accept dependencies, which will be resolved with the DI mechanism of AngularJS. You can get the route `id` parameter by injecting `$route` and accessing the property: `$route.current.params.id`. The template for this route should be `partials/todo.html`.
* `/todos`, with controller `TodosCtrl`, partial `partials/todos.html` and resolve property `todos`. The result of the invocation of the callback associated with the resolve `todos` property should be the result of `Todo.getList()`.
* `/edit/:id`, with controller `TodoCtrl`, partial `partials/edit.html` and resolve properties: `todos` with callback which returns `Todo.getList()` and `todo` with callback which returns `Todo.get` with the current `id` passed as parameter.
* `/add`, with controller `TodoCtrl`, partial `partials/add.html` and resolve properties: `todos` with callback, which returns `Todo.getList()` and `todo`, which callback returns `$q.when({}})` (Why?).

In case the user tries to access any other route he/she should be redirected to the `/todos` page.

## RESTful communication (services/Todo.js)

1. In the `save` method added to the prototype of `Todo` add the current `todo` item to the `todos` array (i.e. cache it) and initiate new `post` request to the server with URI `/todo`. When the request is completed successfully set the id to the current `todo` item, which is returned by the server.
2. In the `update` method added to the prototype of `Todo` update the cached todo in the `todos` array with the new values of the todo's properties and initiate new `post` request to URI `/todo/:id`.
3. In the `updateState` method attach to the prototype of `Todo` initiate new `post` request to URL `/todo/state/:id` with data - the current todo.
4. In the `destroy` method attached to the prototype of `Todo` remove the current todo item from the `todos` array and initiate new `delete` request to URI `/todo/:id`.
5. When `getList` is invoked return "promise-wrapped" version of the `todos` array if it is populated with data. Otherwise initiate new `get` request to URL `/todo`. Once the promise is resolved initialize the `todos` array and populate it with the received data. (hint: in order to make this construction works properly use promise chaining).
6. In the `get` static method return the result of the invocation of `$http.get` to URI `/todo/:id`. (hint use promise chaining again).

## Controllers

### TodosCtrl

1. Define controller called `TodosCtrl`, which as dependencies accepts `$scope`, `todos` (local dependency received by the `resolve` object) and `Todo`.
2. Initialize property of the scope called `$scope.todos`, which should accept the value of the injected dependency `todos`.
3. Attach method to the scope called `updateState`, which accepts a single argument - a `todo` item. Once the `updateState` method is invoked it should be wrapped inside a `Todo` object instance (by invoking the constructor function `Todo`), once you have the wrapped `Todo` instance invoke its `updateState` method.
### TodoCtrl

1. Define controller called `TodoCtrl`, which as dependencies accepts `$scope`, `$location`, `Todo`, `todo` (a local dependency received from the `resolve` definition).
2. Attach `todo` property to the scope, equals to the result of the invocation of the constructor function `Todo` with argument the `todo` dependency.
3. Attach the following methods to the scope:

- `update`
- `save`
- `remove`

Each of the should call respectively: `todo.update()`, `todo.save()` and `todo.destroy()`. Once the appropriate todo method is called, the `$location` service should be used to redirect the user to the root path of the application.

## Directive

1. Define a directive called `todoForm`, with the following properties:
- `templateUrl` pointing to `src/directives/todoForm.html`.
- should be applied as **E**lement.
- isolated scope, which creates two way binding between its `todo` property and `todo` property of the `$parent` scope, with name pointed by attribute called `todo`. The scope should also define that it has a `save` method, which corresponds to method of the `$parent` scope pointer by an attribute with name `save`.
- link function, which attach method called `saveData` to the scope. Once `saveData` is being invoked it should invoke the `scope.save` method with the current todo item, only if the form is valid.

### Form validation

Inside `src/directives/todoForm.html`.

1. Add `novalidate` property to the form.
2. Add attribute `name` to the form with value `todoForm`.
3. Add attribute `ng-show` to the first `span.error`. The condition associated with the attribute should be equivalent to:
  - show the element if the `titleInput` is valid and the form is dirty
4. Add name attribute to the first input in the form. The name of the input should be `titleInput` (note that you will use this name in order to refer to the input in the form validation logic).
5. Create two-way data binding between the input with name `titleInput` and `todo.title`.
6. State that the title of the input is `required` by using the appropriate HTML5 attribute.
7. To the second `span.error` add `ng-show` attribute with condition equivalent to:
  - show the element if the required rule of the `descriptionInput` is violated and the `descriptionInput` is dirty
8. To the third `span.error` add `ng-show` attribute with the condition equivalent to:
  - show the element if the `minlength` rule of the `descriptionInput` is violated and the `descriptionInput` is dirty
9. To the textarea add name equals to `descriptionInput` (it will be used during the form validation).
10. Add the following validation rules to `descriptionInput`:
  - it should be required
  - it should not be less than 10 symbols (use AngularJS specific attribute).
11. Bind the `descriptionInput` to `todo.description`.
12. Add `ng-click` property to the form button, which invokes the `saveData` method attached to the scope.
13. Add `ng-disabled` attribute to the button, which makes the button disabled when the form is invalid.


## Partials

### todos.html

1. Add `ng-hide` attribute to the first paragraph. It should make the paragraph visible once there are no todo items in the exposed `todos` collection.
2. Add `ng-show` attribute to the unordered list. It should make the paragraph visible once there are todo items in the exposed `todos` collection.
3. On change of the checkbox invoke the `updateState` method, attached to the scope. As single argument `updateState` accepts the current todo.
4. In the bottom of the template add `href` to the link equals to: `#/add`.


### todo.html

1. Add appropriate bindings to the span elements associated with the different element properties.
2. Add `href` to the "Edit" link equals to: `#/edit/{{todo.id}}`.
3. Invoke the `remove` method, attached to the scope when the `Remove` button is clicked.

### edit.html

1. Add the `todo-form` directive in the bottom of the page. As value of the `todo` attribute pass the name of the `todo` instance attached to the scope. As value of the `save` property add call of the `update` method, attached to the scope.

### add.html

1. Add the `todo-form` directive in the bottom of the page. As value of the `todo` attribute pass the name of the `todo` instance attached to the scope. As value of the `save` property add call of the `save` method, attached to the scope.
