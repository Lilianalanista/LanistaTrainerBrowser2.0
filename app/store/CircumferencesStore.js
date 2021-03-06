/*
 * File: app/store/CircumferencesStore.js
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

Ext.define('LanistaTrainer.store.CircumferencesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'LanistaTrainer.model.Circumferences',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            remoteFilter: true,
            storeId: 'CircumferencesStore',
            model: 'LanistaTrainer.model.Circumferences',
            proxy: {
                type: 'ajax',
                url: '/tpmanager/user/bodymeasuresjson',
                headers: {
                    user_id: localStorage.getItem('user_id')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                }
            }
        }, cfg)]);
    }
});