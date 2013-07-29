var async = require('async'),
	mongoose = require('mongoose'),
	Business=mongoose.model('Business');
	Log = mongoose.model('Log');

exports.userShow = function(req, res) { //返回所有访问日志

	var log = new Log();
	console.log("index");
	log.findAll(function(data) {
		res.send(data);
	});
};
exports.businessShow=function(req, res) { //返回所有业务日志

	var business = new Business();
	console.log("index");
	business.findAllBusiness(function(data) {
		res.send(data);
	});
};