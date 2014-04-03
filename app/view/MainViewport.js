/*
 * File: app/view/MainViewport.js
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

Ext.define('LanistaTrainer.view.MainViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainViewport',

    requires: [
        'Ext.XTemplate',
        'Ext.panel.Panel',
        'Ext.resizer.Splitter'
    ],

    id: 'mainViewport',
    layout: 'fit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'component',
                    height: 150,
                    id: 'header',
                    maxHeight: 100,
                    style: 'z-index:1; background-color: rgba(227,227,227,0.7)',
                    tpl: [
                        '<div class="header-logo">',
                        '	Lanista',
                        '</div>',
                        '<div class="header-title">{title}</div>',
                        '<div class="header-info">{info}</div>'
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onHeaderAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    cls: '',
                    id: 'lanistaStage',
                    style: 'top:0!important;position: absolute;',
                    width: 150,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            border: false,
                            cls: 'lanista-command-panel',
                            id: 'leftCommandPanel',
                            maxWidth: 88,
                            style: 'margin-top:100px;',
                            width: 88,
                            animCollapse: true,
                            collapseDirection: 'right',
                            collapsed: false,
                            collapsible: true,
                            header: false,
                            manageHeight: false,
                            titleCollapse: true,
                            layout: {
                                type: 'vbox',
                                align: 'center',
                                pack: 'center'
                            }
                        },
                        {
                            xtype: 'splitter',
                            id: 'splitterLeft',
                            shrinkWrap: 1,
                            collapseTarget: 'prev',
                            collapsible: true
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            border: false,
                            id: 'mainStage',
                            layout: 'card'
                        },
                        {
                            xtype: 'splitter',
                            id: 'splitterRight',
                            collapsible: true
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            border: false,
                            cls: 'lanista-command-panel',
                            id: 'rightCommandPanel',
                            maxWidth: 88,
                            style: 'margin-top:100px;',
                            width: 88,
                            animCollapse: true,
                            collapseDirection: 'left',
                            collapsed: false,
                            collapsible: true,
                            header: false,
                            manageHeight: false,
                            layout: {
                                type: 'vbox',
                                align: 'center',
                                pack: 'center'
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onHeaderAfterRender: function(component, eOpts) {
        var server = Ext.ux.ConfigManager.getServer(),
            root = Ext.ux.ConfigManager.getRoot(),
            el = component.el;

        //***************************************************************
        //Managing of Trainer's and Customer's Information
        //***************************************************************
        el.on(
            'click', function(e,t) {
                                    if ( t.id === 'showPersonalDataButton' ) //Trainer
                                    {
                                        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                                            el.addCls('item-not-clicked');
                                            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'UserInfoPanel';
                                            LanistaTrainer.app.fireEvent('showUserInfoPanel');
                                        });
                                    }
                                    if ( t.id === 'showCustomerDataButton' ) //Customer
                                    {
                                        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                                            el.addCls('item-not-clicked');
                                            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerInfoPanel';
                                            LanistaTrainer.app.fireEvent('showCustomerInfoPanel');
                                        });
                                    }
            },
            this, {delegate: '.show-info-customer'});
        el.on(
            'mouseover', function(e,t) {
                                if ( t.id === 'showPersonalDataButton' || t.id === 'showCustomerDataButton' )
                                {
                                    el.removeCls('item-not-clicked');
                                    el.addCls('item-clicked');
                                }
                            },
            this,{ delegate: '.show-info-customer'});
        el.on(
            'mouseout', function(e,t) {
                                if ( t.id === 'showPersonalDataButton' || t.id === 'showCustomerDataButton' )
                                {
                                    el.removeCls('item-clicked');
                                    el.addCls('item-not-clicked');
                                }
                            },
            this,{delegate: '.show-info-customer'});


        //***************************************************************
        //Managing of Trainer's and Customer's Photo
        //***************************************************************

        el.on('click',function(e,t) {
            var idImage;
            if ( t.id === 'changeUserPhoto' || t.id === 'changeCustomerPhoto' )
            {
                if ( t.id === 'changeCustomerPhoto')
                    idImage = LanistaTrainer.app.currentCustomer.data.id;
                if ( t.id === 'changeUserPhoto' )
                    idImage = localStorage.getItem("user_id");

                el.addCls('item-not-clicked');
                var image = Ext.create('Ext.Img', {
                    src: server + root + '/tpmanager/img/p/'+ idImage + '_photo.jpg',
                    renderTo: Ext.getBody(),
                    hidden: true,
                    width: 0,
                    height: 0
                });
                var lastPanel = LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1];
                LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'ImagePanel';
                LanistaTrainer.app.fireEvent('showImagePanel', image, lastPanel, server + root + '/tpmanager/user/uploadphoto',  {type: 'photo', customer_id: LanistaTrainer.app.currentCustomer.data.id}, function() {});
            }
        },this,{delegate: '.lansita-header-customer-photo'});
        el.on(
            'mouseover', function(e,t) {
                                if ( t.id === 'changeUserPhoto' || t.id === 'changeCustomerPhoto')
                                {
                                    el.removeCls('item-not-clicked');
                                    el.addCls('item-clicked');
                                }
                            },
            this,{ delegate: '.lansita-header-customer-photo'});
        el.on(
            'mouseout', function(e,t) {
                                if ( t.id === 'changeUserPhoto' || t.id === 'changeCustomerPhoto')
                                {
                                    el.removeCls('item-clicked');
                                    el.addCls('item-not-clicked');
                                }
                            },
            this,{delegate: '.lansita-header-customer-photo'});


        //***************************************************************
        //Managing of Trainer's Logo
        //***************************************************************

        el.on('click',function(e,t) {
                                if ( t.id === 'changeUserLogo' )
                                {
                                    el.addCls('item-not-clicked');
                                    var image = Ext.create('Ext.Img', {
                                                    src: server + root + '/tpmanager/img/p/'+ localStorage.getItem("user_id") + '_logo.jpg',
                                                    renderTo: Ext.getBody(),
                                                    hidden: true,
                                                    width: 0,
                                                    height: 0
                                                });
                                    lastPanel = LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1];
                                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'ImagePanel';
                                    LanistaTrainer.app.fireEvent('showImagePanel', image, lastPanel, server + root + '/tpmanager/user/uploadphoto',  {type: 'logo'}, function() {});
                                }
        },this,{delegate: '.lansita-header-customer-logo'});
        el.on(
            'mouseover', function(e,t) {
                                if ( t.id === 'changeUserLogo' )
                                {
                                    el.removeCls('item-not-clicked');
                                    el.addCls('item-clicked');
                                }
                            },
            this,{ delegate: '.lansita-header-customer-logo'});
        el.on(
            'mouseout', function(e,t) {
                                if ( t.id === 'changeUserLogo' )
                                {
                                    el.removeCls('item-clicked');
                                    el.addCls('item-not-clicked');
                                }
                            },
            this,{delegate: '.lansita-header-customer-logo'});


    }

});