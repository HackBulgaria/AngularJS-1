## Unit testing with Jasmine and Karma

In this exercise we are going to write tests for our `TodoCtrl` and `Todo` service.

1. Initialize karma by running: `karma init`
  - Use jasmine
  - Do not use require.js
  - Use Chrome for running the tests
  - Choose the appropriate directories to be watched by karma
  - Karma should watch all files and run the tests on change

2. In `/test/unit/controllers/` add file called `TodoCtrl.spec.js` and test the controller using the examples from the lecture and the AngularJS documentation.
  - Test whether the controller exists
  - Test whether the controller attach the appropriate properties to the scope
  - Test whether once invoked, the methods attached to the scope call the appropriate methods of  the`TodoCtrl` dependencies (use spy).
  - Test whether the dependencies of the `TodoCtrl` are invoked with the appropriate parameters

3. In `/test/unit/services/` add file called `Todo.spec.js` and test the service
  - Test whether the service is a function
  - Test whether it has all required methods
  - Test whether the methods work as expected (using mocked version of `$httpBackend`).