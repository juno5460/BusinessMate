/***
 *  任务测试接口
 *
 *
 ****/

var async = require('async'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract'),
	File = mongoose.model('File'),
	Template = mongoose.model('Template');

exports.upload = function(req, res) {
	console.log(res.body);
	/*
	var file = new File();
	var get = {
		name: "message.doc",
		contractID: "123456",
		fileContent:"hello upload!!!"
	};
	var getName = "./files/"+get.contractID+"/"+get.name;
	var getData = get.fileContent;
	console.log("upload");
	file.upload(getName, getData, function(data) {
		console.log(data);
	});
*/
};
exports.download = function(req, res) {
	var file = new File();
	var get = {
		name: "message.doc",
		contractID: "1234567",
		fileContent: "hello upload!!!"
	};
	var getDir = "./files/" + get.contractID;
	var getName = "./files/" + get.contractID + "/" + get.name;
	var getData = get.fileContent;
	fs.exists(getDir, function(check) {
		if (check) {
			console.log("upload");
			file.upload(getName, getData, function(data) {
				console.log(data);
			});
		} else {
			fs.mkdirSync(getDir, 0777);
			console.log("upload");
			file.upload(getName, getData, function(data) {
				console.log(data);
			});
		}
	});
	console.log("download");
};