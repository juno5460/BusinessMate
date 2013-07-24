var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	async = require('async'),
	mongoStore = require('connect-mongo')(express),
	flash = require('connect-flash'),
	connectTimeout = require('connect-timeout');

module.exports = function function_name(app, config, passport, auth) {
	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', config.root + '/app/view');
	app.set('view engine', 'ejs');
	app.use(flash());
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser({
		uploadDir: './uploads'
	}));
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	// express/mongo session storage
	app.use(express.session({
		secret: 'noobjs',
		store: new mongoStore({
			url: config.db,
			collection: 'sessions'
		})
	}));

	app.use(require('stylus').middleware(config.root + '/cms'));
	//app.use(express.static(config.root + '/cms'));
	app.use(express.static(config.root + '/public'));


	app.use(passport.initialize());
	app.use(passport.session());


	app.use(app.router);

	//设置超时时间
	app.use(connectTimeout({
		time: 10000
	}));


	app.set('view options', {
		pretty: true
	});



	app.set('showStackError', true);
	// should be placed before express.static
	app.use(express.compress({
		filter: function(req, res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	fs.exists('./files', function(check) {
		if (check) {
			console.log("files dir have existed");
		} else {
			fs.mkdir('./files', 0777, function(err) {
				if (err != null)
					console.log(err);
			});
		}
	});
	fs.exists('./uploads', function(check) {
		if (check) {
			console.log("uploads dir have existed");
			fs.readdir('./uploads', function(err, files) {
				async.forEach(files, function(file, callback) {
					var getDir = './uploads/' + file;
					console.log(getDir);
					fs.unlink(getDir, function() {
						console.log("delete uploads-file success.");
					});
				});
			});
		} else {
			fs.mkdir('./uploads', 0777, function(err) {
				if (err != null)
					console.log(err);
			});
		}
	});


	// development enviroment//启动 NODE_ENV=development node app.js
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
	// production enviroment//启动 NODE_ENV=production node app.js
	if ('production' == app.get('env')) {
		app.use(express.errorHandler());
	}

};