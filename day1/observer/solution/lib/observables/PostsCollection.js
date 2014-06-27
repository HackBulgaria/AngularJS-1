/* global require: false, module: false */

var Observable = require('./Observable');

function PostsCollection() {
  'use strict';
  Observable.apply(this, arguments);
  this.posts = [];
}

PostsCollection.prototype = Object.create(Observable.prototype);

PostsCollection.prototype.addPost = function (title, content) {
  'use strict';
  this.posts.push({ title: title, content: content });
  this.update.apply(this, arguments);
};

module.exports = PostsCollection;

