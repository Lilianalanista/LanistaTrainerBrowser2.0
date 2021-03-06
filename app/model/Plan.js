/*
 * File: app/model/Plan.js
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

Ext.define('LanistaTrainer.model.Plan', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date'
    ],

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'int',
            name: 'template'
        },
        {
            type: 'string',
            name: 'name'
        },
        {
            type: 'int',
            name: 'days'
        },
        {
            type: 'int',
            name: 'duration'
        },
        {
            type: 'string',
            name: 'description'
        },
        {
            type: 'int',
            name: 'customer_id'
        },
        {
            type: 'int',
            name: 'trainer_id'
        },
        {
            type: 'string',
            name: 'creator_first_name'
        },
        {
            type: 'string',
            name: 'creator_last_name'
        },
        {
            type: 'date',
            name: 'changed_date'
        },
        {
            type: 'int',
            name: 'category'
        },
        {
            type: 'int',
            name: 'public_template'
        },
        {
            type: 'int',
            name: 'person_id'
        },
        {
            convert: function(v, rec) {
                var creationDate;

                creationDate = Ext.Date.parseDate( rec.data.creation_date, "Y-m-d H:i:s" );
                if (isNaN(creationDate)) {
                    creationDate = '';
                }

                creationDate = new Date(creationDate);
                dia = creationDate.getDate().toString().length === 1 ? '0' + creationDate.getDate() : creationDate.getDate();
                mes = creationDate.getMonth() + 1;
                mes = mes.toString().length === 1 ? '0' + mes : mes;
                ano = creationDate.getFullYear();


                return ano + '-' + mes + '-' + dia;

            },
            name: 'creation_date_string'
        },
        {
            name: 'creation_date'
        }
    ],

    hasMany: {
        model: 'LanistaTrainer.model.PlanExercise',
        name: 'planexercises'
    }
});