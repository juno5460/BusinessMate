define(['jquery', 'underscore', 'backbone', 'text!template/ReturnedMoney.html'], 
	function($, _, Backbone, ReturnedMoneyHtml) {

	var WaitBackMoney = Backbone.View.extend({

		tagName: 'div',

		className: 'returnedMoney',

		template: _.template(ReturnedMoneyHtml),

		initialize: function(options) {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			$("#container4").html("");
			$("#container4").append(this.el);
			return this;
		}

	});
	return WaitBackMoney;
});