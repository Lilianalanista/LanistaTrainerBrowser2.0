/*
 * File: app/view/LoginPanel.js
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

Ext.define('LanistaTrainer.view.LoginPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginPanel',

    requires: [
        'LanistaTrainer.view.LoginPanelViewModel',
        'Ext.panel.Panel',
        'Ext.form.Label',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'loginPanel'
    },
    border: false,
    cls: 'lanista-form',
    height: 504,
    id: 'loginPanel',
    width: 802,
    header: false,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onLoginPanelAfterRender'
    },
    items: [
        {
            xtype: 'container',
            cls: 'container-group',
            id: 'containerGroup',
            layout: {
                type: 'hbox',
                pack: 'center',
                padding: 20
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    height: 360,
                    id: 'bottonPanel',
                    header: false,
                    title: '',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'login-buttons-container',
                    id: 'formContainer',
                    style: 'background-color: rgba(255,255,255,0.4);',
                    width: 200,
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        padding: 40
                    },
                    items: [
                        {
                            xtype: 'label',
                            height: 60,
                            html: '',
                            id: 'loginTitle'
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            border: 0,
                            cls: 'fieldset-login',
                            id: 'fieldSetGroup',
                            title: '',
                            items: [
                                {
                                    xtype: 'combobox',
                                    anchor: '100%',
                                    tabIndex: 1,
                                    id: 'user_email',
                                    itemId: 'user_email',
                                    name: 'user_email',
                                    inputAttrTpl: [
                                        'autocomplete="on"'
                                    ],
                                    enableKeyEvents: true,
                                    hideTrigger: true,
                                    displayField: 'email',
                                    queryMode: 'local',
                                    listeners: {
                                        keypress: 'onEmailKeypress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    tabIndex: 2,
                                    id: 'password',
                                    name: 'password',
                                    inputType: 'password',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'onPasswordKeypress'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            height: 40,
                            id: 'infologinButton'
                        }
                    ]
                }
            ]
        }
    ],

    onLoginPanelAfterRender: function(component, eOpts) {
        document.getElementsByName("user_email")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.USER_EMAIL;
        document.getElementsByName("password")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.USER_PASSWORD;
        component.down("#loginTitle").setText(Ext.ux.LanguageManager.TranslationArray.FORM_TITLE_LOGIN, false);
        component.down("#infologinButton").setText(Ext.ux.LanguageManager.TranslationArray.BUTTON_PASSWORD_QUESTION, false);

        document.getElementsByName("user_email")[0].focus();




    },

    onEmailKeypress: function(textfield, e, eOpts) {
        if(e.getKey() == e.ENTER){
            Ext.getCmp('rightCommandPanel').down('#loginButton').fireEvent('click');
        }
    },

    onPasswordKeypress: function(textfield, e, eOpts) {
        if(e.getKey() == e.ENTER){
            Ext.getCmp('rightCommandPanel').down('#loginButton').fireEvent('click');
        }

    }

});