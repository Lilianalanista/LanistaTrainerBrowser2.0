Ext.define('Ext.ux.ConfigManager', {
	singleton:  		true,
	root:				'/~lilianadiaz',
	server:				'http://localhost',
    appname:            '/LanistaTrainerBrowser2.0',
	
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