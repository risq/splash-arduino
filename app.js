var five = require("johnny-five");
var board = new five.Board();
var servo, slider;

board.on("ready", function() {

  var scalingRange = [0, 170]

  servo = {
    nw: new five.Servo({
      pin: 10,
      range: scalingRange
    }),
    ne: new five.Servo({
      pin: 11,
      range: scalingRange
    }),
    sw: new five.Servo({
      pin: 12,
      range: scalingRange
    }),
    se: new five.Servo({
      pin: 13,
      range: scalingRange
    }),
  }

  slider = new five.Sensor({
    pin: "A0",
    freq: 50
  });

  // slider.scale(scalingRange).on("slide", function(err, value) {
  //   console.log(value);
  //   servo.nw.to(Math.floor(this.value));
  //   servo.ne.to(Math.floor(this.value));
  //   servo.sw.to(Math.floor(this.value));
  //   servo.se.to(Math.floor(this.value));
  //
  // });

  var t = false;
  setInterval(function() {
    t = !t;
    if (t) {
      servo.nw.to(180);
      servo.ne.to(0);
      servo.sw.to(0);
      servo.se.to(180);
    } else {
      servo.nw.to(0);
      servo.ne.to(180);
      servo.sw.to(180);
      servo.se.to(0);
    }
  }, 2000)
});
