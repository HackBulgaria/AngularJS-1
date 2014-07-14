/* global TodoApp */
TodoApp.config(function ($provide) {
  'use strict';
  $provide.decorator('storage', function ($delegate, $log) {
    var oldPut = $delegate.put;
    $delegate.put = function (key, value) {
      $log.log('Storing data in key', key, 'with value', value);
      oldPut.apply($delegate, arguments);
    };
    return $delegate;
  });
});

