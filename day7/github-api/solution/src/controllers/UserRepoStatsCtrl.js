GitHubStats.controller('UserRepoStatsCtrl', function ($scope, repos) {
  var stars = repos.filter(function (repo) {
    return repo.starsCount >= 100;
  }).map(function (repo) {
    return {
      c: [{
        v: repo.name
      }, {
        v: repo.starsCount
      }]
    };
  });

  var reposCount = {};

  repos.forEach(function (repo) {
    var l = repo.language;
    reposCount[l] = reposCount[l] || 0;
    reposCount[l] += 1;
  });

  var reposLangCount =
    Object.keys(reposCount)
    .map(function (l) {
      return {
        c: [{
          v: l
        }, {
          v: reposCount[l]
        }]
      };
    });

  $scope.languageStats = {
    'type': 'PieChart',
    'displayed': true,
    'data': {
      'cols': [
        {
          'id': 'lang',
          'label': 'Language',
          'type': 'string',
          'p': {}
        },
        {
          'id': 'count',
          'label': 'Count',
          'type': 'number',
          'p': {}
        }
      ],
      'rows': reposLangCount,
    },
    'options': {
      'title': 'Repos per language',
      'fill': 20,
      'displayExactValues': true,
      'vAxis': {
        'title': 'Users',
        'gridlines': {
          'count': 10
        }
      },
      'hAxis': {
        'title': 'Count'
      }
    },
    'formatters': {}
  };

  $scope.starsStats = {
    'type': 'BarChart',
    'displayed': true,
    'data': {
      'cols': [
        {
          'id': 'repo',
          'label': 'Repo',
          'type': 'string',
          'p': {}
        },
        {
          'id': 'stars',
          'label': 'Stargazers',
          'type': 'number',
          'p': {}
        }
      ],
      'rows': stars,
    },
    'options': {
      'title': 'Stars per repo',
      'fill': 20,
      'displayExactValues': true,
      'vAxis': {
        'title': 'Users',
        'gridlines': {
          'count': 10
        }
      },
      'hAxis': {
        'title': 'Stargazers'
      }
    },
    'formatters': {}
  };
});
