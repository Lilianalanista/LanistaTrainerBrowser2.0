/*
 * File: app/controller/ExerciseController.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
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
            controller.getMainStage().getLayout().getActiveItem().removeCls ('blured');
            controller.getMainStage().getLayout().getActiveItem().controller.showCommands();
            console.log ( controller.getMainStage().getLayout().getActiveItem().controller );
            //controller.getMainStage().getActiveItem().controller.setHeader ();
        });



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
            exercisePanel.down('#exercisePanelContent').setActiveTab(2).show();


            // get user protocolls
         /*   var protocollsStore = Ext.getStore( "ProtocollStore" );
            protocollsStore.clearGrouping();
            protocollsStore.clearFilter();
            if ( record.data.ext_id.indexOf ( 'CUST' ) == -1 )
                protocollsStore.filter ( 'exercise_id', record.data.id );
            else
                protocollsStore.filter ( 'user_exercise_id', record.data.id );
            protocollsStore.load (function (records) {
         */

                exercisePanel.down('#exerciseProtocolls').store = protocolls;
                if ( protocolls.data.items.length > 0 ) {
                    exercisePanel.down('#protocollPanel').data = protocolls.data.items[0];
                    exercisePanel.down('#protocollsTabPanel');
                } else {
                    // USE THE EXERCISE CONFIGURATION
                    console.log ( "USING EXERCISE CONFIGURATION");
                    //console.log ( controller.currentPlanExercise );
                    //exercisePanel.down('#protocollPanel').setRecord ( controller.currentPlanExercise );
                }






           // });
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
            user = Ext.ux.SessionManager.getUser(),
            divLogo = '<div class="lansita-header-customer-image-not-found show-info-customer" id="showPersonalDataButton"><div class="lansita-header-customer-logo show-info-customer" id="showPersonalDataButton" style="background-image: url(' + Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/img/p/'+ localStorage.getItem( "user_id" ) + '_photo.jpg);"></div></div>';
            divInfoCustomer = '<div class="lansita-header-customer-name"> <span class="last-name">' + user.last_name + '</span><br> <span class="first-name">' + user.first_name +'</span></div>';

        controller.getMainViewport().down("#header").update({
            info: divLogo + divInfoCustomer,
            title: '-' + Ext.ux.LanguageManager.TranslationArray.EXERCISE.toUpperCase()
        });


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
            }
        });
    }

});
