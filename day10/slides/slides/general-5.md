
* One more slight variation of both directory structures is the one used in [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home). In it, the unit tests for a given component are put in the folder where the component is located. This way when you make changes to a given component finding its test is easy. The tests also act as documentation and show use cases.

```
services
├── cache
│   ├── cache1.js
│   └── cache1.spec.js
└── models
    ├── model1.js
    └── model1.spec.js
```
