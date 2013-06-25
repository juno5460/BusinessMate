/***
*  系统测试接口
*
*
****/

var async = require('async'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract');

exports.index = function(req, res) {

	var contract = new Contract();
	/******************查询信息接口测试通过******************
	contract.checkInfo(function(data) {
		console.log('checkInfo');
		res.send(data);
	});
	/*****************************************************/
	/*****************统计已收回款接口测试通过***************/
	contract.countGetMoney(function(data) {
		console.info("countGetMoney");
		res.send(data+"");
	});
	/*****************************************************/
	/*****************修改事件完成标志接口测试通过*************
	var id="51c25fa5f7c9c98b03000005";
	var eventId="2764189759409156600";
	var eventName="首款";
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