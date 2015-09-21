/*
 * File: app/controller/DashBoardController.js
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

Ext.define('LanistaTrainer.controller.DashBoardController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.dashBoardController',

    id: 'dashBoardController',

    refs: {
        mainStage: '#mainStage',
        rightCommandPanel: '#rightCommandPanel',
        leftCommandPanel: '#leftCommandPanel',
        mainViewport: 'mainViewport',
        dashBoardPanel: {
            autoCreate: true,
            selector: '#dashBoardPanel',
            xtype: 'dashBoardPanel'
        }
    },

    control: {
        "viewport #ShowDashBoardPanelButton": {
            click: 'onShowDashBoardButtonPanelClick'
        },
        "viewport #closeDashBoardPanelButton": {
            click: 'onCloseDashBoardButtonPanelClick'
        }
    },

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
                   LanistaTrainer.app.fireEvent('displayDashBoard', callback);
            });
        }
        else
        {
            LanistaTrainer.app.panels[0] = 'DashboardPanel';
            LanistaTrainer.app.fireEvent('displayDashBoard', callback);
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

        controller.getNotificactions();
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
            dateFormat,
            dateFromData;

        controller.getDashBoardPanel().down('#customersContainer').down('#titlesCustomersAlerts').down('#titles').update({
            birthday1: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_CUSTOMERS_BIRHDAY1,
            birthday2: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_CUSTOMERS_BIRHDAY2,
            protocoll1: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_CUSTOMERS_PROTOCOLL1 ,
            protocoll2: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_CUSTOMERS_PROTOCOLL2
        });

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
                     rootProperty: 'entries'
                 }
             }
         });

        birthdayStore.load(function(records, operation, success) {
            if (!success){
                console.log( "There were problems in looking for birthdays, Err number: " + operation.error.status);
                if (operation.error.status === 401 || operation.error.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
                return;
            }
            for(var i = 0; (i < records.length && i < 20); i++){
                containerAux = Ext.create('Ext.container.Container', {
                    tpl: [
                        '<div class="lanista-birthday-customer" id={[values["id"]]}>',
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

                dateFromData = records[i].data.birthday;
                dateFormat = Ext.ux.LanguageManager.lang === 'EN' ? Ext.util.Format.date( dateFromData, 'F d') :Ext.util.Format.date( dateFromData, 'd F');

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
            partDec = [],
            dateFromData,
            dateFormat;

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
                     rootProperty: 'entries'
                 }
             }
         });

        birthdayStore.load(function(records, operation, success) {
            if (!success){
                console.log( "There were problems in looking for active customers, Err number: " + operation.error.status);
                if (operation.error.status === 401 || operation.error.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
                return;
            }
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

                dateFromData = records[i].data.last_protocoll_date;
                dateFromData = dateFromData.substr(0,10);
                dateFormat = Ext.ux.LanguageManager.lang === 'EN' ? Ext.util.Format.date( dateFromData, 'F d') : Ext.util.Format.date( dateFromData, 'd F');
                containerAux.update({	id: records[i].data.id,
                                        first_name: records[i].data.first_name,
                                        last_name: records[i].data.last_name,
                                        last_protocoll_date: dateFormat,
                                        email: records[i].data.email});

                controller.getDashBoardPanel().down('#customersContainer').down('#customers').down('#activeCustomers').insert ( i, containerAux );
            }
        });

    },

    getPlansToExpire: function() {
        var userId = localStorage.getItem("user_id"),
            birthdayStore,
            controller = this,
            containerAux,
            dateFromData,
            dateFormat,
            today = new Date(),
            partNum = [],
            partDec = [],
            dayss, weeks, years, months, totalPeriod;

        controller.getDashBoardPanel().down('#plansContainer').down('#titlesPlans').update({
            toexpire1: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_PLANS_TOEXPIRE1,
            toexpire2: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_PLANS_TOEXPIRE2,
            expired1: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_PLANS_EXPIRED1 ,
            expired2: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_PLANS_EXPIRED2
        });

        Ext.define('Birthday', {
             extend: 'Ext.data.Model',
             fields: [
                 {name: 'id',         type: 'string'},
                 {name: 'first_name', type: 'string'},
                 {name: 'last_name',  type: 'string'},
                 {name: 'plan_name',   type: 'string'},
                 {name: 'creation_date',   type: 'string'},
                 {name: 'duration',   type: 'string'},
                 {name: 'remaining_days',   type: 'string'},
                 {name: 'user_id',   type: 'string'}
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
                     rootProperty: 'entries'
                 }
             }
         });

        birthdayStore.load(function(records, operation, success) {
            if (!success){
                console.log( "There were problems in looking for plan to expire, Err number: " + operation.error.status);
                if (operation.error.status === 401 || operation.error.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
                return;
            }
            for(var i = 0; (i < records.length && i < 20); i++){
                containerAux = Ext.create('Ext.container.Container', {
                    cls: 'lanista-expire',
                    tpl: [
                            '<div class="lanista-toexpire-plan" id={[values["id"]]}>',
                            '  <div class="lanista-toexpire-plan-data">',
                            '      <div class="lanista-toexpire-plan-photo">',
                            '         <div class="lanista-dashboard-expire-photo" id="dahsboardcustomerItemInfo" style="background-image: url({[Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/p/" + values["user_id"] + "_photo.jpg"]});"></div>',
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

                dayss = records[i].data.remaining_days;
                if (dayss <= 7){
                    dayss = Math.floor(dayss);
                    totalPeriod = dayss + ' ' + (dayss === 1 ?  Ext.ux.LanguageManager.TranslationArray.DAY : controller.calcPeriodo(Ext.ux.LanguageManager.TranslationArray.DAY));
                }
                else{
                    weeks = dayss * 0.1429;
                    if (weeks <= 4){
                        weeks = Math.floor(weeks);
                        totalPeriod = weeks + ' ' + (weeks === 1 ? Ext.ux.LanguageManager.TranslationArray.WEEKS : controller.calcPeriodo(Ext.ux.LanguageManager.TranslationArray.WEEKS));
                    }
                    else{
                        months = dayss * 0.0328;
                        if (months <= 12){
                            months = Math.floor(months);
                            totalPeriod = months + ' ' + (months === 1 ? Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_MONTH : controller.calcPeriodo(Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_MONTH));
                        }
                        else{
                                years = dayss * 0.0027;
                                years = Math.floor(years);
                                totalPeriod = Math.floor(years) + ' ' + (Math.floor(years) === 1 ? Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_YEAR : controller.calcPeriodo(Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_YEAR));
                            }
                    }
                }

                dateFromData = records[i].data.creation_date;
                dateFromData = dateFromData.substr(0,10);
                dateFormat = Ext.util.Format.date( dateFromData, 'd. F Y');
                containerAux.update({	id: records[i].data.id,
                                        first_name: records[i].data.first_name,
                                        last_name: records[i].data.last_name ,
                                        plan_name: records[i].data.plan_name,
                                        creation_date: dateFormat,
                                        duration: records[i].data.duration === 1 ? '1 ' +
                                                  Ext.ux.LanguageManager.TranslationArray.WEEKS.substr( 0, Ext.ux.LanguageManager.TranslationArray.WEEKS.length - 1 ) :
                                                  records[i].data.duration + ' ' + Ext.ux.LanguageManager.TranslationArray.WEEKS,
                                        user_id: records[i].data.user_id,
                                        remaining_days: Ext.ux.LanguageManager.TranslationArray.DASHBOARD_PLANS_IN_STRING + ' ' + totalPeriod
                                    });
                  controller.getDashBoardPanel().down('#plansContainer').down('#plans').down('#plansToExpire').insert ( i, containerAux );
            }
         });

    },

    getPlansExpired: function() {
        var userId = localStorage.getItem("user_id"),
            birthdayStore,
            controller = this,
            containerAux,
            dateForma,
            today = new Date(),
            partNum = [],
            partDec = [],
            dayss, weeks, years, months, totalPeriod;

        Ext.define('Birthday', {
             extend: 'Ext.data.Model',
             fields: [
                 {name: 'customer_remote_id', type: 'string'},
                 {name: 'first_name', type: 'string'},
                 {name: 'last_name',  type: 'string'},
                 {name: 'plan_name',   type: 'string'},
                 {name: 'creation_date',   type: 'string'},
                 {name: 'duration',   type: 'string'},
                 {name: 'expired_days',   type: 'string'},
                 {name: 'plan_id',   type: 'string'},
                 {name: 'remaining_days',   type: 'string'}
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
                     rootProperty: 'entries'
                 }
             }
         });

        birthdayStore.load(function(records, operation, success) {
            if (!success){
                console.log( "There were problems in looking for expired plans, Err number: " + operation.error.status);
                if (operation.error.status === 401 || operation.error.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
                return;
            }
            for(var i = 0; (i < records.length && i < 20); i++){
                containerAux = Ext.create('Ext.container.Container', {
                    cls: 'lanista-expire',
                    tpl: [
                            '<div class="lanista-toexpire-plan" id={[values["plan_id"]]}>',
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

                dayss = records[i].data.expired_days;
                if (dayss <= 7){
                    dayss = Math.floor(dayss);
                    totalPeriod = dayss + ' ' + (dayss === 1 ?  Ext.ux.LanguageManager.TranslationArray.DAY : controller.calcPeriodo(Ext.ux.LanguageManager.TranslationArray.DAY));
                }
                else{
                    weeks = dayss * 0.1429;
                    if (weeks <= 4){
                        weeks = Math.floor(weeks);
                        totalPeriod = weeks + ' ' + (weeks === 1 ? Ext.ux.LanguageManager.TranslationArray.WEEK : controller.calcPeriodo(Ext.ux.LanguageManager.TranslationArray.WEEK));
                    }
                    else{
                        months = dayss * 0.0328;
                        if (months <= 12){
                            months = Math.floor(months);
                            totalPeriod = months + ' ' + (months === 1 ? Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_MONTH : controller.calcPeriodo(Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_MONTH));
                        }
                        else{
                                years = dayss * 0.0027;
                                years = Math.floor(years);
                                totalPeriod = Math.floor(years) + ' ' + (Math.floor(years) === 1 ? Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_YEAR : controller.calcPeriodo(Ext.ux.LanguageManager.TranslationArray.DASHBOARD_ACTIVE_CUSTOMERS_YEAR));
                            }
                    }
                }

                dateFromData = records[i].data.creation_date;
                dateFromData = dateFromData.substr(0,10);
                dateFormat = Ext.util.Format.date( dateFromData, 'd. F Y');
                containerAux.update({	customer_remote_id : records[i].data.customer_remote_id,
                                        first_name: records[i].data.first_name,
                                        last_name: records[i].data.last_name ,
                                        plan_name: records[i].data.plan_name,
                                        creation_date: dateFormat,
                                        duration: records[i].data.duration === 1 ? '1 ' +
                                                  Ext.ux.LanguageManager.TranslationArray.WEEKS.substr( 0, Ext.ux.LanguageManager.TranslationArray.WEEKS.length - 1 ) :
                                                  records[i].data.duration + ' ' + Ext.ux.LanguageManager.TranslationArray.WEEKS,
                                        plan_id: records[i].data.plan_id,
                                        expired_days: Ext.ux.LanguageManager.lang === 'EN' ?
                                                      totalPeriod + ' ' + Ext.ux.LanguageManager.TranslationArray.DASHBOARD_PLANS_FROM_STRING :
                                                      Ext.ux.LanguageManager.TranslationArray.DASHBOARD_PLANS_FROM_STRING  + ' ' + totalPeriod
                                    });
                controller.getDashBoardPanel().down('#plansContainer').down('#plans').down('#planExpired').insert ( i, containerAux );
            }
        });

    },

    getNotificactions: function() {
        var controller = this,
            userId = localStorage.getItem("user_id");

        Ext.define('Notifications', {
             extend: 'Ext.data.Model',
             fields: [
                 {name: 'id',			type: 'string'},
                 {name: 'date',			type: 'date'},
                 {name: 'dir',			type: 'string'},
                 {name: 'email',		type: 'string'},
                 {name: 'first_name',	type: 'string'},
                 {name: 'last_name',	type: 'string'},
                 {name: 'status',		type: 'string'}
             ]
         });

         var notificationsStore = Ext.create('Ext.data.Store', {
             model: 'Notifications',
             proxy: {
                 type: 'ajax',
                 url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/getinvitations',
                 extraParams: {
                     user_id: userId
                 },
                 headers: {
                     user_id: userId
                 },
                 noCache: false,
                 reader: {
                     type: 'json',
                     rootProperty: 'entries'
                 }
             }
         });

        controller.storeNotification = notificationsStore;
        controller.storeNotification.load(function(records, operation, success) {
            if (!success){
                console.log( "There were problems in looking for notifiactions, Err number: " + operation.error.status);
                if (operation.error.status === 401 || operation.error.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
                return;
            }

            if (records.length === 0){
                controller.getDashBoardPanel().down('#customersContainer').down('#titlesCustomersAlerts').down('#notificationsBotton').hide();
                controller.getDashBoardPanel().down('#customersContainer').down('#titlesCustomersAlerts').down('#notificationContainer').el.addCls('notification-hidden');
            }
            else{
                controller.getDashBoardPanel().down('#customersContainer').down('#titlesCustomersAlerts').down('#notificationsBotton').show();
                controller.getDashBoardPanel().down('#customersContainer').down('#titlesCustomersAlerts').down('#notificationContainer').el.removeCls('notification-hidden');
                controller.getDashBoardPanel().down('#customersContainer').down('#titlesCustomersAlerts').down('#notificationContainer').update({
                    notifications : records.length > 0 ? records.length : 0});
            }
        });

    },

    calcPeriodo: function(period) {
        if (Ext.ux.LanguageManager.lang === 'EN')
            return period + 's';

        if (Ext.ux.LanguageManager.lang === 'DE')
            return period + 'e';

        if (Ext.ux.LanguageManager.lang === 'ES')
            return period === 'Mes' ? 'Meses' : period + 's';



    },

    init: function(application) {
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
