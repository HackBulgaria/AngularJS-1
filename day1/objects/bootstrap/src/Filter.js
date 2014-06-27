function Filter(id) {
  'use strict';
  this.id = id;
}

Filter.prototype.filter = function (canvas) {
  'use strict';
  var ctx = canvas.getContext('2d'),
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height),
      data = imgData.data;
  for (var i = 0; i < data.length; i += 4) {
    this.applyFilter(data, i, canvas);
  }
  ctx.putImageData(imgData, 0, 0);
};

Filter.prototype.applyFilter = function () {
  'use strict';
  throw new Error('Not implemented');
};
