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

var renderText = function (ctx, text, lineNumber) {
  ctx.fillText(text, CLOUD_X + CLOUD_GAP_X, CLOUD_Y + CLOUD_GAP_Y + lineNumber * FONT_GAP);
};

var renderBar = function (ctx, player, time, maxTime, index) {
  ctx.fillStyle = player === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.floor(Math.random() * 101) + '%, 50%)';
  ctx.fillRect(FIRST_PLAYER_BAR_X + index * BAR_GAP, FIRST_PLAYER_BAR_Y + BAR_MAX_HEIGHT * (1 - (time / maxTime)), BAR_WIDTH, BAR_MAX_HEIGHT * time / maxTime);
};

var renderTime = function (ctx, time, maxTime, index) {
  ctx.fillText(Math.round(time), FIRST_PLAYER_NAME_X + index * BAR_GAP, FIRST_PLAYER_BAR_Y + BAR_MAX_HEIGHT * (1 - (time / maxTime)) - TIME_GAP);
};

var renderName = function (ctx, player, index) {
  ctx.fillStyle = '#000000';
  ctx.fillText(player, FIRST_PLAYER_NAME_X + index * BAR_GAP, FIRST_PLAYER_NAME_Y);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP_X, CLOUD_Y + CLOUD_GAP_X, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';

  renderText(ctx, 'Ура вы победили!', 1);
  renderText(ctx, 'Список результатов:', 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    renderTime(ctx, times[i], maxTime, i);
    renderBar(ctx, players[i], times[i], maxTime, i);
    renderName(ctx, players[i], i);
  }
};
