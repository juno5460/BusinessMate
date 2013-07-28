/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	fs = require('fs'),
	Repository = require('./repository');



var LogSchema = mongoose.Schema({ //日志模型
	resource: String, //URL
	user: String, //用户名
	time: String, //时间
	operation: String, //操作类型
	data: {}
});


LogSchema.methods = {

	test: function() {
		console.info("=======test");
	},
	insertRecord: function(logData, callback) {

		Log = this.model('Log');
		console.log("insert");
		var log = new Log(logData);
		log.save();
		callback("insertRecord successfully.");
	},
	findAll: function(callback) {

		this.model('Log').find({}, function(err, docs) {
			console.log("====show===");
			console.log(docs);
			callback(docs);
		});
	}
};




mongoose.model('Log', LogSchema); //创建新文件对象,并关联到模型