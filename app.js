var five = require('johnny-five');
var io = require('socket.io-client');

var plane = require('./plane.js');

var board = new five.Board();
var servo, slider;

var socket = io('http://192.168.31.92:5000');

socket.on('connected', function() {
  console.log('connected');
  socket.emit('arduino');
});

socket.on('orientation', function(data) {
  console.log('orientation', data);
  plane.applyRotation(data.gamma, data.beta);
});

board.on("ready", function() {
  plane.init();
});
