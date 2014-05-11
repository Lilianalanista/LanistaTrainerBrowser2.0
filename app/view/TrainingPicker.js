/*
 * File: app/view/TrainingPicker.js
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

Ext.define('LanistaTrainer.view.TrainingPicker', {
    extend: 'Ext.container.Container',
    alias: 'widget.trainingPicker',

    requires: [
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar',
        'Ext.container.ButtonGroup',
        'Ext.form.FieldSet'
    ],

    cls: 'lanista-trainingPicker',
    id: 'trainingPicker',
    width: 400,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    id: 'protocollTrainingValue',
                    readOnly: true
                },
                {
                    xtype: 'button',
                    cls: 'lanista-training-clear',
                    id: 'clearTrainingtEntryButton',
                    listeners: {
                        click: {
                            fn: me.onClearTrainingEntryButtonClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'toolbar',
                    cls: 'lanista-toolbar-training',
                    items: [
                        {
                            xtype: 'buttongroup',
                            cls: 'lanista-buttongroup-traininghelp',
                            header: false,
                            columns: 3,
                            items: [
                                {
                                    xtype: 'button',
                                    height: 40,
                                    id: 'repButton',
                                    width: 85,
                                    listeners: {
                                        click: {
                                            fn: me.onRepButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    height: 40,
                                    id: 'minButton',
                                    width: 85,
                                    listeners: {
                                        click: {
                                            fn: me.onMinButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    height: 40,
                                    id: 'secButton',
                                    width: 85,
                                    listeners: {
                                        click: {
                                            fn: me.onSecButtonClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                me.processNumberpadTraining({
                    xtype: 'container',
                    cls: 'numberpad',
                    id: 'numberpadTraining',
                    defaults: {
                        cls: 'numberpad-button'
                    },
                    listeners: {
                        afterrender: {
                            fn: me.onNumberpadTrainingAfterRender,
                            scope: me
                        }
                    }
                }),
                me.processTrainingHelpTrainingbuttons({
                    xtype: 'container',
                    cls: 'training-helpbuttons',
                    id: 'trainingHelpTrainingbuttons',
                    defaults: {
                        cls: 'weight-option-button'
                    },
                    listeners: {
                        afterrender: {
                            fn: me.onTrainingHelpTrainingbuttonsAfterRender,
                            scope: me
                        }
                    }
                }),
                {
                    xtype: 'fieldset',
                    cls: 'lanista-fieldset-protocolls',
                    id: 'setFieldButtons',
                    layout: 'hbox'
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onTrainingPickerAfterRender,
                    scope: me
                },
                hide: {
                    fn: me.onTrainingPickerHide,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    processNumberpadTraining: function(config) {
        config.items = [
                            {
                                html: '<div class="lanista-weight-item">1</div>',
                                value: 1,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">2</div>',
                                value: 2,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">3</div>',
                                value: 3,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">4</div>',
                                value: 4,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">5</div>',
                                value: 5,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">6</div>',
                                value: 6,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">7</div>',
                                value: 7,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">8</div>',
                                value: 8,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">9</div>',
                                value: 9,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item"><-</div>',
                                value: -1,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">0</div>',
                                value: 0,
                                style: ''
                            },
                            {
                                html: '<div class="lanista-weight-item">00</div>',
                                value: 00
                            }
                        ];


        return config;
    },

    processTrainingHelpTrainingbuttons: function(config) {
        config.items = [
                            {
                                html: '<div class="lanista-traininghelp-item" value="-1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '1 '+Ext.ux.LanguageManager.TranslationArray.REP
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="-2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '2 '+Ext.ux.LanguageManager.TranslationArray.REP
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="-5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '5 '+Ext.ux.LanguageManager.TranslationArray.REP
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="-10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '10 '+Ext.ux.LanguageManager.TranslationArray.REP
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            }
                        ];
        return config;
    },

    onClearTrainingEntryButtonClick: function(button, e, eOpts) {
        button.up().setValue('0');
    },

    onRepButtonClick: function(button, e, eOpts) {
        this.unit = 0;
        this.down('#trainingHelpTrainingbuttons').removeAll();
        this.down('#trainingHelpTrainingbuttons').add([
            {html: '<div class="lanista-traininghelp-item" value="-1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '1 '  + Ext.ux.LanguageManager.TranslationArray.REP},
            {html: '<div class="lanista-traininghelp-item" value="1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '2 '  + Ext.ux.LanguageManager.TranslationArray.REP},
            {html: '<div class="lanista-traininghelp-item" value="2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '5 '  + Ext.ux.LanguageManager.TranslationArray.REP},
            {html: '<div class="lanista-traininghelp-item" value="5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '10 ' + Ext.ux.LanguageManager.TranslationArray.REP},
            {html: '<div class="lanista-traininghelp-item" value="10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'}
        ]);
        this.setValue(this.getValue());

        if (this.selectedButton)
        {
            this.selectedButton.removeCls('button-selected-color');
            this.selectedButton.addCls('button-unselected-color');
        }
        this.down('#repButton').removeCls('button-unselected-color');
        this.down('#repButton').addCls('button-selected-color');

        this.selectedButton = this.down('#repButton');
        this.down('#repButton').focus();
    },

    onMinButtonClick: function(button, e, eOpts) {
        this.unit = 2;
        this.down('#trainingHelpTrainingbuttons').removeAll();
        this.down('#trainingHelpTrainingbuttons').add([
            {html: '<div class="lanista-traininghelp-item" value="-1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '1 '  + Ext.ux.LanguageManager.TranslationArray.MIN},
            {html: '<div class="lanista-traininghelp-item" value="1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '2 '  + Ext.ux.LanguageManager.TranslationArray.MIN},
            {html: '<div class="lanista-traininghelp-item" value="2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '5 '  + Ext.ux.LanguageManager.TranslationArray.MIN},
            {html: '<div class="lanista-traininghelp-item" value="5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '10 ' + Ext.ux.LanguageManager.TranslationArray.MIN},
            {html: '<div class="lanista-traininghelp-item" value="10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'}
        ]);
        this.setValue(this.getValue());

        if (this.selectedButton)
        {
            this.selectedButton.removeCls('button-selected-color');
            this.selectedButton.addCls('button-unselected-color');
        }
        this.down('#minButton').removeCls('button-unselected-color');
        this.down('#minButton').addCls('button-selected-color');

        this.selectedButton = this.down('#minButton');
        this.down('#minButton').focus();
    },

    onSecButtonClick: function(button, e, eOpts) {
        this.unit = 1;
        this.down('#trainingHelpTrainingbuttons').removeAll();
        this.down('#trainingHelpTrainingbuttons').add([
            {html: '<div class="lanista-traininghelp-item" value="-1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '1 '  + Ext.ux.LanguageManager.TranslationArray.SEC},
            {html: '<div class="lanista-traininghelp-item" value="1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '2 '  + Ext.ux.LanguageManager.TranslationArray.SEC},
            {html: '<div class="lanista-traininghelp-item" value="2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '5 '  + Ext.ux.LanguageManager.TranslationArray.SEC},
            {html: '<div class="lanista-traininghelp-item" value="5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'},
            {html: '<div class="lanista-traininghelp-item" value="-10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'},
            {html: '10 ' + Ext.ux.LanguageManager.TranslationArray.SEC},
            {html: '<div class="lanista-traininghelp-item" value="10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'}
        ]);
        this.setValue(this.getValue());

        if (this.selectedButton)
        {
            this.selectedButton.removeCls('button-selected-color');
            this.selectedButton.addCls('button-unselected-color');
        }
        this.down('#secButton').removeCls('button-unselected-color');
        this.down('#secButton').addCls('button-selected-color');

        this.selectedButton = this.down('#secButton');
        this.down('#secButton').focus();
    },

    onNumberpadTrainingAfterRender: function(component, eOpts) {
        el = component.el;

        el.on(
            'click', function(e,t) {

                var currentEntry = this.getValue();
                var currentValue = currentEntry;
                if (t.innerHTML != '&lt;-' && t.innerHTML != 'OK')
                    this.setValue(parseFloat((currentValue === 0 ? '' : currentValue) + t.innerHTML));
                else if (t.innerHTML == 'OK') {
                    component.fireEvent('change', component.getValue());
                    component.hide();
                } else
                    this.setValue(currentValue.substring(0, currentValue.length-1));
            },
            this, {delegate: '.lanista-weight-item'});
        el.on(
            'mouseover', function(e,t) {

                                    el.removeCls('item-not-clicked');
                                    el.addCls('item-clicked');

                            },
            this,{ delegate: '.lanista-weight-item'});
        el.on(
            'mouseout', function(e,t) {

                                    el.removeCls('item-clicked');
                                    el.addCls('item-not-clicked');

                            },
            this,{delegate: '.lanista-weight-item'});
    },

    onTrainingHelpTrainingbuttonsAfterRender: function(component, eOpts) {
        el = component.el;

        el.on(
            'click', function(e,t) {
                var amount = t.getAttribute('value');
                var currentValue = parseInt(this.getValue()) + parseInt(amount);
                this.setValue(currentValue > 0 ? currentValue : 0);
            },
            this, {delegate: '.lanista-traininghelp-item'});
        el.on(
            'mouseover', function(e,t) {

                                    el.removeCls('item-not-clicked');
                                    el.addCls('item-clicked');

                            },
            this,{ delegate: '.lanista-traininghelp-item'});
        el.on(
            'mouseout', function(e,t) {

                                    el.removeCls('item-clicked');
                                    el.addCls('item-not-clicked');

                            },
            this,{delegate: '.lanista-traininghelp-item'});
    },

    onTrainingPickerAfterRender: function(component, eOpts) {

        this.down ( '#clearTrainingtEntryButton' ).setText ( Ext.ux.LanguageManager.TranslationArray.BUTTON_RESET );
        this.down ( '#repButton' ).setText ( Ext.ux.LanguageManager.TranslationArray.REP );
        this.down ( '#minButton' ).setText ( Ext.ux.LanguageManager.TranslationArray.MIN );
        this.down ( '#secButton' ).setText ( Ext.ux.LanguageManager.TranslationArray.SEC );

        this.down ( '#setFieldButtons' ).add(  Ext.create('LanistaTrainer.view.LanistaButton', {
                    itemId: 'saveProtocollButton',
                    glyph: '65@Lanista Icons', //A
                    cls: [
                        'lanista-command-button',
                        'lanista-command-button-green',
                        'lanista-saveProtocollButton'
                    ],
                    listeners: {
                        click: {
                            scope: this,
                            fn: function(){
                                var panelWeight = Ext.ComponentQuery.query("viewport")[0].down("#weightPicker"),
                                    panelTraining = Ext.ComponentQuery.query("viewport")[0].down("#trainingPicker"),
                                    infoProtocoll = [],
                                    valueWeight = panelWeight.getValue();

                                valueWeight = parseFloat(valueWeight.substring(0, valueWeight.indexOf(' ')).replace(",", "."));
                                infoProtocoll[0] = valueWeight;
                                infoProtocoll[1] = panelTraining.getValue();
                                infoProtocoll[2] = panelTraining.unit;

                                LanistaTrainer.app.fireEvent('planExerciseRecordChanged', infoProtocoll,'','');

                                panelWeight.removeAll();
                                panelWeight.hide();

                                panelTraining.removeAll();
                                panelTraining.hide();
                            }
                        }
                    }
                })
        );

        this.down ( '#setFieldButtons' ).add(  Ext.create('LanistaTrainer.view.LanistaButton', {
                    itemId: 'closeProtocollButton',
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
                                var panelWeight = Ext.ComponentQuery.query("viewport")[0].down("#weightPicker"),
                                    panelTraining = Ext.ComponentQuery.query("viewport")[0].down("#trainingPicker");

                                panelWeight.hide();
                                panelTraining.hide();
                            }
                        }
                    }
                })
        );


    },

    onTrainingPickerHide: function(component, eOpts) {
        component.destroy ( );
    },

    setValue: function(value) {

        var unit = this.unit === 0 ? Ext.ux.LanguageManager.TranslationArray.REP : this.unit == 1 ? Ext.ux.LanguageManager.TranslationArray.SEC : Ext.ux.LanguageManager.TranslationArray.MIN;
        if (value && value !== 0) {
            this.down ( '#protocollTrainingValue' ).setValue(value + ' ' + unit);
        } else {
            this.down ( '#protocollTrainingValue' ).setValue('0 ' + unit);
        }

    },

    getValue: function() {

        var value = this.down ( '#protocollTrainingValue' ).getValue();
        return value.substring(0, value.indexOf(' '));
    },

    setRecord: function(record) {
        this.record = record;
        this.unit = record.training_unit;
        this.setValue ( record.training );

        if ( this.unit === 0 )
            this.down ('#repButton').fireEvent( 'click' );
        else if ( this.unit == 1 )
            this.down ('#secButton').fireEvent( 'click' );
        else
            this.down ('#minButton').fireEvent( 'click' );
    },

    mascara: function(d) {
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
        d.setValue(valx.replace(/^0+(?!\,|$)/, '') + " kg");
    }

});