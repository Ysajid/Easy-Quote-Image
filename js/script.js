var canvas = document.getElementById("canvas");
var quote = document.getElementById("quote");
var IMAGE_SRC = "images";

var fontSize = 40;

function download(){
    html2canvas(canvas, {
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            canvas.toBlob(function(blob) {
                saveAs(blob, "easy_image.png");
            });
        }, 
        allowTaint:true,
        logging:true
    });

}


// $("#avatar").

$(".backgrounds img").click(function(){
    console.log(this.src);
    canvas.style.backgroundImage = "url(" + this.src + ")";
})

$(".backgrounds div").click(function(){
    canvas.style.backgroundImage = "";
    canvas.style.backgroundColor = $(this).css("background-color");
})

$("#font-colors div").click(function(){
    quote.style.color = $(this).css("background-color");
})


function changeFontSize(mode) {
  if(mode == 1) fontSize += 2;
  else if(fontSize > 8) fontSize -= 2;
  quote.style.fontSize = fontSize;
  $("#font-size").text(fontSize);
}

function quoteInserted(x) {
    var re = /\n/g;
    $("#quote").html(x.value.replace(re, '</br>'));
}

function avaterUpload(input) {
    var file    = input.files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        document.getElementById("avatar").src = reader.result;
        $("#filename").text(file.name);
        $("#close").css("display", "inherit");
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        document.getElementById("avatar").src = "";
    }
};

function customBackgroundUpload(input) {
    var file    = input.files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        canvas.style.backgroundImage = "url(" + reader.result + ")";
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    }
};

function delAvater() {
    document.getElementById("avatar").src = "";
    $("#filename").text("");
    $("#close").css("display", "none");
};

function changeFont(fontFamily) {
    $("#quote").css("font-family", $(fontFamily).css("font-family"));
    $("#font-family").text($(fontFamily).text());
};