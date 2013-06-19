var async = require('async'),
	resource = require('express-resource');

////////contract-router
module.exports = function(app) {

	var contract = require('../app/controller/contract');
	app.resource('contracts', contract);

	var template=require('../app/controller/template');
	app.resource('templates',template);
};
