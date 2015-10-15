$(document).ready(function () { 
    load_images();
});


function load_images(){
    var data = movies["movies"];
    var html = "";
    
    for (var i =0; i<data.length; i++){
        html += make_image(data[i]);
    }
    
    $("#gridWrapper").html(html);
}

function make_image(data){
    var html = "";
    html += "<div class='gridMovieBorder'>";
    html += "<div class='gridMoviePhoto'>";
    html += "<img class='movie' src='"+data["photo"]+"'>";
    
    if (data["HD"] === true){
        html += "<img class='HD' src='data/icons/HD.png'>";
    }
            
    html += "<div class='description'>";
    html += "<span>"+data["title"]+"<br>"+data["year"]+"</span>";
    html += "</div>";
            
    html += "<div class='starring'>";
    html += "<b>&nbsp;Starring:</b><br>&nbsp;"+data["starring"];
    html += "</div>";
    html += "</div>";
    html += "</div>";
    return html;
}
