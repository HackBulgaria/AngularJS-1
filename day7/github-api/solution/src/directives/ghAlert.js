GitHubStats.directive('ghAlert', function ($timeout, $rootScope) {
  return {
    scope: {},
    template: '<div class="alert alert-danger" role="alert" ng-bind="message"></div>',
    replace: true,
    link: function (scope, el, attrs) {
      el = $(el);
      $rootScope.$on('$routeChangeStart', function () {
        el.hide();
      });
      el.hide();
      $rootScope.$on('error', function (msg, data) {
        scope.message = data;
        el.fadeIn(100);
        $timeout(function () {
          el.fadeOut(100);
        }, 4000);
      });
    }
  };
});
