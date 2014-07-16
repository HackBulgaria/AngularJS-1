## $sce (Strict Contextual Escaping)

```html
<input type="text" ng-model="userHtml">
<div ng-bind-html="htmlValue"></div>
```

```javascript
module.controller('MainCtrl', function ($scope, $sce) {
  $scope.$watch('userHtml', function (val) {
    $scope.htmlValue = $sce.trustAsHtml(val);
  });
});
```
