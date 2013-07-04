/***
 *  用户注册登录接口
 *
 *
 ****/

var async = require('async'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.index = function(req, res) {
	var user = new User();
	/*
	user.checkUserInfo(function(data){
		res.send(data);
	});
*/
	user.getUnique(function(data) {
		res.send(data);
	});
};



exports.show = function(req, res) {

};



exports.create = function(req, res) {
	var user = new User();
	var rdata = req.body;
	user.getUnique(function(data) {
		var getData = {
			uid: data,
			userName: rdata.userName,
			email: rdata.email,
			password: rdata.password
		};
		console.log(getData);
		user.insertUserData(getData);
	});
};



exports.update = function(req, res) {

};



exports.destroy = function(req, res) {

};