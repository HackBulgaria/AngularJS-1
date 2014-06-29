## Bootstrap

Requires `ng-app` attribute to the root of the application. The value of this attribute should be a module name.

* Starts on DOMContentLoaded (or immediately if document.readyStateChange === 4).
* Load the module associated with `ng-app`
* Create `injector`
* Compile the DOM tree associated with `ng-app`
