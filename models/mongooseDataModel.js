var mongoose = require('mongoose');

var get = require('./getData');
var contractData1 = get.returnData1(); //获取数据源
var contractData2 = get.returnData2();

var db = mongoose.connection;
var contractSchema = mongoose.Schema({ //创建合同模型对象
	cid: String, //合同的存储id
	id: String, //合同编号
	businessName: String, //合同名称
	beginDate: String, //开始日期
	endDate: String, //结束日期
	events: Array, //合同事件
	state: String //合同状态
});
var Contract = mongoose.model('Contract', contractSchema); //创建新合同对象,并关联到模型


exports.connectDb = function() {
	mongoose.connect('mongodb://localhost/contractDB');
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback() {
		console.log("hello database");
	});
};
//增
exports.insertData = function(rdata) {
	var contract = new Contract(rdata);
	contract.save();
	db.close();
};
//查
exports.checkData = function(callback) {
	Contract.find(function(err, docs) {
		callback(docs);
		db.close();
	});
};
//改
exports.updateData = function(callback) {
	Contract.update({
		id: 'AC20130405'
	}, {
		"businessName": " 深交所架构改造",
		"state": " 二次谈判",
		"beginDate": "2013-06-10",
		"endDate": "2015-01-01",
		"events": [{
				"remark": "事件32",
				"date": "",
				"title": "事件1",
				"id": "3"
			}, {
				"remark": "事件11",
				"date": "",
				"title": "事件1",
				"id": "3"
			}
		]
	}, function() {
		Contract.find({
			id: 'AC20130405'
		}, function(err, docs) {
			callback(docs);
			db.close();
		});
	});
};
//删
exports.removeData = function(callback) {
	Contract.remove(function() {
		Contract.find({
			id: 'CA123'
		}, function(err, docs) {
			callback(docs);
			db.close();
		});
	});
};
////////////////////////////////////////////////////////////////////////
/////展示全部合同重要信息
exports.checkInfo = function(callback) {
	Contract.find({}, {
		cid: 1,
		id: 1,
		businessName: 1,
		beginDate: 1,
		endDate: 1,
		state: 1
	}, function(err, docs) {
		callback(docs);
		db.close();
	});
};
/////根据指定id展示合同详细信息
exports.checkIdData = function(id, callback) {
	Contract.find(id, function(err, docs) {
//		console.log(docs);
		callback(docs);
		db.close();
	});
};
////修改事件完成标志位,随同会改变状态
//参数
exports.updateSymble = function(id, eventId, callback) {
	Contract.update({
		id: "CA123",
		"events.name": eventId
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
			db.close();
		});
	});
};
///////根据传入id重新编辑合同
//参数:合同id,编辑后的合同json对象
exports.updateIdData = function(id, result, callback) {
	Contract.update({
		cid: id
	}, result, function() {
		Contract.find({
			cid: id
		}, function(err, docs) {
			callback(docs);
			db.close();
		});
	});
};
///////计算一个合同已完成的事件个数,
exports.countComEvent = function(id, callback) {
	Contract.find(id, function(err, docus) {
		var count = 0;
		for (var i = 0; i < docus.events.length; i++) {
			if (docus.events[i].completed === true)
				count = count + 1;
		}
		callback(count);
	});
};