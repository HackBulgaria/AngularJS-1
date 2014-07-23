GitHubStats.factory('Repo',
  function (GITHUB_API, CachableModel, $cacheFactory) {

  var REPO_SUFFIX = 'repos',
      REPO_PREFIX = 'users',
      cache = $cacheFactory('repos');

  function Repo(config) {
    this.name = config.name;
    this.createdAt = config.created_at;
    this.forksCount = config.forks_count;
    this.language = config.language;
    this.starsCount = config.stargazers_count;
    this.url = config.url;
    this.fork = config.fork;
    this.htmlUrl = config.html_url;
    CachableModel.call(this);
  }

  Repo.getAllForUser = function (username) {
    return CachableModel.get.call(this, {
        url: GITHUB_API + '/' + REPO_PREFIX +
        '/{{username}}/' + REPO_SUFFIX,
        context: { username: username },
        isArray: true,
        constructor: Repo
      });
  };

  Repo.get = function (username, repo) {
    return Repo.getAllForUser(username)
      .then(function (repos) {
        return repos.filter(function (r) {
          return r.name === repo;
        }).pop();
      });
  };

  return Repo;
});
