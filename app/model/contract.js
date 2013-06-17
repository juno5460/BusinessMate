/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Repository = require('./repository');



var ContractSchema = mongoose.Schema({ //创建合同模型对象
	cid: String, //合同的存储id
	id: String, //合同编号
	businessName: String, //合同名称
	beginDate: String, //开始日期
	endDate: String, //结束日期
	events: Array, //合同事件
	state: String //合同状态
});


ContractSchema.methods = {
	test: function() {
		console.info("=======test");
	},
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
	checkIdData: function(id, callback) {
		this.model('Contract').find(id, function(err, docs) {
			console.log("====show===");
			callback(docs);
		});
	},
	insertData: function(rdata) {
		Contract = this.model('Contract');
		var contract = new Contract(rdata);
		contract.save();
	},
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
	updateSymble: function(id, eventId, callback) {
		Contract = this.model('Contract');
		Contract.update({
			id: "CA123",
			"events.name": "第一事件"
		}, {
			"$set": {
				"events.$.completed": true,
				state: eventId
			}
		}, function() {
			Contract.find({
				id: 'CA123'
			}, function(err, docs) {
				callback(docs);
			});
		});
	}
};


Repository.enhanceSchema(ContractSchema);

mongoose.model('Contract', ContractSchema); //创建新合同对象,并关联到模型