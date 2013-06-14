define([
		"backbone",
		"jquery",
		"underscore",
		"json2",
		"view/EventView",
		'model/EventCell',
		'text!template/ContractViewAddAndEdit.html',
		'view/ContractListView',
		'model/EventCell',
		'model/Contract',
		'js/bootstrap-datetimepicker.min',
		'js/bootstrap-dropdown', 'config/config'
], function(Backbone, $, _, json, EventView, EventCell, ContractViewAddAndEditHtml, ContractListView, EventModel, ContractModel, datetimepicker, dropdown, Config) {

	var ContactViewAdd = Backbone.View.extend({


		tagName: 'div',

		template: _.template(ContractViewAddAndEditHtml),

		model: new ContractModel(),

		initialize: function(options) {


			this.$contractURL = Config.server + "/contracts";

			this.$containerView = $("#container");
			this.eventsGroup = new Array();

			this.listenTo(this.model, 'change', this.onModelChange);

			var tmpModel = this.model;
			this.$mode = options.mode;
			//判断是否是修改模式，如果是的话则从服务器获取数据，否则创建一个空白的模型。
			if (this.$mode == 'edit') {
				$.get(this.$contractURL + "/" + options.cid, function(data, status) {
					var c = data[0];
					console.info(c.events.length);

					if (c == null)
						return;

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
			'click #back': 'onBackBtnClick',
		},


		render: function() {

			this.$el.html(this.template(this.model.toJSON()));
			this.$eventList = this.$("#eventsBoard");



			var events = this.model.get('events');
			if (events != null) {

				this.eventsGroup = new Array();

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
			}

			return this;

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
			$postBody.events = events.length == 0 ? [] : events;

			if (this.$mode == 'edit') {
				$.ajax({
					type: "PUT",
					url: Config.server + "/contracts/" + $postBody.cid,
					data: $postBody
				});
			} else {
				$.post(this.$contractURL, $postBody);
			}

			//Backbone.Router.navigate('contracts', {trigger: true});
		},
		removeEventCell: function(id) {
			this.eventsGroup = _.reject(this.eventsGroup, function(view) {
				return view.model.id == id;
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
		onBackBtnClick: function() {
			//Backbone.Router.navigate('contracts', {trigger: true});
		},
		encryption: function() {

			//生成唯一ID号
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