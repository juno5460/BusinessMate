require.config({
	baseUrl:'.',
	waitSeconds:0,
	paths:{
		jquery : 'js/jquery',
		underscore: 'js/underscore_amd',
		backbone: 'js/backbone_amd',
		text: 'js/text',
		'model' : 'model',
		'view' : 'view',
		'template' : 'template'
	},
	shim: {
		backbone:{
			deps: ['underscore']
		}
	}
});

require(['jquery','underscore','backbone','view/ContractViewAdd'],function($,_,Backbone,ContractViewAdd){

	var view = new ContractViewAdd();
	console.info('Main Load finish!');

});