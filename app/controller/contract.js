/***
 *  合同操作接口
 *
 *
 ****/

var async = require('async'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract');

exports.index = function(req, res) {
	/******/
	console.log('index');
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	contract.checkInfo(req.user.uid,function(data) {
		console.log("hello");
		res.send(data);
	});
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
			res.send(data[0]);
		});
	} else {
		console.log("fuzzySearch");
		contract.fuzzySearch(queryId, function(data) {
			console.log(data[0]);
			res.send(data[0]);
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
		partyB: rdata.partyB, //签署乙方
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
		next: rdata.next //待办任务
	};
	console.log("start====");
	contract.insertData(saveData, res);
	//	res.send("insert successfully");
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
		"state": get.state,
		"events": get.events
	};
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