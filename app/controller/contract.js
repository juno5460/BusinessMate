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
	contract.checkInfo(function(data) {
		console.log("hello");
		res.send(data);
	});
	/******/

};



exports.show = function(req, res) {
	/*
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	console.log("啊啊啊啊啊啊啊啊" + req.params['contract']);
	console.log("show");
	var getId = {
		_id: req.params['contract']
	};
	console.log(getId);
	contract.checkIdData(getId, function(data) {
		res.send(data[0]);
	});*/
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	console.log("show");
	var get = req.params['contract'];
	console.log(get);
	if (get.length == 24) {
		var getId = {
			_id: get
		};
		console.log("checkIdData");
		contract.checkIdData(getId, function(data) {
			res.send(data[0]);
		});
	} else {
		console.log("fuzzySearch");
		contract.fuzzySearch(get, function(data) {
			console.log(data[0]);
			res.send(data[0]);
		});
	}
};



exports.create = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	//	console.log("create");
	var rdata = req.body;
	console.log(rdata);
	console.log("start====");
	contract.insertData(rdata, res);
	//	res.send("insert successfully");
};



exports.update = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	console.log("update");
	var getId = {
		_id: req.params['contract']
	};
	var get = req.body;
	/*	var getNew = { //重新构造对象是为了让可编辑字段去掉主键:_id
		myId: get.myId,
		partyA: get.partyA,
		partyB: get.partyB,
		amount: get.amount,
		signDate: get.sigDate,
		name: get.name,
		beginDate: get.beginDate,
		endDate: get.endDate,
		state: get.state,
		events: get.events
	};*/
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
		_id: req.params['contract']
	};
	if (req.params['contract'] != 'fuck') {
		contract.removeData(getId, function(data) {
			res.send(data);
		});
	} else {
		contract.removeAllData(function(data) {
			res.send(data);
		});
	}
};