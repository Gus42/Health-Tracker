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
        item: '',
        calorie: 0,
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
	//var todo = new app.Todo({item: 'aaa'});
	//var view = new app.TodoView({model: todo});
	//view.render();

	var object = {},
		callback = function(msg) { console.log("Triggered " + msg); };

	_.extend(object, Backbone.Events); // now  obj can receive on and trigger event,

	object.on("my_event", callback);

	object.trigger("my_event", "my custom event");


	// renders the full list of todo items calling TodoView for each one.
    app.AppView = Backbone.View.extend({
      el: '#todoapp',
      initialize: function () {
      	log(this);
      	log(this.$('#new-todo'));
      	log($('#new-todo'));
        this.input = this.$('#new-todo');
        // when new elements are added to the collection render then with addOne
        app.todoList.on('add', this.addOne, this);
        app.todoList.on('reset', this.addAll, this);
        app.todoList.fetch(); // Loads list from local storage
      },
      events: {
        'keypress #new-todo': 'createTodoOnEnter',
        'click .view': 'storeItem'
      },
      createTodoOnEnter: function(e){
        if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
          return;
        }
        app.todoList.create(this.newAttributes());
        this.input.val(''); // clean input box
      },
      addOne: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
      },
      addAll: function(){
        this.$('#todo-list').html(''); // clean the todo list
        app.todoList.each(this.addOne, this);
      },
      newAttributes: function(){
		jQuery.ajax('https://api.nutritionix.com/v1_1/search/'+this.input.val().trim()+'?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=06649f8e&appKey=01e8a728a6903e04c015d7c1ac36df6b')
			.done(function( data ) {
				log(data);
				data.hits.forEach(function (food) {
					log(food.fields.item_name);
				});
			});
        return {
          item: this.input.val().trim(),
          completed: false
        }
      },
      storeItem: function(e){
        console.log(e.target);
      }
    });

    //--------------
    // Initializers
    //--------------

    app.appView = new app.AppView();
//})($);