* Use promises (`$q`) instead of callbacks. It will make your code look more elegant and clean, and save you from callback hell.
* Use `$resource` instead of `$http` when possible. The higher level of abstraction will save you from redundancy.
* Use an AngularJS pre-minifier (like [ngmin](https://github.com/btford/ngmin) or [ng-annotate](https://github.com/olov/ng-annotate)) for preventing problems after minification.
* Don't use globals. Resolve all dependencies using Dependency Injection.
* Do not pollute your `$scope`. Only add functions and variables that are being used in the templates.
* Prefer the usage of [controllers instead of `ngInit`](https://github.com/angular/angular.js/pull/4366/files). The only appropriate use of `ngInit` is for aliasing special properties of `ngRepeat`. Besides this case, you should use controllers rather than `ngInit` to initialize values on a scope.
