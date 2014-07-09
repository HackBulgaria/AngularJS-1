# TODO app

In this exercise we are going to create a simple TODO application with the following functionality:

* Add TODO items
* List TODO items
* Complete TODO items
* Remove TODO items

## Directives

* Automatically bootstrap the AngularJS application using the appropriate directive
* Associate controller called `TodoCtrl` with the body element
* Bind the text input to appropriate view-model, which will be later used for the value of the title of the new todos.
* Set appropriate expression to be executed when the "Add" button is pressed
* List all todo items by iterating over collection called `todos`
* Show the title of each todo item inside the span element, child of the list item
* Create two-way data binding between the checkbox (child of the list item) and the `completed` property of the current todo item
* Depending on the value of the `completed` property of the current todo item add "completed" or "non-completed" CSS class to the span.
* Add appropriate expression to the `Delete` link (note that you can use the `$index` property since it is local for the new scope created by `ng-repeat`).

## TodoCtrl

* Create file `/src/TodoCtrl.js`
* Create a global function called `TodoCtrl`
* Require `$scope` as dependency of the controller
* Attach empty array called `todos` to the scope
* Add method called `add` to the scope, which adds new object literal to the `todos` array with appropriate `title` and `completed`. The `title` property should accept the value of the current todo item, while the value of the `completed` property should be `false`.
* Add method called `remove`, which accepts index and removes the element with the specified index from the `todos` array
