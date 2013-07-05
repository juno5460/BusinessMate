var async = require('async'),
	resource = require('express-resource'),
	generator = require('../app/generator/generator');

////////contract-router
module.exports = function(app, passport, auth) {

	///新建合同操作接口
	var contract = require('../app/controller/contract');
	app.resource('api/contracts', contract);

	///新建合同模版接口
	var template = require('../app/controller/template');
	app.resource('api/templates', template);

	///待办任务处理接口
	var task = require('../app/controller/task');
	app.resource('api/tasks', task);

	///用户登录接口
	var user = require('../app/controller/user');
	app.resource('api/users', user);


	////////////passport测试
	var users = require('../app/controller/users');
	app.get('/login', users.login);
	app.get('/signup', users.signup);
	app.get('/logout', users.logout);
	app.post('/users', users.create);
	app.post('/users/session', passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: 'Invalid email or password.'
	}), users.session);
//	var task = require('../app/controller/task');
//	app.get('/api/tasks', auth.requiresLogin, task.index);
	//	app.resource('api/tasks', auth.requiresLogin, task);
	////////////passport测试

	app.get('/', function(req, res) {

		res.send(generator.generate('login', {
			username: 'Justin'
		}));
	});

	app.get('/desktop', function(req, res) {

		res.send(generator.generate('desktop', {
			username: 'Justin'
		}));
	});

	app.get('/desktop/:id', function(req, res) {
		console.info(req.params.id);
		res.send(generator.generate('pieDetail', {
			_id: req.params.id
		}));
	});

	app.get('/fund', function(req, res) {

		res.send(generator.generate('fund', {
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

	app.get('/contracts/:id/edit', function(req, res) {
		console.info(req.params.id);
		res.send(generator.generate('editContract', {
			_id: req.params.id
		}));
	});

};