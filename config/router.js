var async = require('async'),
	resource = require('express-resource');

module.exports = function(app) {

	var contract = require('../app/controller/contract');
	app.resource('contracts', contract);

};