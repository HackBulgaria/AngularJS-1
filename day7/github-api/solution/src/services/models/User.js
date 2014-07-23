GitHubStats.factory('User',
  function (GITHUB_API, CachableModel, storage, $q, $cacheFactory, Repo) {
  'use strict';

  var USERS_PREFIX = 'users',
      cache = $cacheFactory('users'),
      usernamesList = storage.get('users') || [];

  function User(config) {
    this.username = config.login;
    this.avatarUrl = config.avatar_url;
    this.createdAt = config.created_at;
    this.followers = config.followers;
    this.following = config.following;
    this.publicReposCount = config.public_repos;
    this.type = config.type;
    this.htmlUrl = config.html_url;
    Object.defineProperty(this, 'repos', {
      get: function () {
        return Repo.getAllForUser(this.username);
      }.bind(this)
    });
    CachableModel.call(this);
  }

  User.getUsernames = function () {
    return usernamesList;
  };

  User.addUsername = function (username) {
    usernamesList.push(username);
    storage.put('users', usernamesList);
  };

  User.removeUsername = function (username) {
    usernamesList.splice(usernamesList.indexOf(username), 1);
    storage.put('users', usernamesList);
  };

  User.all = function () {
    return $q.all(usernamesList.map(function (user) {
      return User.get(user);
    }));
  };

  User.get = function (username) {
    return CachableModel.get.call(this, {
        url: GITHUB_API + '/' + USERS_PREFIX + '/{{username}}',
        context: { username: username },
        isArray: false,
        constructor: User
      });
  };

  User.prototype = Object.create(CachableModel.prototype);

  return User;
});
