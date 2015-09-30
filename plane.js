var five = require('johnny-five');

var state = 'waiting';
var scalingRange = [0, 170]
var servos = {};

module.exports = {
  init: function() {
    servos = {
      nw: new five.Servo({
        pin: 10,
        range: scalingRange
      }),
      ne: new five.Servo({
        pin: 12,
        range: scalingRange
      }),
      sw: new five.Servo({
        pin: 11,
        range: scalingRange
      }),
      se: new five.Servo({
        pin: 13,
        range: scalingRange
      }),
    }
    state = 'ready';
  },

  applyRotation: function(gamma, beta) {
    if (state === 'ready') {
      var fixedBeta = beta * 3 > 90 ? 90 : beta * 3 < -90 ? -90 : beta * 3;
      var fixedGamma = gamma * 3 > 90 ? 90 : gamma * 3 < -90 ? -90 : gamma * 3;
      var xAxis = (fixedBeta * 1 / 90);
      var yAxis = (fixedGamma * 1 / 90);
      servos.nw.to(this.rotationToServoValue(xAxis + yAxis));
      servos.ne.to(this.rotationToServoValue(xAxis - yAxis));
      servos.sw.to(this.rotationToServoValue(- xAxis + yAxis));
      servos.se.to(this.rotationToServoValue(- xAxis - yAxis));
    }
  },

  rotationToServoValue: function(value) {
    return value * (scalingRange[1] / 2) + (scalingRange[1] / 2);
  }
}
