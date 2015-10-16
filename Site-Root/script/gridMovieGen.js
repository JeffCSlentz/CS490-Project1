$(document).ready(function () { 
    var gallery = new Gallery(movies["movies"]);
});

function Gallery(data){
    this.movies = data;
    this.grid_movie_div = "#gridWrapper";
    this.grid_movie_template = "templates/grid_photo.html";
    this.load_grid_movies(this);
}

Gallery.prototype.load_grid_movies = function(self){
    $.get(self.grid_movie_template, function(template){
        var html_maker = new htmlMaker(template);
        var html = html_maker.getHTML(self.movies);
        $(self.grid_movie_div).html(html);
    });
};


