'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
  var fragment = document.createDocumentFragment();

  var createWizard = function () {
    return {
      name: window.util.chooseRandomParameter(NAMES) + ' ' + window.util.chooseRandomParameter(SURNAMES),
      coatColor: window.util.chooseRandomParameter(COAT_COLORS),
      eyesColor: window.util.chooseRandomParameter(EYES_COLORS)
    };
  };

  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
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

  setupWizardCoat.addEventListener('click', setWizardParameter(setupWizardCoat, 'fill', WIZARD_COAT_COLORS, setupCoatColor));
  setupWizardEyes.addEventListener('click', setWizardParameter(setupWizardEyes, 'fill', WIZARD_EYES_COLORS, setupEyesColor));
  setupFireball.addEventListener('click', setWizardParameter(setupFireball, 'background-color', WIZARD_FIREBALL_COLORS, setupFireballColor));

  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var randomWizard = createWizard();
    wizards.push(randomWizard);
  }

  for (var j = 0; j < 4; j++) {
    renderWizardElement(createWizardElement(wizards[j]));
  }

  setupSimilarList.appendChild(fragment);
  setupSimilar.classList.remove('hidden');
})();
