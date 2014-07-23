var GitHubStats = angular.module('github.stats', ['ngRoute', 'utils', 'ngGrid', 'googlechart']);

angular.module('utils', []);

GitHubStats.constant('GITHUB_API', 'https://api.github.com');

GitHubStats.config(function ($routeProvider, $httpProvider) {

  $httpProvider.interceptors.push(function (GITHUB_API) {
    var regexp = new RegExp(GITHUB_API);
    return {
      request: function (config) {
        if (regexp.test(config.url)) {
          config.params = config.params || {};
          config.params.client_id = '8f3b8d572129632cf422';
          config.params.client_secret = 'f0669941c23378c30fb89f6c37be9075a5628bba';
        }
        return config;
      }
    };
  });

  $routeProvider
    .when('/home', {
      controller: 'HomeCtrl',
      templateUrl: 'partials/home.html'
    })
    .when('/users/:username', {
      controller: 'UserCtrl',
      templateUrl: 'partials/user.html',
      resolve: {
        user: function (User, $route) {
          return User.get($route.current.params.username);
        }
      }
    })
    .when('/repos/:username', {
      controller: 'UserReposCtrl',
      templateUrl: 'partials/user-repos.html',
      resolve: {
        repos: function (User, $route) {
          return User.get($route.current.params.username)
                .then(function (user) {
                  return user.repos;
                });
        },
        user: function (User, $route) {
          return User.get($route.current.params.username);
        }
      }
    })
    .when('/repos/:username/:repository', {
      controller: 'RepoCtrl',
      templateUrl: 'partials/repo.html',
      resolve: {
        repo: function (Repo, $route) {
          return Repo.get($route.current.params.username,
                          $route.current.params.repository);
        },
        user: function (User, $route) {
          return User.get($route.current.params.username);
        }
      }
    })
    .when('/stats/users', {
      controller: 'UsersStatsCtrl',
      templateUrl: 'partials/users-stats.html',
      resolve: {
        users: function (User) {
          return User.all();
        }
      }
    })
    .when('/stats/users/:username', {
      controller: 'UserRepoStatsCtrl',
      templateUrl: 'partials/user-repo-stats.html',
      resolve: {
        repos: function (User, $route) {
          return User.get($route.current.params.username)
                .then(function (user) {
                  return user.repos;
                });
        }
      }
    })
    .otherwise({ redirectTo: '/home' });
});
