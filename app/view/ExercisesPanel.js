/*
 * File: app/view/ExercisesPanel.js
 *
 * This file was generated by Sencha Architect version 3.0.0.
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

Ext.define('LanistaTrainer.view.ExercisesPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.exercisesPanel',

    border: false,
    height: 250,
    width: 400,
    layout: {
        type: 'fit'
    },
    frameHeader: false,
    headerPosition: 'bottom',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaultDockWeights: {
                top: {
                    render: 1,
                    visual: 1
                },
                left: {
                    render: 3,
                    visual: 5
                },
                right: {
                    render: 5,
                    visual: 7
                },
                bottom: {
                    render: 7,
                    visual: 3
                }
            },
            items: [
                {
                    xtype: 'dataview',
                    height: 250,
                    id: 'MyView',
                    tpl: [
                        '<tpl for=".">',
                        '	<div class="exercise-item">',
                        '        <div class="exercise-list-img exercise-list-img-right" style="background-image: url(resources/images/previews/{ext_id}_2.jpg);"></div>',
                        '    	<div class="exercise-list-img exercise-list-img-left" style="background-image: url(resources/images/previews/{ext_id}_1.jpg);"></div>',
                        '        <div class="exercise-list-text"/>{name_DE}</div>',
                        '    </div>',
                        '</tpl>'
                    ],
                    width: 400,
                    itemSelector: 'div.exercise-item',
                    store: 'ExerciseStore',
                    listeners: {
                        hide: {
                            fn: me.onDataviewHide,
                            scope: me
                        }
                    }
                }
            ],
            tools: [
                {
                    xtype: 'tool',
                    id: 'previousExercises',
                    type: 'left'
                },
                {
                    xtype: 'tool',
                    id: 'nextExercises',
                    type: 'right'
                }
            ]
        });

        me.callParent(arguments);
    },

    onDataviewHide: function(component, eOpts) {
        component.destroy();
    }

});