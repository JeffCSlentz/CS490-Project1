$(document).ready(function () { 
    var gallery = new Gallery(movies["movies"]);
});

function Gallery(data){
    this.movies = data;
    this.list_icon = "#list_icon";
    this.grid_icon = "#grid_icon";
    this.grid_movie_div = "#gridWrapper";
    this.grid_movie_template = "templates/grid_photo.html";
    
    var self = this;
    var make_grid_function = function(){
        self.make_grid.call(self);
    };
    
    var make_list_function = function(){
        self.make_list.call(self);
    };
    
    $(this.grid_icon).on("click", make_grid_function);
    $(this.list_icon).on("click", make_list_function);
    
    this.load_grid_movies(this);
}

Gallery.prototype.load_grid_movies = function(self){
    $.get(self.grid_movie_template, function(template){
        var html_maker = new htmlMaker(template);
        var html = html_maker.getHTML(self.movies);
        $(self.grid_movie_div).html(html);
    });
};

Gallery.prototype.make_grid = function () {
    $(this.grid_movie_div).attr("class", "gridWrapper");
    $(this.grid_icon).attr("src", "Data/Icons/grid_pressed.jpg");
    $(this.list_icon).attr("src", "Data/Icons/list.jpg");
};

Gallery.prototype.make_list = function () {
    $(this.grid_movie_div).attr("class", "listWrapper");
    $(this.grid_icon).attr("src", "Data/Icons/grid.jpg");
    $(this.list_icon).attr("src", "Data/Icons/list_pressed.jpg");
};


