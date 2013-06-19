define([
	'underscore',
	'backbone',
	'config/config'
], function( _, Backbone, Config) {

	var TemplateModel = Backbone.Model.extend({

		urlRoot:Config.Server("templates"),

		idAttribute: "_id",

		defaults: {
			myId 			:null,
			name			:null,
			partyA 			:null,
			partyB 			:null,
			signDate		:null,
			beginDate 		:null,
			endDate 		:null,
			amount			:null,
			state 			:null,
			events 			:[]
		},


	});

	return TemplateModel;
});
