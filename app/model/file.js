/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	fs = require('fs'),
	Repository = require('./repository');

//文件模型
var FileSchema = mongoose.Schema({ //创建文件模型对象
	contractId: String,
	name: []
});


FileSchema.methods = {

	test: function() {
		console.info("=======test");
	},
	readdir: function(getDir, callback) {
		// var sendInfo = [];
		// var i = 0;
		// console.log("show");
		// sendInfo=fs.readdirSync(getDir);
		// callback(sendInfo);
	}
};


mongoose.model('File', FileSchema); //创建新文件对象,并关联到模型