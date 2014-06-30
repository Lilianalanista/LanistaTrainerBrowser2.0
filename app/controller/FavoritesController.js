/*
 * File: app/controller/FavoritesController.js
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

Ext.define('LanistaTrainer.controller.FavoritesController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.favoritesController',

    id: 'favoritesController',

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
            ref: 'favoritesPanel',
            selector: '#favoritesPanel',
            xtype: 'favoritesPanel'
        }
    ],

    onCloseFavoritesPanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeFavoritesPanel', function() {
            LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
        });

    },

    onRemoveCustomerFavoritesButtonClick: function(button, e, eOpts) {
        var controller = this,
            favoritesStore;

        Ext.Msg.confirm(Ext.ux.LanguageManager.TranslationArray.BUTTON_REMOVE_FROM_FAVORITE.toUpperCase(), Ext.ux.LanguageManager.TranslationArray.MSG_FAVORITES_REMOVE_CUSTOMER, function(button) {
            if (button == 'yes') {
                controller.deleteFavorites();
                controller.favoritesToDelete = '';
                favoritesStoreName = controller.favoritesStoreName;
                LanistaTrainer.app.getController('FavoritesController').getRightCommandPanel().getComponent('removeCustomerFavoritesButton').hide();
                Ext.getStore(favoritesStoreName).load();
            }
        });

    },

    onPromtNewFavorite: function(title, message, favoriteRecord, type, panel, store) {
        var controller = this,
            userId = localStorage.getItem("user_id"),
            favoriteModel;

        Ext.Msg.prompt (title, message, function (response, favoriteName) {
            if ( response == 'ok' ) {
                if (favoriteRecord){
                    favoriteModel = Ext.create('LanistaTrainer.model.Favorites');
                    favoriteModel.data = favoriteRecord.data;
                    favoriteModel.data.name = favoriteName;
                }
                else{
                    favoriteModel = Ext.create('LanistaTrainer.model.Favorites', {
                        name   : favoriteName,
                        change_date: Date.now(),
                        type: type,
                        creator_id: userId
                    });
                }
                favoriteModel.setProxy(new Ext.data.proxy.Ajax({
                    url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/favorites/json',
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
                favoriteModel.save({
                    callback: function(record,event,success) {
                        if (success)
                        {
                            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'FavoritesPanel';
                            LanistaTrainer.app.fireEvent('showFavoritesPanel', record, panel, store);
                        }
                        else
                        {
                            Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_DATA_NOT_SAVED_1, Ext.ux.LanguageManager.TranslationArray.MSG_INVITATION_CONFIRMATION_ERROR_1, function () {
                                LanistaTrainer.app.fireEvent('showCustomersPanel');
                            });
                        }
                    }
                });
            } else
                LanistaTrainer.app.fireEvent('showCustomersPanel');
        });


    },

    onShowFavoritesPanel: function(favoriteRecord, panel, store, callback) {
        var controller = this,
            favoritesPanel	= controller.getFavoritesPanel(),
            mainStage	= controller.getMainStage(),
            storeCustomers = Ext.getStore(store),
            filterFunction,
            favoritesIds = [];

        mainStage.add( favoritesPanel );
        controller.favorites = favoriteRecord;
        controller.favoritesStoreName = store;

        filterFunction = new Ext.util.Filter({
            filterFn: function(item){
                favoritesIds = favoriteRecord.data.objects ? favoriteRecord.data.objects.split(',') : '';
                for ( var i = 0; i < favoritesIds.length; i++ ){
                    if (Number(item.data.id) === Number(favoritesIds[i]))
                        return true;
                }
            }
        });
        storeCustomers.filters.add(filterFunction);
        storeCustomers.load();

        favoritesPanel.on('hide', function(component) {
            component.destroy();
        }, controller);

        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons('closeFavoritesPanelButton');
        this.showCommands(panel, store);

        // *** 2 Show the panel
        controller.getMainViewport().down("#header").addCls('lanista-header-color-favorites');
        LanistaTrainer.app.fireEvent('showFavoritesHeaderUpdate', favoriteRecord.data.name);
        LanistaTrainer.app.fireEvent('showStage');

        // *** 4 Callback
        if (callback instanceof Function) callback();

        // *** 5 Load data
        controller.loadData();
    },

    onCloseFavoritesPanel: function(callback) {
        var controller = this;
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });

            controller.favoritesToDelete = '';
            controller.getMainViewport().down("#header").removeCls('lanista-header-color-favorites');
            controller.getFavoritesPanel().hide();
            if (callback instanceof Function) callback();
        });
    },

    onShowFavoritesHeaderUpdate: function(favoriteName) {
        var controller = this;

        controller.getMainViewport().down("#header").update({
            info: '',
            title: Ext.ux.LanguageManager.TranslationArray.BUTTON_FAVORITES.toUpperCase() + ' - ' + favoriteName
        });


    },

    showCommands: function(panel, store) {

        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.FOLDER_CHANGE,
                itemId: 'showAddCustomersButton',
                menu: controller.menuFavorites(panel, store),
                menuButtonAlign: 'right',
                glyph: '108@Lanista Icons' //l
            })
        );

        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_REMOVE_FROM_FAVORITE,
                itemId: 'removeCustomerFavoritesButton',
                cls: [
                    'lanista-command-button',
                    'lanista-command-button-red'
                ],
                hidden: true,
                glyph: '117@Lanista Icons' //u
            })
        );



    },

    loadData: function() {

    },

    filterCustomers: function() {


        var filterFunction = new Ext.util.Filter({
                id: 'machine',
                filterFn: function(item){
                    if (Ext.isEmpty(this.serchValue)) return true;
                    for (var i = 0; i < item.data.addition.length; i++) {
                        if (item.data.addition[i] ==  this.serchValue)
                            return true;
                    }
                    return false;
                }
            });

            store.filters.insert(2,filterFunction);
    },

    menuFavorites: function(panel, store, callback) {
        var controller = this,
            menu = new Ext.menu.Menu(
            {
                Itemid:'favoritesMenu',
                defaults: {
                    height: '50px',
                    width: '220px'
                },
                items:
                [
                    {text: '<span class="lanista-icon">l&nbsp</span>' + Ext.ux.LanguageManager.TranslationArray.BUTTON_ADD_TO_FAVORITE.toUpperCase(),
                     handler: function () {
                         LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                             LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = panel;
                             LanistaTrainer.app.fireEvent('show' + panel, this.favorites);
                         });
                     }
                    },
                    {text: '<span class="lanista-icon">I&nbsp</span>' + Ext.ux.LanguageManager.TranslationArray.FOLDER_CHANGE_NAME.toUpperCase(),
                     handler: function () {
                        controller.changeFavoriteName(panel, store);
                     }
                    },
                    {text: '<span class="lanista-icon">u&nbsp</span>' + Ext.ux.LanguageManager.TranslationArray.FOLDER_REMOVE.toUpperCase(),
                     handler: function () {
                        controller.deleteFavoriteFolder();
                     }
                    }
                ]
            }
        );

        return menu;
    },

    saveFavorite: function(callback) {
        var controller = this,
            userId = localStorage.getItem("user_id"),
            favoritesModel;

        favoritesModel = Ext.create('LanistaTrainer.model.Favorites');
        controller.favorites.data.change_date = Date();
        favoritesModel.data = controller.favorites.data;

        favoritesModel.setProxy(new Ext.data.proxy.Ajax({
            url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/favorites/json',
            model: 'Favorites',
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

        favoritesModel.save ({
            callback: function( item, operation, success ) {
                if (callback instanceof Function) callback();
            }
        });




    },

    deleteFavorites: function() {
        var controller = this,
            favoritesToDelete,
            favoritesToDeleteArray = [],
            favorites,
            favoritesArray = [],
            index;

        favoritesToDelete = new String(controller.favoritesToDelete);
        if (favoritesToDelete.valueOf()){
            if (favoritesToDelete.indexOf(",") > 0)
                favoritesToDeleteArray = favoritesToDelete.split(",");
            else
                favoritesToDeleteArray[0] = favoritesToDelete.valueOf();

            favorites = new String(controller.favorites.data.objects);
            if (favorites.valueOf()){
                if (favorites.indexOf(",") > 0)
                    favoritesArray = favorites.split(",");
                else
                    favoritesArray[0] = favorites.valueOf();
            }

            for (var i = 0; i < favoritesToDeleteArray.length; i++) {
                for ( var j = 0; j < favoritesArray.length; j++){
                    index = favoritesArray.indexOf(favoritesToDeleteArray[j]);
                    if (index >= 0){
                        favoritesArray.splice(index, 1);
                        break;
                    }
                }
            }

            favorites = favoritesArray[0] ? favoritesArray[0] : '';
            for (i = 1; i < favoritesArray.length; i++){
                favorites = favorites + ',' + favoritesArray[i];
            }

            controller.favorites.data.objects = favorites;
            controller.saveFavorite();
        }








    },

    changeFavoriteName: function(panel, store) {
        var controller = this,
            title = Ext.ux.LanguageManager.TranslationArray.MSG_CHANGE_FAVORIT_NAME_1;
            msg = Ext.ux.LanguageManager.TranslationArray.MSG_CHANGE_FAVORIT_NAME_2;

        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
            LanistaTrainer.app.fireEvent("promtNewFavorite", title, msg, controller.favorites, '', panel, store);
        });
    },

    deleteFavoriteFolder: function() {
        var controller = this,
            favoriteModel,
            userId,
            favoriteProxy;

        Ext.Msg.confirm(Ext.ux.LanguageManager.TranslationArray.MSG_DELETE_FAVORIT_NAME_1.toUpperCase(), Ext.ux.LanguageManager.TranslationArray.MSG_DELETE_FAVORIT_NAME_2, function(button) {
            if (button == 'yes') {
                favoriteModel = Ext.create('LanistaTrainer.model.Favorites');
                userId = localStorage.getItem("user_id");

                favoriteModel.data = controller.favorites.data;
                favoriteModel.phantom = false;
                favoriteModel.setProxy(new Ext.data.proxy.Ajax({
                    url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/favorites/json',
                    model: 'Favorites',
                    noCache: false,
                    api: {
                        create: undefined,
                        read: undefined,
                        update: undefined,
                        destroy: Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/favorites/delete'
                    },
                    extraParams: {
                        id: favoriteModel.data.id
                    },
                    headers: {
                        user_id: userId
                    }
                }));

                favoriteModel.destroy ({
                    action: 'destroy'
                });

                LanistaTrainer.app.getController('FavoritesController').getLeftCommandPanel().getComponent('closeFavoritesPanelButton').fireEvent('click');
            }
        });

    },

    showFavorites: function(filterType, panel, store) {
        var container = this,
            favoritesStore = Ext.getStore('FavoritesStore'),
            favoriteName,
            menu = new Ext.menu.Menu(
                {
                    Itemid:'favoritesMenu',
                    defaults: {
                        height: '50px',
                        width: '220px'
                    },
                    items:
                    [
                        {text: '<span class="lanista-icon">I&nbsp</span>' + Ext.ux.LanguageManager.TranslationArray.CREATE_FAVORIT,
                         handler: function () {
                                     LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                                             LanistaTrainer.app.fireEvent("promtNewFavorite", Ext.ux.LanguageManager.TranslationArray.MSG_FAVORIT_NAME_1, Ext.ux.LanguageManager.TranslationArray.MSG_FAVORIT_NAME_2, '', filterType, panel, store);
                                     });
                                  }
                        }
                    ]
                }
            );

        favoritesStore.getProxy().url = Ext.ux.ConfigManager.getRoot() + '/tpmanager/favorites/json';
        favoritesStore.filter ({property: 'type', value: Number(filterType)});
        favoritesStore.load({
            callback: function(records, operation, success) {
                for (var i = 0; i<records.length; i++){
                    favoriteName = records[i].data.name;
                    menu.add([
                        {
                            text: records[i].data.name,
                            handler: function () {
                                favoriteName = this.text;
                                favoriteRecord = this.record;
                                LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'FavoritesPanel';
                                    LanistaTrainer.app.fireEvent('showFavoritesPanel', favoriteRecord, panel, store);
                                });
                            },
                            record: records[i]
                        }
                    ]);
                }
            }
        });
        favoritesStore.clearFilter();
        return menu;


    },

    init: function(application) {
        this.control({
            "viewport #closeFavoritesPanelButton": {
                click: this.onCloseFavoritesPanelButtonClick
            },
            "viewport #removeCustomerFavoritesButton": {
                click: this.onRemoveCustomerFavoritesButtonClick
            }
        });

        application.on({
            promtNewFavorite: {
                fn: this.onPromtNewFavorite,
                scope: this
            },
            showFavoritesPanel: {
                fn: this.onShowFavoritesPanel,
                scope: this
            },
            closeFavoritesPanel: {
                fn: this.onCloseFavoritesPanel,
                scope: this
            },
            showFavoritesHeaderUpdate: {
                fn: this.onShowFavoritesHeaderUpdate,
                scope: this
            }
        });
    }

});
