var currColor = "#9acd32";

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var setcolor = true;
var divVisible = false;
var hdd = null;
var dropList = {
    id:
}
$('document').ready(function() {
    var context = document.getElementById("myc").getContext('2d');
    var paint = false;

    hdd = function hideDiv() {
        divVisible = false;
        $("#ColiDiv").slideUp("slow");
        document.getElementById("ColiDiv").style.height = "";
        document.getElementById("ColiDiv").style.display = "none";
        document.getElementById("Colid").getElementsByTagName('i')[0].style.display = "inline";
        document.getElementById("Colid").getElementsByTagName('i')[1].style.display = "none";

    }

    $('#myc').mousedown(function(e) {
        if (divVisible) {
            hdd();
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
    }

    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas


        context.lineJoin = "round";
        context.lineWidth = 10;

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
            context.stroke();
        }
    }
    $('#clear').click(function() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        reset();
    });

    $('#Colid').click(function() {
        if (document.getElementById("ColiDiv").style.display == "block") {
            hdd();

        } else {
            divVisible = true;
            $("#ColiDiv").slideDown("slow");
            document.getElementById("ColiDiv").style.display = "block";
            document.getElementById("ColiDiv").style.height = "400px";
            document.getElementById("Colid").getElementsByTagName('i')[0].style.display = "none";
            document.getElementById("Colid").getElementsByTagName('i')[1].style.display = "inline";

        }
    });
    $("#callPicker").click(function() {
        document.getElementById("colorPicker").focus();
        document.getElementById("colorPicker").value = currColor;
        document.getElementById("colorPicker").click();
        setcolor = false;
        hdd();
    });
    $("#dwnldButton").click(function() {

        var canvas = document.getElementById("myc");
        var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = img;


    });


});

function reset() {
    clickX.length = 0;
    clickY.length = 0;
    clickDrag.length = 0;
    clickColor.length = 0;

}

function setColor(x) {
    if (hdd)
        hdd();
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