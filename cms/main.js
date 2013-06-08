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
		'model': 'model'
	},
	shim: {
		backbone: {
			deps: ['underscore']
		}
	}
});

require(['jquery', 'underscore', 'backbone', 'view/ContractListView', 'view/ContractViewAdd'], 
	function($, _, Backbone, ContractListView, ContractViewAdd) {

	console.info('Main Load finish!');
	var $containerView = $("#container");

	var R = Backbone.Router.extend({
		routes: {
			"":"index",
			"desktop": "desktop",
			"contracts": "contracts",
			"addContract":"addContract"
		},
		index:function(){
			$containerView.html("");
			$containerView.append(new ContractListView().el);
		},
		desktop: function() {

			

		},
		contracts: function() {

			$containerView.html("");
			$containerView.append(new ContractListView().el);
		},
		addContract:function(){
			$containerView.html("");
			$containerView.append(new ContractViewAdd().el);
		}
	});

	var rootPath = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
	console.log('start watch history, rootPath: ' + rootPath);

	new R();

	Backbone.history.start({
		pushState: false,
		root: rootPath
	});

	//$containerView.append(new ContractListView().el);

});