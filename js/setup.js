'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardForm = document.querySelector('.setup-wizard-form');
  var setup = document.querySelector('.setup');
  var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');

  var setupCoatColor = setup.querySelector('input[name="coat-color"]');
  var setupEyesColor = setup.querySelector('input[name="eyes-color"]');
  var setupFireballColor = setup.querySelector('input[name="fireball-color"]');

  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupErrors = document.querySelector('.setup-errors');
  var fragment = document.createDocumentFragment();

  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizardElement = function (elem) {
    fragment.appendChild(elem);
  };

  var setWizardParameter = function (elem, prop, arr, input) {
    var i = 0;
    return function () {
      if (i === arr.length - 1) {
        i = 0;
      } else {
        i++;
      }
      elem.style[prop] = arr[i];
      input.value = arr[i];
    };
  };

  var successLoadHandler = function (wizards) {
    for (var i = 0; i < 4; i++) {
      var j = Math.floor(Math.random() * wizards.length);
      renderWizardElement(createWizardElement(wizards[j]));

      setupSimilarList.appendChild(fragment);
      setupSimilar.classList.remove('hidden');
    }
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

  setupWizardCoat.addEventListener('click', setWizardParameter(setupWizardCoat, 'fill', WIZARD_COAT_COLORS, setupCoatColor));
  setupWizardEyes.addEventListener('click', setWizardParameter(setupWizardEyes, 'fill', WIZARD_EYES_COLORS, setupEyesColor));
  setupFireball.addEventListener('click', setWizardParameter(setupFireball, 'background-color', WIZARD_FIREBALL_COLORS, setupFireballColor));

  // Загрузка и рендер похожих магов
  window.backend.load(successLoadHandler, errorXhrHandler);

  // Отправка данных формы на сервер
  wizardForm.addEventListener('submit', formSubmitHandler);
})();
