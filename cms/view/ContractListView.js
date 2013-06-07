define([
		"backbone",
		"jquery",
		"underscore",
		"json2",
		"view/ContractViewAdd",
		"text!template/ContractListView.html",
], function(Backbone, $, _, JSON, ContractViewAdd,ContractListViewHtml) {

	var ContractListView = Backbone.View.extend({

		tagName:  'div',

		template: _.template(ContractListViewHtml),

		initialize: function(options) {
			this.$containerView = $(".container");
			this.render();
		},

		events: {
			'click #addContractBtn': 'onAddContractBtnClick',
		},


		render: function() {

			this.$containerView.append(this.template);

		},
		presentView:function(view){
			this.$containerView.append(view.el);
			//this.remove(); 
		},
		onAddContractBtnClick:function(){
			this.presentView(new ContractViewAdd());
		}
	});

	return ContractListView;
});