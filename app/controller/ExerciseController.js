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
        }
    ],

    onCloseExercisePanelButtonClick: function(button, e, eOpts) {
        var controller = this;

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
        });



    },

    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var controller = this;
        if ( newCard.id == 'protocollsTabPanel' ) {
            console.log ( "SHOW PROTOCOLL COMMANDS" );
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });

            var changeButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                text:  Ext.ux.LanguageManager.TranslationArray.CONFIGURE_PROTOCOLL,
                itemId: 'changeProtollConfigurationButton',
                glyph: '120@Lanista Icons' //x
                //cls: [
                //    'lanista-command-buton'
                //    //'two-lines'
                //]
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
        } else if ( newCard.id == 'configurationTabPanel' ) {
            console.log ( "SHOW CONFIGURATION COMMANDS" );
            //controller.showExerciseConfigurationCommands();
        } else {
            console.log ( "HIDE PROTOCOLL COMMANDS" );
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
        }
    },

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

    onchangeProtollConfigurationButtonClick: function(button, e, eOpts) {

        var weightPicker = Ext.create('LanistaTrainer.view.WeightPicker', {}),
            trainingPicker = Ext.create('LanistaTrainer.view.TrainingPicker', {}),
            controller = this,
            exercisePanel	= controller.getExercisePanel();

        controller.getMainViewport().add(weightPicker);
        controller.getMainViewport().add(trainingPicker);

        weightPicker.show ();
        trainingPicker.show ();
        weightPicker.setRecord ( exercisePanel.down('#protocollPanel').protocollInformation);
        trainingPicker.setRecord ( exercisePanel.down('#protocollPanel').protocollInformation);

    },

    onShowExercisePanel: function(record, protocolls, callback) {
        var controller = this,
            exercisePanel	= controller.getExercisePanel(),
            mainStage	= controller.getMainStage();

        controller.record = record;
        exercisePanel.down('#exercisePanelHeader').data = record.data;
        exercisePanel.down('#exercisePanelContent').items.items[0].data = record.data;
        controller.setActiveItemNew();

        //var currentPlan = LanistaTrainer.app.getController ( 'PlanController' ).plan;
        //if ( currentPlan ) {
            //console.log ( controller.currentPlanExercise );
            //controller.currentPlanExercise.set ( "training", controller.currentPlanExercise.get ( "training_min" ));
            //controller.currentPlanExercise.set ( "weight", controller.currentPlanExercise.get ( "weight_min" ));
            //exercisePanel.down('#exercisePanelContent').getTabBar().getAt (3).show();
            //exercisePanel.down('#configurationPanel').setRecord ( controller.currentPlanExercise );
        //}

        if ( LanistaTrainer.app.currentCustomer ) {
            exercisePanel.down('#exercisePanelContent').setActiveTab(0).show();

            // get user protocolls
            var protocollsStore = Ext.getStore( "ProtocollStore" );

            protocollsStore.clearGrouping();
            protocollsStore.clearFilter();
            if ( record.data.ext_id.indexOf ( 'CUST' ) == -1 )
                protocollsStore.filter ([ {property :'exercise_id', value:record.data.id } ,  {property: 'user_id',value: LanistaTrainer.app.currentCustomer.data.id} ]);
            else
                protocollsStore.filter ([ {property :'user_exercise_id', value: record.data.id} , {property:'user_id', value: LanistaTrainer.app.currentCustomer.data.id} ]);

            protocollsStore.group( 'execution_date_day','DESC');
            protocollsStore.sort( {
                direction: 'DESC',
                property: 'execution_date_day'
            });

            protocollsStore.load (function (records) {
                exercisePanel.down('#exerciseProtocolls').reconfigure(protocollsStore);
                if ( protocolls.data.items.length > 0 ) {
                    exercisePanel.down('#protocollPanel').protocollInformation = protocolls.data.items[0].data;
                    exercisePanel.down('#protocollPanel').data = protocolls.data.items[0].data;
                } else {
                    // USE THE EXERCISE CONFIGURATION
                    console.log ( "USING EXERCISE CONFIGURATION");
                    //console.log ( controller.currentPlanExercise );
                    //exercisePanel.down('#protocollPanel').setRecord ( controller.currentPlanExercise );
                }
           });
        }

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
            record = LanistaTrainer.app.currentCustomer;
            divLogo = '<div class="lansita-header-customer-image-not-found show-info-customer" id="showCustomerDataButton"><div class="lansita-header-customer-logo show-info-customer" id="showCustomerDataButton" style="background-image: url(' + Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/img/p/'+ record.data.id + '_photo.jpg);"></div></div>';
            divInfoCustomer = '<div class="lansita-header-customer-name"> <span class="last-name">' + record.data.last_name + '</span><br> <span class="first-name">' + record.data.first_name +'</span></div>';

        controller.getMainViewport().down("#header").update({
            info: divLogo + divInfoCustomer,
            title: '-' + Ext.ux.LanguageManager.TranslationArray.EXERCISE.toUpperCase()
        });

    },

    onPlanExerciseRecordChanged: function(WeightTrainingValues) {
        var currentPanel = this.getExercisePanel ().down ( '#exercisePanelContent' ).getActiveTab ();
        if ( currentPanel.id == 'protocollsTabPanel' ) {
            currentPanel.down('#protocollPanel').protocollInformation.weight = WeightTrainingValues[0];
            currentPanel.down('#protocollPanel').protocollInformation.training = WeightTrainingValues[1];
            currentPanel.down('#protocollPanel').protocollInformation.training_unit = WeightTrainingValues[2];
            currentPanel.down('#protocollPanel').update(currentPanel.down('#protocollPanel').protocollInformation);
        }
        else if ( currentPanel.id == 'configurationTabPanel' ) {
            planExercise.set ( 'weight_min', planExercise.data.weight );
            planExercise.set ( 'training_min', planExercise.data.training );
            planExercise.save ({
                callback: function( planExercise ) {
                    console.log( 'Planexercise updated' );
                    console.log( planExercise );
                    Lanista.app.fireEvent ( 'sync' , function (){
                        console.log ('SYNCHRONIZATION FINISHED');
                    });
                }
            });
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

    init: function(application) {
        this.control({
            "viewport #closeExercisePanelButton": {
                click: this.onCloseExercisePanelButtonClick
            },
            "exercisePanel #exercisePanelContent": {
                tabchange: this.onTabpanelTabChange
            },
            "viewport #sendProtocollButton": {
                click: this.onsendProtocollButtonClick
            },
            "viewport #changeProtollConfigurationButton": {
                click: this.onchangeProtollConfigurationButtonClick
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
