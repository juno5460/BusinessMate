/***
 *  合同操作接口
 *
 *
 ****/

var async = require('async'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract'),
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
	console.log(occur);
	var contract = new Contract();
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
			res.send({
				hello: "success insert"
			});
		});
	});
};



exports.update = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	console.log("update");
	var getId = {
		_id: req.params['id']
	};
	var get = req.body;
	var getNew = {
		"myId": get.myId,
		partyA: get.partyA,
		partyB: get.partyB,
		"name": get.name,
		"beginDate": get.beginDate,
		"endDate": get.endDate,
		amount: get.amount,
		"state": get.state,
		"events": get.events,
		file: get.file
	};
	console.log(get.file);
	if (getNew.events == null) {
		getNew.events = [];
	}
	console.log(getId);
	console.log(get);
	contract.updateIdData(getId, getNew, function(data) {
		res.send(data);
	});
};



exports.destroy = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	console.log("destroy");
	var getId = {
		_id: req.params['id']
	};
	if (req.params['id'] != 'fuck') {
		contract.removeData(getId, function(data) {
			res.send(data);
		});
	} else {
		contract.removeAllData(function(data) {
			res.send(data);
		});
	}
};



exports.test = function(req, res) {
	console.log('login', req.user);
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	var rdata = req.body;
	var saveData = {
		"uid": "20130609213326087",
		"myId": "caiyidong007",
		"partyA": "南航",
		"partyB": "恒拓",
		"amount": 1000000,
		"signDate": "2013-07-01",
		"name": "统一移动平台2014",
		"beginDate": "2013-07-01",
		"endDate": "2013-07-25",
		"state": "首款",
		"events": [{
			"id": "C5C4EC7101C0000251601930F8501976",
			"title": "竞标",
			"date": "2013-07-01",
			"price": -1,
			"completed": false
		}, {
			"id": "C5C4EC7101C00002669D1E8235409DB0",
			"title": "首款",
			"date": "2013-07-15",
			"price": 400000,
			"completed": false,
			"priceDate": "2013-07-17",
			"invoiceDate": "2013-07-15", //发票日期
			"invoiceDone": false //是否开发票标志
		}, {
			"id": "C5C4EC7101C00002C7BF1E5014E01D5F",
			"title": "尾款",
			"date": "2013-07-18",
			"price": 600000,
			"completed": false,
			"priceDate": "2013-07-19",
			"invoiceDate": "2013-07-18", //发票日期
			"invoiceDone": false //是否开发票标志位
		}]

	};
	console.log("start====");
	contract.insertData(saveData, res);
	//	res.send("insert successfully");
};