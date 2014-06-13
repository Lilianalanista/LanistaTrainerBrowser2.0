Ext.define('Ext.ux.ConfigManager', {
	singleton:  		true,
	root:				'/~lilianadiaz',
	server:				'http://localhost',
	
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