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

	var contract = new Contract();
	/******************查询信息接口测试通过******************/
	contract.checkInfo(function(data) {
		console.log('checkInfo');
		res.send(data);
	});
	/*****************************************************/
	/*****************统计所有合同已收回款接口测试通过***************
	contract.countGetMoney(function(data) {
		console.info("countGetMoney");
		console.log(data);
		res.send(data+"");
	});
	/*****************************************************/
	/*****************统计单个合同已收回款接口测试通过***************
	var id="51c8ed2aed2b43c501000079";
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
	/*****************展示所有未完成事件测试通过*************
	var id="51c25fa5f7c9c98b03000005";
	contract.checkUndoneEvents(id,function(data) {
		console.info("checkUndoneEvents");
		res.send(data);
	});
	/*****************************************************/
};