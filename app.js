/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	contract = require('./routes/contract'),
	postdemo = require('./routes/postdemo'),
	http = require('http'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/users', user.list);

debugger;
console.log("aaa:" + postdemo.list);
//posttest
app.post('/postdemo', postdemo.list);
//contracts
app.get('/contracts', contract.list);
app.get('/contracts/:id', contract.show);
app.get('/contracts/:id', contract.drop);
app.post('/contracts', contract.create);
app.get('/contracts/:id', contract.update);
//app.put('/contracts/:id', contract.update);
// app.destroy('/contracts', contract.list);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});