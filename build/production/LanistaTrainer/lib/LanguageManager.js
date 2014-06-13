Ext.define('Ext.ux.LanguageManager', {
	singleton:  		true,
	lang:				'EN',
	DE:					0,
	EN:					1,
	ES:					2,
	
	constructor: function(config) {
		this.callParent();
		this.detectLanguage();
 	},
 	
 	detectLanguage: function() {
 		var self = this;
 		var current_lang = localStorage.getItem('lanista-lang');
 		current_lang = current_lang ? current_lang : 'EN';
 		self.setLanguage(current_lang);
 		/*
 		$.browserLanguage(function( language , acceptHeader ){
 			self.lang = 'EN';
      		if (language == "German")
      			self.lang = 'DE';
      		else if (language == "Spanish / Castilian")
				self.lang = 'ES';
			self.setLanguage(self.lang);
    	});
    	*/
 	},
 	
 	setLanguage: function( language, callback ) {
 		var self = this;
 		self.lang = language;
 		var head	= document.getElementsByTagName( 'head' )[0];
 		var script	= document.createElement( 'script' );
 		script.setAttribute( "type","text/javascript" );
 		script.onreadystatechange = script.onload = function () {
      		self.TranslationArray = Messages;
            
            
            console.log('ACTUALIZANDO ARCHIVO…..');
            
            
    		localStorage.setItem( 'lanista-lang', language );
    		if ( callback instanceof Function ) callback();
    		
   		};
 		script.setAttribute( "src", "lib/languages/app-"+language+".js" );
 		head.appendChild( script );
 	},
 	
 	getLanguage: function() {
 		return this.lang;
 	}
});