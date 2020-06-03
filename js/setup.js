'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var chooseRandomParameter = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createWizard = function () {
  return {
    name: chooseRandomParameter(NAMES) + ' ' + chooseRandomParameter(SURNAMES),
    coatColor: chooseRandomParameter(COAT_COLORS),
    eyesColor: chooseRandomParameter(EYES_COLORS)
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

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

setup.classList.remove('hidden');

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
