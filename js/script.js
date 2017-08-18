var canvas = document.getElementById("canvas");
var quote = document.getElementById("quote");
var IMAGE_SRC = "images";

var fontSize = 40;

window.fbAsyncInit = function() {
FB.init({
    appId      : '472403993120622',
    xfbml      : true,
    version    : 'v2.10'
});
FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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

$("#backgrounds img").click(function(){
    console.log(this.src);
    canvas.style.backgroundImage = "url(" + this.src + ")";
})

$("#backgrounds div").click(function(){
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

function delAvater() {
    document.getElementById("avatar").src = "";
    $("#filename").text("");
    $("#close").css("display", "none");
};

function changeFont(fontFamily) {
    $("#quote").css("font-family", $(fontFamily).css("font-family"));
    $("#font-family").text($(fontFamily).text());
};

function fbShare() {
    var imageFile;
     html2canvas(canvas, {
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            canvas.toBlob(function(blob) {
                imageFile = new File([blob], "Quote_image", {type: 'image/png', lastModified: Date.now()});

                FB.ui({
                    method: 'feed',
                    name: 'asdasd',
                    link: url_base + '/listen',
                    picture: imageFile,
                    caption: 'mywebsite.com',
                    description: msg,
                    message: msg
                }, function(response){
                // Debug response (optional)
                console.log(response);
                });
            });
        }, 
        allowTaint:true,
        logging:true
    });
}