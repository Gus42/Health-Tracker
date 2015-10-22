//(function ($) {


	function log(x) {
		console.log(x);
	}


	var Food = Backbone.Model.extend({

	});

	var FoodList = Backbone.Collection.extend({

	});

	var FoodView = Backbone.View.extend({

	});


	//exercices for understand backbone

	var app = {}; // create namespace for our app

    app.Todo = Backbone.Model.extend({
      defaults: {
        title: '',
        completed: false
      }
    });

	app.TodoList = Backbone.Collection.extend({
		model: app.Todo,
		localStorage: new Store("backbone-todo")
    });

    // instance of the Collection
    app.todoList = new app.TodoList();

    // renders individual todo items list (li)
	app.TodoView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#item-template').html()),
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this; // enable chained calls
		}
	});
	//var todo = new app.Todo({title: 'aaa'});
	//var view = new app.TodoView({model: todo});
	//view.render();

	var object = {},
		callback = function(msg) { console.log("Triggered " + msg); };

	_.extend(object, Backbone.Events); // now  obj can receive on and trigger event,

	object.on("my_event", callback);

	object.trigger("my_event", "my custom event");
//})($);