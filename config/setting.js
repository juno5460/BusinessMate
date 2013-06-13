var express = require('express'),
	path = require('path');

module.exports = function function_name(app, config) {
	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', config.root + '/app/view');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(config.root + '/public'));
	app.use(express.static(config.root + '/public'));


	app.set('showStackError', true);
	// should be placed before express.static
	app.use(express.compress({
		filter: function(req, res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

};