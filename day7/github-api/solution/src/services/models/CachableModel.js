GitHubStats.factory('CachableModel', function ($interpolate, $cacheFactory, $q, req) {
  'use strict';

  var cache = {};

  function CachableModel() {
  }

  CachableModel.get = function (config) {
    var url = $interpolate(config.url)(config.context);
    cache[config.url] = cache[config.url] || $cacheFactory(config.url);
    var currentCache = cache[config.url];
    var cached = currentCache.get(url);
    if (cached) {
      return $q.when(cached);
    } else {
      return req.get(url)
        .then(function (res) {
          var obj;
          if (config.isArray) {
            obj = res.data.map(function (d) {
              return new config.constructor(d);
            });
          } else {
            obj = new config.constructor(res.data);
          }
          currentCache.put(url, obj);
          return obj;
        });
    }
  };

  return CachableModel;
});
