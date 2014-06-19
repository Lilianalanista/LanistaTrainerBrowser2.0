/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({

    requires: [
        'Ext.ux.LanguageManager',
        'Ext.ux.SessionManager',
        'Ext.ux.ConfigManager',
        'Ext.ux.PreviewPlugin'
    ],
    panels: [
        
    ],
    models: [
        'ExerciseModel',
        'Customer',
        'Protocoll',
        'PlanExercise',
        'Plan',
        'Favorites'
    ],
    stores: [
        'ExerciseInitialStore',
        'ExerciseStore',
        'CustomerStore',
        'ProtocollStore',
        'PlanExerciseStore',
        'PlanStore',
        'FavoritesStore'
    ],
    views: [
        'MainViewport',
        'ExercisesPanel',
        'LanistaButton',
        'rightView',
        'LoginPanel',
        'TemplatesPanel',
        'RegistrationPanel',
        'StopWatch',
        'HelpPanel',
        'DashBoardPanel',
        'UserInfoPanel',
        'CustomersPanel',
        'ImagePanel',
        'CustomerInfoPanel',
        'CustomerExercisesPanel',
        'Temporal',
        'ExercisePanel',
        'WeightPicker',
        'TrainingPicker',
        'PlanExercisesList',
        'PlanPanel',
        'PlanOptionsPanel',
        'VideoWindow',
        'FavoritesPanel'
    ],
    controllers: [
        'MainController',
        'LoginController',
        'ExercisesController',
        'TemplatesController',
        'RegistrationController',
        'LanguagesController',
        'AutheticationController',
        'StopWatchController',
        'ToolsController',
        'HelpController',
        'DashBoardController',
        'CustomersController',
        'UserInfoController',
        'ImageController',
        'CustomerInfoController',
        'CustomerExercisesController',
        'ExerciseController',
        'PlanController',
        'FavoritesController'
    ],
    name: 'LanistaTrainer',

    launch: function() {
        Ext.create('LanistaTrainer.view.MainViewport');
        console.log("START");

        LanistaTrainer.app.fireEvent('loadExercises', function() {
            console.log("EXERCISES LOADED");

            Ext.ux.SessionManager.loadLastUser();
            if ( !Ext.ux.SessionManager.getIsLoggedIn() )
                LanistaTrainer.app.fireEvent('showLoginPanel');
            else
            {
                var user = Ext.ux.SessionManager.getUser(),
                    url = 'ext/locale/ext-lang-' + user.language.toLowerCase() + '.js';

                if (user.language != Ext.ux.LanguageManager.lang)
                    LanistaTrainer.app.fireEvent('changeLanguage', user.language, false);

                console.log('SE INVOCO CHANGE LANGUAGE');

                Ext.Ajax.request({
                    url: url,
                    success: function(response) {
                        eval(response.responseText);
                        console.log("Language was changed");
                    },
                    failure: function(response) {
                        console.log("Language couldn't be changed");
                    },
                    scope: this
                });
                LanistaTrainer.app.setProxies();
                LanistaTrainer.app.fireEvent('showDashboardPanel');
            }
        });
    },

    setStandardButtons: function(backBotonId) {
        var LeftPanel = Ext.ComponentQuery.query("viewport")[0].down("#leftCommandPanel");

        LeftPanel.items.each(function (item) {
            item.hide();
        });


        if ( !Ext.isEmpty(backBotonId) )
        {	LeftPanel.add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.CLOSE,
                    itemId: backBotonId,
                    glyph: '98@Lanista Icons', //b
                    cls: [
                    'lanista-command-button',
                    'lanista-command-button-red'
                    ]
                })
            );
        }


        tools = new Ext.menu.Menu(
        {
            defaults: {
                height: '50px',
                width: '220px'
            },
            items:
            [
                {text:   Ext.ux.LanguageManager.TranslationArray.MUSCLES,
                         handler: function () {
                             LanistaTrainer.app.fireEvent('showTools', 'MUSCLES');
                         }
                },
                {text:	 Ext.ux.LanguageManager.TranslationArray.SKELETON,
                         handler: function () {
                             LanistaTrainer.app.fireEvent('showTools', 'SKELETON');
                         }
                },
                {text:   Ext.ux.LanguageManager.TranslationArray.STOP_WATCH,
                         handler: function () {
                             LanistaTrainer.app.fireEvent('showTools', 'STOP_WATCH');
                         }
                }
            ]
        });
        LeftPanel.add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.TOOLS,
                itemId: 'toolsButton',
                menu: tools,
                menuButtonAlign: 'left',
                glyph: '102@Lanista Icons', //f
                cls: [
                    'lanista-command-button',
                    'lanista-command-button-violet'
                ]
            })
        );


        LeftPanel.add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_HELP,
                itemId: 'helpButton',
                glyph: '104@Lanista Icons', //h
                cls: [
                    'lanista-command-button',
                    'lanista-command-button-violet'
                ]
            })
        );


    },

    setProxies: function() {
        console.log('Setting Proxys....');

        var userId = localStorage.getItem("user_id");
        if (userId)
        {
            Ext.getStore('CustomerStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/json',
                model: 'Customer',
                noCache: false,
                reader: {
                    type: 'json',
                    root: 'entries'
                },
                headers: {
                    user_id: userId
                }
            }));

            Ext.getStore('ProtocollStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/exerciseprotocoll/json',
                model: 'Protocoll',
                noCache: false,
                reader: {
                    type: 'json',
                    root: 'entries'
                },
                writer: {
                    type: 'json',
                    root: 'results'
                },
                headers: {
                    user_id: userId
                }
            }));

            Ext.getStore('PlanStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/plan/json',
                model: 'Plan',
                noCache: false,
                reader: {
                    type: 'json',
                    root: 'entries'
                },
                writer: {
                    type: 'json',
                    root: 'results'
                },
                headers: {
                    user_id: userId
                }
            }));
        }

    }

});
