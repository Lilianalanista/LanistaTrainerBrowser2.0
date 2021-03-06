/*
 * File: app/view/StopWatch.js
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

Ext.define('LanistaTrainer.view.StopWatch', {
    extend: 'Ext.window.Window',
    alias: 'widget.stopWatch',

    requires: [
        'LanistaTrainer.view.StopWatchViewModel',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'stopWatch'
    },
    cls: 'stop-watch',
    height: 200,
    id: 'stopWatch',
    resizable: false,
    style: '\'background-color: rgba(0,0,0,0.7);\'',
    width: 400,

    items: [
        {
            xtype: 'combobox',
            id: 'user_language1',
            fieldLabel: 'Label'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            height: 50,
            id: 'swToolBottom',
            items: [
                {
                    xtype: 'button',
                    id: 'startStopWatch',
                    text: 'START'
                },
                {
                    xtype: 'button',
                    id: 'resetStopWatch',
                    text: 'RESET'
                }
            ]
        }
    ]

});