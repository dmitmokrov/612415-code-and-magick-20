'use strict';

window.util = (function () {
  var chooseRandomParameter = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  return {
    chooseRandomParameter: chooseRandomParameter
  };
})();
