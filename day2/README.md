# Before the class

1. [AngularJS developers guide (bootstrap, compiler, conceptual overview, controllers, data binding, DI, directives, expressions, providers, scopes, services, templates)](https://docs.angularjs.org/guide)

# Homework

1. Implement the rest of the framework, if you didn't during classes.
2. Implement TODO app using the framework, if you didn't during classes.
3. Implement filters and make the `$eval` service work with complex expressions.
4. Add methods `$broadcast`, `$emit` and `$on` in the scope's prototype. `$on` accepts a string (topic) as first argument and a function (callback) as second argument. Once it is being called it should register new observer (the callback) associated with the current topic. `$broadcast` and `$emit` accept topic as first argument and any data as second argument. Once `$broadcast` is being called it should invoke all callbacks associated in the topic, registered in the current scope. `$broadcast` should propagate its call to all children of the current scope, their children and so on. `$emit` should behave similarly but instead of propagating the event downwards through the scope chain, it should propagate the event upwards - to all parent scopes of the current one.
Note that the first argument of each callback should be an object with the following properties:

- `topic` - topic of the event
- `stopPropagation` - a boolean flag, which when set to `false` will stop the event propagation

The second argument of the callbacks should be the data passed to `$broadcast` or `$emit`.

In step 4. you're going to implement "Chain of Responsibilities", for further information check the following [wiki article](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern).
