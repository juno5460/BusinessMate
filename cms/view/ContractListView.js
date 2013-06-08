define([
		"backbone",
		"jquery",
		"underscore",
		"json2",
		"view/ContractViewAdd",
		"text!template/ContractListView.html",
		"view/ContractListCell"
], function(Backbone, $, _, JSON, ContractViewAdd, ContractListViewHtml,ContractListCell) {

	var ContractListView = Backbone.View.extend({

		tagName:  'div',

		className : "ContractListView",

		template: _.template(ContractListViewHtml),

		initialize: function(options) {

			//在导航栏上设置成当前选中页。
			$(".active").removeClass();
			$("#contracts").addClass("active");

			this.$containerView = $("#container");
			this.$contractListTable = $(".contractListTable");
			this.$contractIdInput = $(".contractIdInput");
			this.render();
		},

		events: {
			'click #addContractBtn': 'onAddContractBtnClick',
			'click #searchBtn':'onSearchBtnClick',
		},


		render: function() {

			this.$el.html(this.template());
			// $.get("http://10.108.1.67:3000/contracts",function(data,status){
			// 	this.$contracts = data;
			// 	_.each(data,function(contract){
			// 		console.info(contract);

			// 		// this.$contractListTable.append(new ContractListCell({id:contract.id,
			// 		// 	id:contract.name,
			// 		// 	id:contract.beginDate,
			// 		// 	id:contract.endDate,
			// 		// 	id:contract.state
			// 		// }).el);

			// 	});
			// 	console.info(data);
			// });
		},
		presentView:function(view){
			this.$containerView.append(view.el);
			this.remove(); 
		},
		onAddContractBtnClick:function(){
			//this.presentView(new ContractViewAdd());

		},
		onSearchBtnClick:function(){

		}
	});

	return ContractListView;
});