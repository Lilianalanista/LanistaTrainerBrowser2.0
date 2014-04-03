/*
 * File: app/controller/DashBoardController.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
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

Ext.define('LanistaTrainer.controller.DashBoardController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.dashBoardController',

    id: 'dashBoardController',

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
            ref: 'dashBoardPanel',
            selector: '#dashBoardPanel',
            xtype: 'dashBoardPanel'
        }
    ],

    onShowDashBoardButtonPanelClick: function(button, e, eOpts) {
        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'DashBoardPanel';
            LanistaTrainer.app.fireEvent('showDashBoardPanel');
        });
    },

    onCloseDashBoardButtonPanelClick: function(button, e, eOpts) {
        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeDashBoardPanel', function() {
            LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
        });

    },

    onShowDashBoardPanel: function(callback) {
        if (LanistaTrainer.app.panels[0])
        {
            LanistaTrainer.app.fireEvent('closeLoginPanel', function() {
                   LanistaTrainer.app.panels[0] = 'DashboardPanel';
                   LanistaTrainer.app.fireEvent('displayDashBoard');
            });
        }
        else
        {
            LanistaTrainer.app.panels[0] = 'DashboardPanel';
            LanistaTrainer.app.fireEvent('displayDashBoard');
        }
    },

    onCloseDashBoardPanel: function(callback) {
        var controller = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getDashBoardPanel().hide();
            if (callback instanceof Function) callback();
        });
    },

    onDisplayDashBoard: function(callback) {
        var controller = this,
            dashBoardPanel	= controller.getDashBoardPanel(),
            mainStage	= controller.getMainStage();

        mainStage.add( dashBoardPanel );

        dashBoardPanel.on('hide', function(component) {
            component.destroy();
        }, controller);

        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons();
        this.showCommands();

        // *** 2 Show the panel
        LanistaTrainer.app.fireEvent('showDashBoardHeaderUpdate');
        LanistaTrainer.app.fireEvent('showStage');

        // *** 4 Callback
        if (callback instanceof Function) callback();

        // *** 5 Load data
        controller.loadData();
    },

    onShowDashBoardHeaderUpdate: function() {

        var controller = this,
            user = Ext.ux.SessionManager.getUser(),
            divLogo = '<div class="lansita-header-customer-image-not-found show-info-customer" id="showPersonalDataButton"><div class="lansita-header-customer-logo show-info-customer" id="showPersonalDataButton" style="background-image: url(' + Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/img/p/'+ localStorage.getItem( "user_id" ) + '_photo.jpg);"></div></div>';
            divInfoCustomer = '<div class="lansita-header-customer-name"> <span class="last-name">' + user.last_name + '</span><br> <span class="first-name">' + user.first_name +'</span></div>';

        controller.getMainViewport().down("#header").update({
            info: divLogo + divInfoCustomer,
            title: '-' + Ext.ux.LanguageManager.TranslationArray.DASHBOARD.toUpperCase()
        });


    },

    showCommands: function(callback) {

        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.CUSTOMER_LIST,
                itemId: 'showCustomersPanelButton',
                userAlias: 'customerButton',
                glyph: '113@Lanista Icons' //q
            })
        );

        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.EXERCISES,
                itemId: 'showExercisesPanelButton',
                style: 'float: left;',
                glyph: '78@Lanista Icons' //g
            })
        );

        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.MENU_TEMPLATES,
                itemId: 'showTemplatesPanelButton',
                style: 'float: right;',
                glyph: '110@Lanista Icons' //n
            })
        );



    },

    loadData: function() {

    },

    init: function(application) {
        this.control({
            "viewport #ShowDashBoardPanelButton": {
                click: this.onShowDashBoardButtonPanelClick
            },
            "viewport #closeDashBoardPanelButton": {
                click: this.onCloseDashBoardButtonPanelClick
            }
        });

        application.on({
            showDashBoardPanel: {
                fn: this.onShowDashBoardPanel,
                scope: this
            },
            closeDashBoardPanel: {
                fn: this.onCloseDashBoardPanel,
                scope: this
            },
            displayDashBoard: {
                fn: this.onDisplayDashBoard,
                scope: this
            },
            showDashBoardHeaderUpdate: {
                fn: this.onShowDashBoardHeaderUpdate,
                scope: this
            }
        });
    }

});
