var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connect', function(socket) {
    socket.on('position', function(position) {
        socket.broadcast.emit('draw', position);
    });
});

server.listen(process.env.PORT || 8080);