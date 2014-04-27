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
                  alert('click en resto...');

            },
            this, {delegate: '.exercise-list-fields'});

        el.on(
            'click', function(e,t) {
                var internalItemId = Ext.get(t).dom.parentNode.internalId,
                    controller = LanistaTrainer.app.getController ('PlanController'),
                    ItemModel = controller.getPlanPanel().down('tabpanel').getActiveTab().data[internalItemId];


        //Crear un modelo con la data de ItemModel e invocar a destroy
        //Se debe refrescar la vista....-> invocar el show de nuevo.....





            },
            this, {delegate: '.exercise-list-delete'});
        el.on(
            'mouseover', function(e,t) {
                el.removeCls('item-not-clicked');
                el.addCls('item-clicked');
                Ext.get(t).down('.exercise-list-delete').setHTML('u');
                Ext.get(t).addCls('exercise-apply-delete');
            },
            this,{ delegate: '.lanista-plan-exercise'});
        el.on(
            'mouseout', function(e,t) {
                el.removeCls('item-clicked');
                el.addCls('item-not-clicked');
                Ext.get(t).down('.exercise-list-delete').setHTML('');
                Ext.get(t).removeCls('exercise-apply-delete');
            },
            this,{delegate: '.lanista-plan-exercise'});
    },

    onPlanExercisesListViewReady: function(dataview, eOpts) {
        var el = dataview.el;

        for (var i = 0; i < el.dom.childNodes.length; i++)
        {
            el.dom.childNodes[i].internalId = i;
        }

    }

});