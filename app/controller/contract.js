/***
 *  合同操作接口
 *
 *
 ****/

var async = require('async'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract'),
	Business = mongoose.model('Business'),
	Log = mongoose.model('Log'),
	fs = require('fs'),
	path = require('path'),
	File = mongoose.model('File');


exports.index = function(req, res) {
	/******/
	console.log('index');
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	if (req.user == undefined) {
		res.redirect('/login');
	} else {
		contract.checkInfo(function(data) {
			console.log("hello");
			res.send(data);
		});
	}
	/******/

};


exports.show = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	console.log("show");
	var queryId = req.params['id'] + '';
	console.log(req.params.id);
	if (queryId.length == 24) {
		var getId = {
			_id: queryId
		};
		console.log("checkIdData");
		contract.checkIdData(getId, function(data) {
			return res.send(data[0]);
		});
	} else {
		console.log("fuzzySearch");
		contract.fuzzySearch(queryId, function(data) {
			return res.send(data[0]);
		});
	}
};



exports.create = function(req, res) {
	console.log('login', req.user);
	var occur = new Date();
	// console.log(req);
	console.log(occur);
	var contract = new Contract();
	var business = new Business();
	var rdata = req.body;
	var saveData = {
		uid: req.user.uid, //用户id,对应用户模型的uid
		myId: rdata.myId, //合同编号
		partyA: rdata.partyA, //签署甲方
		partyAabbr: rdata.partyAabbr,
		partyADept: rdata.partyADept,
		partyB: rdata.partyB, //签署乙方
		partyBabbr: rdata.partyBabbr,
		partyBDept: rdata.partyBDept,
		amount: rdata.amount, //金额
		returnRatio: rdata.returnRatio, //回款比率
		returnAmount: rdata.returnAmount, //回款金额
		lastReturnDate: rdata.lastReturnDate, //上次回款日期
		signDate: rdata.signDate, //签署日期
		name: rdata.name, //合同名称
		tName: rdata.tName, //合同模版名称
		beginDate: rdata.beginDate, //开始日期
		endDate: rdata.endDate, //结束日期
		events: rdata.events, //合同事件
		state: rdata.state, //合同状态
		next: rdata.next, //待办任务
		file: rdata.file
	};
	console.log("start====");
	console.log(saveData.file);
	console.log(saveData);
	contract.insertData(saveData, function(identify) {
		console.log("starting....");
		console.log(identify);
		var contract = new Contract();
		contract.upload(saveData.file, identify[0]._id, function(data) {
			console.log(data);
			var occur = new Date();
			var get = {
				contractName: saveData.name,
				contractId: identify[0]._id, //合同id
				time: occur, //时间
				getNew: 0, //版本
				data: saveData
			};
			business.insertBusiness(get, function(data) {
				console.log(data);
				res.send({
					hello: "success insert"
				});
			});

		});
	});
};



exports.update = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	var business = new Business();
	console.log("update");
	var getId = {
		_id: req.params['id']
	};
	var get = req.body;
	var getNew = {
		myId: get.myId,
		partyA: get.partyA,
		partyAabbr: get.partyAabbr,
		partyADept: get.partyADept,
		partyB: get.partyB,
		partyBabbr: get.partyBabbr,
		partyBDept: get.partyBDept,
		name: get.name,
		beginDate: get.beginDate,
		endDate: get.endDate,
		amount: get.amount,
		state: get.state,
		events: get.events,
		file: get.file
	};
	console.log(get.file);
	if (getNew.events == null) {
		getNew.events = [];
	}
	console.log(getId);
	console.log(get);
	////////
	business.findVersionId(req.params['id'], function(versionId) {
		business.findBusiness(versionId, function(data) {
			var get = {
				contractId: getId._id,
				contractName: getNew.name,
				time: occur,
				getNew: data[0].getNew + 1,
				data: getNew
			};
			console.log(get);
			business.insertBusiness(get, function() {
				console.log("update Version...");
				contract.updateIdData(getId, getNew, function(data) {
					console.log("starting....");
					var contract = new Contract();
					contract.upload(getNew.file, req.params['id'], function(data1) {
						console.log(data1);
					});
					res.send(data);
				});
			});
		});
	});
};



exports.destroy = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	var log = new Log();
	console.log("destroy");
	var getId = {
		_id: req.params['id']
	};
	contract.checkIdData(getId, function(info) {
		var logData = {
			url: req._parsedUrl.path, //完整的URL
			user: req.user.username, //用户名
			time: req._startTime, //时间
			operation: req.route.method, //操作类型
			data: info[0], //操作数据
			resource: req.route.path //资源路径
		};
		log.insertRecord(logData, function(result) {
			console.log(result);
			contract.removeData(getId, function(data) {
				res.send(data);
			});
		});
	});
};

exports.test = function(req, res) {
	console.log("test");
};