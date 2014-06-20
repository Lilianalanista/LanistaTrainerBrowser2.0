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

    onPromtNewFavorite: function(title, message) {
        var controller = this;
        Ext.Msg.prompt (title, message, function (response, favoriteName) {
            if ( response == 'ok' ) {
                var userId = localStorage.getItem("user_id"),
                    favoriteModel = Ext.create('LanistaTrainer.model.Favorites', {
                        name   : favoriteName,
                        change_date: Date.now(),
                        type: 1,
                        creator_id: userId
                    });
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
                            LanistaTrainer.app.fireEvent('showFavoritesPanel', record);
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

    onShowFavoritesPanel: function(favoriteRecord, callback) {
        var controller = this,
            favoritesPanel	= controller.getFavoritesPanel(),
            mainStage	= controller.getMainStage();

        mainStage.add( favoritesPanel );

        favoritesPanel.on('hide', function(component) {
            component.destroy();
        }, controller);

        // **** 1 create the commands
        LanistaTrainer.app.setStandardButtons('closeFavoritesPanelButton');
        this.showCommands();

        // *** 2 Show the panel
        controller.getMainViewport().down("#header").addCls('lanista-header-color-favorites');
        LanistaTrainer.app.fireEvent('showFavoritesHeaderUpdate', favoriteRecord.name);
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

    showCommands: function(callback) {

        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });

        this.getRightCommandPanel().add(
            Ext.create('LanistaTrainer.view.LanistaButton', {
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_ADD_TO_FAVORITE,
                itemId: 'showAddCustomersButton',
                menu: controller.menuFavorites(),
                menuButtonAlign: 'right',
                glyph: '108@Lanista Icons' //l
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

    menuFavorites: function() {
        var menu = new Ext.menu.Menu(
            {
                Itemid:'favoritesMenu',
                defaults: {
                    height: '50px',
                    width: '220px'
                },
                items:
                [
                    {text: '<span class="lanista-icon">L&nbsp</span>' + Ext.ux.LanguageManager.TranslationArray.BUTTON_ADD_TO_FAVORITE,
                     handler: function () {

                         console.log('Paneles.....');
                         console.log(LanistaTrainer.app.panels);



                         LanistaTrainer.app.fireEvent('close' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1], function() {
                             LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'CustomersPanel';
                             LanistaTrainer.app.fireEvent('showCustomersPanel', favoriteRecord);
                         });
                     }
                    },
                    {text: '<span class="lanista-icon">H&nbsp</span>' + Ext.ux.LanguageManager.TranslationArray.BUTTON_REMOVE_FROM_FAVORITE,
                     handler: function () {

                     }
                    },
                    {text: '<span class="lanista-icon">I&nbsp</span>' + Ext.ux.LanguageManager.TranslationArray.BUTTON_CHANGE_FAVORITE_NAME,
                     handler: function () {

                     }
                    },
                    {text: '<span class="lanista-icon">u&nbsp</span>' + Ext.ux.LanguageManager.TranslationArray.BUTTON_REMOVE_VAFORITE,
                     handler: function () {

                     }
                    }
                ]
            }
        );

        return menu;
    },

    init: function(application) {
        this.control({
            "viewport #closeFavoritesPanelButton": {
                click: this.onCloseFavoritesPanelButtonClick
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
