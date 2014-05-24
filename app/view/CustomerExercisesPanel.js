/*
 * File: app/view/CustomerExercisesPanel.js
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

Ext.define('LanistaTrainer.view.CustomerExercisesPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.customerExercisesPanel',

    requires: [
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Template',
        'Ext.XTemplate',
        'Ext.view.View'
    ],

    border: false,
    cls: 'lanista-customerexercises-panel',
    height: 580,
    id: 'customerExercisesPanel',
    width: 809,
    autoScroll: true,
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
                    flex: 1,
                    cls: 'option-buttons',
                    id: 'planSelectorButtons',
                    items: [
                        {
                            xtype: 'button',
                            cls: 'option-active',
                            id: 'showPlansOption',
                            text: 'MyButton',
                            listeners: {
                                click: {
                                    fn: me.onShowPlansOptionClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            id: 'showWarningsOption',
                            text: 'MyButton',
                            listeners: {
                                click: {
                                    fn: me.onShowWarningsOptionClick,
                                    scope: me
                                }
                            }
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onPlanSelectorButtonsAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'lanista-list-container',
                    id: 'listsContainer',
                    layout: 'fit',
                    items: [
                        me.processGridPlans({
                            xtype: 'gridpanel',
                            border: false,
                            cls: 'lanista-grid-plans-customer',
                            id: 'gridPlans',
                            autoScroll: true,
                            header: false,
                            syncRowHeight: false,
                            enableColumnHide: false,
                            enableColumnMove: false,
                            enableColumnResize: false,
                            hideHeaders: true,
                            rowLines: false,
                            store: 'PlanStore',
                            columns: [
                                {
                                    xtype: 'templatecolumn',
                                    border: false,
                                    draggable: false,
                                    tpl: [
                                        '<div class="lanista-item-plans">',
                                        '    <div class="lanista-name-plan">{name}</div> ',
                                        '    <div class="lanista-delete-plan lanista-icon"></div>',
                                        '    <div class="lanista-createdate-plan">{creation_date:date("Y-m-d")}</div>',
                                        '</div>',
                                        ''
                                    ],
                                    width: 430,
                                    resizable: false,
                                    dataIndex: 'string',
                                    hideable: false,
                                    menuDisabled: true
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onGridPlansAfterRender,
                                    scope: me
                                }
                            }
                        }),
                        {
                            xtype: 'dataview',
                            itemId: 'warnings',
                            itemSelector: 'div',
                            itemTpl: [
                                '<div>{title} {creation_date}</div>'
                            ]
                        }
                    ],
                    listeners: {
                        resize: {
                            fn: me.onListsContainerResize,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'component',
                    flex: 1,
                    itemId: 'customerCurrentData'
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    flex: 1,
                    dock: 'bottom',
                    cls: 'protocolls-panel',
                    height: 480,
                    itemId: 'customerProtocolls',
                    overflowX: 'auto',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    processGridPlans: function(config) {

        config.viewConfig = {
                                getRowClass: function(r) {
                                    return 'lanista-grid-plan-rowsize';
                            }
        };

        return config;
    },

    onShowPlansOptionClick: function(button, e, eOpts) {
        var listContainer = button.up().up().down( '#listsContainer' );

        listContainer.items.items[1].hide();
        listContainer.items.items[0].show();

        button.el.dom.style.width = '100%';
        button.el.dom.style.color = 'black!important;';
        button.removeCls ( 'option-active' );
        button.up ().down ( '#showWarningsOption' ).removeCls ( 'option-active' );
        button.up ().down ( '#showWarningsOption' ).el.dom.style.width = '95%';
        button.addCls ( 'option-active' );

    },

    onShowWarningsOptionClick: function(button, e, eOpts) {
        var listContainer = button.up().up().down( '#listsContainer' );

        listContainer.items.items[0].hide();
        listContainer.items.items[1].show();

        button.el.dom.style.width = '100%';
        button.removeCls ( 'option-active' );
        button.up ().down ( '#showPlansOption' ).removeCls ( 'option-active' );
        button.up ().down ( '#showPlansOption' ).el.dom.style.width = '95%';
        button.addCls ( 'option-active' );
    },

    onPlanSelectorButtonsAfterRender: function(component, eOpts) {
        var XField = component.getX();
            //YField = component.getY() + component.getHeight() - component.down('#showWarningsOption').getHeight();
            //YField = component.getY() + 142 - 21;

        component.down('#showPlansOption').setText(Ext.ux.LanguageManager.TranslationArray.PLANS);
        component.down('#showWarningsOption').setText(Ext.ux.LanguageManager.TranslationArray.WARNINGS + ' ' + '<span class="lanista-icon">W</span>');


    },

    onGridPlansAfterRender: function(component, eOpts) {
        var itemRecord,
            el = component.el,
            record,
            customerExerPanel;

        el.on('click',function(e,t){
            record = component.getView().getRecord(component.getView().getSelectedNodes()[0]);
            LanistaTrainer.app.fireEvent('closeCustomerExercisesPanel', function() {
                LanistaTrainer.app.getController ( 'PlanController' ).plan = record;
                LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'PlanPanel';
                LanistaTrainer.app.fireEvent( 'showPlanPanel', record.data.name );
            });
        },
             this, {delegate: '.lanista-name-plan'});

        el.on('mouseover',function(e,t){
            Ext.get(t).removeCls('item-not-clicked');
            Ext.get(t).addCls('item-clicked');
            Ext.get(t).down('.lanista-delete-plan').setHTML('D');
            Ext.get(t).down('.lanista-delete-plan').removeCls('lanista-color-plan-delete');
            Ext.get(t).down('.lanista-delete-plan').addCls('lanista-color-plan-no-delete');
        },
             this, {delegate: '.lanista-item-plans'});

        el.on('mouseout',function(e,t){
            Ext.get(t).down('.lanista-delete-plan').setHTML('');
            Ext.get(t).down('.lanista-delete-plan').setHTML('');
            Ext.get(t).down('.lanista-delete-plan').removeCls('lanista-color-plan-delete');
            Ext.get(t).down('.lanista-delete-plan').addCls('lanista-color-plan-no-delete');
        },
             this, {delegate: '.lanista-item-plans'});



        el.on('click',function(e,t){
            record = component.getView().getRecord(component.getView().getSelectedNodes()[0]);
            Ext.Msg.confirm(Ext.ux.LanguageManager.TranslationArray.MSG_DELETE_USER, record.data.name, function(button) {
                    if (button == 'yes') {
                        customerExerPanel = LanistaTrainer.app.getController ('CustomerExercisesController').getCustomerExercisesPanel();
                        customerExerPanel.deletePlan(record.data);
                        component.getStore().load();
                    }
            });
        },
             this, {delegate: '.lanista-delete-plan'});

        el.on('mouseover',function(e,t){
            Ext.get(t).removeCls('item-not-clicked');
            Ext.get(t).addCls('item-clicked');
            Ext.get(t).removeCls('lanista-color-plan-no-delete');
            Ext.get(t).addCls('lanista-color-plan-delete');
        },
             this, {delegate: '.lanista-delete-plan'});

        el.on('mouseout',function(e,t){
            Ext.get(t).setHTML('');
            Ext.get(t).removeCls('lanista-color-plan-delete');
            Ext.get(t).addCls('lanista-color-plan-no-delete');

        },
             this, {delegate: '.lanista-delete-plan'});




    },

    onListsContainerResize: function(component, width, height, oldWidth, oldHeight, eOpts) {
        var left = component.el.dom.style.left ;

        left = left.replace('px', '');
        left = left - 1;
        component.el.dom.style.left = left + 'px';
    },

    deletePlan: function(data) {
        var Plan = Ext.create('LanistaTrainer.model.Plan'),
            userId = localStorage.getItem("user_id");

        Plan.data = data;
        Plan.phantom = false;
        Plan.setProxy(new Ext.data.proxy.Ajax({
            url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/plan/json',
            model: 'Plan',
            noCache: false,
            api: {
                create: undefined,
                read: undefined,
                update: undefined,
                destroy: Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/plan/deleteplan'
            },
            extraParams: {
                id: Plan.data.id
            },
            headers: {
                user_id: userId
            }
        }));

        Plan.destroy ({
            action: 'destroy'
        });
    }

});