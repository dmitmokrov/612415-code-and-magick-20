'use strict';

(function () {
  var wizardForm = document.querySelector('.setup-wizard-form');

  var setup = document.querySelector('.setup');
  var setupErrors = document.querySelector('.setup-errors');

  var wizards = [];
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    }));
  };

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var successLoadHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorXhrHandler = function (err) {
    setupErrors.textContent = err;
    setupErrors.classList.remove('hidden');
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(wizardForm), function () {
      setup.classList.add('hidden');
    }, errorXhrHandler);
  };

  // Загрузка и рендер похожих магов
  window.backend.load(successLoadHandler, errorXhrHandler);

  // Отправка данных формы на сервер
  wizardForm.addEventListener('submit', formSubmitHandler);
})();
