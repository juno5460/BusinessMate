define(["backbone",
	"jquery",
	"underscore",
	"text!template/EventCellCustom.html",
	"text!template/EventCellPrice.html"
	],function(Backbone,$,_,EventCellCustomHtml,EventCellPriceHtml){

	var EventView = Backbone.View.extend({
		tagName:"tr",

		className:"eventView",

		initialize: function(options){

			if(options.type == '1') {
				this.template = _.template(EventCellCustomHtml);
			} else {
				this.template = _.template(EventCellPriceHtml);
			}

			this.id = options.id;
			this.render();
		},

		events : {
			'click #deleteBtn' : 'deleteEventCell'
		},

		render: function() {
			this.$el.html(this.template()); 
			return this;
		},

		deleteEventCell: function() {
			this.trigger('delete',this.id);
			this.remove();
		},

		toJson:function(){

			return {
			'id':this.id,
			'date': this.$el.find("#d122").val(),
			'remark' : this.$el.find("#remark").val(),
			'price' : this.$el.find("#appendedPrependedInput").val()
				};
		}

	});

	return EventView;

});