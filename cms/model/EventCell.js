define([
	'underscore',
	'backbone'
], function( _, Backbone ) {

	var TodoModel = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			date: '',
			price:'',
			remark:''
		},


	});

	return TodoModel;
});
