Ext.define('Ext.ux.ConfigManager', {
	singleton:  		true,
	root:				'',
	server:				'',
    appname:            'http://lanista-training.com/desktop',
	
	constructor: function(config) {
		this.callParent();
 	},
 	
 	getRoot: function() {
 		return this.root;
 	},
 	
 	getServer: function() {
 		return this.server;
 	},
    
    getAppname: function() {
 		return this.appname;
 	}
 	
});