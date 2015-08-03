/*
 * File: app/view/MyButton7.js
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

Ext.define('LanistaTrainer.view.MyButton7', {
    extend: 'Ext.button.Button',
    alias: 'widget.lanistaButton',

    requires: [
        'LanistaTrainer.view.MyButton7ViewModel'
    ],

    viewModel: {
        type: 'lanistaButton'
    },
    cls: 'lanista-command-button',
    text: 'command',
    defaultListenerScope: true,

    listeners: {
        mouseover: 'onButtonMouseOver',
        afterrender: 'onButtonAfterRender',
        mouseout: 'onButtonMouseOut',
        click: 'onButtonClick',
        hide: 'onButtonHide'
    },

    onButtonMouseOver: function(button, e, eOpts) {

        if (button.menu)
        {
            button.menu.show();
            if (button.menuButtonAlign == 'left')
                button.menu.alignTo(button, 'c-c',[150,0]);
            else
                if (button.menuButtonAlign == 'right')
                    button.menu.alignTo(button, 'c-c',[-150,0]);
        }





    },

    onButtonAfterRender: function(component, eOpts) {

        if (component.menu)
        {
            component.menu.addCls('menu-lanista-button');
            component.menu.on('mouseleave', function() {
                component.menu.locked = false;
                component.menu.hide();
            });

            component.menu.on('mouseenter', function() {
                component.menu.locked = true;
            });
        }

    },

    onButtonMouseOut: function(button, e, eOpts) {

        setTimeout(function()
        {
            if (button.menu && !button.menu.locked)
                button.menu.hide();
        }, 100);

    },

    onButtonClick: function(button, e, eOpts) {
        if (button.menu)
        {
            button.menu.show();
            if (button.menuButtonAlign == 'left')
                button.menu.alignTo(button, 'c-c',[150,0]);
            else
                if (button.menuButtonAlign == 'right')
                    button.menu.alignTo(button, 'c-c',[-150,0]);
        }
        else
        {
            setTimeout(function()
            {
                if (button.menu && !button.menu.locked)
                    button.menu.hide();
            }, 100);

        }
    },

    onButtonHide: function(component, eOpts) {
        component.destroy();
    }

});