var divVisible = false;
var currColor = "#9acd32";
var currX = null;
var currSize = 50;
var setcolor = true;
var randomcolor = false;
$('document').ready(function() {
    NewGrid(currSize);
    $('#callPicker').click(function() {
        document.getElementById("colorPicker").focus();
        document.getElementById("colorPicker").value = currColor;
        document.getElementById("colorPicker").click();
        setcolor = false;
        randomcolor = false;
        closeDL(currX);
    });
    $('#dwnldButton').click(function() {
        html2canvas($("#grid"), {
            onrendered: function(canvas) {
                theCanvas = canvas;


                canvas.toBlob(function(blob) {
                    saveAs(blob, "Image.png");
                });
            }
        });
    })

});

function NewGrid(x) {
    var height = 600;
    var width = 800;

    var elementHeight = String((height / x) - 2);
    var elementWidth = String((width / x) - 2);
    //console.log("Height: " + (elementHeight * (currSize + 2)) + "\n" + "Width: " + (elementWidth * (currSize + 2)));

    //create square grid.
    for (var i = 0; i < x; ++i)
        for (var j = 0; j < x; ++j)
            $('<span class="block"></span>').appendTo('.blocks').css({
                "height": elementHeight,
                "width": elementWidth
            });

    $('.block').mouseover(function() {
        if (setcolor)
            $(this).css("background", currColor);
        else if (randomcolor)
            $(this).css("background", RandomColor());
        else
            $(this).css("background", document.getElementById("colorPicker").value);
    });
}

function rdColor() {
    closeDL(currX);
    randomcolor = true;
    setcolor = false;

}

function RandomColor() {
    var possibleValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

    var r = Math.floor((Math.random() * 15) + 1);
    var g = Math.floor((Math.random() * 15) + 1);
    var b = Math.floor((Math.random() * 15) + 1);
    var color = '#' + possibleValues[r] + possibleValues[g] + possibleValues[b];
    return color;
}

function clearGrid(x) {

    $('.blocks').empty();
    NewGrid(x);
}

function reset() {
    setcolor = true;
    randomcolor = false;
    currColor = "#9acd32";
    clearGrid(50);
}

function setGrid(x) {
    closeDL(currX);
    currSize = x;
    clearGrid(x);


}

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
        document.getElementByNewGrid(x);
        Id(n1).getElementsByTagName('i')[1].style.display = "inline";

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

function setColor(x) {
    RandomColor = false;
    setcolor = true;
    currColor = String(x);
    closeDL(currX);
}