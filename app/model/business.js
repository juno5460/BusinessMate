/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	async = require('async'),
	fs = require('fs'),
	Repository = require('./repository');



var BusinessSchema = mongoose.Schema({ //业务日志模型
	contractName: String, //合同名
	contractId: String, //合同id
	time: String, //时间
	getNew: Number, //版本
	data: {}
});


BusinessSchema.methods = {
	test: function() {
		console.info("=======test");
	},
	insertBusiness: function(logData, callback) {

		Business = this.model('Business');
		console.log("insert");
		business = new Business(logData);
		business.save();
		callback("insertBusiness successfully.");
	},
	findBusiness: function(getId, callback) { ///传入版本id,组建新版本
		Business = this.model('Business');
		Business.find({
			_id: getId
		}, {
			contractId: 1,
			contractName: 1,
			time: 1,
			getNew: 1,
			data: 1
		}, function(err, ver) {
			callback(ver);
		});
	},
	findVersionId: function(getId, callback) { ///传入合同id,找到版本最大的合同,返回版本id
		console.log("findVersionId");
		Business = this.model('Business');
		var max = 0;
		var returnId = "";
		Business.find({
			contractId: getId
		}, {
			_id: 1,
			getNew: 1
		}, function(err, vers) {
			async.forEach(vers, function(ver) {
				if (ver.getNew > max || ver.getNew == max) {
					returnId = ver._id;
					max = ver.getNew;
				}
			});
			console.log(returnId);
			callback(returnId);
		});
	},
	findAllBusiness: function(callback) {

		this.model('Business').find({}, function(err, docs) {
			console.log("====show===");
			console.log(docs);
			callback(docs);
		});
	}
};

mongoose.model('Business', BusinessSchema); //创建新文件对象,并关联到模型