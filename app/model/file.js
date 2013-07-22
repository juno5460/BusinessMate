/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	fs = require('fs'),
	Repository = require('./repository');

//文件模型
var FileSchema = mongoose.Schema({ //创建文件模型对象
	name: String,
	contractId: String
});


FileSchema.methods = {

	test: function() {
		console.info("=======test");
	},
	insertData: function(get, callback) {
		File = this.model('File');
		var file = new File(get);
		file.save();
	},
	upload: function(getName, getData, callback) {
		fs.writeFile(getName, getData, function(err) {
			if (err) throw err;
			console.log('It\'s saved!');
			callback("success");
		});
	},
	download: function(callback) {

	}
};


mongoose.model('File', FileSchema); //创建新文件对象,并关联到模型