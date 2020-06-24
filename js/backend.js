'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/code-and-magick';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT_IN_MS;

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка заклинания: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT_IN_MS;

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad();
        } else {
          onError('Ошибка заклинания: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
