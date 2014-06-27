/* global module: false, require: false */

var Observer = require('./Observer'),
    fs = require('fs');

function LogObserver(config) {
  'use strict';
  this.config = config;
}

LogObserver.prototype = Object.create(Observer.prototype);

LogObserver.prototype.update = function (title, data) {
  'use strict';
  var content = new Date().toString() + ' ' + title + ' ' + data;
  fs.writeFileSync(this.config.path + '/' + Date.now() + '.txt', content);
};

module.exports = LogObserver;

