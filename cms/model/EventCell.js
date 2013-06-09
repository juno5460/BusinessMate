define([
	'underscore',
	'backbone'
], function( _, Backbone ) {

	var EventModel = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			id:'',
			type:'',
			title: '',
			date: '',
			price:'',
			remark:''
		},


	});

	return EventModel;
});
