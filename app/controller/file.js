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
exports.upload = function(req, res) {
	console.log("upload");
	var path = req.files.Filedata.path;
	var fileid = path.substring(path.length - 32, path.length);
	var temp = {
		name: req.files.Filedata.name,
		tempid: fileid
	};
	res.send(temp);
};

//展示合同附件
exports.show = function(req, res) {

	console.log("show");
	var queryId = req.params['id'] + '';
	var getDir = "./files/" + queryId;
	console.log(getDir);
	var get = [];
	var count = 0;
	fs.exists(getDir, function(check) {
		if (check == true) {
			fs.readdir(getDir, function(err, files) {
				console.log(files);
				async.whilst(function() {
					return count < files.length;
				}, function(cb) {
					var data = fs.readFileSync(getDir + '/' + files[count]);
					get[count] = {
						"name": files[count],
						"size": parseFloat(data.length / 1024)
					};
					console.log(get[count]);
					count++;
					cb();
				}, function(err) {
					if (err != undefined)
						console.log(err);
				});
				res.send(get);
			});
		} else {
			res.send("cannot get the file");
		}
	});
};

//下载文件
exports.download = function(req, res) {

	// var getId = req.contractId;
	// var getName = req.name;
	// var pathname = "./files/" + getId + "/" + getName;
	console.log(req.query.contractId);
	console.log(req.query.fileName);

	var getId = req.query.contractId;
	var getName = req.query.fileName;
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

//删除文件
exports.destroy=function(req,res){

	console.log("destroy");
	var getId = req.query.contractId;
	var getName = req.query.fileName;
	var getDir='./files/'+getId+'/'+getName;
	fs.unlink(getDir,function(){
		console.log("delete file success.");
		res.send("delete file success.");
	});
};

exports.test = function(req, res) {
	console.log("test");
    console.log("destroy");
	var getId = '51ef3b16ff0e39ae05000006';
	var getName = '1.jpg';
	var getDir='./files/'+getId+'/'+getName;
	fs.unlinkSync(getDir,function(){
		console.log("delete file success.");
	});
};