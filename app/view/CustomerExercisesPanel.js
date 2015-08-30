/*
 * File: app/view/CustomerExercisesPanel.js
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

Ext.define('LanistaTrainer.view.CustomerExercisesPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.customerExercisesPanel',

    requires: [
        'LanistaTrainer.view.CustomerExercisesPanelViewModel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Template',
        'Ext.XTemplate',
        'Ext.view.View'
    ],

    viewModel: {
        type: 'customerExercisesPanel'
    },
    border: false,
    cls: 'lanista-customerexercises-panel',
    height: 580,
    id: 'customerExercisesPanel',
    scrollable: true,
    width: 809,
    header: false,
    defaultListenerScope: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            cls: 'protocolls-panel',
            height: 200,
            itemId: 'customerProtocolls',
            scrollable: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            listeners: {
                afterrender: 'onCustomerProtocollsAfterRender'
            }
        }
    ],

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                dockedItems: [
                    {
                        xtype: 'container',
                        flex: 1,
                        dock: 'top',
                        cls: 'lanista-customer-exercises-header',
                        height: 250,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
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
                                            click: 'onShowPlansOptionClick'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        hidden: true,
                                        id: 'showWarningsOption',
                                        text: 'MyButton',
                                        listeners: {
                                            click: 'onShowWarningsOptionClick'
                                        }
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onPlanSelectorButtonsAfterRender'
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
                                        scrollable: true,
                                        header: false,
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
                                                resizable: false,
                                                tpl: [
                                                    '<div class="lanista-item-plans">',
                                                    '    <div class="lanista-name-plan">{name}</div> ',
                                                    '    <div class="lanista-delete-plan lanista-icon lanista-delete_icon_dot">...</div>',
                                                    '    <div class="lanista-createdate-plan">{creation_date:date("Y-m-d")}</div>',
                                                    '</div>',
                                                    ''
                                                ],
                                                width: 430,
                                                dataIndex: 'string',
                                                hideable: false,
                                                menuDisabled: true
                                            }
                                        ],
                                        listeners: {
                                            afterrender: 'onGridPlansAfterRender'
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
                                    resize: 'onListsContainerResize'
                                }
                            },
                            {
                                xtype: 'component',
                                flex: 1,
                                itemId: 'customerCurrentData'
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
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
        var XField = component.getX(),
            user = Ext.ux.SessionManager.getUser();
            //YField = component.getY() + component.getHeight() - component.down('#showWarningsOption').getHeight();
            //YField = component.getY() + 142 - 21;

        component.down('#showPlansOption').setText(Ext.ux.LanguageManager.TranslationArray.PLANS);
        component.down('#showWarningsOption').setText(Ext.ux.LanguageManager.TranslationArray.WARNINGS + ' ' + '<span class="lanista-icon">W</span>');

        if (user.role === '2' )
            component.down('#showWarningsOption').show();



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
            Ext.get(t).down('.lanista-delete-plan').setHtml('u');
            Ext.get(t).down('.lanista-delete-plan').removeCls('lanista-color-plan-delete');
            Ext.get(t).down('.lanista-delete-plan').addCls('lanista-color-plan-no-delete');
        },
             this, {delegate: '.lanista-item-plans'});

        el.on('mouseout',function(e,t){
            Ext.get(t).down('.lanista-delete-plan').setHtml('...');
            Ext.get(t).down('.lanista-delete-plan').setHtml('...');
            Ext.get(t).down('.lanista-delete-plan').removeCls('lanista-color-plan-delete');
            Ext.get(t).down('.lanista-delete-plan').addCls('lanista-color-plan-no-delete');
        },
             this, {delegate: '.lanista-item-plans'});


        //---------------------------------------------------------------
        //  Deleting a Plan
        //---------------------------------------------------------------

        el.on('click',function(e,t){
            record = component.getView().getRecord(component.getView().getSelectedNodes()[0]);
            Ext.Msg.confirm(Ext.ux.LanguageManager.TranslationArray.MSG_DELETE_PLAN, record.data.name, function(button) {
                    if (button == 'yes') {
                        customerExerPanel = LanistaTrainer.app.getController ('CustomerExercisesController').getCustomerExercisesPanel();
                        customerExerPanel.deletePlan(record.data);
                        component.getStore().load();
                    }
            });
        },
             this, {delegate: '.lanista-delete-plan'});

        el.on('mouseover',function(e,t){
            Ext.get(t).setHtml('u');
            Ext.get(t).removeCls('item-not-clicked');
            Ext.get(t).addCls('item-clicked');
            Ext.get(t).removeCls('lanista-color-plan-no-delete');
            Ext.get(t).addCls('lanista-color-plan-delete');
        },
             this, {delegate: '.lanista-delete-plan'});

        el.on('mouseout',function(e,t){
            Ext.get(t).setHtml('...');
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

    onCustomerProtocollsAfterRender: function(component, eOpts) {
        /*
            //Getting the ScrollView
            var sw = component.getScrollable().scrollView;

            //Updating the vertical scrollbar size
            sw.indicators.vertical.setSize(component.getHeight());

            //Show the indicators
            sw.showIndicators();
        */
        component.getScrollable().scrollTo(5, 10);

    },

    deletePlan: function(data) {
        var Plan = Ext.create('LanistaTrainer.model.Plan'),
            userId = localStorage.getItem("user_id");

        Plan.data = data;
        Plan.phantom = false;
        Plan.proxy = new Ext.data.proxy.Ajax({
            url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/plan/json',
            model: 'LanistaTrainer.model.Plan',
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
        });


        LanistaTrainer.app.getController('MainController').eraseModel(Plan);


        //Plan.destroy ({
        //    action: 'destroy'
        //});

    }

});