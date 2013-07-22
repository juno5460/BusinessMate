/***
 *  任务测试接口
 *
 *
 ****/

var async = require('async'),
	fs = require('fs'),
	path = require('path'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract'),
	File = mongoose.model('File'),
	Template = mongoose.model('Template');


//上传文件
exports.upload = function(req, res) {
	console.log("upload");
	var file = new File();
	var get = {
		name: req.files.Filedata.name,
		contractID: "1234567",
		tempPath: req.files.Filedata.path
	};
	var getDir = "./files/" + get.contractID;
	var getName = "./files/" + get.contractID + "/" + get.name;
	fs.exists(getDir, function(check) {
		if (check) {
			console.log("upload");
			fs.readFile(get.tempPath, function(err, data) {
				fs.writeFile(getName, data, function(err) {
					console.log("success save");
				});
			});
		} else {
			fs.mkdirSync(getDir, 0777);
			console.log("upload");
			fs.readFile(get.name, function(err, data) {
				fs.writeFile(getName, data, function(err) {
					console.log("success save");
				});
			});
		}
	});
};

//下载文件
exports.download = function(req, res) {
	//	var pathname = url.parse(request.url).pathname;
	//	var realPath = "assets" + pathname;
	var pathname = "./files/1234567/message.doc";
	//	var realPath = "assets" + pathname;
	path.exists(pathname, function(exists) {
		if (!exists) {
			res.writeHead(404, {
				'Content-Type': 'text/plain'
			});
			response.write("This request URL " + pathname + " was not found on this server.");
			response.end();
		} else {
			fs.readFile(pathname, "binary", function(err, file) {
				if (err) {
					res.writeHead(500, {
						'Content-Type': 'text/plain'
					});

					res.end(err);
				} else {
					res.writeHead(200, {
						'Content-Type': 'text/plain'
					});

					res.write(file, "binary");

					res.end();
				}
			});
		}
	});
	console.log("download");
};

//展示合同附件
exports.show = function(req, res) {
	console.log("show");
};
exports.test = function(req, res) {
	console.log("test");
	//	console.log(req);
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
			console.log("test");
			file.upload(getName, getData, function(data) {
				console.log(data);
			});
		} else {
			fs.mkdirSync(getDir, 0777);
			console.log("test");
			file.upload(getName, getData, function(data) {
				console.log(data);
			});
		}
	});
};