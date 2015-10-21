$(document).ready(function () { 
    var gallery = new Gallery(movies["movies"]);
});

function Gallery(data){
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
    
    var sort_gallery =function()
    {
        self.sort_gallery.call(self);
    };
    
    
    
    
    $(this.grid_icon).on("click", make_grid_function);
    $(this.list_icon).on("click", make_list_function);
    $(this.sort_list).on('change', sort_gallery);
    
    
    this.load_grid_movies(this);
}

Gallery.prototype.load_grid_movies = function(self){
    $.get(self.grid_movie_template, function(template){
        var html_maker = new htmlMaker(template);
        var html = html_maker.getHTML(self.movies);
        $(self.movies_div).html(html);
    });
};


Gallery.prototype.make_grid = function () {
    $(this.movies_div).attr("class", "grid");
    $(this.grid_icon).attr("src", "Data/Icons/grid_pressed.jpg");
    $(this.list_icon).attr("src", "Data/Icons/list.jpg");
};

Gallery.prototype.make_list = function () {
    $(this.movies_div).attr("class", "list");
    $(this.grid_icon).attr("src", "Data/Icons/grid.jpg");
    $(this.list_icon).attr("src", "Data/Icons/list_pressed.jpg");
};

Gallery.prototype.sort_gallery= function (){
    var element=$(this.sort_list).val().toLowerCase();
    this.movies=this.movies.sort(
            function(first,second){
                if (first[element]<second[element])
                    return -1;
                if (first[element]==second[element])
                    return 0;
                if (first[element]>second[element])
                    return 1;
    });
    this.load_grid_movies(this);
  };
