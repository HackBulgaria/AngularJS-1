GitHubStats.controller('UsersStatsCtrl', function ($scope, users) {
  'use strict';

  var userFollowers = users.map(function (user) {
    return {
      c: [{
        v: user.username
      }, {
        v: user.followers
      }]
    };
  });

  var userFollowing = users.map(function (user) {
    return {
      c: [{
        v: user.username
      }, {
        v: user.following
      }]
    };
  });

  var userRepos = users.map(function (user) {
    return {
      c: [{
        v: user.username
      }, {
        v: user.publicReposCount
      }]
    };
  });

  $scope.userFollowers = {
    'type': 'BarChart',
    'displayed': true,
    'data': {
      'cols': [
        {
          'id': 'user',
          'label': 'User',
          'type': 'string',
          'p': {}
        },
        {
          'id': 'followers',
          'label': 'Followers',
          'type': 'number',
          'p': {}
        }
      ],
      'rows': userFollowers,
    },
    'options': {
      'title': 'Followers per user',
      'fill': 20,
      'displayExactValues': true,
      'vAxis': {
        'title': 'Users',
        'gridlines': {
          'count': 10
        }
      },
      'hAxis': {
        'title': 'Followers'
      }
    },
    'formatters': {}
  };

  $scope.userFollowing = {
    'type': 'ColumnChart',
    'displayed': true,
    'data': {
      'cols': [
        {
          'id': 'user',
          'label': 'User',
          'type': 'string',
          'p': {}
        },
        {
          'id': 'following',
          'label': 'Following',
          'type': 'number',
          'p': {}
        }
      ],
      'rows': userFollowing,
    },
    'options': {
      'title': 'User following',
      'fill': 10,
      'displayExactValues': true,
      'vAxis': {
        'title': 'Users',
        'gridlines': {
          'count': 5
        }
      },
      'hAxis': {
        'title': 'Following'
      }
    },
    'formatters': {}
  };

  $scope.userRepos = {
    'type': 'BarChart',
    'displayed': true,
    'data': {
      'cols': [
        {
          'id': 'user',
          'label': 'User',
          'type': 'string',
          'p': {}
        },
        {
          'id': 'repos',
          'label': 'Repositories',
          'type': 'number',
          'p': {}
        }
      ],
      'rows': userRepos,
    },
    'options': {
      'title': 'User repos count',
      'fill': 20,
      'displayExactValues': true,
      'vAxis': {
        'title': 'Users',
        'gridlines': {
          'count': 10
        }
      },
      'hAxis': {
        'title': 'Repos count'
      }
    },
    'formatters': {}
  };

});
