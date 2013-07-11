var async = require('async'),
	resource = require('express-resource'),
	generator = require('../app/generator/generator');

////////contract-router
module.exports = function(app, passport, auth) {

	///合同操作接口
	var contract = require('../app/controller/contract');
	app.get('/api/contracts', contract.index);
	app.get('/api/contracts/:id', contract.show);
	app.post('/api/contracts', contract.create);
	app.put('/api/contracts/:id', contract.update);
	app.del('/api/contracts/:id', contract.destroy);
	//	app.resource('api/contracts', contract);

	///合同模版接口
	var template = require('../app/controller/template');
	app.get('/api/templates', template.index);
	app.get('/api/templates/:id', template.show);
	app.post('/api/templates', template.create);
	app.put('/api/templates/:id', template.update);
	app.del('/api/templates/:id', template.destroy);
	//	app.resource('api/templates', template);

	///待办任务处理接口
	var task = require('../app/controller/task');
	app.get('/api/tasks', task.index);
	app.get('/api/tasks/:id', task.show);
	// //	app.post('/api/tasks',task.create);
	app.put('/api/tasks/:id', task.update);
	// //	app.del('/api/tasks/:id',task.destroy);
	//app.resource('api/tasks', task);
    app.get('/api/tests',task.count);
    //业务测试接口

	////////////用户 接口
	var users = require('../app/controller/users');
	app.get('/login', users.login);
	app.get('/signup', users.signup);
	app.get('/logout', users.logout);
	app.post('/users', users.create);
	app.post('/username', users.check);
	app.post('/users/session', passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: 'Invalid email or password.'
	}), users.session);
	//	var task = require('../app/controller/task');
	//	app.get('/api/tasks', auth.requiresLogin, task.index);
	//	app.resource('api/tasks', auth.requiresLogin, task);
	////////////passport测试

	app.get('/', auth.requiresLogin, function(req, res) {
		res.redirect('/login');
	});

	app.get('/desktop', auth.requiresLogin, function(req, res) {

		res.send(generator.generate('desktop', {
			username: 'Justin'
		}));
	});

	app.get('/desktop/:id', auth.requiresLogin, function(req, res) {
		console.info(req.params.id);
		res.send(generator.generate('pieDetail', {
			_id: req.params.id
		}));
	});

	app.get('/fund', auth.requiresLogin, function(req, res) {

		res.send(generator.generate('fund', {
			username: 'Justin'
		}));
	});

	app.get('/contracts', auth.requiresLogin, function(req, res) {

		res.send(generator.generate('contracts', {
			username: 'Justin'
		}));
	});

	app.get('/contracts/new', auth.requiresLogin, function(req, res) {
		res.send(generator.generate('addContract', {
			username: 'Justin'
		}));
	});

	app.get('/contracts/:id/edit', auth.requiresLogin, function(req, res) {
		console.info(req.params.id);
		res.send(generator.generate('editContract', {
			_id: req.params.id
		}));
	});

};