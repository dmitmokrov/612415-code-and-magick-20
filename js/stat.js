'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var CLOUD_GAP_X = 10;
var CLOUD_GAP_Y = 20;

var FONT_GAP = 20;
var TIME_GAP = 10;

var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;

var FIRST_PLAYER_NAME_X = 110;
var FIRST_PLAYER_NAME_Y = 270;

var FIRST_PLAYER_BAR_X = 110;
var FIRST_PLAYER_BAR_Y = 100;

var STEP = 50;
var BAR_GAP = BAR_WIDTH + STEP;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP_X, CLOUD_Y + CLOUD_GAP_X, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';

  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_GAP_X, CLOUD_Y + CLOUD_GAP_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_GAP_X, CLOUD_Y + CLOUD_GAP_Y + 2 * FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(Math.round(times[i]), FIRST_PLAYER_NAME_X + i * BAR_GAP, FIRST_PLAYER_BAR_Y + BAR_MAX_HEIGHT * (1 - (times[i] / maxTime)) - TIME_GAP);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.floor(Math.random() * 101) + '%, 50%)';
    ctx.fillRect(FIRST_PLAYER_BAR_X + i * BAR_GAP, FIRST_PLAYER_BAR_Y + BAR_MAX_HEIGHT * (1 - (times[i] / maxTime)), BAR_WIDTH, BAR_MAX_HEIGHT * times[i] / maxTime);

    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], FIRST_PLAYER_NAME_X + i * BAR_GAP, FIRST_PLAYER_NAME_Y);
  }
};
