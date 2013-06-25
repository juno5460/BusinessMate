var async = require('async'),
	resource = require('express-resource'),
	generator = require('../app/generator/generator');

////////contract-router
module.exports = function(app) {

	///新建合同操作接口
	var contract = require('../app/controller/contract');
	app.resource('contracts', contract);

	///新建合同模版接口
	var template = require('../app/controller/template');
	app.resource('templates', template);

	///系统测试接口
	var test = require('../app/controller/test');
	app.resource('tests', test);

	app.get('/ace', function(req, res) {

		res.send(generator.generate('index', {
			username: 'Justin'
		}));
	});

	app.get('/desktop', function(req, res) {

		res.send(generator.generate('desktop', {
			username: 'Justin'
		}));
	});

	app.get('/contractss', function(req, res) {

		res.send(generator.generate('contracts', {
			username: 'Justin'
		}));
	});
};