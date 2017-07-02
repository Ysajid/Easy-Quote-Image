var canvas = document.getElementById("canvas");
var quote = document.getElementById("quote");
var IMAGE_SRC = "images"

var fontSize = 40;

function download(){

    html2canvas(canvas, {
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            canvas.toBlob(function(blob) { 
                saveAs(blob, "image.png");
            });
        }
    }, allowTaint = true);

}

$("#images img").click(function(){
    canvas.style.backgroundImage = "url(" + IMAGE_SRC + "/" + (1+$(this).parent().index()) + ".jpg)";
})

$("#color_blocks div").click(function(){
    canvas.style.backgroundImage = "";
    canvas.style.backgroundColor = $(this).css("background-color");
})

$("#font-colors div").click(function(){
    quote.style.color = $(this).css("background-color");
})


function changeFontSize(mode) {
  if(mode == 1) fontSize += 4;
  else if(fontSize > 8) fontSize -= 4;
  quote.style.fontSize = fontSize;
  $("#font-size").text(fontSize);
}