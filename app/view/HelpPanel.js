/*
 * File: app/view/HelpPanel.js
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

Ext.define('LanistaTrainer.view.HelpPanel', {
    extend: 'Ext.window.Window',
    alias: 'widget.helpPanel',

    requires: [
        'Ext.panel.Panel'
    ],

    cls: 'x-help-panel',
    floating: true,
    height: 450,
    id: 'helpPanel',
    style: 'bottom:0',
    width: 1100,
    defaultAlign: 'c-c',
    modal: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                show: {
                    fn: me.onHelpPanelShow,
                    scope: me
                },
                beforeclose: {
                    fn: me.onHelpPanelBeforeClose,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    html: 'Loading...',
                    id: 'sideHelpPanel',
                    autoScroll: true,
                    header: false
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    html: 'Loading...',
                    id: 'sideTutorialPanel',
                    autoScroll: true,
                    header: false
                }
            ]
        });

        me.callParent(arguments);
    },

    onHelpPanelShow: function(component, eOpts) {
        var container = this,
            viewPort = Ext.ComponentQuery.query("viewport")[0];
            xPosotionIniX = (viewPort.width - component.width) / 2;
            xPosotionIniY = viewPort.height - component.height;

        component.animate({
            to: {
                x: xPosotionIniX,
                y: xPosotionIniY
            }
        });



    },

    onHelpPanelBeforeClose: function(panel, eOpts) {

        panel.el.ghost('b', {
            remove: true,
            callback: function(){
                panel.destroy(true);
            }
        });
        return false;
    }

});