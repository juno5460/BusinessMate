define([
		"backbone",
		"jquery",
		"underscore",
		"text!template/ContractListCell.html"],
		function(Backbone, $, _, ContractListCellHtml) {

	var ContractListCell = Backbone.View.extend({

		tagName: 'tr',

		template: _.template(ContractListCellHtml),

		initialize: function(options) {
			this.$id 		= options.id;
			this.$cid		= options.cid;
			this.$name 		= options.name;
			this.$beginDate = options.beginDate;
			this.$endDate 	= options.endDate;
			this.$state 	= options.state;
			this.render();
		},

		render: function() {
			this.$el.html(this.template({
				id: this.$id,
				cid: this.$cid,
				name: this.$name,
				beginDate: this.$beginDate,
				endDate: this.$endDate,
				state: this.$state
			}));
		},
	});
	return ContractListCell;
});