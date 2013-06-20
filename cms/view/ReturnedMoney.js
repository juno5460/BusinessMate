define(['jquery','underscore', 'backbone', 'text!template/ReturnedMoney.html'],
 function($, _, Backbone, ReturnedMoneyHtml) {

 	var ReturnedMoney = Backbone.View.extend({
 		tagName: 'div',
 		className: 'returnedMoney',
 		template: _.template(ReturnedMoneyHtml),
 		initialize: function(options) {
 			this.render();
 		},
 		render: function() {
 			this.$el.html(this.template());
 			$("#container3").append(this.el);
 			return this;
 		}

 	});
 	return ReturnedMoney;
});