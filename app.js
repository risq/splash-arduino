var io = require('socket.io-client');

var arduino = require('./server/arduino');

arduino.init();

var socket = io('http://192.168.31.92:5000');

socket.on('connected', function() {
  console.log('connected');
  socket.emit('arduino');
});

socket.on('orientation', function(data) {
  // console.log('orientation', data);
  arduino.applyRotation(data.gamma, data.beta);
});

socket.on('paint start', function() {
  // console.log('paint start');
  arduino.paintStart();
});

socket.on('paint stop', function() {
  // console.log('paint stop');
  arduino.paintStop();
});
