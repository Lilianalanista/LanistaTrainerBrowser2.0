/*
 * File: app/view/WeightsWindow.js
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

Ext.define('LanistaTrainer.view.WeightsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.weightsWindow',

    requires: [
        'LanistaTrainer.view.WeightsWindowViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'weightsWindow'
    },
    height: 285,
    id: 'weightsWindow',
    width: 505,
    header: false,
    expandOnShow: false,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'fieldset',
            id: 'weightKilos',
            title: 'My Fields',
            items: [
                {
                    xtype: 'numberfield',
                    cls: 'lanista-weights-input',
                    id: 'protocollKgValue',
                    enableKeyEvents: true,
                    allowExponential: false,
                    autoStripChars: true,
                    decimalSeparator: ','
                }
            ]
        },
        {
            xtype: 'fieldset',
            id: 'weightMeasure',
            title: ' ',
            items: [
                {
                    xtype: 'numberfield',
                    cls: 'lanista-weights-input',
                    id: 'protocollTrainingValue',
                    enableKeyEvents: true,
                    allowDecimals: false,
                    allowExponential: false,
                    autoStripChars: true,
                    decimalSeparator: ','
                },
                {
                    xtype: 'radiogroup',
                    cls: 'lanista-weights-rb',
                    height: 85,
                    id: 'radioWeight',
                    width: 150,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'radiofield',
                            cls: 'lanista-weights-echrb',
                            height: 25,
                            id: 'rb_Rep',
                            name: 'rb',
                            boxLabel: 'Rep.',
                            inputValue: '0'
                        },
                        {
                            xtype: 'radiofield',
                            cls: 'lanista-weights-echrb',
                            height: 25,
                            id: 'rb_Min',
                            name: 'rb',
                            boxLabel: 'Min.',
                            inputValue: '2'
                        },
                        {
                            xtype: 'radiofield',
                            cls: 'lanista-weights-echrb',
                            height: 25,
                            id: 'rb_Sec',
                            name: 'rb',
                            boxLabel: 'Sec.',
                            inputValue: '1'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            cls: 'lanista-weights-input',
            hidden: true,
            id: 'weightSets',
            title: 'My Fields',
            items: [
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    hidden: true,
                    id: 'exerciseSets',
                    allowDecimals: false,
                    allowExponential: false,
                    autoStripChars: true
                }
            ]
        },
        {
            xtype: 'fieldset',
            hidden: true,
            id: 'weightIndications',
            title: 'My Fields',
            items: [
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    hidden: true,
                    id: 'exerciseIndications'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWeightsWindowAfterRender'
    },
    dockedItems: [
        {
            xtype: 'fieldset',
            dock: 'bottom',
            id: 'weightBottons'
        }
    ],

    onWeightsWindowAfterRender: function(component, eOpts) {
        component.down('#weightKilos').setTitle(Ext.ux.LanguageManager.TranslationArray.FORM_PLANEXRCISE_WEIGHT);
        component.down('#weightMeasure').setTitle(Ext.ux.LanguageManager.TranslationArray.FORM_PLANEXRCISE_UNIT);
        component.down('#weightSets').setTitle(Ext.ux.LanguageManager.TranslationArray.FORM_PLANEXRCISE_SETS);
        component.down('#weightIndications').setTitle(Ext.ux.LanguageManager.TranslationArray.COUTCHER_NOTES);

        component.down('#rb_Rep').setBoxLabel(Ext.ux.LanguageManager.TranslationArray.REP );
        component.down('#rb_Min').setBoxLabel(Ext.ux.LanguageManager.TranslationArray.MIN);
        component.down('#rb_Sec').setBoxLabel(Ext.ux.LanguageManager.TranslationArray.SEC);

        this.down ( '#weightBottons' ).add(  Ext.create('LanistaTrainer.view.LanistaButton', {
            itemId: 'saveProtocollButton',
            glyph: '65@Lanista Icons', //A
            text: Ext.ux.LanguageManager.TranslationArray.BUTTON_SAVE,
            cls: [
                'lanista-command-button',
                'lanista-command-button-green',
                'lanista-saveProtocollButton'
            ],
            listeners: {
                click: {
                    scope: this,
                    fn: function(){
                        var panelWeight,
                            panelTraining = Ext.ComponentQuery.query("viewport")[0].down("#trainingPicker"),
                            infoProtocoll = [],
                            valueWeight,
                            setObjectLanista;

                        if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'ExercisePanel' ||
                            LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'PlanPanel'){
                            infoProtocoll[0] = !component.down('#protocollKgValue').getValue() ? 0 : component.down('#protocollKgValue').getValue();
                            infoProtocoll[1] = !component.down('#protocollTrainingValue').getValue() ? 0 : component.down('#protocollTrainingValue').getValue();
                            infoProtocoll[2] = !parseInt(component.down('#radioWeight').getValue().rb) ? 0 : parseInt(component.down('#radioWeight').getValue().rb);

                            LanistaTrainer.app.fireEvent('planExerciseRecordChanged',
                                                         infoProtocoll,
                                                         component.down('#exerciseIndications').getValue(),
                                                         !component.down('#exerciseSets').getValue() ? 0 : component.down('#exerciseSets').getValue());
                        }

                        /*
                        if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'PlanPanel'){
                            panelWeight = Ext.ComponentQuery.query("viewport")[0].down("#weightPicker");
                            valueWeight = panelWeight ? panelWeight.getValue() : 0;
                            valueWeight = valueWeight !== 0 ? parseFloat(valueWeight.substring(0, valueWeight.indexOf(' ')).replace(",", ".")) : 0;
                            infoProtocoll[0] = valueWeight;
                            infoProtocoll[1] = panelTraining.getValue();
                            infoProtocoll[2] = panelTraining.unit;
                            LanistaTrainer.app.fireEvent('planExerciseRecordChanged', infoProtocoll,'','');
                        }
                        */

                        if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] === 'DefaultPlanValuesPanel'){
                            setObjectLanista = Ext.ComponentQuery.query("viewport")[0].down("#setObjectLanista");
                            infoProtocoll[0] = setObjectLanista.getValue();
                            infoProtocoll[1] = panelTraining.getValue();
                            infoProtocoll[2] = panelTraining.unit;
                            LanistaTrainer.app.fireEvent('defaultValuesChanged', infoProtocoll,'','');
                        }

                        component.close();
                    }
                }
            }
        })
                                          );


        if (LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1] !== 'DefaultPlanValuesPanel'){
            this.down ( '#weightBottons' ).add(  Ext.create('LanistaTrainer.view.LanistaButton', {
                itemId: 'closeProtocollButton',
                text: Ext.ux.LanguageManager.TranslationArray.BUTTON_CANCEL,
                glyph: '117@Lanista Icons', //u
                cls: [
                    'lanista-command-button',
                    'lanista-command-button-red',
                    'lanista-closeProtocollButton'
                ],
                listeners: {
                    click: {
                        scope: this,
                        fn: function(){
                            component.close();
                        }
                    }
                }
            })
                                              );
        }


    },

    funcMask: function(d) {
        var pat = new Array(2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3),
            val2 = (d.getValue()+'').replace(".", ","),
            decimalSeparator = ',';

        if (val2.indexOf(decimalSeparator) == -1) val2 += this.decimalSeparator + '00';
        for(var z=0; z<val2.length; z++){
            if(isNaN(val2.charAt(z)) || val2.charAt(z) == "." || val2.charAt(z) == ","){
                if (val2.charAt(z) == ".") {
                    val2 = val2.replace(/\./g, '');
                }
                else{
                    letra = new RegExp(val2.charAt(z),"g");
                    val2 = val2.replace(letra,"");
                }
            }
        }
        val = '';
        val4 = 0;
        val3 = new Array();
        for(var s=0; s<pat.length; s++) {
            val4 = parseInt(val2.length) - parseInt(pat[s]);
            if (val4<0) {
                val3[s] = val2;
            } else {
                val3[s] = val2.substr(val4,pat[s]);
            }
            if(s ==0){
                valx = val3[s];
            } else{
                if(s ==1){
                    valx = val3[s] + "," + valx;
                } else {
                    if(val3[s] != "") {
                        valx = val3[s] + "." + valx;
                    }
                }
            }
            val2 = val2.substr(0, val4);
        }
        d.setValue(valx.replace(/^0+(?!\,|$)/, ''));
    }

});