/*
 * File: app/model/Circumferences.js
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

Ext.define('LanistaTrainer.model.Circumferences', {
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
            name: 'arm_right',
            type: 'float'
        },
        {
            name: 'arm_left',
            type: 'float'
        },
        {
            name: 'waist',
            type: 'float'
        },
        {
            name: 'umbilical',
            type: 'float'
        },
        {
            name: 'chest',
            type: 'float'
        },
        {
            convert: function(v, rec) {
                return rec.data.chest;
            },
            name: 'chest_circ',
            type: 'float'
        },
        {
            name: 'spina_ilica_ant',
            type: 'float'
        },
        {
            name: 'wide_hips',
            type: 'float'
        },
        {
            name: 'quads_right',
            type: 'float'
        },
        {
            name: 'quads_left',
            type: 'float'
        },
        {
            name: 'note',
            type: 'string'
        },
        {
            convert: function(v, rec) {
                return rec.data.note;
            },
            name: 'note_circ',
            type: 'string'
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
            name: 'record_date',
            type: 'date'
        },
        {
            convert: function(v, rec) {
                return rec.data.record_date;
            },
            name: 'record_date_local_circ',
            type: 'string'
        }
    ]
});