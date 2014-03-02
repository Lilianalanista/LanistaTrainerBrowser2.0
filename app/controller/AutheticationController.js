/*
 * File: app/controller/AutheticationController.js
 *
 * This file was generated by Sencha Architect version 3.0.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('LanistaTrainer.controller.AutheticationController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.autheticationController',

    refs: [
        {
            autoCreate: true,
            ref: 'loginPanel',
            selector: 'loginPanel',
            xtype: 'loginPanel'
        }
    ],

    onLoginButtonClick: function(button, e, eOpts) {
        var self = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {

            var form = self.getLoginPanel(),
                form_data = form.getValues(),
                email = form_data.email,
                password = form_data.password,
                controller = controller;

            if (email === '' || password === '') {
                Ext.Msg.alert('Email oder Passwort waren leer', 'Versuche es noch mal !', function() {
                    LanistaTrainer.app.fireEvent('showStage');
                    LanistaTrainer.app.fireEvent('setFieldsFocus', true, 'email');
                });
            } else {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(reg.test(email) === false) {
                    Ext.Msg.alert('Falsche Emailadresse', 'Versuche es noch mal !', function() {
                        LanistaTrainer.app.fireEvent('showStage');
                        LanistaTrainer.app.fireEvent('setFieldsFocus', false, "");
                    });
                } else {
                    LanistaTrainer.app.fireEvent('loginUser', email, password, function (data) {

                        //LanistaTrainer.app.fireEvent('showMessage', "Anmeldung war erfolgreich. <br> Herzlich willkommen " + data.first_name+ '<br>LanistaTrainer wird vorbereitet...', function () {

                        alert("Anmeldung war erfolgreich. <br> Herzlich willkommen " + data.first_name+ '<br>Lanista wird vorbereitet...');
                            Ext.ux.SessionManager.loadLastUser();
                            LanistaTrainer.app.setProxies();
                            LanistaTrainer.app.fireEvent('showDashboardPanel');
                    },
                                                 function (status) {
                                                     console.log("MARK 2");
                                                     console.log(status);
                                                     if (status == 3){
                                                         Ext.Msg.alert('Anmeldungsfehler', 'Konto inaktiv. Bitte bestätige die Aktivierungsmail', function() {
                                                             LanistaTrainer.app.fireEvent('showStage');
                                                             LanistaTrainer.app.fireEvent('setFieldsFocus', false, "");
                                                         });
                                                     }else if (status == 2){
                                                         Ext.Msg.alert('Anmeldungsfehler', 'Email oder password waren inkorrekt', function() {
                                                             LanistaTrainer.app.fireEvent('showStage');
                                                             LanistaTrainer.app.fireEvent('setFieldsFocus', false, "");
                                                         });
                                                     } else if (status == 100){
                                                         Ext.Msg.alert('Login fehlgeschlagen', 'Trainings-App ist nur für Sportler', function() {
                                                             LanistaTrainer.app.fireEvent('showStage');
                                                             LanistaTrainer.app.fireEvent('setFieldsFocus', false, "");
                                                         });
                                                     } else {
                                                         Ext.Msg.alert('Verbindungsfehler', 'Versuche es noch mal !', function() {
                                                             LanistaTrainer.app.fireEvent('showStage');
                                                             LanistaTrainer.app.fireEvent('setFieldsFocus', false, "");
                                                         });
                                                     }

                                                 });
                }
            }
        });

    },

    onLogoutButtonClick: function(button, e, eOpts) {

        LanistaTrainer.app.fireEvent('hideStage', function () {
            LanistaTrainer.app.fireEvent('logoutUser', function () {
               LanistaTrainer.app.fireEvent('closeUserInfoPanel', function() {
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("user_name");
                    localStorage.removeItem("password");
                    localStorage.removeItem("email");
                    localStorage.removeItem("language");
                    localStorage.removeItem("first_name");
                    localStorage.removeItem("last_name");
                    localStorage.removeItem("birthday");
                    localStorage.removeItem("gender");
                    localStorage.removeItem("status");
                    localStorage.removeItem("expiration_date");
                    localStorage.removeItem("bu");
                    localStorage.removeItem("role");
                    localStorage.removeItem("version");
                    localStorage.removeItem("country");
                    localStorage.removeItem("zipcode");
                    localStorage.removeItem("city");
                    localStorage.removeItem("street");
                    localStorage.removeItem("company_name");
                    localStorage.removeItem("phone_nr");
                    localStorage.removeItem("recognition");
                    localStorage.removeItem("privacy");
                    localStorage.removeItem("website");
                    LanistaTrainer.app.fireEvent('showLoginPanel');
               });
            });
        });

    },

    onLoginUser: function(email, password, successCallback, errorCallback) {
        Ext.ux.SessionManager.login (email, password, function(success, data) {
            if (success) {
                if (successCallback && successCallback instanceof Function) {
                    successCallback(data);
                }
            } else {
                if (errorCallback && errorCallback instanceof Function) {
                    errorCallback(data);
                }
            }
        });
    },

    onLogoutUser: function(CallBack) {
        Ext.ux.SessionManager.logout ( function() {
            if (CallBack && CallBack instanceof Function) {
                CallBack();
            }
        });
    },

    init: function(application) {
        this.control({
            "viewport #loginButton": {
                click: this.onLoginButtonClick
            },
            "viewport #logoutButton": {
                click: this.onLogoutButtonClick
            }
        });

        application.on({
            loginUser: {
                fn: this.onLoginUser,
                scope: this
            },
            logoutUser: {
                fn: this.onLogoutUser,
                scope: this
            }
        });
    }

});
