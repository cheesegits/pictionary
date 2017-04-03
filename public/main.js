var pictionary = function() {

    var socket = io();

    var canvas, context, drawing;

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
            6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    canvas.on('mousemove', function(event) {
        var offset = canvas.offset();
        var position = {
            x: event.pageX - offset.left,
            y: event.pageY - offset.top
        };
        console.log(position);
        if (drawing == true) {
            socket.emit('position', position);
            draw(position);
        };
    });
    canvas.mousedown(function(drawing) {
        drawing = true;
    });
    canvas.mouseup(function(drawing) {
        drawing = false;
    });

    socket.on('draw', function(position) {
        draw(position);
    });
}

$(document).ready(function() {
    pictionary();
});