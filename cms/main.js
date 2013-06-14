require.config({
	baseUrl: '.',
	waitSeconds: 0,
	paths: {
		jquery: 'js/jquery',
		underscore: 'js/underscore_amd',
		backbone: 'js/backbone_amd',
		text: 'js/text',
		json2: 'js/json2',
		'model': 'model',
		'view': 'view',
		'template': 'template',
		'collections': 'collections',
		'model': 'model',
		'js': 'js',
		'config': 'config'
	},
	shim: {
		backbone: {
			deps: ['underscore']
		}
	}
});

require(['jquery', 'underscore', 'backbone', 'router/mainRouter', 'config/config'], function($, _, Backbone, MainRouter, Config) {

	console.info(Config.server);
	
	$.ajaxSetup({
		cache: false
	});

	var $containerView = $("#container");



	var rootPath = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
	console.log('start watch history, rootPath: ' + rootPath);

	new MainRouter({
		containerView: $containerView
	});

	Backbone.history.start({
		pushState: false,
		root: rootPath
	});

});