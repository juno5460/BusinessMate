define([
		"backbone",
		"jquery",
		"underscore",
		"json2",
		"view/EventView",
		'model/EventCell',
		'text!template/ContractViewAdd.html',
		'view/ContractListView',
		'model/EventCell',
		'model/Contract',
		'js/bootstrap-datetimepicker.min',
		'js/bootstrap-dropdown'
], function(Backbone, $, _, json, EventView, EventCell, ContractViewAddHtml, ContractListView, EventModel, ContractModel) {

	var ContactViewAdd = Backbone.View.extend({


		tagName: 'div',

		template: _.template(ContractViewAddHtml),

		model: new ContractModel(),

		initialize: function(options) {

			this.$containerView = $("#container");
			this.eventsGroup = new Array();

			this.listenTo(this.model, 'change', this.onModelChange);

			var tmpModel = this.model;
			this.$mode = options.mode;
			if (this.$mode == 'edit') {
				$.get("http://10.108.1.67:3000/contracts/" + options.cid, function(data, status) {
					var c = data[0];
					tmpModel.set({
						id: c.id,
						cid: options.cid,
						businessName: c.businessName,
						beginDate: c.beginDate,
						endDate: c.endDate,
						state: c.state,
						events: c.events
					});
				});
			} else {
				this.model = new ContractModel();
			}

			this.render();

		},

		events: {
			'click #submit': 'submit',
			'click #dropdown_customEvent': 'onDropDownCusomEventClick',
			'click #dropdown_priceEvent': 'onDropDownPriceEventClick',
		},


		render: function() {

			this.$el.html(this.template(this.model.toJSON()));
			this.$eventList = this.$("#eventsBoard");

			var events = this.model.get('events');
			for (var i = 0; i < events.length; i++) {
				var view = new EventView({
					model: new EventModel({
						type: events[i].price ? 2 : 1,
						id: events[i].id,
						title: events[i].title,
						price: events[i].price,
						remark: events[i].remark,
						date: events[i].date
					})
				});
				this.listenTo(view, 'delete', this.removeEventCell);
				this.eventsGroup.push(view);
				this.$eventList.append(view.el);
			}

		},
		presentView: function(view) {
			this.$containerView.append(view.el);
			this.remove();
		},
		submit: function() {
			var $contractId = $("input[id^='contractId']").val();
			var $beginDate = $("#beginDate").val();
			var $endDate = $("#endDate").val();
			var $contractState = $("input[id^='contractState']").val();
			var $contractName = $("input[id^='contractName']").val();

			var events = [];
			_.each(this.eventsGroup, function(view) {
				events.push(view.toJson());
			});

			$postBody = {};
			$postBody.cid = this.model.get('cid') == '' ? this.encryption() : this.model.get('cid');
			$postBody.id = $contractId;
			$postBody.businessName = $contractName;
			$postBody.state = $contractState;
			$postBody.beginDate = $beginDate;
			$postBody.endDate = $endDate;
			$postBody.completed = false;
			$postBody.events = events;


			if (this.$mode == 'edit') {
				$.ajax({
					type: "PUT",
					url: "http://10.108.1.67:3000/contracts/1",
					data: $postBody,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
				});

				return;
			}


			$.post("http://10.108.1.67:3000/contracts", $postBody);
				//this.$containerView.append(new ContractListView().el);
			},
			removeEventCell: function(id) {
				this.eventsGroup = _.reject(this.eventsGroup, function(view) {
					return view.id == id;
				});
				console.info(this.eventsGroup);
			},
			onDropDownCusomEventClick: function() {
				var view = new EventView({
					model: new EventModel({
						type: 1,
						id: this.eventsGroup.length
					})
				});
				this.listenTo(view, 'delete', this.removeEventCell);
				this.eventsGroup.push(view);
				this.$eventList.append(view.el);
			},
			onDropDownPriceEventClick: function() {
				var view = new EventView({
					model: new EventModel({
						type: 2,
						id: this.eventsGroup.length
					})
				});
				this.listenTo(view, 'delete', this.removeEventCell);
				this.eventsGroup.push(view);
				this.$eventList.append(view.el);
			},
			onModelChange: function() {
				this.render();
			},
			encryption: function() {
				var date = new Date();
				var times1970 = date.getTime();
				var times = date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
				var encrypt = times * times1970;
				if (arguments.length == 1) {
					return arguments[0] + encrypt;
				} else {
					return encrypt;
				}
			}

		});

	return ContactViewAdd;

	});