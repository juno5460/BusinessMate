define([
		"backbone",
		"jquery",
		"underscore",
		"json2",
		"view/ContractViewAdd",
		"text!template/ContractListView.html",
		"view/ContractListCell",
		'config/config'
], function(Backbone, $, _, JSON, ContractViewAdd, ContractListViewHtml, ContractListCell,Config) {

	var ContractListView = Backbone.View.extend({

		tagName: 'div',

		className: "ContractListView",

		template: _.template(ContractListViewHtml),

		initialize: function(options) {

			//在导航栏上设置成当前选中页。
			$(".active").removeClass();
			$("#contracts").addClass("active");

			this.$containerView = $("#container");
			this.$searchInput = $(".contractIdInput");

			this.$contracts = new Array();

			this.render();
		},

		events: {
			'click #addContractBtn': 'onAddContractBtnClick',
			'click #searchBtn': 'onSearchBtnClick',
		},


		render: function() {

			this.$el.html(this.template());
			var $contractListTable = this.$el.find("#contractListTable tbody");


			$.get(Config.Server("contracts"), function(data, status) {

				console.info("成功加载数据");

				_.each(data, function(contract) {

					$contractListTable.append(new ContractListCell({
						id: contract.id,
						cid: contract.cid,
						name: contract.businessName,
						beginDate: contract.beginDate,
						endDate: contract.endDate,
						state: contract.state
					}).el);

				});
			});

			return this;
		},
		presentView: function(view) {
			this.$containerView.append(view.el);
			this.remove();
		},
		onAddContractBtnClick: function() {


		},
		onSearchBtnClick: function() {

		}
	});

	return ContractListView;
});