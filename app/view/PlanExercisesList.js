/*
 * File: app/view/PlanExercisesList.js
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

Ext.define('LanistaTrainer.view.PlanExercisesList', {
    extend: 'Ext.view.View',
    alias: 'widget.planExercisesList',

    requires: [
        'Ext.XTemplate'
    ],

    cls: 'lanista-exercise-planpanel',
    height: 250,
    id: 'planExercisesList',
    width: 400,
    itemCls: 'lanista-plan-exercise',
    itemSelector: 'div',
    selectedItemCls: 'lanista-plan-exercise-selected',
    store: 'PlanExerciseStore',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            itemTpl: [
                '<div class="exercise-list-delete"></div>',
                '<div class="exercise-list-fields">',
                '    <div class="exercise-list-img exercise-list-img-right" style="background-image: url({[(values[\'exercise_ext_id\'] && values[\'exercise_ext_id\'].indexOf (\'CUST\') == -1) ? (\'resources/images/previews/\'+values[\'exercise_ext_id\']) : (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/s/\'+values[\'exercise_ext_id\'])]}_2.jpg);"></div>',
                '    <div class="exercise-list-img exercise-list-img-left" style="background-image: url({[(values[\'exercise_ext_id\'] && values[\'exercise_ext_id\'].indexOf (\'CUST\') == -1) ? (\'resources/images/previews/\'+values[\'exercise_ext_id\']) : (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/s/\'+values[\'exercise_ext_id\'])]}_1.jpg);"></div>',
                '    <div class="exercise-list-imges"></div>',
                '    <div class="lanista-exercices-title">{[values["exercise_name_" + Ext.ux.LanguageManager.lang]]}</div>',
                '    <div class="lanista-exercices-foter">',
                '        <div class="lanista-exercices-weight">{[values["weight_min"] > 0 ? "<span>Kg.</span>"+values["weight_min"] : \'/\']}</div>',
                '        <div class="lanista-exercices-training"><span>{[Ext.ux.LanguageManager.TranslationArray.FORM_PLANEXRCISE_SETS]}</span> {rounds_min} </div>',
                '        <div class="lanista-exercices-sets"><span>{[values["training_unit"] == 2 ? Ext.ux.LanguageManager.TranslationArray.SEC : values["training_unit"] == 1 ? Ext.ux.LanguageManager.TranslationArray.MIN : Ext.ux.LanguageManager.TranslationArray.REP]} {training_min} </span></div>',
                '    </div>',
                '</div>',
                ''
            ],
            listeners: {
                afterrender: {
                    fn: me.onPlanExercisesListAfterRender,
                    scope: me
                },
                viewready: {
                    fn: me.onPlanExercisesListViewReady,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPlanExercisesListAfterRender: function(component, eOpts) {
        el = component.el;

        el.on(
            'click', function(e,t) {
                for (var i = 0; i < el.dom.childNodes.length; i++)
                {
                    el.dom.childNodes[i].internalId = i;
                }
                var internalItemId = Ext.get(t).dom.parentNode.internalId,
                    controller = LanistaTrainer.app.getController ('PlanController'),
                    activeTab = controller.getPlanPanel().down('tabpanel').getActiveTab(),
                    itemRecord = activeTab.recordsArray[internalItemId],
                    Exercise = Ext.ModelManager.getModel('LanistaTrainer.model.ExerciseModel');

                Exercise.load(itemRecord.exercise_id !== 0 ? itemRecord.exercise_id : itemRecord.user_exercise_id, {
                    success: function( exercise ) {
                        LanistaTrainer.app.getController('PlanController').getPlanPanel().addCls ('blured');
                        LanistaTrainer.app.fireEvent('showExercisePanel', exercise, itemRecord);
                    }
                });
            },
            this, {delegate: '.exercise-list-fields'});

        el.on(
            'click', function(e,t) {
                var controller = LanistaTrainer.app.getController ('PlanController'),
                    activeTab = controller.getPlanPanel().down('tabpanel').getActiveTab(),
                    ItemModelData = activeTab.data || activeTab.recordsArray,
                    selectionTab = controller.selectionsTab[activeTab.id.substring(1)];

                for (var i = 0; i < activeTab.el.dom.childNodes.length; i++)
                {
                    activeTab.el.dom.childNodes[i].internalId = i;
                }

                var internalItemId = Ext.get(t).dom.parentNode.internalId,
                     ItemModel = ItemModelData[internalItemId];

                this.deleteItemView(ItemModel);
                selectionTab.splice(internalItemId,1);
                activeTab.recordsArray.splice(internalItemId, 1);
                activeTab.getStore().load(function(records, operation, success) {
                    controller.populateTabsExercisesByDay(records);
                });
            },
            this, {delegate: '.exercise-list-delete'});
        el.on(
            'mouseover', function(e,t) {
                Ext.get(t).removeCls('item-not-clicked');
                Ext.get(t).addCls('item-clicked');
                Ext.get(t).down('.exercise-list-delete').setHTML('u');
                Ext.get(t).addCls('exercise-apply-delete');
            },
            this,{ delegate: '.lanista-plan-exercise'});
        el.on(
            'mouseout', function(e,t) {
                Ext.get(t).removeCls('item-clicked');
                Ext.get(t).addCls('item-not-clicked');
                Ext.get(t).down('.exercise-list-delete').setHTML('');
                Ext.get(t).removeCls('exercise-apply-delete');
            },
            this,{delegate: '.lanista-plan-exercise'});
    },

    onPlanExercisesListViewReady: function(dataview, eOpts) {
        var el = dataview.el,
            controller = LanistaTrainer.app.getController ('PlanController'),
            activeTab = controller.getPlanPanel().down('tabpanel').getActiveTab(),
            selectionTab = controller.selectionsTab[controller.currentDay.id.substring(1)];

        if (activeTab.id === el.id){
            //Looking for items that must be deleted and they are deleted
            for (var j = 0; j < selectionTab.length; j++){
                if (selectionTab[j][3] === 'd'){
                    for (var k = 0; k < dataview.recordsArray.length; k++){
                        if (dataview.recordsArray[k].exercise_id === selectionTab[j][0] || dataview.recordsArray[k].user_exercise_id === selectionTab[j][0])
                            break;
                    }
                    this.deleteItemView(dataview.recordsArray[k]);
                    selectionTab.splice(j,1);
                    activeTab.recordsArray.splice(j, 1);
                    dataview.getStore().load(function(records, operation, success) {
                        controller.populateTabsExercisesByDay(records);
                    });
                }
            }
        }

        for (var i = 0; i < el.dom.childNodes.length; i++)
        {
            el.dom.childNodes[i].internalId = i;
        }
    },

    deleteItemView: function(data) {
        var PlanExercise = Ext.create('LanistaTrainer.model.PlanExercise'),
            userId = localStorage.getItem("user_id");

        PlanExercise.data = data;
        PlanExercise.phantom = false;
        PlanExercise.setProxy(new Ext.data.proxy.Ajax({
            url: Ext.ux.ConfigManager.getRoot() + '/tpmanager/planexercises/json',
            model: 'PlanExercise',
            noCache: false,
            api: {
                create: undefined,
                read: undefined,
                update: undefined,
                destroy: Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + '/tpmanager/planexercises/deleteexercise'
            },
            extraParams: {
                exercise_id: PlanExercise.data.id
            },
            headers: {
                user_id: userId
            }
        }));

        PlanExercise.destroy ({
            action: 'destroy'
        });
    }

});