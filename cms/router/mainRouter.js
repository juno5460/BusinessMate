define(['view/ContractListView', 'view/ContractViewAdd'],function(ContractListView,ContractViewAdd){
	var MainRouter = Backbone.Router.extend({
		routes: {
			"":"index",
			"desktop": "desktop",
			"contracts": "contracts",
			"addContract":"addContract",
			"editContract/:id":"editContract"
		},

		currentView:"",

		containerView:"",

		initialize:function(options){
			this.containerView = options.containerView;
		},

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
			this.containerView.append(view.el);
		}
	});	

	return MainRouter;
});
