/*
 * File: app/model/TestTypesNodes.js
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

Ext.define('LanistaTrainer.model.TestTypesNodes', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'name_DE'
        },
        {
            type: 'string',
            name: 'name_EN'
        },
        {
            type: 'string',
            name: 'name_ES'
        },
        {
            type: 'string',
            name: 'scale_DE'
        },
        {
            type: 'string',
            name: 'scale_EN'
        },
        {
            type: 'string',
            name: 'scale_ES'
        },
        {
            type: 'int',
            name: 'type'
        },
        {
            type: 'int',
            name: 'testtypes_id'
        },
        {
            type: 'int',
            name: 'section_id'
        }
    ]
});