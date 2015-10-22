/*
 * File: app/view/ExercisesPanel.js
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

Ext.define('LanistaTrainer.view.ExercisesPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.exercisesPanel',

    requires: [
        'LanistaTrainer.view.ExercisesPanelViewModel',
        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.panel.Tool'
    ],

    viewModel: {
        type: 'exercisespanel'
    },
    height: 250,
    id: 'exercisesPanel',
    width: 400,
    frameHeader: false,
    headerPosition: 'bottom',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'dataview',
            cls: 'lanista-view-exercises',
            id: 'viewExercises',
            tpl: [
                '<tpl for=".">',
                '    <div class="lanista-x-exercise">',
                '        <div class="exercise-item">',
                '            <div class="lanista-icon lanista-item-delete"></div>',
                '            <div class="exercise-list-img exercise-list-img-right" style="background-image: url({[(values.ext_id && values.ext_id.indexOf (\'CUST\') == -1) ? (\'resources/images/previews/\'+values.ext_id+\'_1\') : (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/s/\'+values.ext_id+\'_1\')]}.jpg);"></div>',
                '            <div class="exercise-list-img exercise-list-img-left" style="background-image: url({[(values.ext_id && values.ext_id.indexOf (\'CUST\') == -1) ? (\'resources/images/previews/\'+values.ext_id+\'_2\') : (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/s/\'+values.ext_id+\'_2\')]}.jpg);"></div>',
                '            <div class="exercise-list-text">{[values["name_" + Ext.ux.LanguageManager.lang]]}</div>',
                '        </div>',
                '    </div>',
                '</tpl>'
            ],
            itemSelector: 'div.exercise-item',
            listeners: {
                hide: 'onViewExercisesHide',
                afterrender: 'onViewExercisesAfterRender',
                viewready: 'onViewExercisesViewReady',
                itemclick: 'onViewExercisesItemClick'
            }
        }
    ],
    tools: [
        {
            xtype: 'tool',
            id: 'previousExercises',
            type: 'prev'
        },
        {
            xtype: 'tool',
            id: 'nextExercises',
            type: 'next'
        }
    ],

    onViewExercisesHide: function(component, eOpts) {
            component.destroy();
    },

    onViewExercisesAfterRender: function(component, eOpts) {

        var itemRecord,
            el = component.el,
            itemId = [],
            favoritesArray = [],
            user = Ext.ux.SessionManager.getUser();

        el.on(
            'click', function(e,t) {
                if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] === 'FavoritesPanel') return;

                if (((LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] !== 'DashboardPanel') &&
                     (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] !== 'LoginPanel')) &&
                    (user && user.role !== '2'  && LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'ExercisesSelectionView')
                   )
                {
                    itemId = [];
                    itemId[0] = component.getRecord(t).data.id;
                    itemId[1] = component.getRecord(t).data.ext_id;

                    for(var i = 0; i < this.selection.length; i++) {
                        if(this.selection[i][0] === itemId[0]) {
                            break;
                        }
                    }
                    if (i === this.selection.length)
                    {
                        this.selection.push( itemId );
                        Ext.get(t).addCls ( 'lanista-list-item-selected' );
                        //LanistaTrainer.app.getController('ExercisesController').getRightCommandPanel().getComponent('addPlanExercisesButton').show();
                    }
                    else {
                        if (this.selection[i][2] === 1 && !(this.selection[i][3])) {
                            this.selection[i][3] = 'd';
                            //Ext.get(t).removeCls ( 'lanista-list-item-selected' );
                            Ext.get(t).addCls ( 'lanista-list-item-selected' );
                        }
                        else {
                            if (this.selection[i][2] === 1 && this.selection[i][3] === 'd'){
                                this.selection[i][3] = '';
                                //Ext.get(t).addCls ( 'lanista-list-item-selected' );
                                Ext.get(t).removeCls ( 'lanista-list-item-selected' );

                                ////LanistaTrainer.app.getController('ExercisesController').getRightCommandPanel().getComponent('addPlanExercisesButton').show();
                            }
                            else{
                                this.selection.splice(i, 1);
                                Ext.get(t).removeCls ( 'lanista-list-item-selected' );
                            }
                        }
                    }
                }
                else {
                    itemRecord = component.getRecord(t);
                    LanistaTrainer.app.getController('ExercisesController').getExercisesPanel().addCls ('blured');
                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'ExercisePanel';
                    LanistaTrainer.app.fireEvent('showExercisePanel', itemRecord, '');
                }
            },
            this, {delegate: '.exercise-item'});
        el.on(
            'mouseover', function(e,t) {
                                            el.removeCls('item-not-clicked');
                                            el.addCls('item-clicked');
                                       },
            this,{ delegate: '.exercise-item'});
        el.on(
            'mouseout', function(e,t) {

                                            el.removeCls('item-clicked');
                                            el.addCls('item-not-clicked');
                                      },
            this,{delegate: '.exercise-item'});


    },

    onViewExercisesViewReady: function(dataview, eOpts) {

        var records = dataview.store.data.items,
            panel = LanistaTrainer.app.getController ('ExercisesController').getExercisesPanel(),
            favorites,
            favoritesArray = [],
            user = Ext.ux.SessionManager.getUser();

        if ( ((LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] !== 'DashboardPanel') &&
              (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] !== 'LoginPanel') &&
              (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] !== 'ExercisesPanel') &&
              (user && user.role !== '2'  && LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'ExercisesSelectionView'))
           )
        {
            if ( (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] === 'FavoritesPanel')) {
                favorites = LanistaTrainer.app.getController ('FavoritesController').favorites.data.objects;
                favoritesArray = favorites !== "" ? favorites.split(',') : [];

                if (favoritesArray.length > 0 ){
                    for (var i = 0; i < records.length ; i++) {
                        for (var j = 0; j < favoritesArray.length; j++) {
                            if (Number(favoritesArray[j]) === Number(records[i].data.id)) {
                                break;
                            }
                        }

                        if (j !== favoritesArray.length){
                            itemNode = dataview.getNode(records[i]);
                            Ext.get(itemNode).addCls ( 'lanista-list-item-selected' );
                        }
                    }
                }
            }
            else{
                /*
                    for (var i = 0; i < records.length ; i++) {
                        for(var j = 0; j < panel.selection.length; j++) {
                            if(panel.selection[j][0] === records[i].data.id) {
                                break;
                            }
                        }
                        if (j !== panel.selection.length){
                            itemNode = panel.down('#viewExercises').getNode(records[i]);
                            Ext.get(itemNode).addCls ( 'lanista-list-item-selected' );
                        }
                    }
                   */
            }
        }

    },

    onViewExercisesItemClick: function(dataview, record, item, index, e, eOpts) {

        var favorites = "",
            favoritesArray = [],
            pos;

        if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 2] === 'FavoritesPanel'){
            favorites = new String(LanistaTrainer.app.getController('FavoritesController').favorites.data.objects);
            if (favorites.valueOf()){
                if (favorites.indexOf(",") > 0)
                    favoritesArray = favorites.split(",");
                else
                    favoritesArray[0] = favorites.valueOf();
            }

            pos = favoritesArray.indexOf(record.data.id.toString());
            if (pos >= 0){
                Ext.get(item).removeCls ( 'lanista-list-item-selected' );
                favoritesArray.splice(pos,1);
                favorites = "";
                if (favoritesArray.length > 0){
                    favorites = favoritesArray[0];
                    for (var i = 1; i < favoritesArray.length; i++){
                        favorites = favorites + ',' + favoritesArray[i];
                    }
                }
                LanistaTrainer.app.getController('FavoritesController').favorites.data.objects = favorites;
            }
            else{
                Ext.get(item).addCls ( 'lanista-list-item-selected' );
                LanistaTrainer.app.getController('FavoritesController').favorites.data.objects = favorites.valueOf() ? favorites + ',' + record.data.id : record.data.id;
            }
        }

    }

});