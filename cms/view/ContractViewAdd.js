define([
	"backbone",
	"jquery",
	"underscore",
	"json2",
	"view/EventView",
	"text!template/ContractViewAdd.html",
	'model/EventCell'
	],
	function(Backbone,$,_,json,EventView,ContractViewAddHtml,EventCell){

	var ContactViewAdd = Backbone.View.extend({


		tagName:  'div',

		template:_.template(ContractViewAddHtml),

		initialize: function(options){
			this.eventsGroup = new Array();

			this.render();
		},

		events : {
			'click #submit' : 'submit',
			'click #dropdown_customEvent' : 'onDropDownCusomEventClick',
			'click #dropdown_priceEvent' : 'onDropDownPriceEventClick',
		},


		render: function() {

			$(".container").append(this.template);
			this.$eventList = this.$("#eventsBoard");
			//console.info(this);
		},
		submit: function(){
			var $contractId = $("input[id^='contractId']").val();
			var $beginDate = $("#beginDate").val();
			var $endDate = $("#endDate").val();
			var $contractState = $("input[id^='contractState']").val();
			var $contractName = $("input[id^='contractName']").val();

			var events = [];
			_.each(this.eventsGroup,function(view){
				events.push(view.toJson());
			});

			$postBody = {};
			$postBody.id = $contractId;
			$postBody.businessname = $contractName;
			$postBody.state = $contractState;
			$postBody.beginDate = $beginDate;
			$postBody.endDate = $endDate;
			$postBody.completed = false;
			$postBody.events = events;


			$.post("http://10.108.1.67:3000/contracts",JSON.stringify($postBody));
		},
		removeEventCell:function(id){
			this.eventsGroup = _.reject(this.eventsGroup,function(view){
				return view.id == id;
			});
			console.info(this.eventsGroup);
		},
		onDropDownCusomEventClick:function() {
			var view = new EventView({type : 1,id : this.eventsGroup.length}); 
			this.listenTo(view,'delete',this.removeEventCell);
			this.eventsGroup.push(view);
			this.$eventList.append(view.el);
		},
		onDropDownPriceEventClick:function(){
			var view = new EventView({type : 2,id : this.eventsGroup.length}); 
			this.listenTo(view,'delete',this.removeEventCell);
			this.eventsGroup.push(view);
			this.$eventList.append(view.el);
		}

	});

	return ContactViewAdd;

});