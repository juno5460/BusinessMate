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

		var send = [];
		var i = 0;

		this.model('Business').find({}, function(err, docs) {
			docs.forEach(function(doc) {
				var myDate = new Date(doc.time);
				var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
				var month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
				var day = myDate.getDate(); //获取当前日(1-31)
				var hour = myDate.getHours(); //获取当前小时数(0-23)
				var minute = myDate.getMinutes(); //获取当前分钟数(0-59)
				var second = myDate.getSeconds(); //获取当前秒数(0-59)
				var millSecond = myDate.getMilliseconds(); //获取当前毫秒数(0-999)
				month = month < 10 ? "0" + month : month;
				day = day < 10 ? "0" + day : day;
				hour = hour < 10 ? "0" + hour : hour;
				minute = minute < 10 ? "0" + minute : minute;
				second = second < 10 ? "0" + second : second;
				millSecond = millSecond < 100 ? (millSecond < 10 ? "00" + millSecond : "0" + millSecond) : millSecond;
				var uniqueNum = year +"-"+ month +"-"+ day +" "+ hour +":"+ minute +":"+ second;
				var get = {

					contractId: doc.contractId,
					contractName: doc.contractName,
					time: uniqueNum,
					getNew: doc.getNew,
					data: doc.data

				};
				send[i]=get;
				i++;
			});
			console.log("....=="+send);
			callback(send);
		});
	}
};

mongoose.model('Business', BusinessSchema); //创建新文件对象,并关联到模型