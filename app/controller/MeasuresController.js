/*
 * File: app/controller/MeasuresController.js
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

Ext.define('LanistaTrainer.controller.MeasuresController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.measuresController',

    id: 'measuresController',

    refs: [
        {
            autoCreate: true,
            ref: 'measuresPanel',
            selector: 'measuresPanel',
            xtype: 'measuresPanel'
        },
        {
            ref: 'mainStage',
            selector: '#mainStage'
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
            ref: 'leftCommandPanel',
            selector: '#leftCommandPanel'
        }
    ],

    onShowMeasuresPanelButtonClick: function(button, e, eOpts) {
        var controller = this;
        controller.currentPanel = new Ext.util.MixedCollection();
        controller.currentPanel.add('measuresTab','chart');
        controller.currentPanel.add('caliperTab','chart');
        controller.currentPanel.add('circumferencesTab','chart');

        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'MeasuresPanel';
            LanistaTrainer.app.fireEvent('showMeasuresPanel');
        });


    },

    onCloseMeasuresPanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeMeasuresPanel', function() {
            LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
        });


    },

    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var controller = this,
            store = Ext.getStore('MeasuresStore');

        if ( newCard.id == 'measuresTab' ) {
            store.removeFilter('measuresFilter');
            store.removeFilter('caliperFilter');
            filterFunction = new Ext.util.Filter({
                id:'measuresFilter',
                property: "user_id", value: LanistaTrainer.app.currentCustomer.data.id,
                filterFn: function(item){
                    return (item.data.weight !== 0 || item.data.height !== 0 || item.data.futrex !== 0);
                }
            });
            store.filters.add (filterFunction);
            store.loadPage(1);
        }else if ( newCard.id == 'caliperTab' ) {
            store.removeFilter('measuresFilter');
            store.removeFilter('caliperFilter');
            filterFunction = new Ext.util.Filter({
                id:'caliperFilter',
                property: "user_id", value: LanistaTrainer.app.currentCustomer.data.id,
                filterFn: function(item){
                    return (item.data.trizeps   !== 0 ||
                            item.data.scapula   !== 0 ||
                            item.data.auxiliar  !== 0 ||
                            item.data.chest     !== 0 ||
                            item.data.sprailium !== 0 ||
                            item.data.abs       !== 0 ||
                            item.data.quads     !== 0 );
                }
            });
            store.filters.add (filterFunction);
            store.loadPage(1);
        }


    },

    onchartTableButtonClick: function(button, e, eOpts) {
        var controller = this,
            measuresPanel = controller.getMeasuresPanel(),
            activeTab;

            activeTab = measuresPanel.down('#measureTabs').getActiveTab();

        if (!controller.currentPanel.get(activeTab.id) || controller.currentPanel.get(activeTab.id) === 'table'){
            activeTab.down('#measuresChat').show();
            activeTab.down('#measuresTable').hide();
        }
        else{
            activeTab.down('#measuresChat').hide();
            activeTab.down('#measuresTable').show();
        }
        controller.currentPanel.replace(activeTab.id, (!controller.currentPanel.get(activeTab.id) || controller.currentPanel.get(activeTab.id) === 'table') ? 'chart' : 'table');
    },

    onShowMeasuresPanel: function(callback) {
        var controller = this,
            measuresPanel,
            mainStage	= controller.getMainStage(),
            measuresPanel = controller.getMeasuresPanel(),
            measuresStore = Ext.getStore('MeasuresStore');

        measuresStore.setProxy(new Ext.data.proxy.Ajax({
            url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/getcustomerweights',
            reader: {
                type: 'json',
                root: 'entries'
            },
            writer: {
                type: 'json',
                root: 'results'
            },
            headers: {
                user_id: localStorage.getItem("user_id")
            }
        }));

        measuresPanel.down('#measuresChat').show();
        measuresPanel.down('#measuresTable').hide();

        measuresStore.removeFilter('caliperFilter');
        filterFunction = new Ext.util.Filter({
            id:'measuresFilter',
            property: "user_id", value: LanistaTrainer.app.currentCustomer.data.id,
            filterFn: function(item){
                return (item.data.weight !== 0 || item.data.height !== 0 || item.data.futrex !== 0);
            }
        });
        measuresStore.filters.add (filterFunction);
        //measuresStore.setSorters ( 'record_date' );
        measuresStore.load(function(records, operation, success) {
            mainStage.add( measuresPanel );
            measuresPanel.on('hide', function(component) {
                component.destroy();
            }, controller);

            // **** 1 create the commands
            LanistaTrainer.app.setStandardButtons('closeMeasuresPanelButton');
            controller.showCommands();

            // *** 2 Show the panel
            measuresPanel.show();

            LanistaTrainer.app.fireEvent('showMeasuresHeaderUpdate');
            LanistaTrainer.app.fireEvent('showStage');

            // *** 4 Callback
            if (callback instanceof Function) callback();

            // *** 5 Load data
            controller.loadData();
        });

    },

    onCloseMeasuresPanel: function(callback) {
        var controller = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getMeasuresPanel().hide();
            if (callback instanceof Function) callback();
        });
    },

    onShowMeasuresHeaderUpdate: function() {
        var controller = this;
        if (this.getMeasuresPanel() && !this.getMeasuresPanel().isHidden()) {
            controller.getMainViewport().down("#header").update({
               info: '',
               title: ''
            });
        }
    },

    showCommands: function(callback) {

        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_ADD_EXERCISES,
                itemId: 'chartTableButton',
                glyph: '79@Lanista Icons' //O
            })
        );
    },

    loadData: function() {

    },

    init: function(application) {
        this.control({
            "viewport #showMeasuresPanelButton": {
                click: this.onShowMeasuresPanelButtonClick
            },
            "viewport #closeMeasuresPanelButton": {
                click: this.onCloseMeasuresPanelButtonClick
            },
            "measuresPanel #measureTabs": {
                tabchange: this.onTabpanelTabChange
            },
            "viewport  #chartTableButton": {
                click: this.onchartTableButtonClick
            }
        });

        application.on({
            showMeasuresPanel: {
                fn: this.onShowMeasuresPanel,
                scope: this
            },
            closeMeasuresPanel: {
                fn: this.onCloseMeasuresPanel,
                scope: this
            },
            showMeasuresHeaderUpdate: {
                fn: this.onShowMeasuresHeaderUpdate,
                scope: this
            }
        });
    }

});
