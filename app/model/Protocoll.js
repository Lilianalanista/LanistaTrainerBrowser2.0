/*
 * File: app/model/Protocoll.js
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

Ext.define('LanistaTrainer.model.Protocoll', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Number',
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'int',
            name: 'exercise_id'
        },
        {
            type: 'int',
            name: 'user_exercise_id'
        },
        {
            name: 'execution_date'
        },
        {
            type: 'int',
            name: 'round'
        },
        {
            type: 'float',
            name: 'weight'
        },
        {
            type: 'int',
            name: 'training'
        },
        {
            type: 'string',
            name: 'description'
        },
        {
            type: 'int',
            name: 'user_id'
        },
        {
            type: 'int',
            name: 'training_unit'
        },
        {
            type: 'int',
            name: 'creator_id'
        },
        {
            type: 'int',
            name: 'plan_exercise_id'
        },
        {
            convert: function(v, rec) {
                return rec.data.execution_date.substring ( 0, 10);
            },
            name: 'execution_date_day'
        },
        {
            type: 'int',
            convert: function(v, rec) {
                return (rec.data.exercise_id !== 0) ? rec.data.exercise_id : (rec.data.user_exercise_id !== 0) ? rec.data.user_exercise_id : 99999;


            },
            name: 'exercise_id_forgroup'
        }
    ]
});