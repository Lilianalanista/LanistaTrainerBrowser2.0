{
    "xdsVersion": "3.0.4",
    "frameworkVersion": "ext42",
    "internals": {
        "type": "Ext.button.Button",
        "reference": {
            "name": "items",
            "type": "array"
        },
        "codeClass": null,
        "userConfig": {
            "cls": "lanista-command-button",
            "designer|userAlias": "lanistaButton",
            "designer|userClassName": "LanistaButton",
            "glyph": null,
            "height": null,
            "icon": null,
            "iconAlign": null,
            "iconCls": null,
            "scale": null,
            "style": null,
            "text": "command"
        },
        "configAlternates": {
            "style": "string"
        },
        "customConfigs": [
            {
                "group": "(Custom Properties)",
                "name": "menuButtonAlign",
                "type": "string"
            }
        ],
        "cn": [
            {
                "type": "basiceventbinding",
                "reference": {
                    "name": "listeners",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "fn": "onButtonMouseOver",
                    "implHandler": [
                        "",
                        "if (button.menu)",
                        "{",
                        "    button.menu.show();",
                        "    if (button.menuButtonAlign == 'left')",
                        "        button.menu.alignTo(button, 'c-c',[150,0]);",
                        "    else",
                        "        if (button.menuButtonAlign == 'right')",
                        "            button.menu.alignTo(button, 'c-c',[-150,0]);",
                        "}",
                        "",
                        "",
                        "",
                        "",
                        ""
                    ],
                    "name": "mouseover",
                    "scope": "me"
                }
            },
            {
                "type": "basiceventbinding",
                "reference": {
                    "name": "listeners",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "fn": "onButtonAfterRender",
                    "implHandler": [
                        "",
                        "if (component.menu)",
                        "{",
                        "    component.menu.addCls('menu-lanista-button');",
                        "    component.menu.on('mouseleave', function() {",
                        "        component.menu.locked = false;",
                        "        component.menu.hide();",
                        "    });",
                        "",
                        "    component.menu.on('mouseenter', function() {",
                        "        component.menu.locked = true;",
                        "    });",
                        "}",
                        ""
                    ],
                    "name": "afterrender",
                    "scope": "me"
                }
            },
            {
                "type": "basiceventbinding",
                "reference": {
                    "name": "listeners",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "fn": "onButtonMouseOut",
                    "implHandler": [
                        "",
                        "setTimeout(function()",
                        "{",
                        "    if (button.menu && !button.menu.locked)",
                        "        button.menu.hide();",
                        "}, 100);",
                        ""
                    ],
                    "name": "mouseout",
                    "scope": "me"
                }
            },
            {
                "type": "basiceventbinding",
                "reference": {
                    "name": "listeners",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "fn": "onButtonClick",
                    "implHandler": [
                        "if (button.menu)",
                        "{",
                        "    button.menu.show();",
                        "    if (button.menuButtonAlign == 'left')",
                        "        button.menu.alignTo(button, 'c-c',[150,0]);",
                        "    else",
                        "        if (button.menuButtonAlign == 'right')",
                        "            button.menu.alignTo(button, 'c-c',[-150,0]);",
                        "}",
                        "else",
                        "{",
                        "    setTimeout(function()",
                        "    {",
                        "        if (button.menu && !button.menu.locked)",
                        "            button.menu.hide();",
                        "    }, 100);",
                        "",
                        "}"
                    ],
                    "name": "click",
                    "scope": "me"
                }
            },
            {
                "type": "basiceventbinding",
                "reference": {
                    "name": "listeners",
                    "type": "array"
                },
                "codeClass": null,
                "userConfig": {
                    "fn": "onButtonHide",
                    "implHandler": [
                        "component.destroy();"
                    ],
                    "name": "hide",
                    "scope": "me"
                }
            }
        ]
    },
    "linkedNodes": {},
    "boundStores": {},
    "boundModels": {}
}