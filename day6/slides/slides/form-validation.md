## Form validation

In order to use the form validation of AngularJS you MUST:

0. Use `novalidate` in order to prevent the default HTML5 validation
1. Set name of the form (this will create a property of the scope, named after the name you've used)
2. Use `ng-model` for each field you want to validate
3. Set name of each field you want to validate (this will create a property of the form property of your scope)
4. Set validation attributes
