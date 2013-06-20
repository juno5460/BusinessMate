define([
	'underscore',
	'backbone',
	'config/config'
], function( _, Backbone, Config) {

	var ContractModel = Backbone.Model.extend({

		urlRoot:Config.Server("contracts"),

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

	return ContractModel;
});
