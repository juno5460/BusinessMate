/***
 *  合同模版接口
 *
 *
 ****/

var async = require('async'),
	mongoose = require('mongoose'),
	Template = mongoose.model('Template');



exports.index = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var template = new Template();
	console.log("template index");
	template.checkTemplateInfo(function(data) {
		console.log('hello');
		res.send(data);
	});
};

exports.show = function(req, res) {
	var occur = new Date();
	console.log(occur);
	console.log("template show");
	var template = new Template();
	console.log("啊啊啊啊啊啊啊啊" + req.params['id']);
	var getId = {
		_id: req.params['id']
	};
	console.log(getId);
	template.checkIdTemplate(getId, function(data) {
		res.send(data[0]);
	});
};


exports.create = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var template = new Template();
	console.log("template create");

	/*	var rdata = { //重新构造对象是为了让可编辑字段去掉主键:_id
		myId: "CA123",
		partyA: "get.partyA",
		partyB: "get.partyB",
		amount: 1,
		signDate: "2012-09-01",
		name: "get.name",
		tName: "get.name",
		beginDate: "2012-09-08",
		endDate: "2012-09-08",
		state: "get.state",
		events: []
	};*/
	var rdata = req.body;
	console.log(rdata);
	console.log("start====");
	template.insertTemplate(rdata, res);
};

exports.update = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var template = new Template();
	console.log("template update");
	var getId = {
		_id: req.params['id']
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
	template.updateIdTemplate(getId, getNew, function(data) {
		res.send(data);
	});
};

exports.destroy = function(req, res) {
	var occur = new Date();
	console.log(occur);
	var template = new Template();
	console.log("template destroy");
	//	var getId = "17979181781105635000";
	var getId = {
		_id: req.params['id']
	};
	/*
	template.removeData(getId, function(data) {
		res.send(data);
	});
*/
	template.removeTemplate(getId, function(data) {
		res.send(data);
	});
};