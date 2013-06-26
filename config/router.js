var async = require('async'),
	resource = require('express-resource'),
	generator = require('../app/generator/generator');

////////contract-router
module.exports = function(app) {

	///新建合同操作接口
	var contract = require('../app/controller/contract');
	app.resource('api/contracts', contract);

	///新建合同模版接口
	var template = require('../app/controller/template');
	app.resource('api/templates', template);

	///系统测试接口
	var test = require('../app/controller/test');
	app.resource('tests', test);

	app.get('/', function(req, res) {

		res.send(generator.generate('desktop', {
			username: 'Justin'
		}));
	});

	app.get('/desktop', function(req, res) {

		res.send(generator.generate('desktop', {
			username: 'Justin'
		}));
	});

	app.get('/contracts', function(req, res) {

		res.send(generator.generate('contracts', {
			username: 'Justin'
		}));
	});
	
	app.get('/contracts/new', function(req, res) {

		res.send(generator.generate('addContract', {
			username: 'Justin'
		}));
	});

	app.get('/contracts/:id/edit',function(req,res){
		console.info(req.params.id);
		res.send(generator.generate('editContract',{_id:req.params.id}));
	});
};