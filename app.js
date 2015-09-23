/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({

    requires: [
        'Ext.ux.LanguageManager',
        'Ext.ux.SessionManager',
        'Ext.ux.ConfigManager',
        'Ext.ux.PreviewPlugin',
        'Ext.util.Cookies'
    ],
    panels: [
        
    ],
    models: [
        'ExerciseModel',
        'Customer',
        'Protocoll',
        'PlanExercise',
        'Plan',
        'Favorites',
        'Measures',
        'Circumferences',
        'TestTypesNodes',
        'TestTypes',
        'TestResults',
        'OwnClientExercises'
    ],
    stores: [
        'ExerciseInitialStore',
        'ExerciseStore',
        'CustomerStore',
        'ProtocollStore',
        'PlanExerciseStore',
        'PlanStore',
        'FavoritesStore',
        'MeasuresStore',
        'CircumferencesStore',
        'TestTypesNodesStore',
        'TestTypesStore',
        'TestResultsStore',
        'OwnClientExercisesStore'
    ],
    views: [
        'MainViewport',
        'LanistaButton',
        'rightView',
        'LoginPanel',
        'TemplatesPanel',
        'StopWatch',
        'HelpPanel',
        'DashBoardPanel',
        'UserInfoPanel',
        'CustomersPanel',
        'ImagePanel',
        'CustomerInfoPanel',
        'CustomerExercisesPanel',
        'Temporal',
        'WeightPicker',
        'PlanExercisesList',
        'PlanPanel',
        'PlanOptionsPanel',
        'VideoWindow',
        'FavoritesPanel',
        'DefaultPlanValuesPanel',
        'SetObjectLanista',
        'MyExerciseInfoPanel',
        'MeasuresPanel',
        'ChartWindow',
        'MyButton7',
        'TestPanel',
        'WeightsWindow',
        'WeightsWindow_II',
        'ExercisePanel',
        'ExercisesPanel',
        'RegisterPanel'
    ],
    controllers: [
        'MainController',
        'LoginController',
        'ExercisesController',
        'TemplatesController',
        'RegisterController',
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
        'FavoritesController',
        'MyExerciseInfoController',
        'MeasuresController'
    ],
    name: 'LanistaTrainer',

    launch: function() {
        Ext.create('LanistaTrainer.view.MainViewport');
        console.log("START");

        LanistaTrainer.app.firefoxBrowser = Ext.browser.is.firefox;

        LanistaTrainer.app.fireEvent('loadExercises', function() {
            console.log("EXERCISES LOADED");

            Ext.ux.SessionManager.loadLastUser();
            if ( !Ext.ux.SessionManager.getIsLoggedIn() )
                LanistaTrainer.app.fireEvent('showLoginPanel');
            else
            {
                var user = Ext.ux.SessionManager.getUser(),
                    //url = 'ext/locale/ext-lang-' + user.language.toLowerCase() + '.js';
                    url = 'lib/ext-locale/ext-locale-' + user.language.toLowerCase() + '.js';

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
                //LanistaTrainer.app.fireEvent('showDashboardPanel');

                if (user.role === '2' )  //Only Role 2 means that it is a Trainer
                    LanistaTrainer.app.fireEvent('showDashboardPanel');
                else{  //It is a  Kunden
                    Ext.Ajax.request({
                        url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/getuser',
                        method: 'get',
                        params: {id: user.id},
                        headers: {user_id: user.id},
                        failure : function(result, request){
                            if (result.status === 401 || result.status === 403){
                                console.log( "There were problems in looking for user information" );
                                LanistaTrainer.app.fireEvent('loginUser', user.email, user.password,
                                                             function (data) {
                                                                 setTimeout(function()
                                                                            {
                                                                                LanistaTrainer.app.panels = [];
                                                                                LanistaTrainer.app.getController('MainController').getMainStage().destroy();
                                                                                LanistaTrainer.app.getController('MainController').getLanistaStage().destroy();
                                                                                LanistaTrainer.app.getController('MainController').getHeader().destroy();
                                                                                LanistaTrainer.app.getController('MainController').getLanistaCopyRights().destroy();
                                                                                LanistaTrainer.app.getController('MainController').getMainViewport().destroy();
                                                                                LanistaTrainer.app.launch();
                                                                            }, 1600);
                                                             },
                                                             function (status) {
                                                                 setTimeout(function()
                                                                            {
                                                                                LanistaTrainer.app.panels = [];
                                                                                LanistaTrainer.app.getController('MainController').getMainStage().destroy();
                                                                                LanistaTrainer.app.getController('MainController').getLanistaStage().destroy();
                                                                                LanistaTrainer.app.getController('MainController').getHeader().destroy();
                                                                                LanistaTrainer.app.getController('MainController').getLanistaCopyRights().destroy();
                                                                                LanistaTrainer.app.getController('MainController').getMainViewport().destroy();
                                                                                LanistaTrainer.app.fireEvent('showLoginPanel');
                                                                            }, 1600);
                                                             }
                                                            );
                            }
                        },
                        success: function(response, opts) {
                            try {
                                data = Ext.decode(response.responseText);
                                ActiveCustomer = Ext.create('LanistaTrainer.model.Customer', {
                                    id: data.user.id,
                                    first_name: data.user.first_name,
                                    last_name: data.user.last_name,
                                    email: data.user.email,
                                    street: data.user.street,
                                    city: data.user.city,
                                    zipcode: data.user.zipcode,
                                    country: data.user.country,
                                    note: data.user.note,
                                    phone_nr: data.user.phone_nr,
                                    birthday: data.user.birthday,
                                    gender: data.user.gender,
                                    deleted: data.user.deleted,
                                    image: data.user.image,
                                    last_change: data.user.last_change,
                                    language: data.user.language,
                                    sincronized: data.user.sincronized
                                });
                                LanistaTrainer.app.currentCustomer = ActiveCustomer;
                                LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerExercisesPanel';
                                LanistaTrainer.app.fireEvent('showCustomerExercisesPanel');
                            }
                            catch( err ) {
                                Ext.Msg.alert('Problem', 'There were problems in looking for user information', Ext.emptyFn);
                            }
                        }
                    });
                }
            }
        });
    },

    setStandardButtons: function(backBotonId) {
        var LeftPanel = Ext.ComponentQuery.query("viewport")[0].down("#leftCommandPanel"),
            user = Ext.ux.SessionManager.getUser();

        LeftPanel.items.each(function (item) {
            item.hide();
        });


        if ( !Ext.isEmpty(backBotonId) && (backBotonId !== 'closeCustomerExercisesPanelButton' || (user && user.role === '2')))
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

        if ( LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'LoginPanel' ){
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

                                 Ext.Msg.alert (
                                     '',
                                     Ext.ux.LanguageManager.TranslationArray.FUNCTIONALITY_NOT_AVAILABLE,
                                     null,
                                     null
                                 );

                                return;

                                 LanistaTrainer.app.fireEvent('showTools', 'MUSCLES');
                             }
                    },
                    {text:	 Ext.ux.LanguageManager.TranslationArray.SKELETON,
                             handler: function () {

                                 Ext.Msg.alert (
                                     '',
                                     Ext.ux.LanguageManager.TranslationArray.FUNCTIONALITY_NOT_AVAILABLE,
                                     null,
                                     null
                                 );

                                return;

                                 LanistaTrainer.app.fireEvent('showTools', 'SKELETON');
                             }
                    },
                    {text:   Ext.ux.LanguageManager.TranslationArray.STOP_WATCH,
                             handler: function () {

                                 Ext.Msg.alert (
                                     '',
                                     Ext.ux.LanguageManager.TranslationArray.FUNCTIONALITY_NOT_AVAILABLE,
                                     null,
                                     null
                                 );

                                return;

                                 LanistaTrainer.app.fireEvent('showTools', 'STOP_WATCH');
                             }
                    }
                ]
            });


            /*******  Temporal change !!!!!
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
            */

        }

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
                model: 'LanistaTrainer.model.Customer',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                headers: {
                    user_id: userId
                }
            }));

            Ext.getStore('ProtocollStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/exerciseprotocoll/json',
                model: 'LanistaTrainer.model.Protocoll',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                },
                headers: {
                    user_id: userId
                }
            }));

            Ext.getStore('PlanStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/plan/json',
                model: 'LanistaTrainer.model.Plan',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                },
                headers: undefined //{
                //user_id: userId
                //}
            }));

            Ext.getStore('FavoritesStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/favorites/json',
                model: 'LanistaTrainer.model.Favorites',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                },
                headers: {
                    user_id: userId
                }
            }));

            Ext.getStore('MeasuresStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/weightjson',
                model: 'LanistaTrainer.model.Measures',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                },
                headers: {
                    user_id: userId
                }
            }));

            Ext.getStore('CircumferencesStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/bodymeasuresjson',
                model: 'LanistaTrainer.model.Circumferences',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                },
                headers: {
                    user_id: userId
                }
            }));

            Ext.getStore('TestResultsStore').setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/testresultjson',
                model: 'LanistaTrainer.model.TestResults',
                noCache: false,
                reader: {
                    type: 'json',
                    rootProperty: 'entries'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'results'
                },
                headers: {
                    user_id: userId
                }
            }));

        }

    }

});
