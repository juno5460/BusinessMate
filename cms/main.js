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
		'js':'js'
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
			"addContract":"addContract",
			"editContract/:id":"editContract"
		},
		currentView:"",
		index:function(){
			this.switchView(new ContractListView());
		},
		desktop: function() {

		},
		contracts: function() {
			this.switchView(new ContractListView());
		},
		addContract:function(){
			this.switchView(new ContractViewAdd({mode:'add'}));
		},
		editContract:function(id){
			this.switchView(new ContractViewAdd({mode:'edit',cid:id}));
		},
		switchView:function(view){

			if(this.currentView != ""){
				this.currentView.remove();
			}

			this.currentView = view;
			$containerView.append(view.el);
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