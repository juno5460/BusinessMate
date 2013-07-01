/***
 *  系统测试接口
 *
 *
 ****/

var async = require('async'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract'),
	Template = mongoose.model('Template');

exports.index = function(req, res) {
	var template = new Template();
	var contract = new Contract();
	/******************查询模版信息接口测试通过******************
	template.checkTemplateInfo(function(data) {
		console.log('checkInfo');
		res.send(data);
	});
	/*****************************************************/
	/******************模糊搜索测试通过******************
	var get = "CA";
	template.fuzzySearch(get, function(data) {
		console.log('fuzzySearch');
		res.send(data);
	});
	/*****************************************************/
	/******************查询合同信息接口测试通过******************
	contract.checkInfo(function(data) {
		console.log('checkInfo');
		res.send(data);
	});
	/*****************************************************/
	/************************插入合同*************************
	var getNew = {
		myId: "BD123",
		partyA: "南航",
		partyB: "恒拓",
		amount: 1000000,
		signDate: "2013-06-01",
		name: "商务移动标准合同",
		beginDate: "2013-06-01",
		endDate: "2013-06-29",
		state: "开启",
		events: [{
				"id": "2897269523664280600",
				"title": "竞标",
				"date": "2013-06-01",
				"remark": "嗯嗯",
				"price": -1,
				"completed": false
			}, {
				"id": "289744791239205060",
				"title": "首款",
				"date": "2013-06-29",
				"remark": "好的",
				"price": 10000,
				"completed": false
			}, {
				"id": "289744791239205061",
				"title": "二期回款",
				"date": "2013-07-03",
				"remark": "很好的",
				"price": 50000,
				"completed": true
			}, {
				"id": "289744791239205062",
				"title": "二期收款",
				"date": "2013-06-28",
				"remark": "好的",
				"price": 20000,
				"completed": false
			},{
				"id": "289744791239205063",
				"title": "开发单",
				"date": "2013-06-10",
				"remark": "好的",
				"price": 10000,
				"completed": true
			},{
				"id": "289744791239205064",
				"title": "三期协商",
				"date": "2013-06-20",
				"remark": "好的",
				"price": -1,
				"completed": false
			}
		]
	};
	contract.insertData(getNew);
	/*******************************************************/
	/*****************统计所有合同已收回款接口测试通过***************
	contract.countGetMoney(function(data) {
		console.info("countGetMoney");
		console.log(data);
		res.send(data+"");
	});
	/*****************************************************/
	/*****************统计单个合同已收回款接口测试通过***************
	var id="51ca5258332913d206000004";
	contract.countOneGetMoney(id,function(data) {
		console.info("countOneGetMoney");
		console.log(data);
		res.send(data+"");
	});
	/*****************************************************/
	/*****************修改事件完成标志接口测试通过*************
	var id="51c8ed2aed2b43c501000079";
	var eventId="3453753052439996400";
	var eventName="二期收款";
	contract.updateSymble(id, eventId, eventName,function(data) {
		console.info("updateSymble");
		res.send(data);
	});
	/*****************************************************/
	/*****************展示所有未完成事件测试通过*************/
	contract.checkAllUndoneEvents(function(data) {
		console.info("checkAllUndoneEvents");
		res.send(data);
	});
	/*****************************************************/
};

exports.show = function(req, res) {
	var template = new Template();
	var contract = new Contract();
	//	var id = "51d0da38203a68c404000008";
	var id = req.params['tests'];
	contract.checkUndoneEvents(id, function(data) {
		console.info("checkUndoneEvents");
		res.send(data);
	});
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
	var id = get._id;
	var eventId = get.id;
	var eventName = get.title;
	var checkValue = get.completed;
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
		res.send(data);
	});
};