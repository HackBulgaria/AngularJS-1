# Simple TODO app

Create a new bower project.

Install AngularJS and include a reference to `angular.js` inside `index.html`.

Bootstrap the AngularJS application by adding attribute `ng-app` to the base element of the application.

In order to initialize a list of todo items use the attribute `ng-init` with appropriate expression.

Add a text field and bind it (`ng-model`) to a view-model, which will be used for filtering the todo item list.

Add a text field for adding new todo items. Bind it (`ng-model`) to a view-model, which will be later pushed to the end of the array containing all todo elements.

Add a add button with appropriate `ng-click` expression. When the expression is being executed the item, entered in the add new item text field, should be pushed in the end of the array with todo items. The content of the add new item text field should become empty.

Iterate over all items and populate a unordered list with all items in the todo list (`ng-repeat`).

Inside the content of each list item display "remove todo" button, which when pressed (`ng-click`) should execute an expression, which removes the current todo element (you can get it using the variable `$index`) from the todo list.

The content of the todo list item should also contains data in the following format: "ITEM_NAME is number $index".

