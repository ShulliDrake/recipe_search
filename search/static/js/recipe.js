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

	this.collection = new RS.collection.RecipeList({model:this.model});

	var searchFormView = new RS.views.SearchFormView({
	    el: $("#search"),
	    model: this.model,
	    collection: this.collection
	});

	var searchResultView = new RS.views.SearchResultView({
	    el: $(".content"),
	    model: this.model,
	    collection: this.collection
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

RS.views.SearchFormView = Backbone.View.extend({
    events: {
	"submit form": "submit"
    },


    submit: function(e){
	e.preventDefault();

	var keywords = $('#keywords').val();

	this.collection.fetch({
	    reset:true,
	    data:{q:keywords}
	});

    }

});

RS.views.SearchResultView = Backbone.View.extend({


    initialize: function(){
	this.collection.bind("reset", this.render, this);
    },

    render: function(){

	//TODO - result list selector
	$("#result").html("");

	if (this.collection.length > 0) {
	    //TODO
	    $("#result").append("<ul></ul>");
	    this.collection.each(function(model){

		var recipeView = new RS.views.RecipeCollectionView({
		    model:model,
		});

		$("#result ul").append(recipeView.render().$el);
	    });
	} else {
	    //No search results
	    var errorView = new RS.views.ErrorView({
		model: this.model
	    });
	    $("#result").html(errorView.render().$el);
	}


    }

});

RS.views.ErrorView = Backbone.View.extend({

    template: _.template($("#NoResultsTemplate").html()),

    render: function() {
	this.$el.html(this.template({keywords:"key"}));
	return this;
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
	var id = this.model.get('id');
	var html = this.fancyboxTemplate({
	    'recipeName': this.model.get('recipeName'),
	    'source': this.model.get('sourceDisplayName'),
	    'ingredientList': this.model.get('ingredientLines'),
	    'servings': this.model.get('numberOfServings'),
	    'sourceUrl': this.model.get('source').sourceRecipeUrl,
	    'cookingTime': (this.model.get('totalTimeInSeconds') ? this.model.get('totalTimeInSeconds') / 60 : null),
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
