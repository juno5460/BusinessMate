var async = require('async'),
	mongoose = require('mongoose'),
	Log = mongoose.model('Log');

exports.record = function(req, res) { //返回所有待办任务

	var log = new Log();
	console.log("index");
	log.findAll(function(data) {
		res.send(data);
	});
};