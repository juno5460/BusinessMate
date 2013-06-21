define(['jquery', 'underscore', 'backbone', 'text!template/ReturnedMoney.html'], 
	function($, _, Backbone, ReturnedMoneyHtml) {

	var ShouldGetMoney = Backbone.View.extend({

		tagName: 'div',

		className: 'returnedMoney',

		template: _.template(ReturnedMoneyHtml),

		initialize: function(options) {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			$("#container5").html("");
			$("#container5").append(this.el);
			return this;
		}

	});
	return ShouldGetMoney;
});