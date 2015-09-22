/*
 * File: app/controller/MainController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('LanistaTrainer.controller.MainController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.mainController',

    id: 'mainController',

    refs: {
        mainStage: '#mainStage',
        mainViewport: '#mainViewport',
        lanistaCopyRights: '#lanistaCopyRights',
        header: '#header',
        leftCommandPanel: '#leftCommandPanel',
        rightCommandPanel: '#rightCommandPanel',
        lanistaStage: '#lanistaStage'
    },

    onHideStage: function(callback) {
        var leftCommandPanel = this.getLeftCommandPanel();

        this.getMainStage().el.setStyle('opacity', '0');

        leftCommandPanel.el.setStyle('opacity', '0');
        leftCommandPanel.up().down('#splitterLeft').el.setStyle('opacity', '0');
        leftCommandPanel.up().down('#splitterRight').el.setStyle('opacity', '0');


        this.getRightCommandPanel().el.setStyle('opacity', '0');
        setTimeout(
            function(){
                if (callback instanceof Function) callback();
            },
            1000
        );

    },

    onShowStage: function(callback) {
        var leftCommandPanel = this.getLeftCommandPanel(),
            mainStage = this.getMainStage();

        mainStage.el.setStyle('opacity', '1');

        leftCommandPanel.el.setStyle('opacity', '1');
        leftCommandPanel.up().down('#splitterLeft').el.setStyle('opacity', '1');
        leftCommandPanel.up().down('#splitterRight').el.setStyle('opacity', '1');

        this.getRightCommandPanel().el.setStyle('opacity', '1');

        setTimeout(function(){
            if (callback instanceof Function) callback();
        }, 1000);
    },

    onShowSavePanel: function(saveButtonId, cancelButtonId) {
        var controller = this;
        if ( !this.getMainStage().down ( '#' + saveButtonId ) ) {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });

            var saveButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                //iconCls: 'lanista-sync',
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_SAVE,
                itemId: saveButtonId,
                glyph: '100@Lanista Icons', //d
                cls: [
                    'lanista-command-button',
                    'lanista-command-button-green'
                    ]
            });
            var cancelButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                //iconCls: 'lanista-remove',
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_CANCEL,
                itemId: cancelButtonId,
                glyph: '65@Lanista Icons', //A
                cls: [
                    'lanista-command-button',
                    'lanista-command-button-red'
                    ]
            });

            controller.getRightCommandPanel().add(
                saveButton
            );
            controller.getRightCommandPanel().add(
                cancelButton
            );
        }

    },

    saveModel: function(model, options) {
            options = Ext.apply({}, options);

            var me = model,
                phantom = me.phantom,
                dropped = me.dropped,
                action = dropped ? 'destroy' : (phantom ? 'create' : 'update'),
                scope  = options.scope || me,
                callback = options.callback,
                proxy = me.proxy,
                operation;

            options.records = [me];
            options.internalCallback = function(operation) {
                var args = [me, operation],
                    success = operation.wasSuccessful();
                if (success) {
                    Ext.callback(options.success, scope, args);
                } else {
                    Ext.callback(options.failure, scope, args);
                }
                args.push(success);
                Ext.callback(callback, scope, args);
            };
            delete options.callback;

            operation = proxy.createOperation(action, options);

            // Not a phantom, then we must perform this operation on the remote datasource.
            // Record will be removed from the store in the callback upon a success response
            if (dropped && phantom) {
                // If it's a phantom, then call the callback directly with a dummy successful ResultSet
                operation.setResultSet(Ext.data.reader.Reader.prototype.nullResultSet);
                me.setErased();
                operation.setSuccessful(true);
            } else {
                operation.execute();
            }

            return operation;
    },

    eraseModel: function(model, options) {
        var me = model;

            me.erasing = true;
            me.drop();

            delete me.erasing;
            return this.saveModel(me, options);
    },

    capitalizeFirstLetter: function(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);

    },

    onReconect: function() {
        var controller = this,
            user = Ext.ux.SessionManager.getUser();

        console.log("try to log in.");
        LanistaTrainer.app.fireEvent('loginUser', user.email, user.password,
                                     function (data) {
                                         Ext.Msg.show({
                                             title: Ext.ux.LanguageManager.TranslationArray.MSG_RECONECT_TITLE,
                                             message: Ext.ux.LanguageManager.TranslationArray.MSG_RECONECT_INFO,
                                             width: 300,
                                             buttons: Ext.Msg.OK,
                                             multiline: false,
                                             fn: function(btn, text){
                                                 setTimeout(function()
                                                            {
                                                                LanistaTrainer.app.panels = [];
                                                                LanistaTrainer.app.getController('MainController').getMainStage().destroy();
                                                                LanistaTrainer.app.getController('MainController').getLanistaStage().destroy();
                                                                LanistaTrainer.app.getController('MainController').getHeader().destroy();
                                                                LanistaTrainer.app.getController('MainController').getLanistaCopyRights().destroy();
                                                                LanistaTrainer.app.getController('MainController').getMainViewport().destroy();
                                                                LanistaTrainer.app.launch();
                                                            }, 1600);
                                             }

                                         });
                                     },
                                     function (status) {
                                         Ext.Msg.show({
                                            title: Ext.ux.LanguageManager.TranslationArray.MSG_RECONECT_TITLE,
                                            message: Ext.ux.LanguageManager.TranslationArray.MSG_RECONECT_INFO,
                                            width: 300,
                                            buttons: Ext.Msg.OK,
                                            multiline: false,
                                            fn: function(btn, text){
                                                setTimeout(function()
                                                            {
                                                                LanistaTrainer.app.panels = [];
                                                                LanistaTrainer.app.getController('MainController').getMainStage().destroy();
                                                                LanistaTrainer.app.getController('MainController').getLanistaStage().destroy();
                                                                LanistaTrainer.app.getController('MainController').getHeader().destroy();
                                                                LanistaTrainer.app.getController('MainController').getLanistaCopyRights().destroy();
                                                                LanistaTrainer.app.getController('MainController').getMainViewport().destroy();
                                                                LanistaTrainer.app.fireEvent('showLoginPanel');
                                                            }, 1600);
                                                }
                                         });
                                     });


    },

    init: function(application) {
        application.on({
            hideStage: {
                fn: this.onHideStage,
                scope: this
            },
            showStage: {
                fn: this.onShowStage,
                scope: this
            },
            showSavePanel: {
                fn: this.onShowSavePanel,
                scope: this
            },
            reconect: {
                fn: this.onReconect,
                scope: this
            }
        });
    }

});
