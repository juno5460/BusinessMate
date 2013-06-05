define(["backbone","jquery","underscore","text!template/EventCellCustom.html"],function(Backbone,$,_,EventCellCustomHtml){

	var EventView = Backbone.View.extend({
		tagName:"tr",

		className:"eventView",


		template:_.template(EventCellCustomHtml),

		initialize: function(options){
			this.$el.html(this.template());
			this.render();
		},

		

		events : {

		},

		render: function() {

			return this;
		}

	});

	return EventView;

});