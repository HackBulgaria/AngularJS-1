/* global Video, document, BWFilter */

var vid = new Video(document.getElementById('video'),
      document.getElementById('canvas'));

// Add the filter in order to apply
// it when the video is being drawn onto the canvas
vid.addFilter(BWFilter.init('grayscale'));
vid.start();
