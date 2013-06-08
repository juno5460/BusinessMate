var mongoose = require('mongoose');

var get = require('./getData');
var contractData1 = get.returnData1(); //获取数据源
var contractData2 = get.returnData2();

var db = mongoose.connection;
var contractSchema = mongoose.Schema({
	id: String,
	businessName: String,
	beginDate:String,
	endDate:String,
	events: Array,
	state: String
});
var Contract = mongoose.model('Contract', contractSchema);


exports.connectDb = function() {
	mongoose.connect('mongodb://localhost/contractDB');
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback() {
		console.log("helo");
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
		id: 'CA123'
	}, {
		businessname: 'ZZ商务合同'
	}, function() {
		Contract.find({
			id: 'CA123'
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
////修改事件完成标志位,随同会改变状态
exports.checkInfo = function(callback) {
	Contract.find({},{id:1,businessName:1,beginDate:1,endDate:1},function(err, docs) {
		callback(docs);
		db.close();
	});
};

exports.updateSymble = function() {

};