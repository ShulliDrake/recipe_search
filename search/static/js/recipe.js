//namespace RS - RecipeSearch
if(!RS || typeof RS === undefined) {
    var RS = {};
}

//Backbone models and views
RS.models = {}
RS.views = {}

$(function(e){
    var mainView = new RS.views.MainView({
	el: $("#container"),
	model: new RS.models.RecipeModel
    });

}); //document ready

RS.models.RecipeModel = Backbone.Model.extend({
    url: "/api",

    defaults: {
	recipes: null
    },

    initialize: function(){

    },

    parse: function(response){
	console.log(response);
	if(response){
	    this.set({"recipes": response.recipes})
	}
    },

    searchRecipes: function(){
	var self = this;
	this.fetch({
	    success: function(){
		self.trigger("RecipeListUpdated");
	    }
	});
    }

});

RS.views.MainView = Backbone.View.extend({

    initialize: function(){
	var searchFormView = new RS.views.SearchFormView({
	    el: $("#search"),
	    model: this.model
	});

	var searchResultView = new RS.views.SearchResultView({
	    el: $("#result"),
	    model: this.model
	});
    }
});

RS.views.SearchFormView = Backbone.View.extend({
    events: {
	"submit form": "submit"
    },

    initialize: function(){},

    submit: function(e){
	e.preventDefault();

	this.model.searchRecipes();
    }
});

RS.views.SearchResultView = Backbone.View.extend({

    template: _.template($("#recipeListTemplate").html()),

    initialize: function(){
	this.model.bind("RecipeListUpdated", this.render, this); //should it be "change:searchResult" ?
    },

    render: function(){

	var resultHtml = this.template({"recipes":this.model.get("recipes")});

	this.$el.html(resultHtml);
    }
});