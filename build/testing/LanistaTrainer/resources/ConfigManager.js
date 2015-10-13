Ext.define('Ext.ux.ConfigManager', {
	singleton:  		true,
	root:				'',
	server:				'',
    appname:            'http://athlet-beta.lanista-training.com/',
	
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