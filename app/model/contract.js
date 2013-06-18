/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Repository = require('./repository');

//事件子模型
var EventsSchema = new Schema({
	id:String,
	title:String,
	remark:String,
	price:Number,
	date:String,
	completed:Boolean
});

//合同模型
var ContractSchema = mongoose.Schema({ //创建合同模型对象
	cid: String, //合同的存储id
	id: String, //合同编号
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
			cid: 1,
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
		Contract.update({
			cid: id
		}, result, function() {
			Contract.find({
				cid: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//根据id删除指定合同
	removeData: function(id, callback) {
		Contract = this.model('Contract');
		Contract.remove({
			cid: id
		}, function() {
			Contract.find({
				cid: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//修改合同事件完成标志,并同时更新合同状态
	updateSymble: function(id, eventId, callback) {
		Contract = this.model('Contract');
		Contract.update({
			cid: id,
			"events.name": eventId
		}, {
			"$set": {
				"events.$.completed": true,
				state: eventId
			}
		}, function() {
			Contract.find({
				cid: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	}
};


Repository.enhanceSchema(ContractSchema);

mongoose.model('Contract', ContractSchema); //创建新合同对象,并关联到模型