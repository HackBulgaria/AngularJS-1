# Promises

In this exercise we are going to create simple implementation of limited scope of the API of Kris Kowal's Q.

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
4. Add constructor function called `Deferred`. It should initialize a single property called `promise`, equals to `new Promise()`.
5. Add the following methods to the prototype:
  * `resolve(data)` - it throws an error if the promise is not in "clean" state, otherwise it sets the promise state to `RESOLVED`, sets the resolved data (`data`) and invokes each of the promise's done callbacks with the data passed as argument.
  * `reject(data)` - it throws an error if the promise is not in "clean" state, otherwise it sets the promise state to `REJECTED`, sets the rejected data (`data`) and invokes each of the promise's fail callbacks with the data passed as argument.
6. Define object literal called `Q`. It should has the following methods:
  * `defer` returns new deferred object.
  * `all` - accepts a list of promises and returns a new promise. The new promise would be resolved once all deferreds passed as arguments are being resolved.
  * `when(data)` - the method creates new deferred object, returns its promise and resolves the deferred object with the passed data.

