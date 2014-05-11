/*
 * File: app/view/ExercisePanel.js
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

Ext.define('LanistaTrainer.view.ExercisePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.exercisePanel',

    requires: [
        'Ext.XTemplate',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.Template',
        'Ext.grid.feature.Grouping',
        'Ext.form.field.TextArea',
        'Ext.form.field.Number'
    ],

    cls: 'lanista-exercise-panel',
    id: 'exercisePanel',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                        '        <div id="image-start-position" class="exercise-image" style="-webkit-background-size: cover; background-image: url({[(values.ext_id && values.ext_id.indexOf("CUST") != -1) ? (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/b/"+values.ext_id) : "resources/images/exercises/"+values.ext_id]}_2.png);"/></div>',
                        '        <div id="image-end-position"   class="exercise-image" style="-webkit-background-size: cover; background-image: url({[(values.ext_id && values.ext_id.indexOf("CUST") != -1) ? (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + "/tpmanager/img/b/"+values.ext_id) : "resources/images/exercises/"+values.ext_id]}_1.png);"/></div>',
                        '     </div>',
                        '</div>'
                    ]
                },
                me.processExercisePanelContent({
                    xtype: 'tabpanel',
                    flex: 1,
                    cls: 'lanista-exercise-panel-content',
                    id: 'exercisePanelContent',
                    activeTab: 0,
                    plain: true,
                    items: [
                        {
                            xtype: 'panel',
                            id: 'info',
                            tpl: [
                                '<div class="exercise-description">',
                                '    <div class="exercise-coaching-key"><span><b>{[Ext.ux.LanguageManager.TranslationArray.EXECUTION]}</b></span><br>{[values["coatchingnotes_"+Ext.ux.LanguageManager.lang]]}</div>',
                                '    <div class="exercise-errors"><span><b>{[Ext.ux.LanguageManager.TranslationArray.POSSIBLE_ERRORS]}</b></span><br>{[values["mistakes_"+Ext.ux.LanguageManager.lang]]}</div>',
                                '</div>',
                                ''
                            ],
                            title: 'Info'
                        },
                        {
                            xtype: 'panel',
                            id: 'alternatives',
                            title: 'Alternatives'
                        },
                        {
                            xtype: 'panel',
                            cls: 'lanista-protocolls-tab-panel',
                            hidden: true,
                            id: 'protocollsTabPanel',
                            title: 'Protocolls',
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
                                        '<div class="protocoll-configuration">{weight} Kg. x {training} {[values.training_unit == 0 ? Ext.ux.LanguageManager.TranslationArray.REP : values.training_unit == 1 ? Ext.ux.LanguageManager.TranslationArray.SEC : Ext.ux.LanguageManager.TranslationArray.MIN]}</div>'
                                    ],
                                    width: 850
                                }
                            ],
                            dockedItems: [
                                me.processExerciseProtocolls({
                                    xtype: 'gridpanel',
                                    dock: 'right',
                                    id: 'exerciseProtocolls',
                                    width: 230,
                                    header: false,
                                    disableSelection: true,
                                    emptyText: 'This exercise is not protocolled',
                                    columns: [
                                        {
                                            xtype: 'templatecolumn',
                                            border: false,
                                            cls: 'lanista-exercise-protocolls',
                                            id: 'rowProtocolls',
                                            style: '',
                                            tpl: [
                                                '<div>{[Ext.ux.LanguageManager.TranslationArray.SET]} {#}: {weight} Kg x {training} {[values.training_unit == 0 ? Ext.ux.LanguageManager.TranslationArray.REP : values.training_unit == 1 ? Ext.ux.LanguageManager.TranslationArray.SEC : Ext.ux.LanguageManager.TranslationArray.MIN]}</div>'
                                            ],
                                            resizable: false,
                                            defaultWidth: 0,
                                            enableColumnHide: false,
                                            weight: 0,
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
                                })
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
                                        '<div class="protocoll-description">{[values.description ? values.description : Ext.ux.LanguageManager.TranslationArray.NO_PLAN_EXERCISE_DESCRIPTION]}</div>',
                                        ''
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
                    ]
                })
            ]
        });

        me.callParent(arguments);
    },

    processExerciseProtocolls: function(config) {
        config.viewConfig = {
            getRowClass: function(record, index){
                return 'lanista-row-grid';
            }
        };

        return config;
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
    }

});