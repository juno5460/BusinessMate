var async = require('async'),
	resource = require('express-resource'),
	generator = require('../app/generator/generator');

////////contract-router
module.exports = function(app, passport, auth, log) {

	///合同操作接口
	var contract = require('../app/controller/contract');

	app.get('/api/contracts', contract.index);
	app.get('/api/contracts/:id', contract.show);
	app.post('/api/contracts', log.show, contract.create);
	app.put('/api/contracts/:id', log.show, contract.update);
	app.del('/api/contracts/:id', log.show, contract.destroy);
	app.get('/api/conTests', contract.test);

	///合同模版接口
	var template = require('../app/controller/template');

	app.get('/api/templates', template.index);
	app.get('/api/templates/:id', template.show);
	app.post('/api/templates', log.show, template.create);
	app.put('/api/templates/:id', log.show, template.update);
	app.del('/api/templates/:id', log.show, template.destroy);


	///待办任务处理接口
	var task = require('../app/controller/task');

	app.get('/api/tasks', task.index);
	app.get('/api/tasks/:id', task.show);
	app.get('/api/task/:id',task.showOne);
	app.get('/api/tasksGraph', task.graphics);
	app.put('/api/tasks/:id', log.show, task.update);
	app.get('/api/finishes', task.finish);
	app.get('/api/dones', task.done);
	app.get('/api/taskTests', task.count);
	//业务测试接口

	//文件操作接口
	var files = require('../app/controller/file');

	app.get('/test', files.test);
	app.get('/files/download', files.download);
	app.get('/files/show/:id', files.show);
	app.post('/files/upload', files.upload);
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

	/////////日志接口
	var logger = require('../app/controller/log');
	app.get('/api/userlog',logger.userShow);
	app.get('/api/businesslog',logger.businessShow);


	app.get('/', auth.requiresLogin, function(req, res) {
		res.redirect('/login');
	});
	app.get('/desktop', auth.requiresLogin, function(req, res) {

		res.send(generator.generate('desktop', {
			username: req.user.username
		}));
	});
	app.get('/desktop/:id', auth.requiresLogin, function(req, res) {
		console.info(req.params.id);
		res.send(generator.generate('pieDetail', {
			_id: req.params.id,
			username: req.user.username
		}));
	});
	app.get('/fund', auth.requiresLogin, function(req, res) {

		res.send(generator.generate('fund', {
			username: req.user.username
		}));
	});
	app.get('/fundWait', auth.requiresLogin, function(req, res) {

		res.send(generator.generate('fundWait', {
			username: req.user.username
		}));
	});
	app.get('/fundShould', auth.requiresLogin, function(req, res) {

		res.send(generator.generate('fundShould', {
			username: req.user.username
		}));
	});
	app.get('/contracts', auth.requiresLogin, function(req, res) {

		res.send(generator.generate('contracts', {
			username: req.user.username
		}));
	});
	app.get('/contracts/new', auth.requiresLogin, function(req, res) {
		res.send(generator.generate('addContract', {
			username: req.user.username
		}));
	});
	app.get('/contracts/:id/edit', auth.requiresLogin, function(req, res) {
		console.info(req.params.id);
		res.send(generator.generate('editContract', {
			_id: req.params.id,
			username: req.user.username
		}));
	});
	app.get('/businessLog', auth.requiresLogin, function(req, res) {
		res.send(generator.generate('businessLog', {
			username: req.user.username
		}));
	});
	app.get('/userLog', auth.requiresLogin, function(req, res) {
		res.send(generator.generate('userLog', {
			username: req.user.username
		}));
	});

};