/*
 * File: app/view/ExercisePanel.js
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

Ext.define('LanistaTrainer.view.ExercisePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.exercisePanel',

    requires: [
        'LanistaTrainer.view.ExercisePanelViewModel',
        'Ext.XTemplate',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Template',
        'Ext.grid.feature.Grouping',
        'Ext.form.field.TextArea',
        'Ext.form.field.Number'
    ],

    viewModel: {
        type: 'exercisePanel'
    },
    cls: 'lanista-exercise-panel',
    id: 'exercisePanel',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'panel',
                        flex: 1,
                        cls: 'lanista-exercise-panel-header',
                        id: 'exercisePanelHeader',
                        tpl: [
                            '<div class="exercise">',
                            '    <div class="exercise_name">{[values["name_"+Ext.ux.LanguageManager.lang]]}</div>',
                            '    <div class="exercise-images">',
                            '        <div id="image-start-position" class="exercise-image" style="-webkit-background-size: cover; background-image: url({[(values.ext_id && values.ext_id.indexOf(\'CUST\') != -1) ? (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/b/\'+values.ext_id) : \'resources/images/exercises/\'+values.ext_id]}_2.png);"></div>',
                            '        <div id="image-start-position" class="exercise-image" style="-webkit-background-size: cover; background-image: url({[(values.ext_id && values.ext_id.indexOf(\'CUST\') != -1) ? (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + \'/tpmanager/img/b/\'+values.ext_id) : \'resources/images/exercises/\'+values.ext_id]}_1.png);"></div>',
                            '    </div>',
                            '</div>'
                        ]
                    },
                    me.processExercisePanelContent({
                        xtype: 'tabpanel',
                        flex: 1,
                        cls: 'lanista-exercise-panel-content',
                        id: 'exercisePanelContent',
                        activeTab: 2,
                        plain: true,
                        items: [
                            {
                                xtype: 'panel',
                                id: 'info',
                                tpl: Ext.create('Ext.XTemplate', 
                                    '<div class="exercise-description">',
                                    '    <div class="exercise-coaching-key"><span><b>{[Ext.ux.LanguageManager.TranslationArray.EXECUTION]}</b></span><br>{[Ext.ux.LanguageManager.lang === "EN" ? this.strLines(values.coatchingnotes_EN) : Ext.ux.LanguageManager.lang === "ES" ? this.strLines(values.coatchingnotes_ES) :  this.strLines(values.coatchingnotes_DE)]}</div>',
                                    '    <div class="exercise-errors"><span><b>{[Ext.ux.LanguageManager.TranslationArray.POSSIBLE_ERRORS]}</b></span><br>{[this.strLines(values["mistakes_"+Ext.ux.LanguageManager.lang])]}</div>',
                                    '</div>',
                                    {
                                        strLines: function(value) {
                                            var returnValue = '',
                                                strSplit = [];
                                            strSplitII = [];

                                            if (Ext.isArray(value)){
                                                for (var i = 0; i < value.length; i++){
                                                    strSplit = value[i].split(",");
                                                    for (var j = 0; j < strSplit.length; j++) {
                                                        strSplitII = strSplit[j].split("||");
                                                        for (var k = 0; k < strSplitII.length; k++) {
                                                            returnValue = returnValue + strSplitII[k].trim().substr(0,1).toUpperCase() + strSplitII[k].trim().substr(1) + '<br>';
                                                        }
                                                        strSplitII = [];
                                                    }
                                                    strSplit = [];
                                                }
                                            }
                                            else{
                                                strSplit = value.split(",");
                                                for (var j = 0; j < strSplit.length; j++) {
                                                    strSplitII = strSplit[j].split("||");
                                                    for (var k = 0; k < strSplitII.length; k++) {
                                                        returnValue = returnValue + strSplitII[k].trim().substr(0,1).toUpperCase() + strSplitII[k].trim().substr(1) + '<br>';
                                                    }
                                                    strSplitII = [];
                                                }
                                            }

                                            return returnValue;
                                        }
                                    }
                                ),
                                title: 'My Panel'
                            },
                            {
                                xtype: 'panel',
                                hidden: true,
                                id: 'protocollsTabPanel',
                                title: 'My Panel',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'panel',
                                        cls: 'lanista-protocoll-panel',
                                        id: 'protocollPanel',
                                        tpl: [
                                            '<div class="protocoll-configuration">{weight} Kg. x {training} {[values.training_unit == 0 ? Ext.ux.LanguageManager.TranslationArray.REP : values.training_unit == 1 ? Ext.ux.LanguageManager.TranslationArray.SEC : Ext.ux.LanguageManager.TranslationArray.MIN]}</div>\''
                                        ],
                                        width: 850,
                                        title: 'My Panel',
                                        dockedItems: [
                                            {
                                                xtype: 'gridpanel',
                                                dock: 'right',
                                                id: 'exerciseProtocolls',
                                                width: 230,
                                                header: false,
                                                disableSelection: true,
                                                emptyText: 'This exercise is not protocolled',
                                                hideHeaders: true,
                                                columns: [
                                                    {
                                                        xtype: 'templatecolumn',
                                                        border: false,
                                                        cls: 'lanista-exercise-protocolls',
                                                        id: 'rowProtocolls',
                                                        resizable: false,
                                                        tpl: [
                                                            '<div>{[Ext.ux.LanguageManager.TranslationArray.SET]} {#}: {weight} Kg x {training} {[values.training_unit == 0 ? Ext.ux.LanguageManager.TranslationArray.REP : values.training_unit == 1 ? Ext.ux.LanguageManager.TranslationArray.SEC : Ext.ux.LanguageManager.TranslationArray.MIN]}</div>'
                                                        ],
                                                        weight: 0,
                                                        defaultWidth: 0,
                                                        enableColumnHide: false,
                                                        dataIndex: 'string',
                                                        hideable: false,
                                                        menuDisabled: true,
                                                        tdCls: 'lanista-exercises-protocolls-td'
                                                    }
                                                ],
                                                features: [
                                                    {
                                                        ftype: 'grouping',
                                                        collapsible: false,
                                                        groupHeaderTpl: [
                                                            '<div class="lanista-group-grid-exercise"> {name} </div>'
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                cls: 'lanista-configuration-tabpanel',
                                hidden: true,
                                id: 'configurationTabPanel',
                                layout: 'fit',
                                title: 'Exercise Configuration',
                                dockedItems: [
                                    {
                                        xtype: 'panel',
                                        dock: 'right',
                                        id: 'configurationPanel',
                                        tpl: [
                                            '<div class="protocoll-configuration">{weight} Kg. x {training} {[values.training_unit == 0 ? Ext.ux.LanguageManager.TranslationArray.REP : values.training_unit == 1 ? Ext.ux.LanguageManager.TranslationArray.SEC : Ext.ux.LanguageManager.TranslationArray.MIN]} {rounds_min} {[values.rounds_min > 1 ? Ext.ux.LanguageManager.TranslationArray.FORM_PLANEXRCISE_SETS : Ext.ux.LanguageManager.TranslationArray.SET]}</div>',
                                            '<div class="protocoll-description">{[values.description ? values.description : Ext.ux.LanguageManager.TranslationArray.NO_PLAN_EXERCISE_DESCRIPTION]}</div>'
                                        ],
                                        width: 650,
                                        items: [
                                            {
                                                xtype: 'textareafield',
                                                hidden: true,
                                                id: 'exerciseDescriptionInputPanel'
                                            },
                                            {
                                                xtype: 'numberfield',
                                                hidden: true,
                                                id: 'setInput'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        listeners: {
                            afterrender: 'onExercisePanelContentAfterRender'
                        }
                    })
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processExercisePanelContent: function(config) {

        config.tabBar = {
                            cls:'lanista-tbar-exercise',
                            docked: 'top',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            }
                        };


        return config;
    },

    onExercisePanelContentAfterRender: function(component, eOpts) {
        component.down('#info').setTitle( Ext.ux.LanguageManager.TranslationArray.BUTTON_INFO  );
        component.down('#protocollsTabPanel').setTitle( Ext.ux.LanguageManager.TranslationArray.BUTTON_PROTOCOLLS   );
        component.down('#configurationTabPanel').setTitle( Ext.ux.LanguageManager.TranslationArray.FORM_PLANEXRCISE_WEIGHT + ' / ' + Ext.ux.LanguageManager.TranslationArray.REP );
    }

});