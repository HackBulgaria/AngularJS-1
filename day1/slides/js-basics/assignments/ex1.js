Function.prototype.times = function (n) {
  if (n <= 0) {
    throw new TypeError('Invalid argument');
  }
  var fn = this;
  return function () {
    for (var i = 0; i < n; i += 1) {
      fn.call(null, arguments);
    }
  };
};


Array.prototype.unique = function () {
  var arr = this;
  return this.filter(function (el, idx) {
    return arr.lastIndexOf(el) === idx;
  });
};


Array.prototype.intersect = function (arr) {
  return this.filter(function (el, idx) {
    return arr.indexOf(el) >= 0;
  }).unique();
};