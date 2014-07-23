GitHubStats.controller('HeaderCtrl', function ($scope) {
  $scope.$on('$routeChangeStart', function () {
    $scope.loading = true;
  });
  $scope.$on('$routeChangeSuccess', function () {
    $scope.loading = false;
  });
  $scope.$on('$routeChangeError', function () {
    $scope.loading = false;
  });
});
