/*
 * File: app/view/TestPanel.js
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

Ext.define('LanistaTrainer.view.TestPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.testPanel',

    requires: [
        'LanistaTrainer.view.TestPanelViewModel',
        'Ext.tab.Panel',
        'Ext.tab.Tab'
    ],

    viewModel: {
        type: 'testPanel'
    },
    height: 250,
    id: 'testPanel',
    width: 400,

    items: [
        {
            xtype: 'tabpanel',
            id: 'testTab',
            activeTab: 0,
            items: [
                {
                    xtype: 'panel',
                    id: 'infoTab',
                    title: 'Tab 1'
                },
                {
                    xtype: 'panel',
                    id: 'contentTab',
                    title: 'Tab 2'
                },
                {
                    xtype: 'panel',
                    id: 'protocolsTab',
                    title: 'Tab 3'
                }
            ]
        }
    ]

});