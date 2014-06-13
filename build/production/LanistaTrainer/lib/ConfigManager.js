Ext.define('Ext.ux.ConfigManager', {
	singleton:  		true,
	root:				'lanista-training.com/desktop/',
	server:				'http://',
	
	constructor: function(config) {
		this.callParent();
 	},
 	
 	getRoot: function() {
 		return this.root;
 	},
 	
 	getServer: function() {
 		return this.server;
 	}
 	
});