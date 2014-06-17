/*
 * File: app/view/VideoWindow.js
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

Ext.define('LanistaTrainer.view.VideoWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.videoWindow',

    border: false,
    cls: 'lanista-video-window',
    draggable: false,
    height: 510,
    id: 'videoWindow',
    style: 'background: black;',
    width: 800,
    resizable: false,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                hide: {
                    fn: me.onVideoWindowHide,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onVideoWindowHide: function(component, eOpts) {
        component.destroy();
    }

});