/*
 * File: app/view/CustomersPanel.js
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

Ext.define('LanistaTrainer.view.CustomersPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.customersPanel',

    requires: [
        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.panel.Tool'
    ],

    border: false,
    height: 250,
    id: 'CustomersPanel',
    style: 'padding-top: 120px;',
    width: 400,
    layout: 'fit',
    frameHeader: false,
    headerPosition: 'bottom',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaultDockWeights: {
                top: {
                    render: 1,
                    visual: 1
                },
                left: {
                    render: 3,
                    visual: 5
                },
                right: {
                    render: 5,
                    visual: 7
                },
                bottom: {
                    render: 7,
                    visual: 3
                }
            },
            items: [
                {
                    xtype: 'dataview',
                    cls: 'tpl-gpclg44s',
                    height: 250,
                    id: 'viewCustomers',
                    tpl: [
                        '<tpl for=".">',
                        '    <div class="customer-item">',
                        '        <div class="lanista-icon lanista-favorites-delete"></div>',
                        '        <div class="customer-list-image customer-info-item" id="customerItemInfo" style="background-image: url({[Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/p/\' + values[\'id\'] + \'_photo.jpg\']});"></div>',
                        '        <div class="customer-list-background customer-info-item" id="customerItemInfo" style="customer-image">j</div>',
                        '        <div class="customer-list-firstname">{[values[\'first_name\']]}</div>        		',
                        '        <div class="customer-list-lastname">{[values[\'last_name\']]}</div>',
                        '    </div>',
                        '</tpl>  ',
                        ''
                    ],
                    width: 400,
                    itemSelector: 'div.customer-item',
                    store: 'CustomerStore',
                    listeners: {
                        hide: {
                            fn: me.onDataviewHide,
                            scope: me
                        },
                        afterrender: {
                            fn: me.onViewCustomersAfterRender,
                            scope: me
                        },
                        itemclick: {
                            fn: me.onViewCustomersItemClick,
                            scope: me
                        },
                        viewready: {
                            fn: me.onViewCustomersViewReady,
                            scope: me
                        }
                    }
                }
            ],
            tools: [
                {
                    xtype: 'tool',
                    id: 'previousCustomers',
                    type: 'left'
                },
                {
                    xtype: 'tool',
                    id: 'nextCustomers',
                    type: 'right'
                }
            ]
        });

        me.callParent(arguments);
    },

    onDataviewHide: function(component, eOpts) {
        component.destroy();
    },

    onViewCustomersAfterRender: function(component, eOpts) {

        var el = component.el;
        el.on(
            'click', function(e,t) {
                                    if ( t.id === 'customerItemInfo' )
                                            el.addCls('item-not-clicked');
            },
            this, {delegate: '.customer-info-item'});
        el.on(
            'mouseover', function(e,t) {
                                if ( t.id === 'customerItemInfo' )
                                {
                                    el.removeCls('item-not-clicked');
                                    el.addCls('item-clicked');
                                }
                            },
            this,{ delegate: '.customer-info-item'});
        el.on(
            'mouseout', function(e,t) {
                                if ( t.id === 'customerItemInfo' )
                                {
                                    el.removeCls('item-clicked');
                                    el.addCls('item-not-clicked');
                                }
                            },
            this,{delegate: '.customer-info-item'});


    },

    onViewCustomersItemClick: function(dataview, record, item, index, e, eOpts) {
        var favorites = "",
            favoritesArray = [],
            pos;

        if ( LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] === 'DashboardPanel'){
            LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                LanistaTrainer.app.currentCustomer = record;
                LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerExercisesPanel';
                LanistaTrainer.app.fireEvent('showCustomerExercisesPanel');
            });
        }
        else{
            if ( LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] === 'FavoritesPanel'){
                favorites = new String(LanistaTrainer.app.getController('FavoritesController').favorites.data.objects);

                if (favorites.valueOf()){
                    if (favorites.indexOf(",") > 0)
                        favoritesArray = favorites.split(",");
                    else
                        favoritesArray[0] = favorites.valueOf();
                }

                pos = favoritesArray.indexOf(record.data.id.toString());
                if (pos >= 0){
                    Ext.get(item).removeCls ( 'lanista-list-itemrounded-selected' );
                    favoritesArray.splice(pos,1);
                    favorites = "";
                    if (favoritesArray.length > 0){
                        favorites = favoritesArray[0];
                        for (var i = 1; i < favoritesArray.length; i++){
                            favorites = favorites + ',' + favoritesArray[i];
                        }
                    }
                    LanistaTrainer.app.getController('FavoritesController').favorites.data.objects = favorites;
                }
                else{
                    Ext.get(item).addCls ( 'lanista-list-itemrounded-selected' );
                    LanistaTrainer.app.getController('FavoritesController').favorites.data.objects = favorites.valueOf() ? favorites + ',' + record.data.id : record.data.id;
                 }
            }
            else{
                Ext.Ajax.request({
                    url: Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + "/tpmanager/plan/clone",
                    method: 'post',
                    params: { plan_id: LanistaTrainer.app.getController('PlanController').plan.data.id,
                             user_id: record.data.id},
                    headers: { user_id: localStorage.getItem("user_id") },
                    failure : function(response){
                        data = Ext.decode(response.responseText);
                        console.log ( data );
                        Ext.Msg.alert( Ext.ux.LanguageManager.TranslationArray.MSG_APPSTORE_ACTIVATION_ERROR_2, '', Ext.emptyFn );
                    },
                    success: function(response, opts) {
                        data = Ext.decode ( response.responseText);
                        if (data.success === true)
                        {
                            Ext.Msg.alert( Ext.ux.LanguageManager.TranslationArray.MSG_DATA_SAVE, data.message,
                                          function(){
                                              LanistaTrainer.app.currentCustomer = record;
                                              LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
                                              LanistaTrainer.app.fireEvent("closeCustomersPanel", function() {
                                                  LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'PlanPanel';
                                                  LanistaTrainer.app.fireEvent('showPlanPanel', LanistaTrainer.app.getController('PlanController').planname);
                                              });
                                          });
                        } else {
                            Ext.Msg.alert( Ext.ux.LanguageManager.TranslationArray.MSG_APPSTORE_ACTIVATION_ERROR_2, data.message, Ext.emptyFn);
                        }
                    }
                });
            }
        }
    },

    onViewCustomersViewReady: function(dataview, eOpts) {
        var records,
            favorites,
            favoritesArray = [],
            panel = LanistaTrainer.app.getController ('CustomersController').getCustomersPanel();

        if ( (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] === 'FavoritesPanel')) {
            records = dataview.store.data.items;
            favorites = LanistaTrainer.app.getController ('FavoritesController').favorites.data.objects;
            favoritesArray = favorites !== "" ? favorites.split(',') : [];

            if (favoritesArray.length > 0 ){
                for (var i = 0; i < records.length ; i++) {
                    for (var j = 0; j < favoritesArray.length; j++) {
                        if (Number(favoritesArray[j]) === Number(records[i].data.id)) {
                            break;
                        }
                    }

                    if (j !== favoritesArray.length){
                        itemNode = dataview.getNode(records[i]);
                        Ext.get(itemNode).addCls ( 'lanista-list-itemrounded-selected' );
                    }
                }
            }
        }
    }

});