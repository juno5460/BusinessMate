/***
 *  任务测试接口
 *
 *
 ****/

var async = require('async'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract'),
	Template = mongoose.model('Template');

exports.index = function(req, res) { //返回所有待办任务

	var template = new Template();
	var contract = new Contract();
	console.log("index");
	if (req.user == undefined) {
		res.redirect('/login');
	} else {
		contract.checkAllUndoneEvents(function(data) {
			console.info("checkAllUndoneEvents");
			res.send(data);
		});
	}
};

exports.show = function(req, res) { //返回指定合同业务数据

	var template = new Template();
	var contract = new Contract();
	//		var id = "51d16f10011787c411000015";
	var id = req.params['id'];
	console.log(id);
	contract.countOneGetMoney(id, function(data) {
		console.log("countOneGetMoney");
		res.send(data);
	});
};

exports.update = function(req, res) { //修改待办任务完成标志位
	var occur = new Date();
	console.log(occur);
	var contract = new Contract();
	console.log("update");
	/*var getId = {
		_id: req.params['tests']
	};*/
	var get = req.body;
	var id = get._id;
	var eventId = get.id;
	var eventName = get.title;
	var checkValue;
	if ('true' == get.completed)
		checkValue = true;
	if ('false' == get.completed)
		checkValue = false;
	var remark = get.remark;

	//updateSymble: function(id, eventId, eventName, callback)
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
	console.log(get);
	console.log(id);
	console.log(eventId);
	console.log(eventName);
	console.log(checkValue);
	console.log(remark);
	contract.updateSymble(id, eventId, checkValue, remark, eventName, function(data) {
		console.log(data);
		res.send(data);
	});
};
exports.count = function(req, res) { //返回指定合同业务数据

	var template = new Template();
	var contract = new Contract();
	var getTime = "2013-07-18";
	// var id = req.params['id'];
	// console.log(id);
	contract.countWillGetMoney(getTime, function(data) {
		console.log("countWillGetMoney");
		res.send(data);
	});
};

exports.finish = function(req, res) { //返回指定合同业务数据

	var template = new Template();
	var contract = new Contract();
	
	contract.checkAlldoneEvents(function(data) {
		console.log("checkAlldoneEvents");
		console.log(data);
		res.send(data);
	});
};