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
			businessName	:null,
			beginDate 		:null,
			endDate 		:null,
			state 			:null,
			events 			:[]
		},


	});

	return ContractModel;
});
