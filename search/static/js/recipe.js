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

RS.views.MainView = Backbone.View.extend({

    initialize: function(){
	var searchResultView = new RS.views.SearchResultView({
	    el: $(".content"),
	    model: this.model
	});
    }
});

RS.models.CollectionModel = Backbone.Model.extend({

    url: function() {
	return "/recipe_api?id=" + this.id;
    },

    getRecipe: function() {
	var self = this;
	this.fetch({
	    success: function(response) {
		self.trigger("recipeReady");
	    }
	});
    }

});

RS.collection.RecipeList = Backbone.Collection.extend({

    model: RS.models.CollectionModel,

    url: "/api",

    parse: function(response) {
	return response.results;
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
	"click a": "getRecipe"
    },

    template: _.template($("#recipeItemTemplate").html()),
    fancyboxTemplate: _.template($("#fancyboxTemplate").html()),

    initialize: function() {
	this.model.bind("recipeReady", this.showFancybox, this);
    },

    render: function() {
	this.$el.html(this.template(this.model.toJSON()));
	return this;
    },

    getRecipe: function() {
	/* Thumbnail in the result list is clicked. */
	this.model.getRecipe();
	return false;
    },

    showFancybox: function() {
	/* Show recipe with large image in a fancybox. */
	console.log(this.model);

	var id = this.model.get('id');
	var html = this.fancyboxTemplate({
	    'recipeName': this.model.get('recipeName'),
	    'source': this.model.get('sourceDisplayName'),
	    'ingredientList': this.model.get('ingredientLines'),
	    'servings': this.model.get('numberOfServings'),
	    'sourceUrl': this.model.get('source').sourceRecipeUrl,
	    'imageUrl': this.model.get('images')[0].hostedLargeUrl
	});

	//open fancybox
	$.fancybox({
	    minHeight: 370,
	    minWidth: 670,
	    content: html,
	    openEffect:"none",
	});
    }

});
