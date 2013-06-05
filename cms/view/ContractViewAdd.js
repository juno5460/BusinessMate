define([
	"backbone",
	"jquery",
	"underscore",
	"view/EventView",
	"text!template/ContractViewAdd.html"
	],
	function(Backbone,$,_,EventView,ContractViewAddHtml){

	var ContactViewAdd = Backbone.View.extend({

		className:"contractaddView",

		el:'.container',

		template:_.template(ContractViewAddHtml),

		initialize: function(options){

			this.render();
		},

		events : {
			'click #addEventBtn' : 'onAddEventBtnClick',
			'':'',
		},

		open: function() {

		},

		render: function() {

			$(".container").append(this.template);
			this.$eventList = this.$("#eventsTable tbody");
			//console.info(this);
		},

		onAddEventBtnClick: function() {


			var view = new EventView();
			//var $eventCellCustom = $eventCellTemplate.find("#eventCellCustom");
			//var $eventCellPrice = $eventCellTemplate.find("#eventCellPrice");

			//this.$eventList.append("<tr><td>1</td><td>2</td><td>3</td></tr>");
			this.$eventList.append(view.render().el);
			//console.info(view.render().el);


		}

	});

	return ContactViewAdd;

});