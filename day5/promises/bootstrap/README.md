# Promises

**NOTE** the promise is simplified version of Q. It doesn't support chaining and the rest of the interface is not fully backward compatible with Kris Kowal's Q.

In this exercise we are going to create a simple implementation of limited scope of the API of Kris Kowal's Q.

1. Define "enum" (object with numeric values) called `STATES`. It should has the following properties:
  * `CLEAN`
  * `RESOLVED`
  * `REJECTED`
2. Define a constructor function called `Promise`. It should add the following properties to the instances created with it:
  * `_done` - an empty array
  * `_fail` - an empty array
  * `_state` - initial value `STATES.CLEAN`
  * `_resolveData` - initial value null
  * `_rejectData` - initial value null
3. Add the following methods to the `Promise`'s prototype:
  * `done` - accepts a callback and add it to the `_done` array. If the current state of the promise is `RESOLVED` it invokes the callback with the `_resolvedData`.
  * `fail` - accepts a callback and add it to the `_fail` array. If the current state of the promise is `REJECTED` it invokes the callback with the `_rejectData`.
4. Define a constructor function called `Deferred`. It should initialize a single property called `promise`, equals to `new Promise()`.
5. Add the following methods to the prototype of `Deferred`:
  * `resolve(data)` - it throws an error if the promise is not in "clean" state, otherwise it sets the promise state to `RESOLVED`, sets the resolved data (`_resolvedData`) and invokes each of the promise's done callbacks with the data passed as argument.
  * `reject(data)` - it throws an error if the promise is not in "clean" state, otherwise it sets the promise state to `REJECTED`, sets the rejected data (`_rejectData`) and invokes each of the promise's fail callbacks with the data passed as argument.
6. Define object literal called `Q`. It should has the following methods:
  * `defer` returns new deferred object.
  * `all` - accepts a list of promises and returns a new promise. The new promise would be resolved once all promises passed as arguments are resolved.
  * `when(data)` - the method creates new deferred object, returns its promise and resolves the deferred object with the passed data.

In order to test your implementation run the sample form-validation app.

1. run `bower install`
2. Start a static http server
3. Open the app in your browser

When you start filling the form you should get validation errors each time you fill the input with invalid value (the border of the input should get red).
Once all fields are filled successfully you should get proper log statement in the browser's console.
