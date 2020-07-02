'use strict';

(function () {
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

  var wizard = {
    onCoatChange: function () {},
    onEyesChange: function () {}
  };

  var getRandomElement = function (arr) {
    var randomArrIndex = Math.floor(Math.random() * arr.length);
    return arr[randomArrIndex];
  };

  setupWizardCoat.addEventListener('click', function () {
    var newColor = getRandomElement(WIZARD_COAT_COLORS);
    setupWizardCoat.style.fill = newColor;
    setupCoatColor.value = newColor;
    wizard.onCoatChange(newColor);
  });

  setupWizardEyes.addEventListener('click', function () {
    var newColor = getRandomElement(WIZARD_EYES_COLORS);
    setupWizardEyes.style.fill = newColor;
    setupEyesColor.value = newColor;
    wizard.onEyesChange(newColor);
  });

  setupFireball.addEventListener('click', function () {
    var newColor = getRandomElement(WIZARD_FIREBALL_COLORS);
    setupFireball.style.backgroundColor = newColor;
    setupFireballColor.value = newColor;
  });

  window.wizard = wizard;
})();
