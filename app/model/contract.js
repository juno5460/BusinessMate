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
	partyA: String, //签署甲方
	partyB: String, //签署乙方
	amount: Number, //金额
	returnRatio: Number, //回款比率
	returnAmount: Number, //回款金额
	signDate: String, //签署日期
	name: String, //合同名称
	tName: String, //合同模版名称
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
			name: 1,
			amount: 1,
			returnRatio: 1,
			returnAmount: 1,
			partyA: 1,
			partyB: 1,
			beginDate: 1,
			endDate: 1,
			state: 1
		}, function(err, docs) {
			callback(docs);
		});
	},
	//展示所有合同模版重要信息
	checkTemplateInfo: function(callback) {
		this.model('Template').find({}, {
			_id: 1,
			tName: 1
		}, function(err, docs) {
			callback(docs);
		});
	},
	//根据id展示指定合同详细信息
	/*
	 * id:合同<_id,id>
	 * callback:回调返回数据
	 */
	checkIdData: function(id, callback) {
		this.model('Contract').find(id, function(err, docs) {
			console.log("====show===");
			console.log(docs);
			callback(docs);
		});
	},
	//根据id展示指定合同详细信息
	/*
	 * id:合同模版<_id,id>
	 * callback:回调返回数据
	 */
	checkIdTemplate: function(id, callback) {
		this.model('Template').find(id, function(err, docs) {
			console.log("====show===");
			console.log(docs);
			callback(docs);
		});
	},
	//新建合同插入数据库
	/*
	 * rdata:要保存的合同对象
	 */
	insertData: function(rdata) {
		Contract = this.model('Contract');
		console.log("insert");

		var contract = new Contract(rdata);
		contract.save();
	},
	//新建合同模版插入模版数据库
	/*
	 * rdata:要保存的合同对象
	 */
	insertTemplate: function(rdata) {
		Template = this.model('Template');
		console.log("insert");

		var template = new Template(rdata);
		template.save();
	},
	//根据id修改指定合同
	/*
	 * id:合同<_id,id>
	 * result:传递要修改的字段JSON对象
	 * callback:回调返回数据
	 */
	updateIdData: function(id, result, callback) {
		Contract = this.model('Contract');
		console.log(id);

		Contract.update(id, result, function() {
			Contract.find(id, function(err, docs) {
				callback(docs);
			});
		});
	},
	//根据id修改指定合同模版
	/*
	 * id:合同模版<_id,id>
	 * result:传递要修改的字段JSON对象
	 * callback:回调返回数据
	 */
	updateIdTemplate: function(id, result, callback) {
		Template = this.model('Template');
		console.log(id);

		Template.update(id, result, function() {
			Template.find(id, function(err, docs) {
				callback(docs);
			});
		});
	},
	//根据id删除指定合同
	/*
	 * id:合同<_id,id>
	 * callback:回调返回数据
	 */
	removeData: function(id, callback) {
		Contract = this.model('Contract');

		Contract.remove(id, function() {
			Contract.find({
				_id: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//根据id删除指定合同模版
	/*
	 * id:合同模版<_id,id>
	 * callback:回调返回数据
	 */
	removeTemplate: function(id, callback) {
		Template = this.model('Template');

		Template.remove(id, function() {
			Template.find(id, function(err, docs) {
				callback(docs);
			});
		});
	},
	//清空contracts容器接口
	removeAllData: function(callback) {
		Contract = this.model('Contract');
		Contract.remove({}, function() {
			Contract.find({}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//修改合同事件完成标志,并同时更新合同状态
	/*
	 * id:合同id
	 * eventId:事件id
	 * eventName:事件名称 (或是状态名称,方便跟踪合同状态)
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
		var allCount = 10000000;
		Contract = this.model('Contract');

		Contract.find({}, function(err, docs) {
			docs.forEach(function(doc) {
				for (var i = 0; i < doc.events.length; i++) { //遍历单个合同的事件数组
					//	if (doc.events[i].price > 0 && doc.events[i].completed == true)
					if (doc.events[i].price > 0)
						count = count + doc.events[i].price;
				}
				console.log(doc.events);
			});
			console.log(parseFloat(4 / 10));
			callback(count);
		});
	},
	//根据合同id,展示所有未完成事件
	/*
	 *id:合同id
	 *calback:回调返回数据
	 */
	checkUndoneEvents: function(id, callback) {
		Contract = this.model('Contract');
		var send = [];
		var j = 0;

		Contract.find({
			_id: id
		}, function(err, docs) {
			docs.forEach(function(doc) {
				for (var i = 0; i < doc.events.length; i++) { //遍历该合同数组
					if (doc.events[i].completed == false) {
						send[j] = doc.events[i]; //当状态为未完成状态,取出
						j++;
					}
				}
				console.log(send);
				callback(send);
			});
		});
	}
};


Repository.enhanceSchema(ContractSchema);

mongoose.model('Contract', ContractSchema); //创建新合同对象,数据库中对应contracs容器
mongoose.model('Template', ContractSchema); //创建合同模版对象,对应templates容器