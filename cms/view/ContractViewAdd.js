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
	Config) {

	var ContactViewAdd = Backbone.View.extend({


		tagName: 'div',

		template: _.template(ContractViewAddAndEditHtml),

		model: new ContractModel(),

		initialize: function(options) {

			this.$containerView = $("#container");

			this.eventsGroup = new Array();

			this.listenTo(this.model, 'change', this.onModelChange);

			var tmpModel 	= this.model;
			this.$mode 		= options.mode;

			//判断是否是修改模式，如果是的话则从服务器获取数据，否则创建一个空白的模型。
			if (this.$mode == 'edit') {
				$.get(Config.Server( "contracts/" + options.id), function(data, status) {
					var c = data[0];
					console.info(c);

					if (c == null)
						return;

					tmpModel.set({
						_id				: c._id,
						myId 			: c.myId,
						businessName 	: c.businessName,
						beginDate 		: c.beginDate,
						endDate 		: c.endDate,
						state 			: c.state,
						events 			: c.events
					});
				});
			} else {
				this.model = new ContractModel();
			}

			this.render();

		},

		events: {
			'click #submit'					: 'submit',
			'click #dropdown_customEvent'	: 'onDropDownCusomEventClick',
			'click #dropdown_priceEvent'	: 'onDropDownPriceEventClick',
			'click #back'					: 'onBackBtnClick',
			'blur #contractId'				: 'idValidate'
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
							type	: events[i].price != -1 ? 2 : 1,
							id 		: events[i].id,
							title 	: events[i].title,
							price 	: events[i].price,
							remark 	: events[i].remark,
							date 	: events[i].date,
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

			//从网页中提取已经输入的数据
			var $contractId 	= $("#contractId").val();
			var $beginDate 		= $("#beginDate").val();
			var $endDate		= $("#endDate").val();
			var $contractState 	= $("#contractState").val();
			var $contractName 	= $("#contractName").val();

			var events = []; //将动态添加的事件转成JSON数组用作提交
			_.each(this.eventsGroup, function(view) {
				events.push(view.toJson());
			});

			this.model.set('_id','111111000000');
			this.model.set('myId',$contractId);
			this.model.set('businessName',$contractName);
			this.model.set('state',$contractState);
			this.model.set('beginDate',$beginDate);
			this.model.set('endDate',$endDate);
			this.model.set('events',events.length == 0 ? [] : events);

			this.model.save();
			console.info("debugger");
			//Backbone.Router.navigate('contracts', {trigger: true});
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
					type	: 2,
					id 		: this.encryption(),
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

			if(target.val().trim() == ''){
				target.parent().removeClass();
				target.parent().addClass("input-prepend control-group warning");
				return;
			}

			if (/.*[\u4e00-\u9fa5]+.*$/.test(target.val()))
			{
				console.info("包含中文字段");
				target.parent().removeClass();
				target.parent().addClass("input-prepend control-group error");
			} else {
				target.parent().removeClass();
				target.parent().addClass("input-prepend control-group success");
			}



		},
		validate:function(){
			var $contractId 	= $("input[id^='contractId']").val();
			var $beginDate 		= $("#beginDate").val();
			var $endDate		= $("#endDate").val();
			var $contractState 	= $("input[id^='contractState']").val();
			var $contractName 	= $("input[id^='contractName']").val();


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