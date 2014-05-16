/*
 * File: app/controller/LanguagesController.js
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

Ext.define('LanistaTrainer.controller.LanguagesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.languagesController',

    id: 'languagesController',

    onShowLanguagesPanelButtonClick: function(button, e, eOpts) {

        button.menu.alignTo(button, 'c-c',[-220,0]);

    },

    onChangeLanguage: function(language, doQuestion) {
        Ext.ux.LanguageManager.setLanguage(language, function () {
            if (doQuestion)
            {
                Ext.Msg.confirm(Ext.ux.LanguageManager.TranslationArray.MSG_LANGUAGE_RESTART_1, Ext.ux.LanguageManager.TranslationArray.MSG_LANGUAGE_RESTART_2, function(button) {
                    self.lang = language;
                    if (button == 'yes') {
                        location.reload();
                    }
                });
            }
            else
                self.lang = language;
        });
    },

    init: function(application) {
        this.control({
            "viewport #showLanguagesPanelButton": {
                click: this.onShowLanguagesPanelButtonClick
            }
        });

        application.on({
            changeLanguage: {
                fn: this.onChangeLanguage,
                scope: this
            }
        });
    }

});
