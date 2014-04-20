/*
 * File: app/model/Plan.js
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

Ext.define('LanistaTrainer.model.Plan', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.association.HasMany'
    ],
    uses: [
        'LanistaTrainer.model.PlanExercise'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'template',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'days',
            type: 'int'
        },
        {
            name: 'duration',
            type: 'int'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'customer_id',
            type: 'int'
        },
        {
            name: 'trainer_id',
            type: 'int'
        },
        {
            name: 'creator_name',
            type: 'string'
        },
        {
            dateFormat: 'Y-m-d H:i:s',
            name: 'creation_date',
            type: 'date'
        },
        {
            dateFormat: 'Y-m-d H:i:s',
            name: 'changed_date',
            type: 'date'
        },
        {
            name: 'category',
            type: 'int'
        },
        {
            name: 'public_template',
            type: 'int'
        }
    ],

    hasMany: {
        model: 'LanistaTrainer.model.PlanExercise',
        name: 'planexercise'
    }
});