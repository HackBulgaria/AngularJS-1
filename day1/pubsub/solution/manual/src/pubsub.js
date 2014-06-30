// For details checkout
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
// And https://stackoverflow.com/questions/13512949/why-would-one-use-the-publish-subscribe-pattern-in-js-jquery/13513915#13513915

var pubsub = {};
(function (q) {
  'use strict';
  var topics = {};
  q.publish = function (topic, args) {
    if (!topics[topic]) {
      return false;
    }
    var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;
    while (len--) {
      subscribers[len].call(null, topic, args);
    }
    return this;
  };
  q.subscribe = function (topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push(func);
    return this;
  };
}(pubsub));
