/* global Filter */

// Solution 1

//function BWFilter() {
//  'use strict';
//  Filter.apply(this, arguments);
//}
//
// Classical inheritance, you can check out
// https://stackoverflow.com/questions/19633762/classical-inheritance-vs-protoypal-inheritance-in-javascript
//
//BWFilter.prototype = Object.create(Filter.prototype);
//
// Overriding the filter! This is important because otherwise it is going
// to throw new Error("Not implemented");
//
//BWFilter.prototype.applyFilter = function (data, current) {
//  'use strict';
//  var r = data[current],
//      g = data[current + 1],
//      b = data[current + 2],
//      v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
//  data[current] = data[current + 1] = data[current + 2] = v;
//};



// Solution 2


// Object.create creates new object with prototype the prototype of Filter
// this allows us to change BWFilter without changing the prototype
// of Filter.
//
//var BWFilter = Object.create(Filter.prototype);
//
//BWFilter.init = function () {
//  'use strict';
//  Filter.apply(this, arguments);
//  return this;
//};
//
//BWFilter.applyFilter = function (data, current) {
//  'use strict';
//  var r = data[current],
//      g = data[current + 1],
//      b = data[current + 2],
//      v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
//  data[current] = data[current + 1] = data[current + 2] = v;
//};


// Solution 3

var BWFilter = (function () {
  'use strict';


  // We define applyFilter in the lexical scope (https://en.wikipedia.org/wiki/Scope_(computer_science))
  // of the anonymous function (IIFE).
  // after that we "export" (simply return) object with methods applyFilter and init.
  function applyFilter(data, current) {
    var r = data[current],
        g = data[current + 1],
        b = data[current + 2],
        v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    data[current] = data[current + 1] = data[current + 2] = v;
  }

  return {
    applyFilter: applyFilter,
    init: function () {
      Filter.apply(this, arguments);
      return this;
    }
  };
}());


// We use this call to set the prototype of the returned object
// This works in the modern browsers supporting ES5
Object.setPrototypeOf(BWFilter, Filter.prototype);
