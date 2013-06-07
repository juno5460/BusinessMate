define(["backbone",
	"jquery",
	"underscore",
	"text!template/EventCellCustom.html",
	"text!template/EventCellPrice.html"
	],function(Backbone,$,_,EventCellCustomHtml,EventCellPriceHtml){

	var EventView = Backbone.View.extend({
		tagName:"div",

		className:"form-signin",

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
			this.$el.html(this.template({id:this.id})); 
			return this;
		},

		deleteEventCell: function() {
			this.trigger('delete',this.id);
			this.remove();
		},

		toJson:function(){

			return {
			'id':this.id,
			'title':this.$el.find("input[id^='eventName']").val(),
			'date': this.$el.find("#completedTime").val(),
			'remark' : this.$el.find("#remark").val(),
			'price' : this.$el.find("#appendedPrependedInput").val()
				};
		}

	});

	return EventView;

});