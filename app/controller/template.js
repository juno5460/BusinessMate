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
	if (req.user == undefined) {
		res.redirect('/login');
	} else {
		template.checkTemplateInfo(function(data) {
			console.log('hello');
			res.send(data);
		});
	}
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
	template.insertTemplate(saveData, res);
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