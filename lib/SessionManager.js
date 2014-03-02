Ext.define('Ext.ux.SessionManager', {
    singleton:  		true,
	_user:				undefined,
	_isLoggedIn: 		false,
    server:				'http://' + window.location.host,
    root: 				'/~lilianadiaz/tpmanager/',
    
    constructor: function(config) {
		this.callParent();
 	},
    
	login: function (email, password, callback) {
		var self = this;
		Ext.Ajax.request({
            url: this.server + this.root + "authentication/login",
            method: 'post',
            params: {user: email, password: password},
            failure : function(result, request){
            	self._isLoggedIn = false;
                if (callback instanceof Function) {
                    callback (false, result.status);
                }
            },
            success: function(response, opts) {
                var data = Ext.decode(response.responseText);
                if (data.error == 0) {
                	self._isLoggedIn = true;
                    if (data.birthday) {
                        var birthday = new Date(data.birthday.substring(0, 10));
                        if (isNaN(birthday)) {
                            data.birthday = '';
                        } else {
                            data.birthday = birthday;
                        }
                    }
                    self.user = data;
                    
                    localStorage.setItem("user_id", data.id);
            		localStorage.setItem("user_name", data.user_name);
                    localStorage.setItem("password", password);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("language", data.language);
                    localStorage.setItem("first_name", data.first_name ? data.first_name : '');
                    localStorage.setItem("last_name", data.last_name ? data.last_name : '');
                    localStorage.setItem("birthday", data.birthday);
                    localStorage.setItem("gender", data.gender);
                    localStorage.setItem("status", data.status);
                    localStorage.setItem("expiration_date", data.expiration_date);
                    localStorage.setItem("bu", data.bu);
                    localStorage.setItem("role", data.role ? data.role : '');
                    localStorage.setItem("version", 1.0);
                    localStorage.setItem("country", data.country ? data.country : '');
                    localStorage.setItem("zipcode", data.zipcode ? data.zipcode : '');
                    localStorage.setItem("city", data.city ? data.city : '');
                    localStorage.setItem("street", data.street ? data.street : '');
                    localStorage.setItem("company_name", data.company_name ? data.company_name : '');
                    localStorage.setItem("phone_nr", data.phone_nr ? data.phone_nr : '');
                    localStorage.setItem("recognition", data.recognition ? data.recognition : '');
                    localStorage.setItem("privacy", data.privacy ? data.privacy : '');
                    localStorage.setItem("website", data.website ? data.website : '');
                    
                    if (callback instanceof Function) {
                        callback (true, data);
                    }
                } else if (data.error > 1) {
                	self._isLoggedIn = false;
                	if (callback instanceof Function) {
                        callback (false, data.error);
                    }
                }
            }
        });
	},
	
	logout: function(callback) {
		this._isLoggedIn = false;
		Ext.Ajax.request({
            url: this.server + this.root + "authentication/logout",
            method: 'post',
            timeout: 1000,
            failure : function(response){
                if (callback instanceof Function) {
					callback();
				}
            },
            success: function(response, opts) {
                if (callback instanceof Function) {
					callback();
				}
            }
        });
		
	},
	
	getIsLoggedIn: function() {
		return this._isLoggedIn;
	},
	
	getUser: function () {
		return this._user;
	},
	
	loadLastUser: function () {
		if (localStorage.getItem("user_id")) {
			this._user = new Object();
			this._user.id 				= localStorage.getItem("user_id");
			this._user.user_name 		= localStorage.getItem("user_name");
            this._user.password 		= localStorage.getItem("password");
            this._user.email 			= localStorage.getItem("email");
            this._user.language 		= localStorage.getItem("language");
            this._user.first_name 		= localStorage.getItem("first_name");
            this._user.last_name 		= localStorage.getItem("last_name");
            this._user.birthday 		= localStorage.getItem("birthday");
            this._user.gender 			= localStorage.getItem("gender");
            this._user.status 			= localStorage.getItem("status");
            this._user.expiration_date 	= localStorage.getItem("expiration_date");
            this._user.bu 				= localStorage.getItem("bu");
            this._user.role 			= localStorage.getItem("role");
            this._user.version 			= localStorage.getItem("version");
            this._user.country 			= localStorage.getItem("country");
            this._user.zipcode 			= localStorage.getItem("zipcode");
            this._user.city 			= localStorage.getItem("city");
            this._user.street 			= localStorage.getItem("street");
            this._user.company_name 	= localStorage.getItem("company_name");
            this._user.phone_nr 		= localStorage.getItem("phone_nr");
            this._user.recorgnition 	= localStorage.getItem("recognition");
            this._user.privacy 			= localStorage.getItem("privacy");
            this._user.website 			= localStorage.getItem("website");
            this._isLoggedIn = true;
            return this._user;
		} else {
			return null;
		}
	},
	
	reconnect: function (callback) {
		var settingsStore = Ext.getStore('SettingsLocalStore');
        settingsStore.load();
        var identification = settingsStore.first();
        var app = this;
        if (identification){
            Ext.Ajax.request({
                url : LanistaPhone.util.Config.getServer_address() + LanistaPhone.util.Config.getServer_root_dir() + 'services/ping' , 
                params : { },
                headers: {'user_id': Ext.getStore('SettingsLocalStore').first().data.id},
                method: 'post',
                success: function (result, request ) {
                    console.log("user is still logged in.");
                },
                failure: function (result, request) { 
                    console.log("user is not logged in on the server.");
                    if (result.status != 0) {
                        console.log("try to log in.");
                    } else { 
                        console.log("connection to the server not possible.");
                    }
                }
            });
        }else {
            LanistaPhone.app.fireEvent('identityCheckFinished', callback);
        }
	},
	
	hasLogginData: function (callback) {
		return true;
	},
	
	getUserId: function () {
		return  localStorage.getItem("user_id");
	}
	
});

