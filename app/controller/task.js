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

exports.showOne = function(req, res) {
	var contract = new Contract();
	var id = req.params['id'];
	contract.checkUndoneEvents(id, function(data) {
		console.info("checkUndoneEvents");
		res.send(data);
	});
};
exports.show = function(req, res) { //返回指定合同业务数据

	var template = new Template();
	var contract = new Contract();
	var id = req.params['id'];
	console.log(id);
	contract.countOneGetMoney(id, function(data) {
		console.log("countOneGetMoney");
		res.send(data);
	});
};

exports.update = function(req, res) { //修改待办任务完成标志位

	var contract = new Contract();
	console.log("update");
	var occur = new Date();
	var year = occur.getFullYear();
	var month = occur.getMonth() + 1;
	var day = occur.getDate(); ///
	day = day < 10 ? "0" + day : day;
	month = month < 10 ? "0" + month : month;
	var getOccur = year + "-" + month + "-" + day;
	var get = req.body;
	if (get.newDate == "") {
		get.newDate = getOccur;
	}
	var id = get._id;
	var eventId = get.id;
	var eventName = get.title;
	var newDate = get.newDate;
	var checkValue;
	if ('true' == get.completed)
		checkValue = true;
	if ('false' == get.completed)
		checkValue = false;
	var remark = get.remark;

	console.log(get);
	console.log(id);
	console.log(eventId);
	console.log(eventName);
	console.log(checkValue);
	console.log(remark);
	console.log(newDate);
	contract.updateSymbol(id, eventId, checkValue, remark, eventName, newDate, function(data) {
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

	contract.checkAlldoneContracts(function(data) {
		console.log("checkAlldoneContracts");
		console.log(data);
		res.send(data);
	});
};

exports.done = function(req, res) {
	var template = new Template();
	var contract = new Contract();

	contract.checkLastWeekDone(function(data) {
		console.log("checkLastWeekDone");
		res.send(data);
	});
};

exports.graphics = function(req, res) {

	console.log("graphics");

	var contract = new Contract();

	contract.countGraphics(function(data) {
		res.send(data);
	});
};