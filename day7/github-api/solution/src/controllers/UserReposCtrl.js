GitHubStats.controller('UserReposCtrl', function ($location, $scope, repos, user) {
  $scope.gridOptions =
    { data: 'repos',
      beforeSelectionChange: function (row) {
        $location.path($location.path() + '/' + row.entity.name);
      },
      columnDefs: [
        { field: 'name', displayName: 'Name' },
        { field: 'starsCount', displayName: 'Stargazers' },
        { field: 'createdAt', displayName: 'Created at' }
      ]
    };
  $scope.repos = repos;
  $scope.user = user;
});
