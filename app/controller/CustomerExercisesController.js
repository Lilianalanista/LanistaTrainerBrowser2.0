/*
 * File: app/controller/CustomerExercisesController.js
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

Ext.define('LanistaTrainer.controller.CustomerExercisesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.customerExercisesController',

    id: 'customerExercisesController',

    refs: {
        customerExercisesPanel: {
            autoCreate: true,
            selector: 'customerExercisesPanel',
            xtype: 'customerExercisesPanel'
        },
        rightCommandPanel: '#rightCommandPanel',
        leftCommandPanel: '#leftCommandPanel',
        mainViewport: 'mainViewport',
        mainStage: '#mainStage'
    },

    control: {
        "viewport #showCustomerExercisesPanelButton": {
            click: 'onShowCustomerExercisesPanelButtonClick'
        },
        "viewport #closeCustomerExercisesPanelButton": {
            click: 'onCloseCustomerExercisesPanelButtonClick'
        },
        "viewport #newPlanButton": {
            click: 'onNewPlanButtonClick'
        }
    },

    onShowCustomerExercisesPanelButtonClick: function(button, e, eOpts) {

        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerExercisesPanel';
            LanistaTrainer.app.fireEvent('showCustomerExercisesPanel');
        });
    },

    onCloseCustomerExercisesPanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.currentCustomer = null;
        LanistaTrainer.app.fireEvent('closeCustomerExercisesPanel', function() {
            if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'FavoritesPanel' )
                LanistaTrainer.app.fireEvent('show' + 'FavoritesPanel',
                    LanistaTrainer.app.getController('FavoritesController').favorites,
                    LanistaTrainer.app.getController('FavoritesController').favoritesPanelName,
                    LanistaTrainer.app.getController('FavoritesController').favoritesStoreName,
                    LanistaTrainer.app.getController('FavoritesController').favoritesControllerName);
            else
                LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
        });


    },

    onNewPlanButtonClick: function(button, e, eOpts) {
        var controller = this;
        LanistaTrainer.app.fireEvent('closeCustomerExercisesPanel', function() {
            controller.prompPlanNameRequest ( Ext.ux.LanguageManager.TranslationArray.NEW_PLAN_TITLE, Ext.ux.LanguageManager.TranslationArray.NEW_PLAN_MESSAGE );
        });

    },

    onShowCustomerExercisesPanel: function(callback) {
        var controller = this,
            customerExercisesPanel	= controller.getCustomerExercisesPanel(),
            mainStage	= controller.getMainStage(),
            newHeightProtocols = 0,
            user = Ext.ux.SessionManager.getUser(),
            storeVar;

        var measuresStore = Ext.getStore('MeasuresStore'),
            user = Ext.ux.SessionManager.getUser();

        measuresStore.removeFilter('itemsFilter');
        measuresStore.setRemoteFilter( true );

        measuresStore.removeFilter('caliperFilter');
        filterFunction = new Ext.util.Filter({
            id:'measuresFilter',
            property: "user_id", value: user.id
        });

        measuresStore.filters.add (filterFunction);
        measuresStore.proxy.setHeaders({user_role: user.role,
                                        user_id: user.id});

        measuresStore.sort([
            { property: 'record_date',  direction: 'DESC' }
        ]);

        measuresStore.load(function(records, operation, success) {
            var recordsAux;

            if (!success){
                console.log( "There were problems in looking for protocolls, Err number: " + operation.error.status);
                if (operation.error.status === 401 || operation.error.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
                return;
            }


            measuresStore.setRemoteFilter( false );
            measuresStore.removeFilter('itemsFilter');
            filterFunction = new Ext.util.Filter({
                id:'itemsFilter',
                filterFn: function(item){
                    return (item.data.weight !== 0 || item.data.height !== 0 || item.data.futrex !== 0);
                }
            });
            measuresStore.filters.add (filterFunction);

        });


        customerExercisesPanel.workController = controller.getModuleClassName();
        mainStage.add( customerExercisesPanel );

        customerExercisesPanel.on('hide', function(component) {
            component.destroy();
        }, controller);

        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons('closeCustomerExercisesPanelButton');
        this.showCommands();

        // *** 2 Show the panel
        customerExercisesPanel.show();

        //Finding the customer exercises that are from trainers created
        Ext.Ajax.request({
            url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/planexercises/getcustomerexercises',
            method: 'get',
            params: {customer_id: user.id},
            headers: {user_id: user.id},
            failure : function(result, request){
                console.log( "There were problems in looking for getcustomerexercises information, Err number: " + result.status);
                if (result.status === 401 || result.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
            },
            success: function(response, opts) {
                try {
                    data = Ext.decode(response.responseText);
                    storeVar = Ext.getStore('OwnClientExercisesStore');
                    storeVar.removeAll();

                    for (var i = 0; i < data.entries.length; i++){
                        exercise = Ext.create('LanistaTrainer.model.OwnClientExercises', {
                            id: parseInt(data.entries[i].id),
                            addition_id: data.entries[i].addition_id,
                            coatchingnotes_DE: data.entries[i].coatchingnotes_DE,
                            coatchingnotes_EN: data.entries[i].coatchingnotes_EN,
                            coatchingnotes_ES: data.entries[i].coatchingnotes_ES,
                            creation_date: data.entries[i].creation_date,
                            description: data.entries[i].description,
                            exercise_type_id: data.entries[i].exercise_type_id,
                            ext_id: data.entries[i].ext_id,
                            mistakes_DE: data.entries[i].mistakes_DE,
                            mistakes_EN: data.entries[i].mistakes_EN,
                            mistakes_ES: data.entries[i].mistakes_ES,
                            muscle_id: data.entries[i].muscle_id,
                            name_DE: data.entries[i].name_DE,
                            name_EN: data.entries[i].name_EN,
                            name_ES: data.entries[i].name_ES,
                            short_description: data.entries[i].short_description,
                            user_id: data.entries[i].user_id,
                            video: data.entries[i].video
                        });
                        exercise.dirty = true;;
                        storeVar.add(exercise);
                    }

                    // PLANS
                    controller.loadPlans();

                    // PROTOCOLLS
                    controller.loadProtocolls();

                    if (user.role !== '2' ){
                        //Searching for Training's Customer
                        Ext.Ajax.request({
                            url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/fetchcustomertrainers',
                            method: 'get',
                            params: {user_id: user.id},
                            headers: {user_id: user.id},
                            failure : function(result, request){
                                console.log( "There were problems in looking for fetchcustomertrainers information, Err number: " + result.status);
                                if (result.status === 401 || result.status === 403)
                                    LanistaTrainer.app.fireEvent('reconect');
                            },
                            success: function(response, opts) {
                                try {
                                    data = Ext.decode(response.responseText);
                                    controller.infotrainer = data.entries[0];

                                    LanistaTrainer.app.fireEvent('showCustomerExercisesHeaderUpdate');
                                    LanistaTrainer.app.fireEvent('showStage');

                                    // *** 4 Callback
                                    if (callback instanceof Function) callback();

                                    // *** 5 Load data
                                    controller.loadData();
                                }
                                catch( err ) {
                                    Ext.Msg.alert('Problem', 'There were problems in looking for user information', Ext.emptyFn);
                                }
                            }
                        });
                    }
                    else{
                        LanistaTrainer.app.fireEvent('showCustomerExercisesHeaderUpdate');
                        LanistaTrainer.app.fireEvent('showStage');

                        // *** 4 Callback
                        if (callback instanceof Function) callback();

                        // *** 5 Load data
                        controller.loadData();
                    }

                    Ext.getCmp('customerExercisesPanel').down('#customerProtocolls').el.setHeight(Ext.getCmp('customerExercisesPanel').down('#customerProtocolls').el.dom.clientHeight - 20);

                }
                catch( err ) {
                    Ext.Msg.alert('Problem', 'There were problems in looking for customerexercises information', Ext.emptyFn);
                }
            }
        });


    },

    onCloseCustomerExercisesPanel: function(callback) {
        var controller = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getCustomerExercisesPanel().hide();
            if (callback instanceof Function) callback();
        });
    },

    onShowCustomerExercisesHeaderUpdate: function() {
        var controller = this,
            record = LanistaTrainer.app.currentCustomer;
            divLogo = '<div class="lansita-header-customer-image-not-found show-info-customer" id="showCustomerDataButton"><div class="lansita-header-customer-logo show-info-customer" id="showCustomerDataButton" style="background-image: url(' + Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/img/p/'+ record.data.id + '_photo.jpg);"></div></div>';
            divInfoCustomer = '<div class="lansita-header-customer-name"> <span class="last-name">' + record.data.last_name + '</span><br> <span class="first-name">' + record.data.first_name +'</span></div>';






        //divLogo = divLogo + " <div class='lanista-icon'>";
        //divLogo = divLogo + " <div> abcdefghijklmnopqrstuvwxyz ABCDEFGHIJQLMNOPQRSTUVWXYZ </div>";
        //divLogo = divLogo + " </div>";




























        controller.getMainViewport().down("#header").update({
            info: divLogo + divInfoCustomer,
            title: Ext.ux.LanguageManager.TranslationArray.CUSTOMER.toUpperCase()
        });

    },

    showCommands: function(callback) {

        var controller = this,
            user = Ext.ux.SessionManager.getUser();

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        controller.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.NEW_PLAN,
                itemId: 'newPlanButton',
                glyph: '108@Lanista Icons' //l
            })
        );

        controller.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_PROTOCOLL,
                itemId: 'showExercisesPanelButton',
                glyph: '78@Lanista Icons' //N
            })
        );

        controller.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_MEASURES,
                itemId: 'showMeasuresPanelButton',
                glyph: '75@Lanista Icons' //M
            })
        );

        if (user.role === '2' ){
            controller.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.MENU_HISTORY,
                    itemId: 'showAnamnesisButton',
                    glyph: '76@Lanista Icons' //L
                })
            );
        }


    },

    loadData: function() {

    },

    loadProtocolls: function() {
        var controller = this,
            protocollsStore = Ext.getStore( "ProtocollStore" ),
            protocollsPanel = controller.getMainStage().down ( '#customerProtocolls' ),
            currentCustomer = LanistaTrainer.app.currentCustomer,
            TplColums = new Ext.XTemplate(
                '<div class="lansita-header-customer-name">',
                '    <span class="weight"> {weight} Kg / {training} {[values.training_unit == 0 ? Ext.ux.LanguageManager.TranslationArray.REP : values.training_unit == 2 ? Ext.ux.LanguageManager.TranslationArray.MIN : Ext.ux.LanguageManager.TranslationArray.SEC]} </span>',
                '</div>'
            ),
            numRows,
            user = Ext.ux.SessionManager.getUser(),
            myMask;

        var myMask = new Ext.LoadMask({
            msg    : 'Please wait...',
            target : controller.getMainStage().down ( '#customerProtocolls' )
        });

        myMask.show();

        protocollsStore.clearGrouping();
        protocollsStore.clearFilter();

        protocollsStore.getProxy().setHeaders({
            user_id: user.id,
            user_bu: user.bu === 'null' ? 0 : user.bu,
            user_role: user.role
        });

        protocollsStore.sort({
            direction: 'DESC',
            property: 'execution_date_day'
        });

        protocollsStore.group( 'execution_date_day', 'DESC');

        protocollsStore.load(function (records, operation, success) {
            var groups = protocollsStore.getGroups (),
                dailyGrid = null,
                dataGridStore = null,
                gridStore = null,
                gridStoreNew = null,
                groupsFromDate,
                numForSort,
                dataStoreNew = [],
                dataTemp;

            if (!success){
                console.log( "There were problems in looking for protocolls, Err number: " + operation.error.status);
                if (operation.error.status === 401 || operation.error.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
                return;
            }

            for ( var i = 0; i < groups.length && i < 20; i++ ) {
                //for ( var i = 0; i < groups.length; i++ ) {
                dataGridStore = null;
                dataStoreNew = [];
                dataGridStore = groups.items[i].items;
                gridStore = null;
                gridStore = Ext.create('Ext.data.Store', {
                    model: 'LanistaTrainer.model.Protocoll',
                    data:	dataGridStore,
                    groupField: 'exercise_id_forgroup',
                    sorters: [{property: 'execution_date', direction: 'ASC'}]
                });

                groupsFromDate = gridStore.getGroups();
                if (groupsFromDate.length){
                    for ( var j = 0; j < groupsFromDate.length; j++ ) {
                        dataTemp = groupsFromDate.items[j].items;
                        if (dataTemp.length > 1){
                            for ( var k = 0; k < dataTemp.length; k++ ) {
                                dataTemp[k].data.forSortExercise = dataTemp[0].data.forSortExercise;
                                dataStoreNew.push(dataTemp[k]);
                            }
                        }
                        else{
                            dataTemp[0].data.forSortExercise =  dataTemp[0].data.forSortExercise;
                            dataStoreNew.push(dataTemp[0]);
                        }
                    }
                }
                gridStore.setData(dataStoreNew);
                gridStore.setGroupField('forSortExercise');

                dailyGrid =  Ext.create('Ext.grid.Panel', {
                    border: false,
                    store: gridStore,
                    cls: 'lanista-customer-exercise',
                    width: 205,
                    //autoScroll: true,
                    scrollable: 'y',
                    id: 'grid' + i,
                    columns: [
                        {
                            xtype: 'templatecolumn',
                            border: false,
                            draggable: false,
                            tpl: '',
                            cls: 'lanista-grid-customer-exercise-column',
                            width: 180,
                            resizable: false,
                            toFrontOnShow: true,
                            dataIndex: 'string',
                            menuDisabled: true,
                            text: groups.items[i].getGroupKey()
                        }
                    ],
                    viewConfig: {
                        stripeRows: false,
                        getRowClass: function(r) {
                            return 'lanista-grid-row';
                        }
                    },
                    features: [
                        {
                            ftype: 'grouping',
                            groupHeaderTpl: [
                                '<tpl for=".">',
                                '  <input class="lanista-img-protocolls img-right" type="image" src="{[ values["name"].substr(values["name"].indexOf(".") + 1).substr(0,1) === "*" ? Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/s/"+ Ext.getStore("OwnClientExercisesStore").getById(values["name"].substr(values["name"].indexOf(".") + 2)).data.ext_id : Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + Ext.ux.ConfigManager.getAppname() + "/resources/images/previews/" + (values["name"].substr(values["name"].indexOf(".") + 1) === 99999 ? 99999 : Ext.getStore("ExerciseStore").getProxy().getRecord(values["name"].substr(values["name"].indexOf(".") + 1)).ext_id) ]}_2.jpg" >',
                                '  <input class="lanista-img-protocolls img-right" type="image" src="{[ values["name"].substr(values["name"].indexOf(".") + 1).substr(0,1) === "*" ? Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/s/"+ Ext.getStore("OwnClientExercisesStore").getById(values["name"].substr(values["name"].indexOf(".") + 2)).data.ext_id : Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + Ext.ux.ConfigManager.getAppname() + "/resources/images/previews/" + (values["name"].substr(values["name"].indexOf(".") + 1) === 99999 ? 99999 : Ext.getStore("ExerciseStore").getProxy().getRecord(values["name"].substr(values["name"].indexOf(".") + 1)).ext_id) ]}_1.jpg" >',
                                '  <tpl for="children">',
                                '      <p class="lanista-protocolls-weight-p" align="left"><span class="lanista-protocolls-weight {[values.data.creator_id === parseInt(localStorage.getItem ( "user_id" )) ? "lanista-client-blue" : "lanista-trainer-black"]} "> {data.weight} Kg / {data.training} {[values.data.training_unit == 0 ? Ext.ux.LanguageManager.TranslationArray.REP : values.data.training_unit == 2 ? Ext.ux.LanguageManager.TranslationArray.MIN : Ext.ux.LanguageManager.TranslationArray.SEC]} </span></p>',
                                '  </tpl>',
                                '</tpl>'
                            ],
                            collapsible: false
                        }
                    ],
                    listeners: {
                        viewready: function(obj, eOpts) {
                            if (parseInt(obj.id.substr(4)) === 19 || parseInt(obj.id.substr(4)) === groups.length - 1)
                                myMask.hide();
                        },
                        groupclick: function(view, node, group, e, eOpts) {
                            var ExerciseModel,
                                protocolls = null,
                                protocollsData = null,
                                exerciseRecord;

                            /*
                            if (group.substr(group.indexOf(".") + 1).indexOf("*") >= 0)
                                ExerciseModel = LanistaTrainer.model.OwnClientExercises;
                                //Exercise = Ext.create('LanistaTrainer.model.OwnClientExercises');
                            else
                                ExerciseModel = LanistaTrainer.model.ExerciseModel;
                                //Exercise = Ext.create('LanistaTrainer.model.ExerciseModel');

                            */

                            for ( var i = 0; i < view.store.getGroups().length; i++ ) {
                                if (view.store.getGroups().items[i].getGroupKey() === group) {
                                    protocollsData = view.store.getGroups().items[i];
                                    break;
                                }
                            }
                            protocolls = Ext.create('Ext.data.Store', {
                                model: 'LanistaTrainer.model.Protocoll',
                                data : protocollsData.items
                            });

                            if (group.substr(group.indexOf(".") + 1).indexOf("*") >= 0){
                                exerciseRecord = Ext.getStore("OwnClientExercisesStore").getById(group.substr(group.indexOf(".") + 2));
                                //else
                                //    exerciseRecord = Ext.getStore("ExerciseStore").getById(group.substr(group.indexOf(".") + 1));

                                controller.getMainStage().getLayout().getActiveItem().addCls ('blured');
                                LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'ExercisePanel';
                                LanistaTrainer.app.fireEvent('showExercisePanel', exerciseRecord, protocolls);
                            }
                            else{
                                LanistaTrainer.model.ExerciseModel.load(group.substr(group.indexOf(".") + 1), {


                                    //ExerciseModel.load(group.substr(group.indexOf(".") + 1).indexOf("*") >= 0 ?
                                    //                                        group.substr(group.indexOf(".") + 2) :
                                    //                                        group.substr(group.indexOf(".") + 1), {
                                    //Exercise.load(group, {
                                    callback: function(exercise, operation, success) {
                                        //success: function( exercise ) {
                                        if (success){
                                            controller.getMainStage().getLayout().getActiveItem().addCls ('blured');
                                            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'ExercisePanel';
                                            LanistaTrainer.app.fireEvent('showExercisePanel', exercise, protocolls);
                                        }
                                        else{
                                            console.log( "There were problems in looking for protocolls II, Err number: " + operation.error.status);
                                            if (operation.error.status === 401 || operation.error.status === 403)
                                                LanistaTrainer.app.fireEvent('reconect');
                                            return;
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
                protocollsPanel.insert ( i, dailyGrid );
            }

            if (groups.length === 0){
                myMask.hide();
                protocollsPanel.setHtml('<div class="lanista-no-protocolls">' + Ext.ux.LanguageManager.TranslationArray.LIST_PROTOCOLLS_EMPTYTEXT + '</div>');
            }
        });

    },

    setHeader: function() {
        LanistaTrainer.app.fireEvent('showCustomerExercisesHeaderUpdate');
    },

    prompPlanNameRequest: function(title, message) {
        Ext.Msg.prompt (
            title,
            message,
            function (response, templatename) {
                if ( response == 'ok' ) {
                    LanistaTrainer.app.fireEvent( 'createPlan', templatename );
                } else {
                    LanistaTrainer.app.fireEvent( 'showCustomerExercisesPanel' );
                }
            },
            null,
            false,
            Ext.ux.LanguageManager.TranslationArray.PLAN_NAME_DEFAULT,
            {
                autoCapitalize: true,
                placeHolder: Ext.ux.LanguageManager.TranslationArray.PLAN_NAME_DEFAULT,
                clearicon: true
            }
        );
    },

    loadPlans: function(customerId) {
        var store = Ext.getStore('PlanStore'),
            currentCustomer = LanistaTrainer.app.currentCustomer,
            user = Ext.ux.SessionManager.getUser(),
            filterProperty;

        filterProperty = user.role === '2' ? 'customer_id' : 'person_id';

        store.clearGrouping();
        store.clearFilter();
        store.filter ({property: filterProperty, value: currentCustomer.data.id});
        store.sort( {
            direction: 'DESC',
            property: 'creation_date'
        });
        store.load();











    },

    findTrainersExercises: function() {
        user = Ext.ux.SessionManager.getUser();

        Ext.Ajax.request({
            url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/planexercises/getcustomerexercises',
            method: 'get',
            params: {customer_id: user.id},
            headers: {user_id: user.id},
            failure : function(result, request){
                console.log( "There were problems in looking for getcustomerexercises information, Err number: " + result.status);
                if (result.status === 401 || result.status === 403)
                    LanistaTrainer.app.fireEvent('reconect');
            },
            success: function(response, opts) {
                try {
                    data = Ext.decode(response.responseText);
                    storeVar = Ext.getStore('OwnClientExercisesStore');
                    storeVar.removeAll();

                        for (var i = 0; i < data.entries.length; i++){
                            exercise = Ext.create('LanistaTrainer.model.OwnClientExercisesModel', {
                                id: parseInt(data.entries[i].id),
                                addition_id: data.entries[i].addition_id,
                                coatchingnotes_DE: data.entries[i].coatchingnotes_DE,
                                coatchingnotes_EN: data.entries[i].coatchingnotes_EN,
                                coatchingnotes_ES: data.entries[i].coatchingnotes_ES,
                                creation_date: data.entries[i].creation_date,
                                description: data.entries[i].description,
                                exercise_type_id: data.entries[i].exercise_type_id,
                                ext_id: data.entries[i].ext_id,
                                mistakes_DE: data.entries[i].mistakes_DE,
                                mistakes_EN: data.entries[i].mistakes_EN,
                                mistakes_ES: data.entries[i].mistakes_ES,
                                muscle_id: data.entries[i].muscle_id,
                                name_DE: data.entries[i].name_DE,
                                name_EN: data.entries[i].name_EN,
                                name_ES: data.entries[i].name_ES,
                                short_description: data.entries[i].short_description,
                                user_id: data.entries[i].user_id,
                                video: data.entries[i].video
                            });
                            exercise.setDirty();
                            storeVar.add(exercise);
                        }

                        storeVar.sync();
                }
                catch( err ) {
                    Ext.Msg.alert('Problem', 'There were problems in looking for customerexercises information', Ext.emptyFn);
                }
            }
        });


    },

    init: function(application) {
        application.on({
            showCustomerExercisesPanel: {
                fn: this.onShowCustomerExercisesPanel,
                scope: this
            },
            closeCustomerExercisesPanel: {
                fn: this.onCloseCustomerExercisesPanel,
                scope: this
            },
            showCustomerExercisesHeaderUpdate: {
                fn: this.onShowCustomerExercisesHeaderUpdate,
                scope: this
            }
        });
    }

});
