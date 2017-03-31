$('document').ready(function() {
    var context = document.getElementById("myc").getContext('2d');
    var paint = false;
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();

    $('#myc').mousedown(function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
        redraw();
    });

    $('#myc').mousemove(function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });
    $('.etchCanvas').mouseup(function(e) {
        paint = false;
    });
    $('.etchCanvas').mouseleave(function(e) {
        paint = false;
    });



    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }
    $('#clear').click(function() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        clickX.length = 0;
        clickY.length = 0;
        dragging.length = 0;
    });
    $('brush').click(function() {

    });
});