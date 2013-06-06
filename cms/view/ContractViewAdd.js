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

		className:"contractaddView",

		el:'.container',

		template:_.template(ContractViewAddHtml),

		initialize: function(options){
			this.eventsGroup = new Array();

			this.render();
		},

		events : {
			'click #addEventBtn' : 'onAddEventBtnClick',
			'click #submit' : 'submit',
		},


		render: function() {

			$(".container").append(this.template);
			this.$eventList = this.$("#eventsTable tbody");
			//console.info(this);
		},

		onAddEventBtnClick: function() {

			var $type = $("#eventSelect").val();
			var view = new EventView({type : $type,id : this.eventsGroup.length}); 
			this.listenTo(view,'delete',this.removeEventCell);
			this.eventsGroup.push(view);
			this.$eventList.append(view.el);
		},

		submit: function(){
			var $contractId = $("#contractId").text();
			var $beginDate = $("#beginDate").text();
			var $endDate = $("#endDate").text();
			var $contractState = $("#contractState").text();
			var $contractName = $("#contractName").text();

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
		}

	});

	return ContactViewAdd;

});