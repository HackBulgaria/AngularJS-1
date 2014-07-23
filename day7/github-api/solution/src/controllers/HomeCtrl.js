GitHubStats.controller('HomeCtrl', function ($scope, User) {
  $scope.users = User.getUsernames();
  $scope.add = function () {
    User.addUsername($scope.currentUser);
  };
  $scope.remove = function (username) {
    User.removeUsername(username);
  };
});
