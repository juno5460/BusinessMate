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
	Template = mongoose.model('Template'),
	File = mongoose.model('File');

//返回文件id
exports.send = function(req, res) {
	console.log("sendid");
	var temp = {
		name: req.files.Filedata.name,
		tempid: req.files.Filedata.path
	};
	console.log(temp);
	res.send(temp);
};

//展示合同附件
exports.show = function(req, res) {
	var file = new File();
	var getDir="./files/123";
	file.readdir(getDir, function(data) {
		res.send(data);
	});
};
//上传文件
exports.upload = function(req, res) {
	console.log("upload");
	console.log(req.files.Filedata.path);
	var get = {
		name: req.files.Filedata.name,
		contractId: "1234567",
		tempPath: req.files.Filedata.path
	};
	var userInfo = {
		"uid": req.uid,
		"name": req.files.Filedata.name
	};
	var getDir = "./files/" + get.contractId;
	var getName = "./files/" + get.contractId + "/" + get.name;
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
			fs.readFile(get.tempPath, function(err, data) {
				fs.writeFile(getName, data, function(err) {
					console.log("success save");
				});
			});
		}
	});
};

//下载文件
exports.download = function(req, res) {

	// var getId = req.contractId;
	// var getName = req.name;
	// var pathname = "./files/" + getId + "/" + getName;

	var getId = "1234567";
	var getName = "i3开发基础教程代码.zip";
	var pathname = "./files/" + getId + "/" + getName;
	// var pathname = "./files/1234567/message.doc";

	var types = {
		"css": "text/css",
		"gif": "image/gif",
		"html": "text/html",
		"ico": "image/x-icon",
		"jpeg": "image/jpeg",
		"jpg": "image/jpeg",
		"js": "text/javascript",
		"json": "application/json",
		"pdf": "application/pdf",
		"png": "image/png",
		"svg": "image/svg+xml",
		"swf": "application/x-shockwave-flash",
		"tiff": "image/tiff",
		"txt": "text/plain",
		"wav": "audio/x-wav",
		"wma": "audio/x-ms-wma",
		"wmv": "video/x-ms-wmv",
		"xml": "text/xml",
		"zip": "application/zip"
	};
	var fileText = getName.substring(getName.lastIndexOf("."), getName.length);

	var fileAfterName = fileText.toLowerCase(); //获取到文件后缀名

	console.log(fileAfterName);
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
					res.header('Content-Disposition', 'attachment;filename=' + getName);
					res.writeHead(200, {
						'Content-Type': types.fileAfterName
						// 'Content-Encoding': 'jpg',
						// 'Content-Type': 'text/html'
					});

					res.write(file, "binary");

					res.end();
				}
			});
		}
	});
	console.log("download");
};


exports.test = function(req, res) {
	console.log("test");

};