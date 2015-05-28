/*
 * File: app/model/Measures.js
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

Ext.define('LanistaTrainer.model.Measures', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'weight',
            type: 'float'
        },
        {
            name: 'trizeps',
            type: 'float'
        },
        {
            name: 'scapula',
            type: 'float'
        },
        {
            name: 'auxiliar',
            type: 'float'
        },
        {
            name: 'chest',
            type: 'float'
        },
        {
            name: 'sprailium',
            type: 'float'
        },
        {
            name: 'abs',
            type: 'float'
        },
        {
            name: 'quads',
            type: 'float'
        },
        {
            name: 'futrex',
            type: 'float'
        },
        {
            name: 'height',
            type: 'float'
        },
        {
            name: 'user_id',
            type: 'int'
        },
        {
            name: 'customer_id',
            type: 'int'
        },
        {
            name: 'note',
            type: 'string'
        },
        {
            name: 'record_date',
            type: 'date'
        },
        {
            convert: function(v, rec) {
                return  this.porcCalculate(rec);
            },
            porcCalculate: function(rec) {
                var birthday = LanistaTrainer.app.currentCustomer.data.birthday,
                    sum, computedFat,dia,mes, ano, fecha_hoy, ahora_ano, ahora_mes, ahora_dia, edad,
                    userGender =  LanistaTrainer.app.currentCustomer.data.gender;

                dia = birthday.getDay();
                mes = birthday.getMonth() - 1;
                ano = birthday.getFullYear();

                fecha_hoy = new Date();
                ahora_ano = fecha_hoy.getYear();
                ahora_mes = fecha_hoy.getMonth()+1;
                ahora_dia = fecha_hoy.getDate();

                edad = (ahora_ano + 1900) - ano;
                if ( ahora_mes < mes )
                {
                    edad--;
                }
                if ((mes == ahora_mes) && (ahora_dia < dia))
                {
                    edad--;
                }
                if (edad > 1900)
                {
                    edad -= 1900;
                }

                sum = 0;
                computedFat = 0;

                sum = rec.data.trizeps + rec.data.scapula + rec.data.auxiliar + rec.data.chest + rec.data.sprailium + rec.data.abs + rec.data.quads;
                if ( sum > 0 ) {
                    if( userGender === 0 ){
                        computedFat =  (Math.round (((4.96/(1.112-0.00043499*sum+0.00000055*sum*sum-0.00028826*edad))-4.5)*10000, 4) / 100);
                    } else {
                        computedFat = (Math.round (((4.96/(1.097-0.00046971*sum+0.00000056*sum*sum-0.00012828*edad))-4.51)*10000, 4) / 100);
                    }
                    rec.data.sum = sum;
                }

                return computedFat;
            },
            name: 'percentage',
            type: 'int'
        },
        {
            name: 'sum',
            type: 'int'
        },
        {
            convert: function(v, rec) {
                return rec.data.record_date;
            },
            name: 'record_date_local',
            type: 'string'
        }
    ]
});