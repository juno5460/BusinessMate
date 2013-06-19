var async = require('async'),
	mongoose = require('mongoose'),
	Template = mongoose.model('Template');



exports.index = function(req, res) {
	/******/
	var template = new Template();
	console.log("template index");
	template.checkTemplateInfo(function(data) {
		console.log('hello');
		res.send(data);
	});
};

exports.show = function(req, res) {

	console.log("template show");
	var template = new Contract();
	console.log("啊啊啊啊啊啊啊啊" + req.params['contract']);
	var getId = {
		_id: req.params['template']
	};
	console.log(getId);
	template.checkIdTemplate(getId, function(data) {
		res.send(data[0]);
	});
};


exports.create = function(req, res) {

	var template = new Template();
	console.log("template create");
	/*
	var rdata = { //重新构造对象是为了让可编辑字段去掉主键:_id
		myId: "CA123",
		partyA: "get.partyA",
		partyB: "get.partyB",
		amount: 1,
		signDate: "2012-09-01",
		name: "get.name",
		beginDate: "2012-09-08",
		endDate: "2012-09-08",
		state: "get.state",
		events: []
	};*/
	var rdata = req.body;
	console.log(rdata);
	console.log("start====");
	template.insertTemplate(rdata);
};

exports.update = function(req, res) {

	var template = new Contract();
	console.log("template update");
	var getId = {
		_id: req.params['template']
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
	template.updateIdData(getId, getNew, function(data) {
		res.send(data);
	});
};

exports.destroy = function(req, res) {

	var template = new Contract();
	console.log("template destroy");
	var getId = "17979181781105635000";
	/*
	template.removeData(getId, function(data) {
		res.send(data);
	});
*/
	template.removeAllData(function(data) {
		res.send(data);
	});
};