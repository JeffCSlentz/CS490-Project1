//OLD METHOD OF ITERATIVE GENERATING, PRESERVED FOR POSTERITY
//
//
//$(document).ready(function () { 
//    load_images();
//});
//
//
//function load_images(){
//    var data = movies["movies"];
//    var html = "";
//    
//    for (var i =0; i<data.length; i++){
//        html += make_image(data[i]);
//    }
//    
//    $("#gridWrapper").html(html);
//}
//
//function make_image(data){
//    var html = "";
//    html += "<div class='gridMovieBorder'>";
//    html += "<div class='gridMoviePhoto'>";
//    html += "<img class='movie' src='"+data["photo"]+"'>";
//    
//    if (data["HD"] === true){
//        html += "<img class='HD' src='data/icons/HD.png'>";
//    }
//            
//    html += "<div class='description'>";
//    html += "<span>"+data["title"]+"<br>"+data["year"]+"</span>";
//    html += "</div>";
//            
//    html += "<div class='starring'>";
//    html += "<b>&nbsp;Starring:</b><br>&nbsp;"+data["starring"];
//    html += "</div>";
//    html += "</div>";
//    html += "</div>";
//    return html;
//}


//On page load
$(document).ready(function () { 
    
    //Create new gallery object with movies data
    var gallery = new Gallery(movies["movies"]);
    
    //Event handlers for search button/bar.
    $('#search_button').on('click', search);
    $('#search_bar').on("keyup", movies["movies"], suggest);
    $('#search_bar').on("keypress", function (e) {            
        if (e.keyCode === 13) {
            // Cancel the default action on keypress event
            e.preventDefault(); 
            search();
    }});
   
});

//User has pressed the search button or the enter key.
function search(){
    
    //Get the user's entered data and create some variables.
    var value = $("#search_bar").val();
    var datacopy = [];
    var push_movie = false;
    
    
    for (var i = 0; i<(movies["movies"].length); i++){
        
        //Will make push_movie true if the search bar contains a string that exists inside title or starring.
        if (movies["movies"][i].title.toLowerCase().search(value.toLowerCase()) !== -1 || movies["movies"][i].starring.toLowerCase().search(value.toLowerCase()) !== -1){
            push_movie = true;
        }
        else{
            push_movie = false;
        }
        
        //Will fill datacopy with the movie if actor, title, or year matches.
        if (push_movie || parseInt(value) === movies["movies"][i].year){
            datacopy.push(movies["movies"][i]);
        }
    }

    //If you search nothing, return all movies.
    if (value === ""){datacopy = movies["movies"];}
    
    //Not sure if this is necessary, but just in case.
    $("#movies").empty();
    
    //Create a new gallery with the new data.
    var gallery = new Gallery(datacopy);
}


//The user has released a key while focused on the search bar.
function suggest() {
    
    //Initialize variables
    var html = "";
    var value = $("#search_bar").val(); //get the value of the text field
    var show=false; //don't show suggestions

 
    $.each(movies["movies"], function (i, val) {
        var match = movies["movies"][i].title.toLowerCase().search(value.toLowerCase().trim());
        if (match !== -1) { //if there is a search match
            html += "<div class='sub_suggestions' data-item='" + movies["movies"][i].title + "' >";
            html += movies["movies"][i].title.substring(0,match)+"<b>"+movies["movies"][i].title.substring(match,match+value.length)+"</b>"+movies["movies"][i].title.substring(match+value.length,movies["movies"][i].title.length);
            html += "</div>";
            show=true; //show suggestions
        }
    });
    
    //If a match was found and search bar isn't empty
    if(show && value !== ""){
        $("#suggestions_box").html(html);
        //get the children of suggestions_box with .sub_suggestions class
        $("#suggestions_box").children(".sub_suggestions").on('click',function(){
            var item=$(this).attr('data-item'); //get the data
            $("#field").val(item); //show it in the field
            $("#suggestions_box").hide(); //hide the suggestion box
        });
        
        $("#suggestions_box").show();
    }
    else
       $("#suggestions_box").hide();
}



function Gallery(data){
    
    //Initalize member variables
    this.movies = data;
    this.list_icon = "#list_icon";
    this.grid_icon = "#grid_icon";
    this.movies_div = "#movies";
    this.grid_movie_template = "templates/grid_photo.html";
    this.sort_list = "#sort_list";
    
    var self = this;
    var make_grid_function = function(){
        self.make_grid.call(self);
    };
    
    var make_list_function = function(){
        self.make_list.call(self);
    };
    
    var sort_gallery = function(){
        self.sort_gallery.call(self);
    };
    
    //Event handlers for grid/list sort.
    $(this.grid_icon).on("click", make_grid_function);
    $(this.list_icon).on("click", make_list_function);
    $(this.sort_list).on('change', sort_gallery);
    
    this.load_grid_movies(this);
}


//Use the html maker and some wizardry to procedurally generate html.
Gallery.prototype.load_grid_movies = function(self){
    $.get(self.grid_movie_template, function(template){
        var html_maker = new htmlMaker(template);
        var html = html_maker.getHTML(self.movies);
        $(self.movies_div).html(html);
    });
};

//Change the div wrapper for all the movies to grid.
//Change the icons images.
Gallery.prototype.make_grid = function () {
    $(this.movies_div).attr("class", "grid");
    $(this.grid_icon).attr("src", "Data/Icons/grid_pressed.jpg");
    $(this.list_icon).attr("src", "Data/Icons/list.jpg");
};


//Change the div wrapper for all the movies to list.
//Change the icons images.
Gallery.prototype.make_list = function () {
    $(this.movies_div).attr("class", "list");
    $(this.grid_icon).attr("src", "Data/Icons/grid.jpg");
    $(this.list_icon).attr("src", "Data/Icons/list_pressed.jpg");
};


//Custom sort, called when drop-down is changed.
Gallery.prototype.sort_gallery= function (){
    var element=$(this.sort_list).val().toLowerCase();
    this.movies=this.movies.sort(
            function(first,second){
                if (first[element]<second[element])
                    return -1;
                if (first[element]===second[element])
                    return 0;
                if (first[element]>second[element])
                    return 1;
    });
    this.load_grid_movies(this);
  };
