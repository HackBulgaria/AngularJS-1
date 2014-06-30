/* global jQuery */

var pubsub = {};

(function (ps, $) {
   // ps is equals to pubsub, defined outside the IIFE
  'use strict';

  var temp = $({});

  // temp is simple object wrapped with jQuery

  ps.publish = function (evnt, data) {
    temp.trigger(evnt, data);
  };
  ps.subscibe = function (evnt, fn) {
    temp.on(evnt, fn);
  };
}(pubsub, jQuery));
