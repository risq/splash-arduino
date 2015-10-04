var five = require('johnny-five');
var plane = require('./plane');
var config = require('../config');

var state = 'waiting';
var board, paintMotor;

module.exports = {
  init: function() {
    if (config.arduino) {
      board = new five.Board();
      board.on('ready', this.onBoardReady);
    }
  },

  onBoardReady: function() {
    console.log('OK')
    plane.init();
    paintMotor = new five.Servo({
      pin: 9,
      range: [80,170]
    });
    this.repl.inject({
      paint: paintMotor
    });
    state = 'ready';
  },

  applyRotation: function(gamma, beta) {
    if (state === 'ready') {
      plane.applyRotation(gamma, beta)
    }
  },

  paintStart: function() {
    if (state === 'ready') {
      paintMotor.min(750);
    }
  },

  paintStop: function() {
    if (state === 'ready') {
      paintMotor.max(500);
    }
  }
}
