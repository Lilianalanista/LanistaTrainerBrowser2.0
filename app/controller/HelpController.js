/*
 * File: app/controller/HelpController.js
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

Ext.define('LanistaTrainer.controller.HelpController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.helpController',

    id: 'helpController',

    refs: [
        {
            autoCreate: true,
            ref: 'helpPanel',
            selector: 'helpPanel',
            xtype: 'helpPanel'
        },
        {
            ref: 'mainViewport',
            selector: 'mainViewport'
        },
        {
            ref: 'mainStage',
            selector: '#mainStage'
        }
    ],

    onHelpButtonClick: function(button, e, eOpts) {
        var controller = this;
        var mainViewPort = controller.getMainViewport(),
            helpPanel = controller.getHelpPanel();


        Ext.Msg.alert (
            '',
            Ext.ux.LanguageManager.TranslationArray.FUNCTIONALITY_NOT_AVAILABLE,
            null,
            null
        );

        return;

        var toXY = mainViewPort.getAnchorXY('bl', true);
        var xPosotionIni = (mainViewPort.width - helpPanel.width) / 2;

        helpPanel.setPosition(xPosotionIni,toXY[1]);
        helpPanel.show();

        var panelOnStage = LanistaTrainer.app.activePanel,
            currentLanguage = Ext.ux.LanguageManager.getLanguage();

        console.log(panelOnStage);
        console.log(currentLanguage);

        Ext.Ajax.request({
            url: 'helps/' + panelOnStage + '_' + currentLanguage + '.html',
            method: "GET",
            success: function(response, request) {
                // We should use the setter for the HTML config for this
                helpPanel.down ( '#sideHelpPanel' ).update( response.responseText );
            },
            failure: function(response, request) {
                helpPanel.down ( '#sideHelpPanel' ).update( "No help available" );
            }
        });
        Ext.Ajax.request({
            url: 'tutorials/' + panelOnStage + '_' + currentLanguage + '.html',
            method: "GET",
            success: function(response, request) {
                // We should use the setter for the HTML config for this
                //me.down ( '#help-tutorials-panel' ).setWidth ( 1000 );
                helpPanel.down ( '#sideTutorialPanel' ).update( response.responseText );
                /*
                $(".iframe").fancybox({
                    'width' : 600,
                    'height' : 450,
                    'autoScale' : true,
                    'transitionIn' : 'elastic',
                    'transitionOut' : 'elastic',
                    'type' : 'iframe'
                });
                */
            },
            failure: function(response, request) {
                helpPanel.down ( '#sideTutorialPanel' ).update( "No tutorials available" );
            }
        });









    },

    init: function(application) {
        this.control({
            "viewport #helpButton": {
                click: this.onHelpButtonClick
            }
        });
    }

});
