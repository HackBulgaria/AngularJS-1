## Directives

- `require` - requires directive(s) on the same element. If such directives are found their controller is passed as fourth argument of the linking function, if no directives are found an error is raised.
- `controller` - Controller constructor function. The controller is instantiated before the pre-linking phase and it is shared with other directives (see require attribute). This allows the directives to communicate with each other and augment each other's behavior.
