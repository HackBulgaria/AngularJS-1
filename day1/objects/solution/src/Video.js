/* global navigator, document, URL,
alert, setInterval */

function Video(video, canvas) {
  'use strict';
  this.video = video;
  this.canvas = canvas;
  this.tempCanvas = document.createElement('canvas');
  this.tempCanvas.width = canvas.width;
  this.tempCanvas.height = canvas.height;
  this.tempCanvas.style.position = 'absolute';
  this.tempCanvas.style.left = -canvas.width + 'px';
  this.tempCanvas.style.top = -canvas.height + 'px';
  this.tempCanvas.style.visibility = 'hidden';
  document.body.appendChild(this.tempCanvas);
  this.filters = [];
}

Video.prototype.start = function () {
  'use strict';
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  var  self = this;
  navigator.getUserMedia({
    video: true
  }, function (stream) {
    self.video.src = URL.createObjectURL(stream);
    self.startRendering();
  }, function () {
    alert('Fail');
  });
};

Video.prototype.startRendering = function () {
  'use strict';
  var self = this;
  setInterval(function () {
    var ctx = self.tempCanvas.getContext('2d');
    ctx.drawImage(self.video, 0, 0);
    self.applyFilters(self.tempCanvas);
    self.canvas.getContext('2d').drawImage(self.tempCanvas, 0, 0);
  }, 100);
};

Video.prototype.addFilter = function (f) {
  'use strict';
  this.filters.push(f);
};

Video.prototype.applyFilters = function (canvas) {
  'use strict';
  this.filters.forEach(function (f) {
    f.filter(canvas);
  });
};
