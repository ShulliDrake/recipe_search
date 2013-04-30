//namespace RS - RecipeSearch
if(!RS || typeof RS === undefined) {
    var RS = {};
}

//Backbone models and views
RS.collection = {};
RS.models = {}
RS.views = {}

$(function(e){
    var mainView = new RS.views.MainView({
	el: $("#container"),
	model: new RS.models.RecipeModel
    });

}); //document ready

RS.models.RecipeModel = Backbone.Model.extend({

});

RS.collection.RecipeList = Backbone.Collection.extend({

    url: "/api",

    parse: function(response) {
	return response.results;
    }

});

RS.views.MainView = Backbone.View.extend({

    initialize: function(){
	var searchResultView = new RS.views.SearchResultView({
	    el: $(".content"),
	    model: this.model
	});
    }
});

RS.views.SearchResultView = Backbone.View.extend({

    events: {
	"submit form": "submit"
    },

    initialize: function(){
	this.collection = new RS.collection.RecipeList({model:this.model});
	this.collection.bind("reset", this.render, this);
    },

    render: function(){

	//TODO - result list selector
	$("#result ul").html("");

	this.collection.each(function(model){

	    var recipeView = new RS.views.RecipeCollectionView({
		model:model,
//		collection: this.collection
	    });

	    $("#result ul").append(recipeView.render().$el);
	});

    },

    submit: function(e){
	e.preventDefault();

	this.collection.fetch({reset:true});
    }

});

RS.views.RecipeCollectionView = Backbone.View.extend({

    tagName: "li",

    events: {
	"click a": "preview"
    },

    template: _.template($("#recipeItemTemplate").html()),

    render: function() {
	this.$el.html(this.template(this.model.toJSON()));
	return this;
    },

    preview: function() {

	var recipeName = this.model.get('recipeName');
	var source = this.model.get('sourceDisplayName');
	$.fancybox('<p>'+recipeName+'</p>', {
	    afteroad: function() {
		this.content.append('<h1>2. My custom title</h1>');
	    },
	    openEffect:"none"

	});
    }

});
