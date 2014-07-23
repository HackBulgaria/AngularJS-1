/* global angular */

angular.module('utils').factory('req', function ($rootScope, $http, $q) {
  'use strict';
  return {
    get: function (url) {
      return $http.get(url)
      .catch(function (res) {
        $rootScope.$broadcast('error', res.data.message);
        return $q.reject(res.data.message);
      });
    }
  };
});
