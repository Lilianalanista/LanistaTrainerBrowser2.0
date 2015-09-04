/*
 * File: app/controller/TemplatesController.js
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

Ext.define('LanistaTrainer.controller.TemplatesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.templatesController',

    id: 'templatesController',

    refs: {
        templatesPanel: {
            autoCreate: true,
            selector: 'templatesPanel',
            xtype: 'templatesPanel'
        },
        mainStage: '#mainStage',
        rightCommandPanel: '#rightCommandPanel',
        mainViewport: 'mainViewport',
        leftCommandPanel: '#leftCommandPanel'
    },

    control: {
        "viewport #showTemplatesPanelButton": {
            click: 'onShowTemplatesPanelButtonClick'
        },
        "viewport #closeTemplatesPanelButton": {
            click: 'onCloseTemplatesPanelButtonClick'
        },
        "viewport #nextTemplates": {
            click: 'onNextTemplatesClick'
        },
        "viewport #previousTemplates": {
            click: 'onPreviousTemplatesClick'
        },
        "viewport #newTemplateButton": {
            click: 'onNewTemplateButtonClick'
        },
        "viewport #searchTemplatesButton": {
            click: 'onSearchTemplatesButtonClick'
        }
    },

    onShowTemplatesPanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'TemplatesPanel';
            LanistaTrainer.app.fireEvent('showTemplatesPanel');
        });


    },

    onCloseTemplatesPanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeTemplatesPanel', function() {
            LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
        });


    },

    onNextTemplatesClick: function(tool, e, owner, eOpts) {
        var store = Ext.getStore("PlanStore");




        console.log('STORE......');
        console.log(store);







        if (store.getTotalCount() >= store.pageSize){
            store.nextPage();
            LanistaTrainer.app.fireEvent('showTemplatesHeaderUpdate');
        }
    },

    onPreviousTemplatesClick: function(tool, e, owner, eOpts) {
        if (Ext.getStore("PlanStore").currentPage > 1)
        {
            var store = Ext.getStore("PlanStore");
            store.previousPage();
            LanistaTrainer.app.fireEvent('showTemplatesHeaderUpdate');
        }
    },

    onNewTemplateButtonClick: function(button, e, eOpts) {
        var controller = this;
        LanistaTrainer.app.fireEvent('closeTemplatesPanel', function() {
            LanistaTrainer.app.getController('CustomerExercisesController').prompPlanNameRequest ( Ext.ux.LanguageManager.TranslationArray.NEW_TEMPLATE_TITLE, Ext.ux.LanguageManager.TranslationArray.NEW_TEMPLATE_MESSAGE );
        });
    },

    onSearchTemplatesButtonClick: function(button, e, eOpts) {
        Ext.Msg.alert (
            '',
            Ext.ux.LanguageManager.TranslationArray.FUNCTIONALITY_NOT_AVAILABLE,
            null,
            null
        );
    },

    onShowTemplatesPanel: function(callback) {
        var controller = this,
            templatesPanel	= controller.getTemplatesPanel(),
            mainStage	= controller.getMainStage(),
            planStore = Ext.getStore('PlanStore'),
            userId = localStorage.getItem("user_id"),
            dateToday = new Date();

        planStore.clearGrouping();
        planStore.clearFilter();
        planStore.getProxy().headers = {};

        if (!Ext.ux.SessionManager.getIsLoggedIn())
            planStore.setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/plan/json',
                model: 'LanistaTrainer.model.Plan',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                }/*,
                extraParams: {
                    last_update: dateToday.getFullYear() + '-' + (dateToday.getMonth() +1) + '-' + dateToday.getDate()
                }*/
            }));
        else{
            planStore.setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/plan/json',
                model: 'LanistaTrainer.model.Plan',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                },
                headers: {
                    user_id: userId
                    }
            }));
        }


        //planStore.filter ({property: 'customer_id', value: '75'});

        templatesPanel.down('#templatesView').bindStore(planStore);
        planStore.load();

        planStore.sort( {
            direction: 'DESC',
            property: 'creation_date'
        });

        /*planStore.load({
            callback: function(records, operation, success) {
                templatesPanel.down('#templatesView').refresh();
            }
        });*/

        //planStore.load();
        mainStage.add( templatesPanel );

        templatesPanel.on('hide', function(component) {
            component.destroy();
        }, controller);

        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons('closeTemplatesPanelButton');
        this.showCommands();

        // *** 2 Show the panel
        templatesPanel.show();

        LanistaTrainer.app.fireEvent('showTemplatesHeaderUpdate');
        LanistaTrainer.app.fireEvent('showStage');

        // *** 4 Callback
        if (callback instanceof Function) callback();

        // *** 5 Load data
        controller.loadData();




    },

    onCloseTemplatesPanel: function(callback) {
        var controller = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getTemplatesPanel().hide();
            if (callback instanceof Function) callback();
        });
    },

    onShowTemplatesHeaderUpdate: function() {
        var controller = this;
        if (this.getTemplatesPanel() && !this.getTemplatesPanel().isHidden()) {
            controller.getMainViewport().down("#header").update({
               info: '',
               title: Ext.ux.LanguageManager.TranslationArray.MENU_TEMPLATES.toUpperCase()
            });
        }
    },

    showCommands: function(callback) {

        var controller = this,
            user;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        if (Ext.ux.SessionManager.getIsLoggedIn()){
            controller.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.NEW_TEMPLATE_TITLE,
                    itemId: 'newTemplateButton',
                    glyph: '108@Lanista Icons' //l
                })
            );

            controller.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.MY_TEMPLATES,
                    itemId: 'myTemplatesButton',
                    glyph: '122@Lanista Icons' //z
                })
            );
        }
        controller.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.SEARCH,
                itemId: 'searchTemplatesButton',
                glyph: '90@Lanista Icons' //Z
            })
        );
    },

    loadData: function() {

    },

    init: function(application) {
        application.on({
            showTemplatesPanel: {
                fn: this.onShowTemplatesPanel,
                scope: this
            },
            closeTemplatesPanel: {
                fn: this.onCloseTemplatesPanel,
                scope: this
            },
            showTemplatesHeaderUpdate: {
                fn: this.onShowTemplatesHeaderUpdate,
                scope: this
            }
        });
    }

});
