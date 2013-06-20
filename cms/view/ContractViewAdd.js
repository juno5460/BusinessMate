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
		'model/Template',
		'collections/TemplateItems',
		'config/config',
		'js/bootstrap-datepicker',
		'js/bootstrap'

], function(Backbone,
	$,
	_,
	json,
	EventView,
	EventCell,
	ContractViewAddAndEditHtml,
	ContractListView,
	EventModel,
	ContractModel,
	TemplateModel,
	TemplateItems,
	Config) {

	var ContactViewAdd = Backbone.View.extend({


		tagName: 'div',

		template: _.template(ContractViewAddAndEditHtml),

		initialize: function(options) {

			this.model = new ContractModel();

			this.$containerView = $("#container");

			this.eventsGroup = new Array();

			this.$mode = options.mode;


			this.listenTo(this.model, 'change', this.onModelChange);
			this.listenTo(TemplateItems, 'reset', this.onTemplateItemsLoaded);

			//判断是否是修改模式，如果是的话则从服务器获取数据，否则创建一个空白的模型。
			if (this.$mode == 'edit') {
				this.model.set('_id', options.id);
				this.model.fetch();
			}

			this.render();
		},

		events: {
			'click #submit': 'submit',
			'click #dropdown_customEvent': 'onDropDownCusomEventClick',
			'click #dropdown_priceEvent': 'onDropDownPriceEventClick',
			'click #back': 'onBackBtnClick',
			'click #saveAsTemplate': 'onSaveAsTemplateClick',
			'blur #contractId': 'idValidate'
		},


		render: function() {

			this.$el.html(this.template(this.model.toJSON()));
			var self = this;
			TemplateItems.fetch({
				success: function(collection, response) {

					$("#templateList").html("");

					collection.each(function(item) {
						$li = $("<li><a data-target='#'>" + item.get('tName') + "</a></li>");
						$li.click(function() {
							self.listenToOnce(item, 'change', self.onTemplateLoaded);
							item.fetch();
						});
						$("#templateList").append($li);
					});
				},
				error: function() {
					alert('error');
				}
			});

			this.$eventList = this.$("#eventsBoard");

			var events = this.model.get('events');
			if (events != null) {

				this.eventsGroup = new Array();

				for (var i = 0; i < events.length; i++) {
					var view = new EventView({
						model: new EventModel({
							type: events[i].price != -1 ? 2 : 1,
							id: events[i].id,
							title: events[i].title,
							price: events[i].price,
							remark: events[i].remark,
							date: events[i].date,
							completed: events[i].completed
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

			this.buildModel(this.model);
			this.model.save();
			console.info("debugger");
			//Backbone.Router.navigate('contracts', {trigger: true});
		},
		buildModel: function(model) {
			//从网页中提取已经输入的数据
			var $contractId = $("#contractId").val();
			var $name = $("#name").val();
			var $partyA = $("#partyA").val();
			var $partyB = $("#partyB").val();
			var $signDate = $("#signDate").val();
			var $beginDate = $("#beginDate").val();
			var $endDate = $("#endDate").val();
			var $amount = $("#amount").val();
			var $contractState = $("#contractState").val();

			var events = []; //将动态添加的事件转成JSON数组用作提交
			_.each(this.eventsGroup, function(view) {
				events.push(view.toJson());
			});

			model.set('myId', $contractId);
			model.set('name', $name);
			model.set('partyA', $partyA);
			model.set('partyB', $partyB);
			model.set('signDate', $signDate);
			model.set('amount', $amount);
			model.set('state', $contractState);
			model.set('beginDate', $beginDate);
			model.set('endDate', $endDate);
			model.set('events', events.length == 0 ? [] : events);

			console.info("提交的合同数据:", model);

		},
		removeEventCell: function(id) {
			this.eventsGroup = _.reject(this.eventsGroup, function(view) {
				return view.model.id == id;
			});
		},
		onDropDownCusomEventClick: function() {
			var view = new EventView({
				model: new EventModel({
					type: 1,
					id: this.encryption(),
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
					id: this.encryption(),
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
		onSaveAsTemplateClick: function() {
			var template = new TemplateModel();
			this.buildModel(template);
			template.set('tName', template.get('name'));
			template.save();
		},
		onTemplateItemsLoaded: function(templateItem) {

			$li = $("<li><a data-target='#'>" + templateItem.get('tName') + "</a></li>");
			var self = this;
			$li.click(function() {
				self.listenTo(templateItem, 'change', self.onTemplateLoaded);
				templateItem.fetch();
			});
			$("#templateList").append($li);

		},
		onTemplateLoaded: function(templateItem) {
			this.model = templateItem.clone();
			this.render();
			console.log("a");
		},
		idValidate: function(val) {

			//允许输入删除键
			// if (val.keyCode == 8)
			// 	return true;
			// //允许输入数字和字母
			// if (val.keyCode < 48 || val.keyCode > 90)
			// 	return false;

			// if (val.shiftKey)
			// 	return false;

			// var obj = $("input[id^='contractId']").val();
			// if (/.*[\u4e00-\u9fa5]+.*$/.test(obj)) {
			// 	alert("不能含有汉字！");
			// 	return false;
			// }
			// return true;

			var target = $(val.currentTarget);

			if (target.val().trim() == '') {
				target.parent().removeClass();
				target.parent().addClass("input-prepend control-group warning");
				return;
			}

			if (/.*[\u4e00-\u9fa5]+.*$/.test(target.val())) {
				console.info("包含中文字段");
				target.parent().removeClass();
				target.parent().addClass("input-prepend control-group error");
			} else {
				target.parent().removeClass();
				target.parent().addClass("input-prepend control-group success");
			}



		},
		validate: function() {
			var $contractId = $("input[id^='contractId']").val();
			var $beginDate = $("#beginDate").val();
			var $endDate = $("#endDate").val();
			var $contractState = $("input[id^='contractState']").val();
			var $name = $("input[id^='name']").val();


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