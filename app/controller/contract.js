var async = require('async'),
	mongoose = require('mongoose'),
	Contract = mongoose.model('Contract');

exports.index = function(req, res) {
	var contract = new Contract();
	contract.checkInfo(function(data) {
		console.log('hello');
		res.send(data);
	});
};
exports.show = function(req, res) {
	var contract = new Contract();
	console.log("啊啊啊啊啊啊啊啊" + req.params['contract']);
	console.log("show");
	var getId = {
		cid: req.params['contract']
	};
	console.log(getId);
	contract.checkIdData(getId, function(data) {
		res.send(data);
	});
};
exports.create = function(req, res) {
	var contract = new Contract();
	console.log("create");
	var rdata = req.body;
	console.log(rdata);
	contract.insertData(rdata);
};
exports.update = function(req, res) {
	var contract = new Contract();
	console.log("update");
	var getId = req.body.cid;
	var getNew = req.body;
	if (getNew.events == null) {
		getNew.events = [];
	}
	console.log(getId);
	console.log(getNew);
	contract.updateIdData(getId, getNew, function(data) {
		res.send(data);
	});
};
exports.destroy = function(req, res) {
	var contract = new Contract();
	var getId = "17979181781105635000";
	contract.removeData(getId, function(data) {
		res.send(data);
	});
};