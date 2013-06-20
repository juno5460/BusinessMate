var async = require('async'),
	resource = require('express-resource');

////////contract-router
module.exports = function(app) {

///新建合同操作接口
	var contract = require('../app/controller/contract');
	app.resource('contracts', contract);

///新建合同模版接口
	var template=require('../app/controller/template');
	app.resource('templates',template);

///系统测试接口
	var test=require('../app/controller/test');
	app.resource('tests',test);
};
