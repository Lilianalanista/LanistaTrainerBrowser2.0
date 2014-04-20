/*
 * File: app/view/WeightPicker.js
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

Ext.define('LanistaTrainer.view.WeightPicker', {
    extend: 'Ext.container.Container',
    alias: 'widget.weightPicker',

    requires: [
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.container.Container'
    ],

    cls: 'lanista-weightPicker',
    id: 'weightPicker',
    width: 400,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    id: 'protocollKgValue',
                    readOnly: true
                },
                {
                    xtype: 'button',
                    id: 'clearWeightEntryButton',
                    listeners: {
                        click: {
                            fn: me.onClearWeightEntryButtonClick,
                            scope: me
                        }
                    }
                },
                me.processNumberpad({
                    xtype: 'container',
                    cls: 'numberpad',
                    id: 'numberpad',
                    defaults: {
                        cls: 'numberpad-button'
                    },
                    listeners: {
                        afterrender: {
                            fn: me.onNumberpadAfterRender,
                            scope: me
                        }
                    }
                }),
                me.processTrainingHelpbuttons({
                    xtype: 'container',
                    cls: 'training-helpbuttons',
                    id: 'trainingHelpbuttons',
                    defaults: {
                        cls: 'weight-option-button'
                    },
                    listeners: {
                        afterrender: {
                            fn: me.onTrainingHelpbuttonsAfterRender,
                            scope: me
                        }
                    }
                })
            ],
            listeners: {
                afterrender: {
                    fn: me.onWeightPickerAfterRender,
                    scope: me
                },
                hide: {
                    fn: me.onWeightPickerHide,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    processNumberpad: function(config) {
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
                                html: '<div class="lanista-weight-item">,00</div>',
                                value: 00
                            }
                        ];


        return config;
    },

    processTrainingHelpbuttons: function(config) {
        config.items = [
                            {
                                html: '<div class="lanista-traininghelp-item" value="-0.5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '1/2 kg'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="0.5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="-1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '1 kg'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="1" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="-2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '2 kg'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="2" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="-5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '5 kg'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="5" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="-10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">T</div>'
                            },
                            {
                                html: '10 kg'
                            },
                            {
                                html: '<div class="lanista-traininghelp-item" value="10" style="font-family:Lanista Icons; color: #4aacd8; font-size: 32px;">U</div>'
                            }
                        ];
        return config;
    },

    onClearWeightEntryButtonClick: function(button, e, eOpts) {
        button.up().setValue('0,00');
    },

    onNumberpadAfterRender: function(component, eOpts) {
        el = component.el;

        el.on(
            'click', function(e,t) {
                    var currentEntry = this.getValue(),
                    currentValue = currentEntry.substring(0, currentEntry.indexOf('kg') -1);

                    if (t.innerHTML != '&lt;-')
                        value = currentValue + t.innerHTML;
                    else
                        value = currentValue.substring(0, currentValue.length-1);
                    this.setValue(value);

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

    onTrainingHelpbuttonsAfterRender: function(component, eOpts) {
        el = component.el;

        el.on(
            'click', function(e,t) {
                var currentValue = parseFloat(this.getValue().replace(',', '.')),
                    calculation = (currentValue + parseFloat(t.getAttribute('value'))).toFixed(2);

                if ( calculation >= 0 )
                    this.setValue(calculation);
                else
                    this.setValue(0);
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

    onWeightPickerAfterRender: function(component, eOpts) {

        //this.down ( '#abortWeightSelection' ).setText ( Ext.ux.LanguageManager.TranslationArray.CLOSE );
        this.down ( '#clearWeightEntryButton' ).setText ( Ext.ux.LanguageManager.TranslationArray.BUTTON_RESET );

    },

    onWeightPickerHide: function(component, eOpts) {
        component.destroy ( );
    },

    setValue: function(value) {
        if (value) {
            this.down ( '#protocollKgValue' ).setValue(value);
            this.mascara(this.down ( '#protocollKgValue' ));
        } else {
            this.down ( '#protocollKgValue' ).setValue('0,00');
            this.mascara(this.down ( '#protocollKgValue' ));
        }
    },

    getValue: function() {
        return this.down ( '#protocollKgValue' ).getValue();
    },

    setRecord: function(record) {
        this.record = record;
        this.setValue ( record.weight );

    },

    mascara: function(d) {
        var pat = new Array(2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3),
            val2 = (d.getValue()+'').replace(".", ","),
            decimalSeparator = ',';

        if (val2.indexOf(decimalSeparator) == -1) val2 += decimalSeparator + '00';
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