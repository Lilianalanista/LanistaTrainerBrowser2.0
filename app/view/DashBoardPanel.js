/*
 * File: app/view/DashBoardPanel.js
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

Ext.define('LanistaTrainer.view.DashBoardPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashBoardPanel',

    requires: [
        'Ext.container.Container',
        'Ext.XTemplate',
        'Ext.button.Button'
    ],

    border: false,
    height: 250,
    id: 'dashBoardPanel',
    width: 400,
    header: false,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    id: 'customersContainer',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            id: 'titlesCustomersAlerts',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'titles',
                                    tpl: [
                                        '<div class="title-component">',
                                        '	<div class="top-component">',
                                        '		<div>{birthday1}</div>',
                                        '		<div>{birthday2}</div>',
                                        '	</div>',
                                        '    <div class="botton-component">',
                                        '		<div>{protocoll1}</div>',
                                        '		<div>{protocoll2}</div>',
                                        '	</div>',
                                        '</div>'
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    cls: 'lanista-command-button',
                                    id: 'notificationsBotton',
                                    glyph: '113@Lanista Icons'
                                },
                                {
                                    xtype: 'container',
                                    id: 'notificationContainer',
                                    tpl: [
                                        '<div class="lanista-notification-dashboard">{notifications}</div>'
                                    ],
                                    listeners: {
                                        afterrender: {
                                            fn: me.onNotificationContainerAfterRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'customers',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'birthdayCustomers',
                                    autoScroll: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    listeners: {
                                        afterrender: {
                                            fn: me.onBirthdayCustomersAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    id: 'activeCustomers',
                                    autoScroll: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    listeners: {
                                        afterrender: {
                                            fn: me.onActiveCustomersAfterRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'plansContainer',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            id: 'titlesPlans',
                            tpl: [
                                '<div class="title-component">',
                                '	<div class="top-component">',
                                '		<div>{toexpire1}</div>',
                                '		<div>{toexpire2}</div>',
                                '	</div>',
                                '    <div class="botton-component">',
                                '		<div>{expired1}</div>',
                                '		<div>{expired2}</div>',
                                '	</div>',
                                '</div>'
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'plans',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'plansToExpire',
                                    autoScroll: true,
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPlansToExpireAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'planExpired',
                                    autoScroll: true,
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPlanExpiredAfterRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onNotificationContainerAfterRender: function(component, eOpts) {
        var el = component.el,
            userId = localStorage.getItem("user_id"),
            record;

        el.on(
            'click', function(e,t) {
                var store = LanistaTrainer.app.getController ('DashBoardController').storeNotification;
                el.removeCls('item-clicked');
                Ext.create('Ext.window.Window', {
                    cls:'lanista-notification-window',
                    layout: 'fit',
                    modal: true,
                    draggable: false,
                    closable: false,
                    items: {
                        xtype: 'dataview',
                        store: store,
                        tpl: [
                            '<tpl for=".">',
                            '<div class="lanista-dashboard-notification" id={[values["id"]]}>',
                            '   <div class="lanista-notification-message">{[Ext.ux.LanguageManager.TranslationArray.DASHBOARD_NOTIFICATION_CUSTOMER]}</div>',
                            '   <div class="lanista-notification-text">',
                            '       <div class="lanista-notification-firstname">{first_name}</div>',
                            '       <div class="lanista-notification-lastname">{last_name}</div>',
                            '       <div class="lanista-notification-email">{email}</div>',
                            '   </div>',
                            '   <div class="lanista-notification-footer">',
                            '       <div class="invitation-command invitation-confirm" id="confirmInvitation">{[Ext.ux.LanguageManager.TranslationArray.DASHBOARD_NOTIFICATION_CONFIRMATION]}</div>',
                            '       <div class="lanista-notification-date">{date:this.formatDate}</div>',
                            '       <div class="invitation-command invitation-command-red invitation-reject" id="rejectInvitation">{[Ext.ux.LanguageManager.TranslationArray.DASHBOARD_NOTIFICATION_REJECTED]}</div>',
                            '   </div>',
                            '</div>',
                            '</tpl>',
                            {
                                formatDate: function(value){
                                    return Ext.Date.format(value, 'd, M Y');
                                }
                            }
                        ],
                        itemSelector: 'div.lanista-dashboard-notification',
                        listeners: {
                                 afterrender: {
                                    fn: function(dataview, eOpts){
                                        var elCpn = dataview.el;

                                        dataview.on('hide', function(component) {
                                            component.destroy();
                                        }, this);

                                        elCpn.on('click', function(component, t) {

                                            var compt = Ext.get(t);
                                            console.log('VALORES........');
                                            console.log(compt);
                                            console.log(dataview.getRecord(compt.dom.parentNode.parentNode));









                                            Ext.Ajax.request({
                                                url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/confirminvitation',
                                                method: 'get',
                                                headers: {
                                                    user_id: userId
                                                },
                                                params: {
                                                    id: userId
                                                },
                                                failure : function(result, request){
                                                    console.log( "There were problems in the confirmation" );
                                                },
                                                success: function(response, opts) {
                                                    try {
                                                        var data = Ext.decode(response.responseText);

                                                    }
                                                    catch( err ) {
                                                        Ext.Msg.alert('Problem', 'There were problems in the confirmation', Ext.emptyFn);
                                                    }
                                                }
                                            });












                                        }, this, { delegate: '.invitation-confirm'});

                                        elCpn.on('mouseover', function(e,t) {
                                            var compt = Ext.get(t);
                                            compt.removeCls('item-not-clicked');
                                            compt.addCls('item-clicked');
                                        }, this, { delegate: '.invitation-confirm'});
                                    }
                                 }
                             }
                    }

                }).show();
            },
            this, {delegate: '.lanista-notification-dashboard'});
        el.on(
            'mouseover', function(e,t) {
                el.removeCls('item-not-clicked');
                el.addCls('item-clicked');
                            },
            this,{ delegate: '.lanista-notification-dashboard'});
        el.on(
            'mouseout', function(e,t) {
                el.removeCls('item-clicked');
                el.addCls('item-not-clicked');
                            },
            this,{delegate: '.lanista-notification-dashboard'});

    },

    onBirthdayCustomersAfterRender: function(component, eOpts) {
        var el = component.el,
            ActiveCustomer,
            data,
            userId = localStorage.getItem("user_id"),
            idCustomer;

        el.on(
            'click', function(e,t) {
                    el.addCls('item-not-clicked');
                    idCustomer = t.id;
                    Ext.Ajax.request({
                        url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/getuser',
                        method: 'get',
                        params: {id: idCustomer},
                        headers: {user_id: userId},
                        failure : function(result, request){
                            console.log( "There were problems in looking for user information" );
                        },
                        success: function(response, opts) {
                            try {
                                data = Ext.decode(response.responseText);
                                ActiveCustomer = Ext.create('LanistaTrainer.model.Customer', {
                                    id: data.user.id,
                                    first_name: data.user.first_name,
                                    last_name: data.user.last_name,
                                    email: data.user.email,
                                    street: data.user.street,
                                    city: data.user.city,
                                    zipcode: data.user.zipcode,
                                    country: data.user.country,
                                    note: data.user.note,
                                    phone_nr: data.user.phone_nr,
                                    birthday: data.user.birthday,
                                    gender: data.user.gender,
                                    deleted: data.user.deleted,
                                    image: data.user.image,
                                    last_change: data.user.last_change,
                                    language: data.user.language,
                                    sincronized: data.user.sincronized
                                });

                                LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                                    LanistaTrainer.app.currentCustomer = ActiveCustomer;
                                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerExercisesPanel';
                                    LanistaTrainer.app.fireEvent('showCustomerExercisesPanel');
                                });
                            }
                            catch( err ) {
                                Ext.Msg.alert('Problem', 'There were problems in looking for user information', Ext.emptyFn);
                            }
                        }
                    });
            },
            this, {delegate: '.lanista-birthday-customer'});
        el.on(
            'mouseover', function(e,t) {
                el.removeCls('item-not-clicked');
                el.addCls('item-clicked');
                            },
            this,{ delegate: '.lanista-birthday-customer'});
        el.on(
            'mouseout', function(e,t) {
                el.removeCls('item-clicked');
                el.addCls('item-not-clicked');
                            },
            this,{delegate: '.lanista-birthday-customer'});

    },

    onActiveCustomersAfterRender: function(component, eOpts) {
        var el = component.el,
            ActiveCustomer,
            data,
            userId = localStorage.getItem("user_id"),
            idCustomer;

        el.on(
            'click', function(e,t) {
                    el.addCls('item-not-clicked');
                    idCustomer = t.id;
                    Ext.Ajax.request({
                        url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/getuser',
                        method: 'get',
                        params: {id: idCustomer},
                        headers: {user_id: userId},
                        failure : function(result, request){
                            console.log( "There were problems in looking for user information" );
                        },
                        success: function(response, opts) {
                            try {
                                data = Ext.decode(response.responseText);
                                ActiveCustomer = Ext.create('LanistaTrainer.model.Customer', {
                                    id: data.user.id,
                                    first_name: data.user.first_name,
                                    last_name: data.user.last_name,
                                    email: data.user.email,
                                    street: data.user.street,
                                    city: data.user.city,
                                    zipcode: data.user.zipcode,
                                    country: data.user.country,
                                    note: data.user.note,
                                    phone_nr: data.user.phone_nr,
                                    birthday: data.user.birthday,
                                    gender: data.user.gender,
                                    deleted: data.user.deleted,
                                    image: data.user.image,
                                    last_change: data.user.last_change,
                                    language: data.user.language,
                                    sincronized: data.user.sincronized
                                });

                                LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                                    LanistaTrainer.app.currentCustomer = ActiveCustomer;
                                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerExercisesPanel';
                                    LanistaTrainer.app.fireEvent('showCustomerExercisesPanel');
                                });
                            }
                            catch( err ) {
                                Ext.Msg.alert('Problem', 'There were problems in looking for user information', Ext.emptyFn);
                            }
                        }
                    });
            },
            this, {delegate: '.lanista-active-customer'});
        el.on(
            'mouseover', function(e,t) {
                el.removeCls('item-not-clicked');
                el.addCls('item-clicked');
                            },
            this,{ delegate: '.lanista-active-customer'});
        el.on(
            'mouseout', function(e,t) {
                el.removeCls('item-clicked');
                el.addCls('item-not-clicked');
                            },
            this,{delegate: '.lanista-active-customer'});

    },

    onPlansToExpireAfterRender: function(component, eOpts) {
        var el = component.el,
            ActiveCustomer,
            data,data1,
            userId = localStorage.getItem("user_id"),
            idCustomer;

        el.on(
            'click', function(e,t) {
                    el.addCls('item-not-clicked');
                    idCustomer = t.id;
                    Ext.Ajax.request({
                        url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/plan/getplan',
                        method: 'get',
                        params: {id: idCustomer},
                        headers: {user_id: userId},
                        failure : function(result, request){
                            console.log( "There were problems in looking for plan information" );
                        },
                        success: function(response, opts) {
                            try {
                                data = Ext.decode(response.responseText);

                                //looking for the customer whom belong the exercise
                                Ext.Ajax.request({
                                url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/getuser',
                                method: 'get',
                                params: {id: data.plan.assigned_to_id},
                                headers: {user_id: userId},
                                failure : function(result, request){
                                    console.log( "There were problems in looking for user information" );
                                },
                                success: function(response, opts) {
                                    try {
                                        data1 = Ext.decode(response.responseText);
                                        ActiveCustomer = Ext.create('LanistaTrainer.model.Customer', {
                                            id: data1.user.id,
                                            first_name: data1.user.first_name,
                                            last_name: data1.user.last_name,
                                            email: data1.user.email,
                                            street: data1.user.street,
                                            city: data1.user.city,
                                            zipcode: data1.user.zipcode,
                                            country: data1.user.country,
                                            note: data1.user.note,
                                            phone_nr: data1.user.phone_nr,
                                            birthday: data1.user.birthday,
                                            gender: data1.user.gender,
                                            deleted: data1.user.deleted,
                                            image: data1.user.image,
                                            last_change: data1.user.last_change,
                                            language: data1.user.language,
                                            sincronized: data1.user.sincronized
                                        });

                                            LanistaTrainer.app.currentCustomer = ActiveCustomer;
                                    }
                                    catch( err ) {
                                        Ext.Msg.alert('Problem', 'There were problems in looking for user information', Ext.emptyFn);
                                    }
                                  }
                                });

                                Plan = Ext.create('LanistaTrainer.model.Plan', {
                                    id: data.plan.id,
                                    template: data.plan.template,
                                    name: data.plan.name,
                                    days: data.plan.days,
                                    duration: data.plan.duration,
                                    description: data.plan.description,
                                    customer_id: data.plan.assigned_to_id,
                                    trainer_id: userId,
                                    creator_name: data.plan.creator_name,
                                    creation_date: data.plan.creation_date,
                                    changed_date: data.plan.changed_date,
                                    public_template: data.plan.public
                                });

                                LanistaTrainer.app.fireEvent('closeDashBoardPanel', function() {
                                    LanistaTrainer.app.getController ( 'PlanController' ).plan = Plan;
                                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'PlanPanel';
                                    LanistaTrainer.app.fireEvent( 'showPlanPanel', Plan.data.name );
                                });
                            }
                            catch( err ) {
                                Ext.Msg.alert('Problem', 'There were problems in looking for plan information', Ext.emptyFn);
                            }
                        }
                    });
            },
            this, {delegate: '.lanista-toexpire-plan'});
        el.on(
            'mouseover', function(e,t) {
                el.removeCls('item-not-clicked');
                el.addCls('item-clicked');
                            },
            this,{ delegate: '.lanista-toexpire-plan'});
        el.on(
            'mouseout', function(e,t) {
                el.removeCls('item-clicked');
                el.addCls('item-not-clicked');
                            },
            this,{delegate: '.lanista-toexpire-plan'});

    },

    onPlanExpiredAfterRender: function(component, eOpts) {
        var el = component.el,
            ActiveCustomer,
            data,data1,
            userId = localStorage.getItem("user_id"),
            idCustomer;

        el.on(
            'click', function(e,t) {
                    el.addCls('item-not-clicked');
                    idCustomer = t.id;
                    Ext.Ajax.request({
                        url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/plan/getplan',
                        method: 'get',
                        params: {id: idCustomer},
                        headers: {user_id: userId},
                        failure : function(result, request){
                            console.log( "There were problems in looking for plan information" );
                        },
                        success: function(response, opts) {
                            try {
                                data = Ext.decode(response.responseText);

                                //looking for the customer whom belong the exercise
                                Ext.Ajax.request({
                                url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/getuser',
                                method: 'get',
                                params: {id: data.plan.assigned_to_id},
                                headers: {user_id: userId},
                                failure : function(result, request){
                                    console.log( "There were problems in looking for user information" );
                                },
                                success: function(response, opts) {
                                    try {
                                        data1 = Ext.decode(response.responseText);
                                        ActiveCustomer = Ext.create('LanistaTrainer.model.Customer', {
                                            id: data1.user.id,
                                            first_name: data1.user.first_name,
                                            last_name: data1.user.last_name,
                                            email: data1.user.email,
                                            street: data1.user.street,
                                            city: data1.user.city,
                                            zipcode: data1.user.zipcode,
                                            country: data1.user.country,
                                            note: data1.user.note,
                                            phone_nr: data1.user.phone_nr,
                                            birthday: data1.user.birthday,
                                            gender: data1.user.gender,
                                            deleted: data1.user.deleted,
                                            image: data1.user.image,
                                            last_change: data1.user.last_change,
                                            language: data1.user.language,
                                            sincronized: data1.user.sincronized
                                        });

                                            LanistaTrainer.app.currentCustomer = ActiveCustomer;
                                    }
                                    catch( err ) {
                                        Ext.Msg.alert('Problem', 'There were problems in looking for user information', Ext.emptyFn);
                                    }
                                  }
                                });

                                Plan = Ext.create('LanistaTrainer.model.Plan', {
                                    id: data.plan.id,
                                    template: data.plan.template,
                                    name: data.plan.name,
                                    days: data.plan.days,
                                    duration: data.plan.duration,
                                    description: data.plan.description,
                                    customer_id: data.plan.assigned_to_id,
                                    trainer_id: userId,
                                    creator_name: data.plan.creator_name,
                                    creation_date: data.plan.creation_date,
                                    changed_date: data.plan.changed_date,
                                    public_template: data.plan.public
                                });

                                LanistaTrainer.app.fireEvent('closeDashBoardPanel', function() {
                                    LanistaTrainer.app.getController ( 'PlanController' ).plan = Plan;
                                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'PlanPanel';
                                    LanistaTrainer.app.fireEvent( 'showPlanPanel', Plan.data.name );
                                });
                            }
                            catch( err ) {
                                Ext.Msg.alert('Problem', 'There were problems in looking for plan information', Ext.emptyFn);
                            }
                        }
                    });
            },
            this, {delegate: '.lanista-toexpire-plan'});
        el.on(
            'mouseover', function(e,t) {
                el.removeCls('item-not-clicked');
                el.addCls('item-clicked');
                            },
            this,{ delegate: '.lanista-toexpire-plan'});
        el.on(
            'mouseout', function(e,t) {
                el.removeCls('item-clicked');
                el.addCls('item-not-clicked');
                            },
            this,{delegate: '.lanista-toexpire-plan'});

    }

});