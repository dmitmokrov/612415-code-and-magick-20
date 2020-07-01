'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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

  window.render = function (wizards) {
    var takeNumber = wizards.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : wizards.length;

    setupSimilarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      renderWizardElement(createWizardElement(wizards[i]));

      setupSimilarList.appendChild(fragment);
      setupSimilar.classList.remove('hidden');
    }
  };
})();
