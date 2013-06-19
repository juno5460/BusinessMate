/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Repository = require('./repository');

//事件子模型
var EventsSchema = new Schema({
	id: String,
	title: String,
	remark: String,
	price: Number,
	date: String,
	completed: Boolean
});

//合同模型
var ContractSchema = mongoose.Schema({ //创建合同模型对象
	myId: String, //合同编号
	businessName: String, //合同名称
	beginDate: String, //开始日期
	endDate: String, //结束日期
	events: [EventsSchema], //合同事件
	state: String //合同状态
});


ContractSchema.methods = {
	test: function() {
		console.info("=======test");
	},
	//展示所有合同重要信息
	checkInfo: function(callback) {
		this.model('Contract').find({}, {
			_id: 1,
			myId: 1,
			id: 1,
			businessName: 1,
			beginDate: 1,
			endDate: 1,
			state: 1
		}, function(err, docs) {
			callback(docs);
		});
	},
	//根据id展示指定合同详细信息
	checkIdData: function(id, callback) {
		this.model('Contract').find(id, function(err, docs) {
			console.log("====show===");
						console.log(docs);
			callback(docs);
		});
	},
	//新建合同插入数据库
	insertData: function(rdata) {
		Contract = this.model('Contract');
		var contract = new Contract(rdata);
		contract.save();
	},
	//根据id修改指定合同
	updateIdData: function(id, result, callback) {
		Contract = this.model('Contract');
		console.log(id);
		Contract.update(id, result, function() {
			Contract.find(id, function(err, docs) {
				callback(docs);
			});
		});
	},
	//根据id删除指定合同
	removeData: function(id, callback) {
		Contract = this.model('Contract');
		Contract.remove({
			_id: id
		}, function() {
			Contract.find({
				_id: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//修改合同事件完成标志,并同时更新合同状态
	/*
	 * id:合同id
	 * eventId:事件id
	 * eventName:事件名称 (方便跟踪合同状态)
	 * callback:回调返回数据
	 */
	updateSymble: function(id, eventId, eventName, callback) {
		Contract = this.model('Contract');
		Contract.update({
			_id: id,
			"events.id": eventId
		}, {
			"$set": {
				"events.$.completed": true,
				state: eventName
			}
		}, function() {
			Contract.find({
				_id: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//计算所有合同的事件回收金额
	/*
	 *calback:回调返回数据
	 */
	countGetMoney: function(callback) {
		var count = 0;
		Contract = this.model('Contract');

		Contract.find({}, function(err, docs) {
			docs.forEach(function(doc) {
				for (var i = 0; i < doc.events.length; i++) { //遍历单个合同的事件数组
					if (doc.events[i].price > 0 && doc.events[i].completed == true)
					///假如该事件已完成并且该事件为回款事件的话,获取回款金额
						count = count + doc.events[i].price;
				}
				console.log(doc.events);
			});
			callback(count);
		});
	},
};


Repository.enhanceSchema(ContractSchema);

mongoose.model('Contract', ContractSchema); //创建新合同对象,并关联到模型