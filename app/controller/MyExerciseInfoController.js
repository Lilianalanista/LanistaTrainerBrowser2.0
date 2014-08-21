/*
 * File: app/controller/MyExerciseInfoController.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
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

Ext.define('LanistaTrainer.controller.MyExerciseInfoController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myExerciseInfoController',

    id: 'myExerciseInfoController',

    refs: [
        {
            ref: 'mainStage',
            selector: '#mainStage'
        },
        {
            ref: 'leftCommandPanel',
            selector: '#leftCommandPanel'
        },
        {
            ref: 'rightCommandPanel',
            selector: '#rightCommandPanel'
        },
        {
            ref: 'mainViewport',
            selector: 'mainViewport'
        },
        {
            autoCreate: true,
            ref: 'myExerciseInfoPanel',
            selector: '#myExerciseInfoPanel',
            xtype: 'myExerciseInfoPanel'
        },
        {
            ref: 'myExercise_configuration',
            selector: '#myExercise_configuration'
        }
    ],

    onShowMyExerciseInfoButton: function(button, e, eOpts) {
        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'MyExerciseInfoPanel';
            LanistaTrainer.app.fireEvent('showMyExerciseInfoPanel');
        });
    },

    onCloseMyExerciseInfoPanelButton: function(button, e, eOpts) {
        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeMyExerciseInfoPanel', function() {
            LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
        });

    },

    onCancelSettingsButtonClick: function(button, e, eOpts) {
        var controller = this;
        controller.showCommands();
    },

    onSaveSettingsButtonClick: function(button, e, eOpts) {
        var controller = this,
            server = Ext.ux.ConfigManager.getServer(),
            root = Ext.ux.ConfigManager.getRoot() + '/tpmanager/',
            form_data = controller.getMyExerciseInfoPanel().getValues();


        Ext.Ajax.request({
            url : server + root + 'user/save' ,
            params : this.getUserInfoPanel().getValues(true, false),
            method: 'post',
            headers: {
                user_id: localStorage.getItem("user_id")
            },
            success: function ( result, request ) {
                var data = Ext.decode(result.responseText);
                if (data.success) {
                    var user_data = data.entries[0];

                    localStorage.setItem("email", user_data.email ? user_data.email : '');
                    localStorage.setItem("language", user_data.language ? user_data.language : '');
                    localStorage.setItem("first_name", user_data.first_name ? user_data.first_name : '');
                    localStorage.setItem("last_name", user_data.last_name ? user_data.last_name : '');
                    localStorage.setItem("country", user_data.country ? user_data.country : '');
                    localStorage.setItem("zipcode", user_data.zipcode ? user_data.zipcode : '');
                    localStorage.setItem("city", user_data.city ? user_data.city : '');
                    localStorage.setItem("street", user_data.street ? user_data.street : '');
                    localStorage.setItem("company_name", user_data.company_name ? user_data.company_name : '');
                    localStorage.setItem("phone_nr", user_data.phone_nr ? user_data.phone_nr : '');
                    localStorage.setItem("website", user_data.website ? user_data.website : '');

                    Ext.ux.SessionManager.loadLastUser();
                    Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_DATA_SAVE, data.message, Ext.emptyFn);

                    if (user_data.language != Ext.ux.LanguageManager.lang) {
                        Ext.Msg.alert ('', Ext.ux.LanguageManager.TranslationArray.MSG_DATA_SAVE,  function() {
                            LanistaTrainer.app.fireEvent('changeLanguage', user_data.language, true);
                        });
                    }
                } else {
                    if (data.error == 510) {
                        Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1, data.message, function () {
                            controller.getUserInfoPanel().down( 'field[name=email]' ).reset();
                            controller.getUserInfoPanel().down( 'field[name=email]' ).focus();
                        });
                    } else {
                        Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1, data.message, Ext.emptyFn);
                    }
                }
                controller.showCommands();
            },
            failure: function (result, request) {
                Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1, Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1, Ext.emptyFn);
                controller.showCommands();
            }
        });



    },

    onShowMyExerciseInfoPanel: function(callback) {
        var controller = this;
        var myExerciseInfoPanel	= controller.getMyExerciseInfoPanel();
        var mainStage	= controller.getMainStage();

        mainStage.add( myExerciseInfoPanel );

        myExerciseInfoPanel.on('hide', function(component) {
            component.destroy();
        }, controller);


        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons('closeMyExerciseInfoPanelButton');
        this.showCommands();

        // *** 2 Show the panel
        myExerciseInfoPanel.show();
        LanistaTrainer.app.fireEvent('showMyExerciseInfoHeaderUpdate');
        LanistaTrainer.app.fireEvent('showStage');

        // *** 4 Callback
        if (callback instanceof Function) callback();

        // *** 5 Load data
        controller.loadData();


    },

    onCloseMyExerciseInfoPanel: function(callback) {
        var controller = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getMyExerciseInfoPanel().hide();
            if (callback instanceof Function) callback();
        });
    },

    onShowMyExerciseInfoHeaderUpdate: function() {
        var controller = this,
            info;


        //    info = '<div class="lanista-user-setup lansita-header-customer-logo-not-found show-info-customer" id=userLogoNotFound"><div class="lansita-header-customer-logo" id="changeUserLogo" style="background-image: url(' + Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/img/p/'+ localStorage.getItem("user_id") + '_logo.jpg);"></div></div>' + '<div class="lanista-user-setup trainer-logo-header">' + Ext.ux.LanguageManager.TranslationArray.YOUR_LOGO + '</div>';
        //    info = info + '<div class="lanista-user-setup lansita-header-customer-image-not-found" id="userPhotoNotFound"><div class="lansita-header-customer-photo" id="changeUserPhoto" style="background-image: url(' + Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/img/p/'+ localStorage.getItem("user_id") + '_photo.jpg);"></div></div>' + '<div class="lanista-user-setup trainer-foto-header">' + Ext.ux.LanguageManager.TranslationArray.YOUR_PHOTO + '</div>';


        if (this.getMyExerciseInfoPanel() && !this.getMyExerciseInfoPanel().isHidden()) {
            controller.getMainViewport().down("#header").update({
               info: info,
               title: Ext.ux.LanguageManager.TranslationArray.CUST_MENU_SETUP.toUpperCase()
            });
        }
    },

    showCommands: function(callback) {

        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });


    },

    loadData: function() {
        var controller = this,
            fieldset = controller.getMyExercise_configuration(),
            fields = controller.getMyExerciseInfoPanel().getForm().getFields(),
            currentLanguage = Ext.ux.LanguageManager.lang,
            comboLanguage = fields.getByKey('myExercise_language').getValue();

        Ext.ux.LanguageManager.setLanguage(comboLanguage);
        setTimeout(function()
                   {
                       fieldset.setTitle (Ext.ux.LanguageManager.TranslationArray.FORM_EXERCISE_CONFIG);
                       fields.getByKey('myExercise_name').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_EXERCISE_NAME);
                       fields.getByKey('myExercise_execution').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.EXECUTION);
                       fields.getByKey('myExercise_errors').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.POSSIBLE_ERRORS);

                       document.getElementsByName("myExercise_name")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_EMAIL;

                       Ext.ux.LanguageManager.setLanguage(currentLanguage);
                       controller.getMyExerciseInfoPanel().getForm().findField('myExercise_name').focus();
                   }, 100);






    },

    init: function(application) {
        this.control({
            "viewport #showMyExerciseInfoButton": {
                click: this.onShowMyExerciseInfoButton
            },
            "viewport #closeMyExerciseInfoPanelButton": {
                click: this.onCloseMyExerciseInfoPanelButton
            },
            "viewport #cancelSettingsButton": {
                click: this.onCancelSettingsButtonClick
            },
            "viewport #saveSettingsButton": {
                click: this.onSaveSettingsButtonClick
            }
        });

        application.on({
            showMyExerciseInfoPanel: {
                fn: this.onShowMyExerciseInfoPanel,
                scope: this
            },
            closeMyExerciseInfoPanel: {
                fn: this.onCloseMyExerciseInfoPanel,
                scope: this
            },
            showMyExerciseInfoHeaderUpdate: {
                fn: this.onShowMyExerciseInfoHeaderUpdate,
                scope: this
            }
        });
    }

});
