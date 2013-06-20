define([
		"backbone",
		"jquery",
		"underscore",
		"text!template/PieContractListCell.html"
], function(Backbone, $, _, PieContractListCellHtml) {

	var PieContractListCell = Backbone.View.extend({

		tagName: 'tr',

		template: _.template(PieContractListCellHtml),

		model: null,

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(
				this.template({
				_id 		: this.model.id,
				myId  		: this.model.get("myId"),
				name 		: this.model.get("name"),
				beginDate 	: this.model.get("beginDate"),
				endDate 	: this.model.get("endDate"),
				state 		: this.model.get("state"),
			}));
		},
	});
	return PieContractListCell;
});