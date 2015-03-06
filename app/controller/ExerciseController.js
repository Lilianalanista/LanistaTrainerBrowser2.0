/*
 * File: app/controller/ExerciseController.js
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

Ext.define('LanistaTrainer.controller.ExerciseController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.exerciseController',

    id: 'ExerciseController',

    refs: [
        {
            ref: 'mainStage',
            selector: '#mainStage'
        },
        {
            ref: 'rightCommandPanel',
            selector: '#rightCommandPanel'
        },
        {
            ref: 'leftCommandPanel',
            selector: '#leftCommandPanel'
        },
        {
            ref: 'mainViewport',
            selector: 'mainViewport'
        },
        {
            autoCreate: true,
            ref: 'exercisePanel',
            selector: '#exercisePanel',
            xtype: 'exercisePanel'
        },
        {
            autoCreate: true,
            ref: 'videoWindow',
            selector: '#videoWindow',
            xtype: 'videoWindow'
        }
    ],

    onsendProtocollButtonClick: function(button, e, eOpts) {
        var controller = this;
        var record = this.getExercisePanel ().down ( '#protocollPanel' ).protocollInformation;

        var dt = new Date();

        var newProtocoll = Ext.create('LanistaTrainer.model.Protocoll', {
            exercise_id : record.exercise_id,
            user_exercise_id : record.user_exercise_id,
            weight: record.weight,
            training: record.training,
            training_unit: record.training_unit,
            user_id: LanistaTrainer.app.currentCustomer.data.id,
            execution_date  : Ext.Date.format (dt, 'Y-m-d h:i:s'),
            creator_id: localStorage.getItem("user_id")
        });

        newProtocoll.setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/exerciseprotocoll/json',
                model: 'LanistaTrainer.model.Protocoll',
                noCache: false,
                reader: {
                    type: 'json',
                    root: 'entries'
                },
                writer: {
                    type: 'json',
                    root: 'records',
                    allowSingle: false
                },
                headers: {
                    user_id: localStorage.getItem("user_id")
                }
            }));

        newProtocoll.save ({
            callback: function( protocoll ) {
                var storeProtocolls = controller.getExercisePanel ().down ('#exerciseProtocolls').getStore();
                storeProtocolls.load ();
            }
        });


    },

    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var controller = this;
        if ( newCard.id == 'info' ) {
            controller.showInfoTabCommands();
        }
        else if ( newCard.id == 'protocollsTabPanel' ) {
            controller.showConfigTabCommands();
        } else if ( newCard.id == 'configurationTabPanel' ) {
            console.log ( "SHOW CONFIGURATION COMMANDS" );
            controller.showExerciseConfigurationsCommands();
        } else {
            console.log ( "HIDE PROTOCOLL COMMANDS" );
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
        }
    },

    onCloseExercisePanelButtonClick: function(button, e, eOpts) {
        var controller = this;

        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeExercisePanel'  , function() {
            if (controller.getMainStage().getLayout().getActiveItem().id === 'customerExercisesPanel')
            {
                controller.getMainStage().getLayout().getActiveItem().down('#customerProtocolls').removeAll(true);
                controller.getController(controller.getMainStage().getLayout().getActiveItem().controller.id).loadProtocolls();
            }

            LanistaTrainer.app.setStandardButtons('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] + 'Button');
            controller.getController(controller.getMainStage().getLayout().getActiveItem().controller.id).showCommands();
            controller.getController(controller.getMainStage().getLayout().getActiveItem().controller.id).setHeader();
            controller.getMainStage().getLayout().getActiveItem().removeCls ('blured');


            if (controller.getMainStage().getLayout().getActiveItem().id === 'planPanel'){
                var planController = LanistaTrainer.app.getController ('PlanController'),
                    activeTabPlan = planController.getPlanPanel().down('tabpanel').getActiveTab();

                planController.currentDay = activeTabPlan;
                activeTabPlan.store.reload();

            }
        });



    },

    onchangeProtollConfigurationButtonClick: function(button, e, eOpts) {

        var weightPicker = Ext.create('LanistaTrainer.view.WeightPicker', {}),
            trainingPicker = Ext.create('LanistaTrainer.view.TrainingPicker', {}),
            controller = this,
            exercisePanel	= controller.getExercisePanel(),
            activeTab = controller.getExercisePanel ().down ( '#exercisePanelContent' ).getActiveTab ();

        controller.getMainViewport().add(weightPicker);
        controller.getMainViewport().add(trainingPicker);

        weightPicker.show ();
        trainingPicker.show ();

        if (activeTab.id === 'protocollsTabPanel'){
            weightPicker.setRecord ( exercisePanel.down('#protocollPanel').protocollInformation);
            trainingPicker.setRecord ( exercisePanel.down('#protocollPanel').protocollInformation);
        }
        else if (activeTab.id === 'configurationTabPanel'){
            weightPicker.setRecord(controller.currentPlanExercise);
            trainingPicker.setRecord (controller.currentPlanExercise);
        }

    },

    onIndicationsButtonClick: function(button, e, eOpts) {
        this.getExercisePanel().down('#exerciseDescriptionInputPanel').show();
        LanistaTrainer.app.fireEvent('showSavePanel', 'saveIndicationsButton','cancelIndicationsButton');
        this.getExercisePanel().down('#exerciseDescriptionInputPanel').focus();
    },

    onSaveIndicationsButtonClick: function(button, e, eOpts) {
        var indications = this.getExercisePanel().down('#exerciseDescriptionInputPanel');

        indications.hide();
        this.showExerciseConfigurationsCommands();
        LanistaTrainer.app.fireEvent('planExerciseRecordChanged', '',indications.getValue(),'');
    },

    onSaveSetInputButtonClick: function(button, e, eOpts) {
        var setInput = this.getExercisePanel().down('#setInput');

        setInput.hide();
        this.showExerciseConfigurationsCommands();
        LanistaTrainer.app.fireEvent('planExerciseRecordChanged', '', '', setInput.getValue());
    },

    onCancelIndicationsButtonClick: function(button, e, eOpts) {
        var indications = this.getExercisePanel().down('#exerciseDescriptionInputPanel');
        indications.hide();
        this.showExerciseConfigurationsCommands();
    },

    onCancelSetInputButton: function(button, e, eOpts) {
        var setInput = this.getExercisePanel().down('#setInput');
        setInput.hide();
        this.showExerciseConfigurationsCommands();
    },

    onVideoButtonClick: function(button, e, eOpts) {
        var controller = this,
            windowPanel = controller.getVideoWindow(),
            viewPort = LanistaTrainer.app.getController('MainController').getLanistaStage().up('mainViewport'),
            srcVideo = Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/video/video/' + controller.record.data.ext_id + '.mp4';

        windowPanel.html = '<div class="lanista-video" id="video"> <video autoplay controls loop name="media" class="x-media lanista-video-item" id="video_item"> <source src=' + srcVideo + '> "Your browser does not support the video tag." </video></div>';
        viewPort.add( windowPanel );
        viewPort.down('#lanistaCopyRights').setY(viewPort.el.dom.clientHeight - 40);
        windowPanel.show ();
        windowPanel.on ( 'hide', function ( component ) {
            component.destroy ();
        });

    },

    onChangeSetsButtonClick: function(button, e, eOpts) {
        this.getExercisePanel().down('#setInput').show();
        LanistaTrainer.app.fireEvent('showSavePanel', 'saveSetInputButton','cancelSetInputButton');
        this.getExercisePanel().down('#setInput').focus();
    },

    onChangeOwnExerciseButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.fireEvent('closeExercisePanel'  , function() {
            LanistaTrainer.app.getController ('MyExerciseInfoController').myexercise = LanistaTrainer.app.getController ('ExerciseController').record;
            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'MyExerciseInfoPanel';
            LanistaTrainer.app.fireEvent( 'showMyExerciseInfoPanel', '');
        });
    },

    onDeleteOwnExerciseButtonClick: function(button, e, eOpts) {
        var controller = this,
            server = Ext.ux.ConfigManager.getServer(),
            root = Ext.ux.ConfigManager.getRoot() + '/tpmanager/',
            userId = localStorage.getItem("user_id"),
            Exercise = Ext.create('LanistaTrainer.model.ExerciseModel'),
            ini = 4000,
            recordAux,
            store;

        Ext.Msg.confirm(Ext.ux.LanguageManager.TranslationArray.DELETE.toUpperCase(), Ext.ux.LanguageManager.TranslationArray.MSG_OWNEXERCISE_REMOVE_ITEMS , function(button) {
            if (button == 'yes') {
                Exercise.data = controller.record.data;
                Exercise.data.id = parseInt(controller.record.data.id) - ini;
                Exercise.phantom = false;
                Exercise.setProxy(new Ext.data.proxy.Ajax({
                    url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/exercise/userexercisesjson',
                    model: 'Exercise',
                    noCache: false,
                    api: {
                        create: undefined,
                        read: undefined,
                        update: undefined,
                        destroy: Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/exercise/userexercisesjson'
                    },
                    extraParams: {
                        exercise_id: controller.record.data.id
                    },
                    writer: {
                        type: 'json',
                        root: 'records',
                        allowSingle: false
                    },
                    headers: {
                        user_id: userId
                    }
                }));

                Exercise.getProxy().actionMethods = {create: 'POST', read: 'GET', update: 'POST', destroy: 'DELETE'};
                Exercise.destroy ({
                    action: 'destroy',
                    callback: function ( record, event ){
                        if (event.success)
                        {
                            recordAux = controller.record;
                            recordAux.data.id = controller.record.data.id + ini;
                            store = Ext.getStore('ExerciseStore');
                            store.remove(recordAux);
                            store.sync();
                            store.save();
                            controller.getLeftCommandPanel().getComponent('closeExercisePanelButton').fireEvent('click');
                        }
                        else
                            Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1 , Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1, Ext.emptyFn);
                    }
                });
            }
        });
    },

    onShowExercisePanel: function(record, exerciseProtocoll, callback) {
        var controller = this,
            exercisePanel	= controller.getExercisePanel(),
            mainStage	= controller.getMainStage(),
            ini = 4000;

        controller.currentPlanExercise = exerciseProtocoll;
        controller.record = record;

        exercisePanel.down('#exercisePanelHeader').data = record.data;
        exercisePanel.down('#exercisePanelContent').items.items[0].data = record.data;
        controller.setActiveItemNew();

        var currentPlan = LanistaTrainer.app.getController ( 'PlanController' ).plan;
        if ( currentPlan ) {
            controller.currentPlanExercise.training = controller.currentPlanExercise.training_min;
            controller.currentPlanExercise.weight = controller.currentPlanExercise.weight_min;
            exercisePanel.down('#exercisePanelContent').child('#configurationTabPanel').tab.show();
            exercisePanel.down('#configurationPanel').update ( controller.currentPlanExercise );
        }

        if ( LanistaTrainer.app.currentCustomer ) {
            exercisePanel.down('#exercisePanelContent').child('#protocollsTabPanel').tab.show();

            // get user protocolls
            var protocollsStore = Ext.getStore( "ProtocollStore" );

            protocollsStore.clearGrouping();
            protocollsStore.clearFilter();
            if ( record.data.ext_id.indexOf ( 'CUST' ) == -1 )
                protocollsStore.filter ([ {property :'exercise_id', value:record.data.id } ,  {property: 'user_id',value: LanistaTrainer.app.currentCustomer.data.id} ]);
            else
                protocollsStore.filter ([ {property :'user_exercise_id', value: parseInt(record.data.id) - ini} , {property:'user_id', value: LanistaTrainer.app.currentCustomer.data.id} ]);

            protocollsStore.group( 'execution_date_day','DESC');
            protocollsStore.sort( {
                direction: 'DESC',
                //property: 'execution_date_day'
                property: 'id'
            });

            protocollsStore.load (function (records) {
                exercisePanel.down('#exerciseProtocolls').reconfigure(protocollsStore);
                if ( protocollsStore.data && protocollsStore.data.items.length > 0 ) {
                    exercisePanel.down('#protocollPanel').protocollInformation = protocollsStore.data.items[0].data;
                    exercisePanel.down('#protocollPanel').update (protocollsStore.data.items[0].data);
                } else {
                    // USE THE EXERCISE CONFIGURATION
                    console.log ( "USING EXERCISE CONFIGURATION");
                    exercisePanel.down('#protocollPanel').protocollInformation = controller.currentPlanExercise;
                    exercisePanel.down('#protocollPanel').update ( controller.currentPlanExercise );
                }
           });

        }
        exercisePanel.down('#exercisePanelContent').setActiveTab(0).show();
        exercisePanel.addCls('md-show');
        mainStage.add( exercisePanel );
        mainStage.getLayout().setActiveItem("exercisePanel",'1');

        exercisePanel.on('hide', function(component) {
            component.destroy();
        }, controller);

        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons('closeExercisePanelButton');
        this.showCommands();

        // *** 2 Show the panel
        exercisePanel.show();

        exercisePanel.down('#exercisePanelContent').fireEvent('tabchange', exercisePanel, exercisePanel.down('#exercisePanelContent').setActiveTab(0));
        LanistaTrainer.app.fireEvent('showExerciseHeaderUpdate');
        LanistaTrainer.app.fireEvent('showStage');

        // *** 4 Callback
        if (callback instanceof Function) callback();

        // *** 5 Load data
        controller.loadData();
    },

    onCloseExercisePanel: function(callback) {
        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });
        controller.getLeftCommandPanel().items.each(function (item) {
            item.hide();
        });
        controller.getExercisePanel().hide();
        if (callback instanceof Function) callback();

    },

    onShowExerciseHeaderUpdate: function() {
        var controller = this,
            record = LanistaTrainer.app.currentCustomer,
            divLogo = '',
            divInfoCustomer = '';

        if (record) {
            divLogo = '<div class="lansita-header-customer-image-not-found show-info-customer" id="showCustomerDataButton"><div class="lansita-header-customer-logo show-info-customer" id="showCustomerDataButton" style="background-image: url(' + Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/img/p/'+ record.data.id + '_photo.jpg);"></div></div>';
            divInfoCustomer = '<div class="lansita-header-customer-name"> <span class="last-name">' + record.data.last_name + '</span><br> <span class="first-name">' + record.data.first_name +'</span></div>';
        }
        controller.getMainViewport().down("#header").update({
            info: divLogo + divInfoCustomer,
            title: Ext.ux.LanguageManager.TranslationArray.EXERCISE.toUpperCase()
        });

    },

    onPlanExerciseRecordChanged: function(weightTrainingValues, indications, sets) {
        var currentPanel = this.getExercisePanel ().down ( '#exercisePanelContent' ).getActiveTab (),
            userId = localStorage.getItem("user_id"),
            controller = this,
            planController = LanistaTrainer.app.getController ('PlanController'),
            activeTabPlan = planController.getPlanPanel().down('tabpanel').getActiveTab(),
            planExercise;

        if ( currentPanel.id == 'protocollsTabPanel' ) {
            currentPanel.down('#protocollPanel').protocollInformation.weight = weightTrainingValues[0];
            currentPanel.down('#protocollPanel').protocollInformation.training = weightTrainingValues[1];
            currentPanel.down('#protocollPanel').protocollInformation.training_unit = weightTrainingValues[2];
            currentPanel.down('#protocollPanel').update(currentPanel.down('#protocollPanel').protocollInformation);
        }
        else if ( currentPanel.id == 'configurationTabPanel' ) {
            var currPlanExercise = controller.currentPlanExercise;

            if (weightTrainingValues){
                currPlanExercise.weight_min = weightTrainingValues[0];
                currPlanExercise.training_min = weightTrainingValues[1];
                currPlanExercise.weight = currPlanExercise.weight_min;
                currPlanExercise.training = currPlanExercise.training_min;
                currPlanExercise.training_unit = weightTrainingValues[2];
            }
            if (indications){
                currPlanExercise.description = indications;
            }
            if (sets){
                currPlanExercise.rounds_min = sets;
            }

            controller.currentPlanExercise = currPlanExercise;
            currentPanel.down('#configurationPanel').update ( currPlanExercise );

            planExercise = Ext.create('LanistaTrainer.model.PlanExercise');
            planExercise.data = currPlanExercise;
            planExercise.setProxy(new Ext.data.proxy.Ajax({
                url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/planexercises/json',
                model: 'PlanExercise',
                noCache: false,
                reader: {
                    type: 'json',
                    root: 'entries'
                },
                writer: {
                    type: 'json',
                    root: 'records',
                    allowSingle: false
                },
                headers: {
                    user_id: userId
                }
            }));
            planExercise.save ();
        }

    },

    showCommands: function(callback) {

        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });









    },

    loadData: function() {

    },

    setActiveItemNew: function(newCard, maintain) {

        Ext.override(Ext.layout.CardLayout, {
            setActiveItem: function(newCard, maintain) {

            var me = this,
                owner = me.owner,
                oldCard = me.activeItem,
                rendered = owner.rendered,
                newIndex;

            newCard = me.parseActiveItem(newCard);
            newIndex = owner.items.indexOf(newCard);

            // If the card is not a child of the owner, then add it.
            // Without doing a layout!
            if (newIndex == -1) {
                newIndex = owner.items.items.length;
                Ext.suspendLayouts();
                newCard = owner.add(newCard);
                Ext.resumeLayouts();
            }

            // Is this a valid, different card?
            if (newCard && oldCard != newCard) {
                // Fire the beforeactivate and beforedeactivate events on the cards
                if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
                    return false;
                }
                if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
                    return false;
                }

                if (rendered) {
                    Ext.suspendLayouts();

                    // If the card has not been rendered yet, now is the time to do so.
                    if (!newCard.rendered) {
                        me.renderItem(newCard, me.getRenderTarget(), owner.items.length);
                    }

                    if (oldCard) {
                        if (!maintain) {
                            if (me.hideInactive) {
                                oldCard.hide();
                                oldCard.hiddenByLayout = true;
                            }
                        }

                        oldCard.fireEvent('deactivate', oldCard, newCard);
                    }
                    // Make sure the new card is shown
                    if (newCard.hidden) {
                        newCard.show();
                    }

                    // Layout needs activeItem to be correct, so set it if the show has not been vetoed
                    if (!newCard.hidden) {
                        me.activeItem = newCard;
                    }
                    Ext.resumeLayouts(true);
                } else {
                    me.activeItem = newCard;
                }

                newCard.fireEvent('activate', newCard, oldCard);

                return me.activeItem;
            }
            return false;
            }
        });
    },

    showExerciseConfigurationsCommands: function() {
        controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        var changeButton = Ext.create('LanistaTrainer.view.LanistaButton', {
            text:  Ext.ux.LanguageManager.TranslationArray.CONFIGURE_PROTOCOLL,
            itemId: 'changeProtollConfigurationButton',
            glyph: '120@Lanista Icons' //x
        });
        var indicationsButton = Ext.create('LanistaTrainer.view.LanistaButton', {
            text:  Ext.ux.LanguageManager.TranslationArray.PLAN_EXERCISE_DESCRIPTION,
            itemId: 'indicationsButton',
            glyph: '73@Lanista Icons' //I

        });
        var changeSetsButton = Ext.create('LanistaTrainer.view.LanistaButton', {
            text:  Ext.ux.LanguageManager.TranslationArray.FORM_PLANEXRCISE_SETS_CONFIG,
            itemId: 'changeSetsButton',
            glyph: '74@Lanista Icons' //J

        });

        controller.getRightCommandPanel().add(
            changeButton
        );

        controller.getRightCommandPanel().add(
            indicationsButton
        );

        controller.getRightCommandPanel().add(
            changeSetsButton
        );

    },

    showConfigTabCommands: function() {
        controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        var changeButton = Ext.create('LanistaTrainer.view.LanistaButton', {
            text:  Ext.ux.LanguageManager.TranslationArray.CONFIGURE_PROTOCOLL,
            itemId: 'changeProtollConfigurationButton',
            glyph: '120@Lanista Icons' //x

        });
        var protocollButton = Ext.create('LanistaTrainer.view.LanistaButton', {
            text:  Ext.ux.LanguageManager.TranslationArray.CREATE_PROTOCOLL,
            itemId: 'sendProtocollButton',
            glyph: '100@Lanista Icons', //d
            cls: [
                'lanista-command-button',
                'lanista-command-button-green'
            ]
        });

        controller.getRightCommandPanel().add(
            changeButton
        );

        controller.getRightCommandPanel().add(
            protocollButton
        );
    },

    showInfoTabCommands: function() {
        controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        if ( !LanistaTrainer.app.currentCustomer ) {
            if ( controller.record.data.ext_id.indexOf ( 'CUST' ) == -1 ){ //Lanista exercise
                var videoButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                    text:  'VIDEO',
                    itemId: 'videoButton',
                    glyph: '89@Lanista Icons' //Y

                });
                controller.getRightCommandPanel().add(
                    videoButton
                );
            }
            else{//Onw exercise
                var changeOwnExerciseButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                    text:  Ext.ux.LanguageManager.TranslationArray.CHANGE,
                    itemId: 'changeOwnExerciseButton',
                    glyph: '73@Lanista Icons'//I
                });
                var deleteOwnExerciseButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                    text:  Ext.ux.LanguageManager.TranslationArray.DELETE ,
                    itemId: 'deleteOwnExerciseButton',
                    glyph: '68@Lanista Icons', //D
                    cls: [
                    'lanista-command-button',
                    'lanista-command-button-red'
                    ]
                });
                controller.getRightCommandPanel().add(
                    changeOwnExerciseButton
                );
                controller.getRightCommandPanel().add(
                    deleteOwnExerciseButton
                );
            }


        }

    },

    init: function(application) {
        this.control({
            "viewport #sendProtocollButton": {
                click: this.onsendProtocollButtonClick
            },
            "exercisePanel #exercisePanelContent": {
                tabchange: this.onTabpanelTabChange
            },
            "viewport #closeExercisePanelButton": {
                click: this.onCloseExercisePanelButtonClick
            },
            "viewport #changeProtollConfigurationButton": {
                click: this.onchangeProtollConfigurationButtonClick
            },
            "viewport #indicationsButton": {
                click: this.onIndicationsButtonClick
            },
            "viewport #saveIndicationsButton": {
                click: this.onSaveIndicationsButtonClick
            },
            "viewport #saveSetInputButton": {
                click: this.onSaveSetInputButtonClick
            },
            "viewport #cancelIndicationsButton": {
                click: this.onCancelIndicationsButtonClick
            },
            "viewport #cancelSetInputButton": {
                click: this.onCancelSetInputButton
            },
            "viewport #videoButton": {
                click: this.onVideoButtonClick
            },
            "viewport #changeSetsButton": {
                click: this.onChangeSetsButtonClick
            },
            "viewport #changeOwnExerciseButton": {
                click: this.onChangeOwnExerciseButtonClick
            },
            "viewport #deleteOwnExerciseButton": {
                click: this.onDeleteOwnExerciseButtonClick
            }
        });

        application.on({
            showExercisePanel: {
                fn: this.onShowExercisePanel,
                scope: this
            },
            closeExercisePanel: {
                fn: this.onCloseExercisePanel,
                scope: this
            },
            showExerciseHeaderUpdate: {
                fn: this.onShowExerciseHeaderUpdate,
                scope: this
            },
            planExerciseRecordChanged: {
                fn: this.onPlanExerciseRecordChanged,
                scope: this
            }
        });
    }

});
