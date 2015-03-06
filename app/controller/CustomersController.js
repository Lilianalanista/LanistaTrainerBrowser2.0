/*
 * File: app/controller/CustomersController.js
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

Ext.define('LanistaTrainer.controller.CustomersController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.customerscontroller',

    id: 'customersController',

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
            ref: 'CustomersPanel',
            selector: '#customersPanel',
            xtype: 'customersPanel'
        }
    ],

    onShowCustomersPanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomersPanel';
            LanistaTrainer.app.fireEvent('showCustomersPanel');
        });
    },

    onCloseCustomersPanelButtonClick: function(button, e, eOpts) {
        var controller = this,
            customersStore;

        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeCustomersPanel', function() {
            if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'DashboardPanel')
                LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
            else {
                if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'FavoritesPanel'){
                    LanistaTrainer.app.getController('FavoritesController').saveFavorite(function(){
                        LanistaTrainer.app.fireEvent('showFavoritesPanel', LanistaTrainer.app.getController('FavoritesController').favorites, 'CustomersPanel', 'CustomerStore', 'CustomersController');
                    });
                }
                else{
                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'PlanPanel';
                    LanistaTrainer.app.fireEvent('showPlanPanel', LanistaTrainer.app.getController('PlanController').planname);
                }
            }
        });

    },

    onNextCustomers: function(tool, e, eOpts) {
        var store = Ext.getStore("CustomerStore");

        if (store.getTotalCount() >= store.pageSize){
            store.nextPage();
            LanistaTrainer.app.fireEvent('showCustomersHeaderUpdate');
        }
    },

    onPreviousCustomers: function(tool, e, eOpts) {
        if (Ext.getStore("CustomerStore").currentPage > 1)
        {
            var store = Ext.getStore("CustomerStore");
            store.previousPage();
            LanistaTrainer.app.fireEvent('showCustomersHeaderUpdate');
        }
    },

    onNewCustomerButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.fireEvent("promtEmailRequest", "New customer", "Enter the email of your new customer" );
        });
    },

    onRecentCustomersButtonClick: function(button, e, eOpts) {
        this.searchRecently();
    },

    onShowCustomersPanel: function(callback) {
        var controller = this,
            customerPanel	= controller.getCustomersPanel(),
            mainStage	= controller.getMainStage(),
            storeCustomers = Ext.getStore('CustomerStore'),
            viewportXCapacity	= Math.round(mainStage.getEl().getWidth(true)/207),
            viewportCapacity	= Math.floor((mainStage.getEl().getHeight(true)-47)/190) * viewportXCapacity;

        storeCustomers.pageSize = viewportCapacity;
        storeCustomers.clearFilter();
        storeCustomers.loadPage(1);

        mainStage.add( customerPanel );

        customerPanel.on('hide', function(component) {
            component.destroy();
        }, controller);

        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons('closeCustomersPanelButton');
        this.showCommands();

        // *** 2 Show the panel
        customerPanel.show();

        if (Object.getOwnPropertyNames(storeCustomers.getProxy().extraParams)[0])
            this.getRightCommandPanel().down('#recentCustomersButton').addCls('lanista-active');

        LanistaTrainer.app.fireEvent('showCustomersHeaderUpdate');
        LanistaTrainer.app.fireEvent('showStage');

        // *** 4 Callback
        if (callback instanceof Function) callback();

        // *** 5 Load data
        controller.loadData();

    },

    onCloseCustomersPanel: function(callback) {
        var controller = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getCustomersPanel().hide();
            if (callback instanceof Function) callback();
        });
    },

    onShowCustomersHeaderUpdate: function() {
        var controller = this,
            info,
            customersStore,
            numOfCustomers,
            page,
            totalPages;

        if (this.getCustomersPanel() && !this.getCustomersPanel().isHidden()) {
            setTimeout(function()
            {
                customersStore= Ext.getStore('CustomerStore');
                page = customersStore.currentPage;
                numOfCustomers = customersStore.totalCount;
                totalPages = Math.ceil(numOfCustomers/customersStore.pageSize);

                info = '<div class="customer-header">' + numOfCustomers + ' ' + Ext.ux.LanguageManager.TranslationArray.CUSTOMER_LIST.toUpperCase() + '<br><span class="header-subtitle">' + Ext.ux.LanguageManager.TranslationArray.PAGE + ' '+ page +' ' + Ext.ux.LanguageManager.TranslationArray.VON + ' '+totalPages+'</span></div>';
                controller.getMainViewport().down("#header").update({
                   info: info,
                   title: Ext.ux.LanguageManager.TranslationArray.CUSTOMER_LIST.toUpperCase()
                });
            }, 200);
        }
    },

    onPromtEmailRequest: function(title, message) {
        var controller = this;
        Ext.Msg.prompt (title, message, function (response, email) {
            if ( response == 'ok' ) {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (reg.test(email) === false) {
                    LanistaTrainer.app.fireEvent("promtEmailRequest", Ext.ux.LanguageManager.TranslationArray.MSG_EMAIL_INVALID_1, Ext.ux.LanguageManager.TranslationArray.MSG_EMAIL_INVALID_2 );
                } else {
                        var userId = localStorage.getItem("user_id"),
                            customerModel = Ext.create('LanistaTrainer.model.Customer', {
                                email   : email,
                                language: 'EN',
                                birthday: '01/01/1980'
                            });
                        customerModel.setProxy(new Ext.data.proxy.Ajax({
                            url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/user/json',
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
                        customerModel.save({
                            callback: function(record,event,success) {
                                if (success)
                                {
                                    LanistaTrainer.app.currentCustomer = record;
                                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerInfoPanel';
                                    LanistaTrainer.app.fireEvent('showCustomerInfoPanel');
                                }
                                else
                                {
                                    Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1, "Possible problem:  " + Ext.ux.LanguageManager.TranslationArray.MSG_CUST_EXISTS_1, function () {
                                        LanistaTrainer.app.fireEvent('showCustomersPanel');
                                    });
                                }
                            }
                        });
                }
            } else
                LanistaTrainer.app.fireEvent('showCustomersPanel');
        });


    },

    showCommands: function(callback) {

        var controller = this;

        controller.tpl = controller.getCustomersPanel().down('#viewCustomers').tpl;
        controller.itemSelector = controller.getCustomersPanel().down('#viewCustomers').itemSelector;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        //Adding bottoms into RightPanel
        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.SEARCH,
                itemId: 'searchButton',
                menu: controller.showCustomerSearchMenu(),
                menuButtonAlign: 'right',
                glyph: '90@Lanista Icons' //Z
            })
        );

        if ( LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] !== 'FavoritesPanel'){
            this.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.NEW,
                    itemId: 'newCustomerButton',
                    userAlias: 'newCustomerButton',
                    glyph: '107@Lanista Icons' //k
                })
            );

            this.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.FOLDER_CREATE,
                    itemId: 'favoritesCustomersButton',
                    userAlias: 'favoritesCustomersButton',
                    menu: LanistaTrainer.app.getController('FavoritesController').showFavorites(1, 'CustomersPanel', 'CustomerStore', 'CustomersController', 'viewCustomers'),
                    menuButtonAlign: 'right',
                    glyph: '122@Lanista Icons' //z
                })
            );

            this.getRightCommandPanel().add(
                Ext.create('LanistaTrainer.view.LanistaButton', {
                    text: Ext.ux.LanguageManager.TranslationArray.BUTTON_RECENTLY,
                    itemId: 'recentCustomersButton',
                    userAlias: 'recentCustomersButton',
                    glyph: '121@Lanista Icons' //y
                })
            );
        }

    },

    loadData: function() {

    },

    searchRecently: function() {
        var controller = this,
            proxy,
            customersStore= Ext.getStore('CustomerStore'),
            mainStage	= controller.getMainStage(),
            viewportXCapacity	= Math.round(mainStage.getEl().getWidth(true)/207),
            viewportCapacity	= Math.floor((mainStage.getEl().getHeight(true)-47)/190) * viewportXCapacity;

        customersStore.pageSize = viewportCapacity;
        proxy = customersStore.getProxy();
        if (this.getRightCommandPanel().down('#recentCustomersButton').el.dom.classList.contains('lanista-active')){
            this.getRightCommandPanel().down('#recentCustomersButton').removeCls('lanista-active');
            proxy.extraParams = {};
        }
        else{
            this.getRightCommandPanel().down('#recentCustomersButton').addCls('lanista-active');
            proxy.extraParams = {'recently': 'true'};
        }

        customersStore.loadPage(1);
        LanistaTrainer.app.fireEvent('showCustomersHeaderUpdate');

    },

    showCustomerSearchMenu: function() {
        container = this;
        tools = new Ext.menu.Menu(
            {
                Itemid:'exercisesMenu',
                cls:'lanista-button-menu',
                defaults: {
                    height: '50px',
                    width: '220px'
                },
                items:
                [
                    {xtype: 'textfield',
                     itemId: 'searchText',
                     hideLabel: true,
                     hideEmptyLabel: false,
                     name: 'searchText',
                     validateOnChange: false,
                     validateOnBlur: false,
                     enableKeyEvents: true,
                     emptyText: Ext.ux.LanguageManager.TranslationArray.TEXT_SEARCH_UC + '...',
                     listeners: {
                                keydown: {
                                    element: 'el',
                                    fn: function(e, textfield, eOpts){
                                        if (e.keyCode === 27){
                                            if (Ext.ComponentManager.get('recommendatiosContextMenu')){
                                                Ext.ComponentManager.get('recommendatiosContextMenu').removeAll();
                                                Ext.ComponentManager.get('recommendatiosContextMenu').hide();
                                            }
                                            textfield.value = '';
                                            container.getRightCommandPanel().getComponent('searchButton').menu.getComponent('searchText').focus();
                                            //textfield.hide();
                                        }
                                        if (textfield.value.length > 0)
                                            container.searchCustomerByText(textfield.value);
                                        else{
                                                if (Ext.ComponentManager.get('recommendatiosContextMenu')){
                                                    Ext.ComponentManager.get('recommendatiosContextMenu').removeAll();
                                                    Ext.ComponentManager.get('recommendatiosContextMenu').hide();
                                                }
                                                container.getRightCommandPanel().getComponent('searchButton').menu.getComponent('searchText').focus();
                                            }
                                    },
                                    delay:100
                                 },
                                 afterrender: {
                                    element: 'el',
                                    fn: function(textfield, eOpts){
                                        textfield.on('hide', function(component) {
                                            component.destroy();
                                        }, container);
                                    }
                                 }
                             }
                    }
                 ]
            });

        tools.on('beforehide', function(component) {
            return (!Ext.ComponentManager.get('recommendatiosContextMenu'));
        }, container);

        tools.on('hide', function(component) {
            component.getComponent('searchText').setValue('');
        }, container);

        return tools;
    },

    searchCustomerByText: function(value) {
        var controller = this,
            searchList = [],
            searchListId = [],
            infoCustomer = [],
            textToSearch = value,
            customersMenu,
            contextMenu,
            user;

        if (!(textToSearch && textToSearch.length)) return;

        user = Ext.ux.SessionManager.getUser();
        Ext.Ajax.request({
            url: Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + "/tpmanager/user/getusersbyname",
            headers: {user_id: user.id},
            params: {name: value},
            method: 'post',
            failure : function(result, request){
                console.log( "Information could not be processed from server" );
                LanistaTrainer.app.fireEvent( 'showPlanPanel', plan.data.name );
            },
            success: function(response, opts) {
                try {
                    var data = Ext.decode(response.responseText),
                        customerRecord = Ext.ModelManager.getModel('LanistaTrainer.model.Customer');

                    customerRecord.setProxy(new Ext.data.proxy.Ajax({
                        url: Ext.ux.ConfigManager.getRoot() +'/tpmanager/user/getuser',
                        model: 'Customer',
                        noCache: false,
                        reader: {
                            type: 'json',
                            root: 'user'
                        },
                        headers: {
                            user_id: user.id
                        }
                    }));

                    for (var i = 0; i < data.entries.length; i++){
                        searchList.push('<div class="menu-customers-search"><div class="menu-customer-first_name">' +data.entries[i].first_name + '</div>' +
                                        '<div class="menu-customer-last_name">&nbsp;' + data.entries[i].last_name + '</div>' +
                                        '<div class="menu-customer-email">' + data.entries[i].email + '</div></div>');
                        searchList.push('-');
                        searchListId.push(data.entries[i].id);
                        searchListId.push('');
                    }
                    controller.searchList = searchList;
                    controller.searchListId = searchListId;
                    if (searchList.length > 0){
                        customersMenu = controller.getRightCommandPanel().getComponent('searchButton').menu;

                        if (!Ext.ComponentManager.get('recommendatiosContextMenu')){
                            contextMenu = Ext.create('Ext.menu.Menu', {
                                items: searchList,
                                shadow: true,
                                width: 300,
                                //height: (searchList.length * 20) < 200 ? searchList.length * 20 : 200,
                                height: 300,
                                autoscroll: true,
                                cls: 'menu-lanista-button',
                                id: 'recommendatiosContextMenu',
                                tpl: new Ext.Template([
                                    '<tpl for=".">',
                                    '<div >{first_name} </div >',
                                    '<div >{last_name} </div >',
                                    '<div >{email} </div >',
                                    '</tpl>'
                                ])
                            });

                            contextMenu.on('hide', function(component) {
                                //controller.getRightCommandPanel().getComponent('searchButton').menu.getComponent('searchText').setValue('');
                                component.destroy();
                            }, controller);
                            contextMenu.on('click', function(menu, item, e, eOpts) {
                                if (item){
                                    //customerRecord.load(controller.dataCustomers[(controller.searchList.indexOf(item.text)) - 1].id, {
                                    customerRecord.load(controller.searchListId[(controller.searchList.indexOf(item.text))], {
                                        success: function(customer) {
                                            LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                                                LanistaTrainer.app.currentCustomer = customer;
                                                LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomerExercisesPanel';
                                                LanistaTrainer.app.fireEvent('showCustomerExercisesPanel');
                                            });
                                        }
                                    });

                                    contextMenu.hide();
                                    }
                                }, controller);
                                contextMenu.showAt(customersMenu.getX() - contextMenu.width, customersMenu.getY() - (contextMenu.height / 2));
                            }
                            else{
                                contextMenu = Ext.ComponentManager.get('recommendatiosContextMenu');
                                contextMenu.removeAll();
                                contextMenu.add(searchList);
                            }
                                controller.getRightCommandPanel().getComponent('searchButton').menu.getComponent('searchText').focus();

                        }
                        else{  //searchList.length === 0
                            if(Ext.ComponentManager.get('recommendatiosContextMenu'))
                                Ext.ComponentManager.get('recommendatiosContextMenu').hide();
                            controller.getRightCommandPanel().getComponent('searchButton').menu.getComponent('searchText').focus();
                        }
                } catch( err ) {
                    Ext.Msg.alert('Problem', 'Information could not be processed', Ext.emptyFn);
                }
            }
        });





    },

    init: function(application) {
        this.control({
            "viewport #showCustomersPanelButton": {
                click: this.onShowCustomersPanelButtonClick
            },
            "viewport #closeCustomersPanelButton": {
                click: this.onCloseCustomersPanelButtonClick
            },
            "viewport #nextCustomers": {
                click: this.onNextCustomers
            },
            "viewport #previousCustomers": {
                click: this.onPreviousCustomers
            },
            "viewport #newCustomerButton": {
                click: this.onNewCustomerButtonClick
            },
            "viewport #recentCustomersButton": {
                click: this.onRecentCustomersButtonClick
            }
        });

        application.on({
            showCustomersPanel: {
                fn: this.onShowCustomersPanel,
                scope: this
            },
            closeCustomersPanel: {
                fn: this.onCloseCustomersPanel,
                scope: this
            },
            showCustomersHeaderUpdate: {
                fn: this.onShowCustomersHeaderUpdate,
                scope: this
            },
            promtEmailRequest: {
                fn: this.onPromtEmailRequest,
                scope: this
            }
        });
    }

});
