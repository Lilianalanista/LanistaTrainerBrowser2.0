/*
 * File: app/controller/CustomersController.js
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

Ext.define('LanistaTrainer.controller.CustomersController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.customerscontroller',

    id: 'customersController',

    refs: [
        {
            ref: 'mainStage',
            selector: '#mainStage'
        },
        {
            ref: 'rightCommandPanel',
            selector: '#rightCommandPanel'
        },
        {
            ref: 'leftCommandPanel',
            selector: '#leftCommandPanel'
        },
        {
            ref: 'mainViewport',
            selector: 'mainViewport'
        },
        {
            autoCreate: true,
            ref: 'CustomersPanel',
            selector: '#customersPanel',
            xtype: 'customersPanel'
        }
    ],

    onShowCustomersPanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomersPanel';
            LanistaTrainer.app.fireEvent('showCustomersPanel');
        });
    },

    onCloseCustomersPanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeCustomersPanel', function() {
            if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'DashboardPanel')
                LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
            else {
                if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'FavoritesPanel'){
                    LanistaTrainer.app.getController('FavoritesController').saveFavorite(function(){
                        LanistaTrainer.app.fireEvent('showFavoritesPanel', LanistaTrainer.app.getController('FavoritesController').favorites, 'CustomersPanel', 'CustomerStore');
                    });
                }
                else{

                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'PlanPanel';
                    LanistaTrainer.app.fireEvent('showPlanPanel', LanistaTrainer.app.getController('PlanController').planname);
                }
            }
        });

    },

    onNextCustomers: function(tool, e, eOpts) {
        console.log("SHOW NEXT CUSTOMERS");

        var store = Ext.getStore("CustomerStore");
        var totalPages = Math.ceil(store.getTotalCount()/store.pageSize);

        console.log('totalPages: ' + totalPages);

        //if (Ext.getStore("CustomerStore").currentPage < totalPages)
        //{

        if (store.getTotalCount() >= store.pageSize)

               store.nextPage();
            //LanistaTrainer.app.fireEvent('showSearchHeaderUpdate', Ext.ux.LanguageManager.TranslationArray.EXERCISES.toUpperCase());
        //}
    },

    onPreviousCustomers: function(tool, e, eOpts) {
        console.log("SHOW PREVIOUS CUSTOMERS");
        if (Ext.getStore("CustomerStore").currentPage > 1)
        {
            var store = Ext.getStore("CustomerStore");
            store.previousPage();
            //LanistaTrainer.app.fireEvent('showSearchHeaderUpdate', Ext.ux.LanguageManager.TranslationArray.EXERCISES.toUpperCase());
        }
    },

    onNewCustomerButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.fireEvent("promtEmailRequest", "New customer", "Enter the email of your new customer" );
        });
    },

    onShowCustomersPanel: function(callback) {

        var controller = this,
            customerPanel	= controller.getCustomersPanel(),
            mainStage	= controller.getMainStage(),
            storeCustomers = Ext.getStore('CustomerStore'),
            viewportXCapacity	= Math.round(mainStage.getEl().getWidth(true)/207),
            viewportCapacity	= Math.floor((mainStage.getEl().getHeight(true)-47)/190) * viewportXCapacity;

        storeCustomers.pageSize = viewportCapacity;

        Ext.getStore('CustomerStore').clearFilter();
        Ext.getStore('CustomerStore').load();

        mainStage.add( customerPanel );

        customerPanel.on('hide', function(component) {
            component.destroy();
        }, controller);

        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons('closeCustomersPanelButton');
        this.showCommands();

        // *** 2 Show the panel
        customerPanel.show();

        LanistaTrainer.app.fireEvent('showCustomersHeaderUpdate');
        LanistaTrainer.app.fireEvent('showStage');

        // *** 4 Callback
        if (callback instanceof Function) callback();

        // *** 5 Load data
        controller.loadData();

    },

    onCloseCustomersPanel: function(callback) {
        var controller = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getCustomersPanel().hide();
            if (callback instanceof Function) callback();
        });
    },

    onShowCustomersHeaderUpdate: function() {
        var controller = this;
        if (this.getCustomersPanel() && !this.getCustomersPanel().isHidden()) {
            controller.getMainViewport().down("#header").update({
               info: '',
               title: Ext.ux.LanguageManager.TranslationArray.CUSTOMER_LIST.toUpperCase()
            });
        }
    },

    onPromtEmailRequest: function(title, message) {
        var controller = this;
        Ext.Msg.prompt (title, message, function (response, email) {
            if ( response == 'ok' ) {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (reg.test(email) === false) {
                    LanistaTrainer.app.fireEvent("promtEmailRequest", Ext.ux.LanguageManager.TranslationArray.MSG_EMAIL_INVALID_1, Ext.ux.LanguageManager.TranslationArray.MSG_EMAIL_INVALID_2 );
                } else {
                        var userId = localStorage.getItem("user_id"),
                            customerModel = Ext.create('LanistaTrainer.model.Customer', {
                                email   : email,
                                language: 'EN',
                                birthday: '01/01/1980'
                            });
                        customerModel.setProxy(new Ext.data.proxy.Ajax({
                            url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/json',
                            noCache: false,
                            reader: {
                                type: 'json',
                                root: 'entries'
                            },
                            writer: {
                                type: 'json',
                                root: 'records',
                                allowSingle: false
                            },
                            headers: {
                                user_id: userId
                            }
                        }));
                        customerModel.save({
                            callback: function(record,event,success) {
                                if (success)
                                {
                                    LanistaTrainer.app.currentCustomer = record;
                                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerInfoPanel';
                                    LanistaTrainer.app.fireEvent('showCustomerInfoPanel');
                                }
                                else
                                {
                                    Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1, "Possible problem:  " + Ext.ux.LanguageManager.TranslationArray.MSG_CUST_EXISTS_1, function () {
                                        LanistaTrainer.app.fireEvent('showCustomersPanel');
                                    });
                                }
                            }
                        });
                }
            } else
                LanistaTrainer.app.fireEvent('showCustomersPanel');
        });


    },

    showCommands: function(callback) {

        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        //Adding bottoms into RightPanel
        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.SEARCH,
                itemId: 'searchCustomerButton',
                userAlias: 'searchCustomerButton',
                glyph: '75@Lanista Icons' //K
            })
        );

        if ( LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] !== 'FavoritesPanel'){
            this.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.NEW,
                    itemId: 'newCustomerButton',
                    userAlias: 'newCustomerButton',
                    glyph: '107@Lanista Icons' //k
                })
            );

            this.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.FOLDER_CREATE,
                    itemId: 'favoritesCustomersButton',
                    userAlias: 'favoritesCustomersButton',
                    menu: LanistaTrainer.app.getController('FavoritesController').showFavorites(1, 'CustomersPanel', 'CustomerStore'),
                    menuButtonAlign: 'right',
                    glyph: '122@Lanista Icons' //z
                })
            );

            this.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.BUTTON_RECENTLY,
                    itemId: 'recentCustomersButton',
                    userAlias: 'recentCustomersButton',
                    glyph: '121@Lanista Icons' //y
                })
            );
        }

    },

    loadData: function() {

    },

    init: function(application) {
        this.control({
            "viewport #showCustomersPanelButton": {
                click: this.onShowCustomersPanelButtonClick
            },
            "viewport #closeCustomersPanelButton": {
                click: this.onCloseCustomersPanelButtonClick
            },
            "viewport #nextCustomers": {
                click: this.onNextCustomers
            },
            "viewport #previousCustomers": {
                click: this.onPreviousCustomers
            },
            "viewport #newCustomerButton": {
                click: this.onNewCustomerButtonClick
            }
        });

        application.on({
            showCustomersPanel: {
                fn: this.onShowCustomersPanel,
                scope: this
            },
            closeCustomersPanel: {
                fn: this.onCloseCustomersPanel,
                scope: this
            },
            showCustomersHeaderUpdate: {
                fn: this.onShowCustomersHeaderUpdate,
                scope: this
            },
            promtEmailRequest: {
                fn: this.onPromtEmailRequest,
                scope: this
            }
        });
    }

});
