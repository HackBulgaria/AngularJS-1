/* global require, module */

var Observable = require('./Observable');

function PostsCollection() {
  'use strict';
  // This is important step, if we skip it
  // this.update won't work, simply because we won't have
  // collection of observers.
  Observable.apply(this, arguments);
  this.posts = [];
}

// By using this line we add the methods defined for Observable
// to PostsCollection. (See the classical (kassical) inheritance pattern)
PostsCollection.prototype = Object.create(Observable.prototype);

PostsCollection.prototype.addPost = function (title, content) {
  'use strict';
  this.posts.push({ title: title, content: content });
  // Notify about the update
  this.update.apply(this, arguments);
};

module.exports = PostsCollection;

