define([
	'underscore',
	'backbone'
], function( _, Backbone ) {

	var ContractModel = Backbone.Model.extend({

		defaults: {
			id: '',
			cid:'',
			businessName: '',
			beginDate:'',
			endDate:'',
			state:'',
			events:[]
		},


	});

	return ContractModel;
});
