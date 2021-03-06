/*
 * File: app/view/PlanExercisesList.js
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

Ext.define('LanistaTrainer.view.PlanExercisesList', {
    extend: 'Ext.view.View',
    alias: 'widget.planExercisesList',

    requires: [
        'LanistaTrainer.view.PlanExercisesListViewModel',
        'Ext.XTemplate'
    ],

    viewModel: {
        type: 'planExercisesList'
    },
    cls: 'lanista-exercise-planpanel',
    height: 250,
    id: 'planExercisesList',
    scrollable: true,
    width: 400,
    itemCls: 'lanista-plan-exercise',
    itemSelector: 'div.exercise-list-fields',
    itemTpl: [
        '<div class="exercise-list-delete"></div>',
        '<div class="exercise-list-fields">',
        '    <div class="exercise-list-img exercise-list-img-right" style="background-image: url({[(values[\'exercise_ext_id\'] && values[\'exercise_ext_id\'].indexOf (\'CUST\') == -1) ? (\'resources/images/previews/\'+values[\'exercise_ext_id\']) : (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/s/\'+values[\'exercise_ext_id\'])]}_1.jpg);"></div>',
        '    <div class="exercise-list-img exercise-list-img-left" style="background-image: url({[(values[\'exercise_ext_id\'] && values[\'exercise_ext_id\'].indexOf (\'CUST\') == -1) ? (\'resources/images/previews/\'+values[\'exercise_ext_id\']) : (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/s/\'+values[\'exercise_ext_id\'])]}_2.jpg);"></div>',
        '    <div class="exercise-list-imges"></div>',
        '    <div class="lanista-exercices-title">{[values["exercise_name_" + Ext.ux.LanguageManager.lang]]}</div>',
        '    <div class="lanista-exercices-foter">',
        '        <div class="lanista-exercices-weight">{[values["weight_min"] > 0 ? "<span>Kg &nbsp;</span>"+values["weight_min"] : \'\']}</div>',
        '        <div class="lanista-exercices-training"><span>{[Ext.ux.LanguageManager.TranslationArray.FORM_PLANEXRCISE_SETS]}</span> {rounds_min} </div>',
        '        <div class="lanista-exercices-sets"><span>{[values["training_unit"] == 2 ? Ext.ux.LanguageManager.TranslationArray.MIN : values["training_unit"] == 1 ? Ext.ux.LanguageManager.TranslationArray.SEC : Ext.ux.LanguageManager.TranslationArray.REP]} {training_min} </span></div>',
        '    </div>',
        '</div>'
    ],
    selectedItemCls: 'lanista-plan-exercise-selected',
    store: 'PlanExerciseStore',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPlanExercisesListAfterRender',
        viewready: 'onPlanExercisesListViewReady'
    },

    onPlanExercisesListAfterRender: function(component, eOpts) {
        var el = component.el,
            ini = 4000;

        el.on(
            'click', function(e,t) {
                var controller = LanistaTrainer.app.getController ('PlanController'),
                    activeTab = controller.getPlanPanel().down('tabpanel').getActiveTab(),
                    itemRc;

                for (var i = 0; i < activeTab.el.dom.childNodes.length; i++)
                {
                    activeTab.el.dom.childNodes[i].internalId = i;
                }

                var internalItemId = Ext.get(t).dom.parentNode.internalId,
                    itemRecord = activeTab.recordsArray[internalItemId];

                itemRecord.internalId = internalItemId;

                if (itemRecord.exercise_ext_id.indexOf('CUST') >= 0){
                    itemRc = itemRecord.exercise_ext_id;
                    exerciseRecord = Ext.getStore("OwnClientExercisesStore").getById(itemRc.substr(itemRc.indexOf('_', 5) + 1));
                    controller.getMainStage().getLayout().getActiveItem().addCls ('blured');
                    LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'ExercisePanel';
                    LanistaTrainer.app.fireEvent('showExercisePanel', exerciseRecord, itemRecord);
                }
                else{
                    LanistaTrainer.model.ExerciseModel.load(itemRecord.exercise_id !== 0 ? itemRecord.exercise_id : parseInt(itemRecord.user_exercise_id) + ini, {
                        failure: function(record, operation) {
                            console.log( "There were problems in looking for exercise info, Err number: " + operation.error.status);
                            if (operation.error.status === 401 || operation.error.status === 403)
                                LanistaTrainer.app.fireEvent('reconect');
                        },
                        success: function( exercise ) {
                            LanistaTrainer.app.getController('PlanController').getPlanPanel().addCls ('blured');
                            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length] = 'ExercisePanel';
                            LanistaTrainer.app.fireEvent('showExercisePanel', exercise, itemRecord);
                        }
                    });
                }
            },
            this, {delegate: '.exercise-list-fields'});

        el.on(
            'click', function(e,t) {
                var controller = LanistaTrainer.app.getController ('PlanController'),
                    activeTab = controller.getPlanPanel().down('tabpanel').getActiveTab(),
                    itemRecord, internalItemId,
                    record1, record2, store;

                for (var i = 0; i < activeTab.el.dom.childNodes.length; i++){
                    activeTab.el.dom.childNodes[i].internalId = i;
                }
                if (e.event.target.className === 'lanista-header-item-exercise-delete'){
                    internalItemId = Ext.get(t).dom.parentNode.internalId;
                    this.markDeleteExercises(t, internalItemId);
                }
                if (e.event.target.className === 'lanista-header-item-exercise-left'){
                    store = controller.plan.planexercises();

                    internalItemId = Ext.get(t).dom.parentNode.internalId;
                    record1 = store.data.items[internalItemId];
                    internalItemId = Ext.get(t).dom.parentNode.previousElementSibling.internalId;
                    record2 = store.data.items[internalItemId];

                    controller.fnMoveExercise(record2, record1);
                }
                if (e.event.target.className === 'lanista-header-item-exercise-right'){
                    store = controller.plan.planexercises();

                    internalItemId = Ext.get(t).dom.parentNode.internalId;
                    record1 = store.data.items[internalItemId];
                    internalItemId = Ext.get(t).dom.parentNode.nextElementSibling.internalId;
                    record2 = store.data.items[internalItemId];

                    controller.fnMoveExercise(record1, record2);
                }
            },
            this, {delegate: '.exercise-list-delete'});

        el.on(
            'mouseover', function(e,t) {
                //.....
            },
            this,{delegate: '.exercise-list-delete'});


        el.on(
            'mouseout', function(e,t) {
                var controller = LanistaTrainer.app.getController ('PlanController');

                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/item-clicked/gi,'');
                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className + ' item-not-clicked';

                if (parseInt(controller.plan.data.creator_id) === controller.plan.data.person_id){
                    Ext.get(t).setHtml('');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                }
            },
            this,{delegate: '.exercise-list-delete'});

        el.on(
            'mouseover', function(e,t) {
                var controller = LanistaTrainer.app.getController ('PlanController');

                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/item-not-clicked/gi,'');
                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className + ' item-clicked';

                if (parseInt(controller.plan.data.creator_id) === controller.plan.data.person_id){
                    if (!Ext.get(t).up('.lanista-plan-exercise').dom.previousElementSibling && Ext.get(t).up('.lanista-plan-exercise').dom.nextElementSibling)
                        Ext.get(t).up('.lanista-plan-exercise').down('.exercise-list-delete').setHtml('<span> <span class="lanista-header-item-exercise-left"> &nbsp; </span> <span class="lanista-header-item-exercise-delete">u</span> <span class="lanista-header-item-exercise-right">c</span> </span>');

                    if (!Ext.get(t).up('.lanista-plan-exercise').dom.nextElementSibling && Ext.get(t).up('.lanista-plan-exercise').dom.previousElementSibling)
                        Ext.get(t).up('.lanista-plan-exercise').down('.exercise-list-delete').setHtml('<span> <span class="lanista-header-item-exercise-left">b</span> <span class="lanista-header-item-exercise-delete">u</span> <span class="lanista-header-item-exercise-right">&nbsp;</span> </span>');

                    if (!Ext.get(t).up('.lanista-plan-exercise').dom.previousElementSibling && !Ext.get(t).up('.lanista-plan-exercise').dom.nextElementSibling)
                        Ext.get(t).up('.lanista-plan-exercise').down('.exercise-list-delete').setHtml('<span> <span class="lanista-header-item-exercise-left"> &nbsp; </span> <span class="lanista-header-item-exercise-delete">u</span> <span class="lanista-header-item-exercise-right"> &nbsp; </span> </span>');

                    if (Ext.get(t).up('.lanista-plan-exercise').dom.previousElementSibling && Ext.get(t).up('.lanista-plan-exercise').dom.nextElementSibling)
                        Ext.get(t).up('.lanista-plan-exercise').down('.exercise-list-delete').setHtml('<span> <span class="lanista-header-item-exercise-left">b</span> <span class="lanista-header-item-exercise-delete">u</span> <span class="lanista-header-item-exercise-right">c</span> </span>');

                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className + ' exercise-apply-delete';
                }
            },

            this,{delegate: '.exercise-list-fields'});


        el.on(
            'mouseout', function(e,t) {
                if (e.relatedTarget.className === 'lanista-header-item-exercise-left' ||
                    e.relatedTarget.className === 'lanista-header-item-exercise-delete' ||
                    e.relatedTarget.className === 'lanista-header-item-exercise-right')
                    return;

                var controller = LanistaTrainer.app.getController ('PlanController');

                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/item-clicked/gi,'');
                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className + ' item-not-clicked';

                if (parseInt(controller.plan.data.creator_id) === controller.plan.data.person_id){
                    Ext.get(t).up('.lanista-plan-exercise').down('.exercise-list-delete').setHtml('');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                }
            },
            this,{delegate: '.exercise-list-img-right'});

        el.on(
            'mouseout', function(e,t) {
                if (e.relatedTarget.className === 'lanista-header-item-exercise-left' ||
                    e.relatedTarget.className === 'lanista-header-item-exercise-delete' ||
                    e.relatedTarget.className === 'lanista-header-item-exercise-right')
                    return;

                var controller = LanistaTrainer.app.getController ('PlanController');

                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/item-clicked/gi,'');
                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className + ' item-not-clicked';

                if (parseInt(controller.plan.data.creator_id) === controller.plan.data.person_id){
                    Ext.get(t).up('.lanista-plan-exercise').down('.exercise-list-delete').setHtml('');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                }
            },
            this,{delegate: '.exercise-list-img-left'});

        el.on(
            'mouseout', function(e,t) {
                if (e.relatedTarget.className === 'lanista-header-item-exercise-left' ||
                    e.relatedTarget.className === 'lanista-header-item-exercise-delete' ||
                    e.relatedTarget.className === 'lanista-header-item-exercise-right')
                    return;

                var controller = LanistaTrainer.app.getController ('PlanController');

                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/item-clicked/gi,'');
                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className + ' item-not-clicked';

                if (parseInt(controller.plan.data.creator_id) === controller.plan.data.person_id){
                    Ext.get(t).up('.lanista-plan-exercise').down('.exercise-list-delete').setHtml('');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                }
            },
            this,{delegate: '.lanista-exercices-title'});

        el.on(
            'mouseout', function(e,t) {
                if (e.relatedTarget.className === 'lanista-header-item-exercise-left' ||
                    e.relatedTarget.className === 'lanista-header-item-exercise-delete' ||
                    e.relatedTarget.className === 'lanista-header-item-exercise-right')
                    return;

                var controller = LanistaTrainer.app.getController ('PlanController');

                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/item-clicked/gi,'');
                Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className + ' item-not-clicked';

                if (parseInt(controller.plan.data.creator_id) === controller.plan.data.person_id){
                    Ext.get(t).up('.lanista-plan-exercise').down('.exercise-list-delete').setHtml('');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                    Ext.get(t).up('.lanista-plan-exercise').dom.className = Ext.get(t).up('.lanista-plan-exercise').dom.className.replace(/exercise-apply-delete/gi,'');
                }
            },
            this,{delegate: '.lanista-exercices-foter'});




    },

    onPlanExercisesListViewReady: function(dataview, eOpts) {
        var el = dataview.el,
            controller = LanistaTrainer.app.getController ('PlanController'),
            activeTab = controller.getPlanPanel().down('tabpanel').getActiveTab(),
            selectionTab;

        //if (!controller.currentDay || !dataview.recordsArray) return;
        if (!controller.currentDay) return;

        /*
        selectionTab = controller.selectionsTab[controller.currentDay.id.substring(1)];

        if (activeTab.id === el.id){
            //Looking for items that must be deleted and deleting them
            for (var j = 0; j < selectionTab.length; j++){
                if (selectionTab[j][3] === 'd'){
                    for (var k = 0; k < dataview.recordsArray.length; k++){
                        if (dataview.recordsArray[k].exercise_id === selectionTab[j][0] || dataview.recordsArray[k].user_exercise_id === selectionTab[j][0])
                            break;
                    }
                    controller.deleteItemView(dataview.recordsArray[k]);
                    selectionTab.splice(j,1);
                    activeTab.recordsArray.splice(j, 1);
                    dataview.getStore().load(function(records, operation, success) {
                        if (!success){
                            console.log( "There were problems in looking for exercises plan info, Err number: " + operation.error.status);
                            if (operation.error.status === 401 || operation.error.status === 403)
                                LanistaTrainer.app.fireEvent('reconect');
                            return;
                        }
                        controller.populateTabsExercisesByDay(records);
                    });
                }
            }
        }
        */

        for (var i = 0; i < el.dom.childNodes.length; i++)
        {
            el.dom.childNodes[i].internalId = i;
        }
    },

    markDeleteExercises: function(t, internalId) {
        var exercisesToDelete,
            exercisesToDeleteArray = [],
            pos;

        exercisesToDelete = LanistaTrainer.app.getController('PlanController').exercisesToDelete ? LanistaTrainer.app.getController('PlanController').exercisesToDelete : "";
        exercisesToDelete = new String(exercisesToDelete);

        if (exercisesToDelete.valueOf()){
            if (exercisesToDelete.indexOf(",") > 0)
                exercisesToDeleteArray = exercisesToDelete.split(",");
            else
                exercisesToDeleteArray[0] = exercisesToDelete.valueOf();
        }

        pos = exercisesToDeleteArray.indexOf(internalId.toString());
        if (pos >= 0){
            classValue = t.parentNode.className;
            classValue = classValue.replace('lanista-list-itemrounded-selected-delete','', 'g');
            t.parentNode.className = classValue;

            exercisesToDeleteArray.splice(pos,1);
            exercisesToDelete = "";
            if (exercisesToDeleteArray.length > 0){
                exercisesToDelete = exercisesToDeleteArray[0];
                for (var i = 1; i < exercisesToDeleteArray.length; i++){
                    exercisesToDelete = exercisesToDelete + ',' + exercisesToDeleteArray[i];
                }
            }
            LanistaTrainer.app.getController('PlanController').exercisesToDelete = exercisesToDelete;
            if (exercisesToDeleteArray.length <= 0)
                LanistaTrainer.app.getController('PlanController').getRightCommandPanel().getComponent('removePlanExercisesButton').hide();
        }
        else{
            t.parentNode.className = t.parentNode.className + ' lanista-list-itemrounded-selected-delete';
            LanistaTrainer.app.getController('PlanController').exercisesToDelete = exercisesToDelete.valueOf() ? exercisesToDelete + ',' + internalId : internalId.toString();
            LanistaTrainer.app.getController('PlanController').showCommands();
            LanistaTrainer.app.getController('PlanController').getRightCommandPanel().getComponent('removePlanExercisesButton').show();

        }

    }

});