define([
		"backbone",
		"jquery",
		"underscore",
		"text!template/ContractListCell.html"
], function(Backbone, $, _, ContractListCellHtml) {

	var ReturnedMoneyCell = Backbone.View.extend({

		tagName: 'tr',

		template: _.template(ContractListCellHtml),

		model: null,

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(
				this.template({
				_id			: this.model.id,
				myId  		: this.model.get("myId"),
				name 		: this.model.get("name"),
				partyA		: this.model.get("partyA"),
				partyB		: this.model.get("partyB"),
				amount		: this.model.get("amount")
				// reMoney     : this.model.get("reMoney"),
				// reMoneyRate : this.model.get("reMoneyRate"),
				// reDate		: this.model.get("reDate")
			}));
		},
	});
	return ReturnedMoneyCell;
});