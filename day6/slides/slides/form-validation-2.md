## Form validation

```
<form novalidate ng-app name="myForm">

<div class="error-message" ng-show="myForm.username.$dirty && myForm.username.$error.required">
  The username is required
</div>
<div class="error-message" ng-show="myForm.username.$error.maxlength">
  The username should not be more than 15 symbols
</div>
<label for="username">User</label>
<input type="text" name="username" ng-model="username"
  ng-maxlength="15" required>
<div class="error-message" ng-show="myForm.password.$error.pattern">
  The password should containing at least 8 characters, 1 number, 1 upper and 1 lowercase
</div>
<label for="password">Password</label>
<input type="password" name="password" ng-model="password"
  required ng-pattern="/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/">
</form>
```
