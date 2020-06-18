'use strict';

(function () {
  var SETUP_TOP_COORD = '80px';
  var SETUP_LEFT_COORD = '50%';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupUpload = setup.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && evt.target !== setupUserName) {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.style.top = SETUP_TOP_COORD;
    setup.style.left = SETUP_LEFT_COORD;
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  });

  // Перемещение окна диалога
  setupUpload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var setupCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: moveEvt.clientX - setupCoords.x,
        y: moveEvt.clientY - setupCoords.y,
      };

      setupCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = setup.offsetTop + shift.y + 'px';
      setup.style.left = setup.offsetLeft + shift.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          setupUpload.removeEventListener('click', onClickPreventDefault);
        };

        setupUpload.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
