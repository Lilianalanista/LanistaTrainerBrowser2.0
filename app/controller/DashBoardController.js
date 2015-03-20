/*
 * File: app/controller/DashBoardController.js
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

    onShowDashBoardHeaderUpdate: function() {

        var controller = this,
            user = Ext.ux.SessionManager.getUser(),
            divLogo = '<div class="lansita-header-customer-image-not-found show-info-customer" id="showPersonalDataButton"><div class="lansita-header-customer-logo show-info-customer" id="showPersonalDataButton" style="background-image: url(' + Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/img/p/'+ localStorage.getItem( "user_id" ) + '_photo.jpg);"></div></div>';
            divInfoCustomer = '<div class="lansita-header-customer-name"> <span class="last-name">' + user.last_name + '</span><br> <span class="first-name">' + user.first_name +'</span></div>';

        controller.getMainViewport().down("#header").update({
            info: divLogo + divInfoCustomer,
            title: Ext.ux.LanguageManager.TranslationArray.DASHBOARD.toUpperCase()
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

    getBirthdayCustomers: function() {
        var userId = localStorage.getItem("user_id"),
            birthdayStore,
            controller = this,
            containerAux,
            dateFormat;

        Ext.define('Birthday', {
             extend: 'Ext.data.Model',
             fields: [
                 {name: 'id',         type: 'string'},
                 {name: 'first_name', type: 'string'},
                 {name: 'last_name',  type: 'string'},
                 {name: 'birthday',   type: 'string'}
             ]
         });

         var birthdayStore = Ext.create('Ext.data.Store', {
             model: 'Birthday',
             proxy: {
                 type: 'ajax',
                 url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/getbirthdayslist',
                 headers: {
                     user_id: userId
                 },
                 noCache: false,
                 reader: {
                     type: 'json',
                     root: 'entries'
                 }
             }
         });

        birthdayStore.load(function(records, operation, success) {
            for(var i = 0; (i < records.length && i < 20); i++){
                containerAux = Ext.create('Ext.container.Container', {
                    tpl: [
                        '<div class="lanista-birthday-customer">',
                        '<div class="lanista-dashboard-customer-photo" id="dahsboardcustomerItemInfo" style="background-image: url({[Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/p/" + values["id"] + "_photo.jpg"]});"></div>',
                        '<div class="lanista-dashboard-customer-background" id="dahsboardcustomerItem" style="customer-image">j</div>',
                        '<div class="lanista-dashboard-text">',
                        '   <div class="lanista-birthday-firstname">{first_name}</div>',
                        '   <div class="lanista-birthday-lastname">{last_name}</div>',
                        '   <div class="lanista-birthday-date">{birthday}</div>',
                        '</div>',
                        '</div>'
                    ]
                });

                dateFormat = Ext.ux.LanguageManager.lang === 'EN' ? Ext.util.Format.date( records[i].data.birthday, 'F d') :Ext.util.Format.date( records[i].data.birthday, 'd F');
                containerAux.update({	id: records[i].data.id,
                                        first_name: records[i].data.first_name,
                                        last_name: records[i].data.last_name ,
                                        birthday: dateFormat });

                controller.getDashBoardPanel().down('#customersContainer').down('#customers').down('#birthdayCustomers').insert ( i, containerAux );
            }
        });

    },

    getActiveCustomers: function() {
        var userId = localStorage.getItem("user_id"),
            birthdayStore,
            controller = this,
            containerAux,
            auxDate,
            dif,
            today,
            partNum = [],
            partDec = [];

        Ext.define('Birthday', {
             extend: 'Ext.data.Model',
             fields: [
                 {name: 'id',         type: 'string'},
                 {name: 'first_name', type: 'string'},
                 {name: 'last_name',  type: 'string'},
                 {name: 'last_protocoll_date',   type: 'string'},
                 {name: 'email ',   type: 'string'}
             ]
         });

         var birthdayStore = Ext.create('Ext.data.Store', {
             model: 'Birthday',
             proxy: {
                 type: 'ajax',
                 url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/getselfprotocolledusers',
                 headers: {
                     user_id: userId
                 },
                 noCache: false,
                 reader: {
                     type: 'json',
                     root: 'entries'
                 }
             }
         });

        birthdayStore.load(function(records, operation, success) {
            for(var i = 0; (i < records.length && i < 20); i++){
                containerAux = Ext.create('Ext.container.Container', {
                    tpl: [
                        '<div class="lanista-active-customer" id={[values["id"]]} >',
                        '<div class="lanista-dashboard-customer-photo" id="dahsboardcustomerItemInfo" style="background-image: url({[Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/p/" + values["id"] + "_photo.jpg"]});"></div>',
                        '<div class="lanista-dashboard-customer-background" id="dahsboardcustomerItem" style="customer-image">j</div>',
                        '<div class="lanista-dashboard-text">',
                        '   <div class="lanista-birthday-firstname">{first_name}</div>',
                        '   <div class="lanista-birthday-lastname">{last_name}</div>',
                        '   <div class="lanista-birthday-date">{last_protocoll_date}</div>',
                        '</div>',
                        '</div>'
                    ]
                });

                today = new Date();
                auxDate = new Date(records[i].data.last_protocoll_date);
                dif = ((today.getTime() - auxDate.getTime()) / 86400000) * 0.00274057;
                partNum = dif.toString().split(".");

                if (partNum[1] > 0){
                    partNum[1] = (dif - partNum[0]) / 0.0833;
                    partDec = partNum[1].toString().split(".");
                }

                containerAux.update({	id: records[i].data.id,
                                        first_name: records[i].data.first_name,
                                        last_name: records[i].data.last_name,
                                        last_protocoll_date: partNum[0] > 0 ? Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_FROM + ' ' + (partNum[0] + ' ' + Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_YEAR + ' ' + (partDec[0] > 0 ? partDec[0] + Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_MONTH : '')) :
                                                             partDec[0] > 0 ? Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_FROM + ' ' + partDec[0] + ' ' + Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_MONTH : '',
                                        email: records[i].data.email});
                containerAux.recordId = records[i].data.id;

                controller.getDashBoardPanel().down('#customersContainer').down('#customers').down('#activeCustomers').recordId = records[i].data.id;
                controller.getDashBoardPanel().down('#customersContainer').down('#customers').down('#activeCustomers').insert ( i, containerAux );
            }
        });

    },

    getPlansToExpire: function() {
        var userId = localStorage.getItem("user_id"),
            birthdayStore,
            controller = this,
            containerAux,
            dateFormat;

        Ext.define('Birthday', {
             extend: 'Ext.data.Model',
             fields: [
                 {name: 'id',         type: 'string'},
                 {name: 'first_name', type: 'string'},
                 {name: 'last_name',  type: 'string'},
                 {name: 'plan_name',   type: 'string'},
                 {name: 'creation_date',   type: 'string'},
                 {name: 'duration',   type: 'string'},
                 {name: 'remaining_days',   type: 'string'}
             ]
         });

         var birthdayStore = Ext.create('Ext.data.Store', {
             model: 'Birthday',
             proxy: {
                 type: 'ajax',
                 url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/getplansabouttoexpire',
                 headers: {
                     user_id: userId
                 },
                 noCache: false,
                 reader: {
                     type: 'json',
                     root: 'entries'
                 }
             }
         });

        birthdayStore.load(function(records, operation, success) {
            for(var i = 0; (i < records.length && i < 20); i++){
                containerAux = Ext.create('Ext.container.Container', {
                    cls: 'lanista-expire',
                    tpl: [
                            '<div class="lanista-toexpire-plan">',
                            '  <div class="lanista-toexpire-plan-data">',
                            '      <div class="lanista-toexpire-plan-photo">',
                            '         <div class="lanista-dashboard-expire-photo" id="dahsboardcustomerItemInfo" style="background-image: url({[Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/p/" + values["customer_remote_id"] + "_photo.jpg"]});"></div>',
                            '         <div class="lanista-dashboard-expire-background" id="dahsboardcustomerItem" style="customer-image">j</div>',
                            '      </div>',
                            '      <div class="lanista-dashboard-name">',
                            '         <div class="lanista-toexpire-plan-name">{first_name}</div>',
                            '         <div class="lanista-toexpire-plan-creation_date">{last_name}</div>',
                            '      </div>',
                            '  </div>',
                            '  <div class="lanista-dashboard-text lanista-dashboard-text-exp">',
                            '     <div class="lanista-toexpire-plan-name">{plan_name}</div>',
                            '     <div class="lanista-toexpire-plan-creation_date">{creation_date}</div>',
                            '     <div class="lanista-toexpire-plan-duration">{duration}</div>',
                            '     <div class="lanista-toexpire-plan-remaining_days">{remaining_days}</div>',
                            '  </div>',
                            '</div>'
                    ]
                });

                dateFormat = Ext.ux.LanguageManager.lang === 'EN' ? Ext.util.Format.date( records[i].data.birthday, 'F d') :Ext.util.Format.date( records[i].data.birthday, 'd F');
                containerAux.update({	id: records[i].data.id,
                                        first_name: records[i].data.first_name,
                                        last_name: records[i].data.last_name ,
                                        plan_name: records[i].data.plan_name,
                                        creation_date: records[i].data.creation_date,
                                        duration: records[i].data.duration,
                                        remaining_days: records[i].data.remaining_days});
                  controller.getDashBoardPanel().down('#plansContainer').down('#plans').down('#plansToExpire').insert ( i, containerAux );
            }
         });

    },

    getPlansExpired: function() {
        var userId = localStorage.getItem("user_id"),
            birthdayStore,
            controller = this,
            containerAux,
            dateFormat;

        Ext.define('Birthday', {
             extend: 'Ext.data.Model',
             fields: [
                 {name: 'customer_remote_id', type: 'string'},
                 {name: 'first_name', type: 'string'},
                 {name: 'last_name',  type: 'string'},
                 {name: 'plan_name',   type: 'string'},
                 {name: 'creation_date',   type: 'string'},
                 {name: 'duration',   type: 'string'},
                 {name: 'expired_days',   type: 'string'}
             ]
         });

         var birthdayStore = Ext.create('Ext.data.Store', {
             model: 'Birthday',
             proxy: {
                 type: 'ajax',
                 url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/getexpiredexercises',
                 headers: {
                     user_id: userId
                 },
                 noCache: false,
                 reader: {
                     type: 'json',
                     root: 'entries'
                 }
             }
         });

        birthdayStore.load(function(records, operation, success) {
            for(var i = 0; (i < records.length && i < 20); i++){
                containerAux = Ext.create('Ext.container.Container', {
                    cls: 'lanista-expire',
                    tpl: [
                            '<div class="lanista-toexpire-plan">',
                            '  <div class="lanista-toexpire-plan-data">',
                            '      <div class="lanista-toexpire-plan-photo">',
                            '         <div class="lanista-dashboard-expire-photo" id="dahsboardcustomerItemInfo" style="background-image: url({[Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/p/" + values["customer_remote_id"] + "_photo.jpg"]});"></div>',
                            '         <div class="lanista-dashboard-expire-background" id="dahsboardcustomerItem" style="customer-image">j</div>',
                            '      </div>',
                            '      <div class="lanista-dashboard-name">',
                            '         <div class="lanista-toexpire-plan-name">{first_name}</div>',
                            '         <div class="lanista-toexpire-plan-creation_date">{last_name}</div>',
                            '      </div>',
                            '  </div>',
                            '  <div class="lanista-dashboard-text lanista-dashboard-text-exp">',
                            '     <div class="lanista-toexpire-plan-name">{plan_name}</div>',
                            '     <div class="lanista-toexpire-plan-creation_date">{creation_date}</div>',
                            '     <div class="lanista-toexpire-plan-duration">{duration}</div>',
                            '     <div class="lanista-toexpire-plan-remaining_days">{expired_days}</div>',
                            '  </div>',
                            '</div>'
                    ]
                });

                dateFormat = Ext.ux.LanguageManager.lang === 'EN' ? Ext.util.Format.date( records[i].data.birthday, 'F d') :Ext.util.Format.date( records[i].data.birthday, 'd F');
                containerAux.update({	customer_remote_id : records[i].data.customer_remote_id,
                                        first_name: records[i].data.first_name,
                                        last_name: records[i].data.last_name ,
                                        plan_name: records[i].data.plan_name,
                                        creation_date: records[i].data.creation_date,
                                        duration: records[i].data.duration,
                                        remaining_days: records[i].data.remaining_days});

                controller.getDashBoardPanel().down('#plansContainer').down('#plans').down('#planExpired').insert ( i, containerAux );
            }
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

        controller.getActiveCustomers();
        controller.getBirthdayCustomers();
        controller.getPlansToExpire();
        controller.getPlansExpired();

        // *** 2 Show the panel
        LanistaTrainer.app.fireEvent('showDashBoardHeaderUpdate');
        LanistaTrainer.app.fireEvent('showStage');

        // *** 4 Callback
        if (callback instanceof Function) callback();

        // *** 5 Load data
        controller.loadData();
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
            showDashBoardHeaderUpdate: {
                fn: this.onShowDashBoardHeaderUpdate,
                scope: this
            },
            displayDashBoard: {
                fn: this.onDisplayDashBoard,
                scope: this
            }
        });
    }

});
