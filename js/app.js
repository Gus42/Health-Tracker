(function ($) {
	'use strict';

	function log(x) {
		console.log(x);
	}
	log('a');


	var Food = Backbone.Model.extend({

	});

	var FoodList = Backbone.Collection.extend({

	});

	var FoodView = Backbone.View.extend({

	});


	var AppView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML
      //      content will be rendered.
      el: '#container',
      // It's the first function called when this view it's instantiated.
      template: _.template("<h3>Hello <%- who %></h3>"),
      initialize: function(){
      	log('#container');
      	log($('#container'));

      	log(this.el);
      	//log(document.getElementById('container'));
      	log(this.$el);
        this.render();
        //document.getElementById('container').innerHTML = 'ew';
      },
      // $el - it's a cached jQuery object (el), in which you can use jQuery functions
      //       to push content. Like the Hello World in this case.
      render: function(){
        this.$el.html(this.template({'who': 'bagigio!'}));
      }
    });

    var appView = new AppView();

})($);