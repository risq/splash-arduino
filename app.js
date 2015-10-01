var io = require('socket.io-client');
var serveStatic = require('node-static');

var config = require('./config');
var arduino = require('./server/arduino');

var file = new serveStatic.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(config.staticFilesPort);

arduino.init();

var socket = io(config.socketServerUrl);

socket.on('connected', function() {
  console.log('connected');
  socket.emit('register arduino');
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
