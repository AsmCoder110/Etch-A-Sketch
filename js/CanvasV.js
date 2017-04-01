var currColor = "#9acd32";

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickLineH = new Array();
var setcolor = true;
var divVisible = false;
var hdd = null;
var currX = undefined;
var currLineH = 10;
$('document').ready(function() {
    var context = document.getElementById("myc").getContext('2d');
    var paint = false;



    $('#myc').mousedown(function(e) {
        if (divVisible) {
            closeDL(currX);
        }
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
    currColor = "#9acd32";
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
        if (setcolor)
            clickColor.push(currColor);
        else {
            currColor = document.getElementById("colorPicker").value;
            clickColor.push(currColor);

        }
        clickLineH.push(currLineH);
    }

    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas


        context.lineJoin = "round";

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.lineWidth = clickLineH[i];

            context.stroke();
        }
    }
    $('#clear').click(function() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        reset();
    });

    $
    $("#callPicker").click(function() {
        document.getElementById("colorPicker").focus();
        document.getElementById("colorPicker").value = currColor;
        document.getElementById("colorPicker").click();
        setcolor = false;
        closeDL(currX);
    });
    $("#dwnldButton").click(function() {

        var canvas = document.getElementById("myc");
        var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = img;


    });


});

function showDL(x) {
    /* 
        If Another Drop List is visible and it's not the currently visible one
        (the user has clicked on another list while this one was active)
        In that case, Close the previous one and set divVisible = false and continue.
    */
    if (x !== currX && divVisible) {
        closeDL(currX);
        divVisible = false;

    }
    var m1 = "#top_" + x;
    var n1 = "top_" + x;
    var m2 = "#" + x;

    if (document.getElementById(x).style.display == "block") {
        divVisible = false;
        closeDL(x);

    } else {
        divVisible = true;
        currX = x;
        $(m2).slideDown("slow");
        document.getElementById(x).style.display = "block";
        document.getElementById(x).style.height = "400px";
        document.getElementById(n1).getElementsByTagName('i')[0].style.display = "none";
        document.getElementById(n1).getElementsByTagName('i')[1].style.display = "inline";

    }
}

function closeDL(x) {

    var n1 = "top_" + x;
    var m2 = "#" + x;

    $(m2).slideUp("slow");
    document.getElementById(x).style.height = "";
    document.getElementById(x).style.display = "none";
    document.getElementById(n1).getElementsByTagName('i')[0].style.display = "inline";
    document.getElementById(n1).getElementsByTagName('i')[1].style.display = "none";

}

function reset() {
    clickX.length = 0;
    clickY.length = 0;
    clickDrag.length = 0;
    clickColor.length = 0;
    clickLineH.length = 0;
    currLineH = 10;
}

function setColor(x) {

    closeDL(currX);
    setcolor = true;
    switch (x) {
        case 'red':
            currColor = "#FF0000";

            break;
        case 'green':
            currColor = "#00FF00";

            break;
        case 'blue':
            currColor = "#0000FF";

            break;
        case 'yellow':
            currColor = "#ff0";

            break;
        case 'black':
            currColor = "#000000";

            break;

    }

}

function setLineH(x) {
    closeDL(currX);
    currLineH = x;
}