/*
 * File: app/view/CustomerInfoPanel.js
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

Ext.define('LanistaTrainer.view.CustomerInfoPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.customerInfoPanel',

    requires: [
        'LanistaTrainer.view.CustomerInfoPanelViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Hidden'
    ],

    viewModel: {
        type: 'customerInfoPanel'
    },
    border: false,
    cls: 'lanista-user-info-panel',
    height: 250,
    id: 'customerInfoPanel',
    style: 'padding-top: 100px; height: 500px;',
    width: 400,
    layout: 'auto',
    header: false,
    trackResetOnLoad: true,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onUserInfoPanelAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'fieldset',
                        border: true,
                        cls: 'lanista-user-fieldset',
                        id: 'customer_personalData',
                        items: [
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_email',
                                hideEmptyLabel: false,
                                name: 'email',
                                validateOnChange: false,
                                validateOnBlur: false,
                                enableKeyEvents: true,
                                selectOnFocus: true
                            },
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_first_name',
                                hideEmptyLabel: false,
                                name: 'first_name',
                                validateOnChange: false,
                                validateOnBlur: false,
                                enableKeyEvents: true
                            },
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_last_name',
                                hideEmptyLabel: false,
                                name: 'last_name',
                                validateOnChange: false,
                                validateOnBlur: false,
                                enableKeyEvents: true
                            },
                            {
                                xtype: 'datefield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_birthdate',
                                name: 'birthday',
                                format: 'd M, Y',
                                listeners: {
                                    change: 'onCustomer_birthdateChange'
                                }
                            },
                            me.processCustomer_gender({
                                xtype: 'combobox',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_gender',
                                fieldLabel: 'Label',
                                name: 'gender',
                                editable: false,
                                enableKeyEvents: true
                            }),
                            me.processCustomer_language({
                                xtype: 'combobox',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_language',
                                fieldLabel: 'Label',
                                name: 'language',
                                editable: false,
                                enableKeyEvents: true
                            }),
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_phone_nr',
                                fieldLabel: 'Label',
                                name: 'phone_nr',
                                enableKeyEvents: true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        border: true,
                        cls: 'lanista-user-fieldset',
                        height: 255,
                        id: 'customer_companyContacts',
                        items: [
                            me.processCustomer_country({
                                xtype: 'combobox',
                                anchor: '100%',
                                autoRender: true,
                                cls: 'lanista-user-settings-field',
                                id: 'customer_country',
                                fieldLabel: 'Label',
                                name: 'country',
                                enableKeyEvents: true,
                                selectOnFocus: true,
                                forceSelection: true,
                                queryCaching: false,
                                queryMode: 'local',
                                typeAhead: true
                            }),
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_zipcode',
                                fieldLabel: 'Label',
                                name: 'zipcode',
                                enableKeyEvents: true
                            },
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_street',
                                fieldLabel: 'Label',
                                name: 'street',
                                enableKeyEvents: true
                            },
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_city',
                                fieldLabel: 'Label',
                                name: 'city',
                                enableKeyEvents: true
                            }
                        ]
                    },
                    {
                        xtype: 'hiddenfield',
                        id: 'customer_id',
                        name: 'id'
                    },
                    {
                        xtype: 'fieldset',
                        cls: 'lanista-user-fieldset',
                        hidden: true,
                        id: 'customer_trainerGymName',
                        items: [
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                cls: 'lanista-user-settings-field',
                                id: 'customer_trainerGym',
                                fieldLabel: 'Label',
                                name: 'trainerGymName'
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processCustomer_gender: function(config) {

        config.tpl = Ext.create("Ext.XTemplate",
                                '<tpl for="."><div class="x-boundlist-item">{GenderName}</div></tpl>');

        config.displayTpl = Ext.create("Ext.XTemplate",
                                       '<tpl for=".">{GenderName}</tpl>');

        config.valueField = 'GenderId';

        return config;
    },

    processCustomer_language: function(config) {
        var server =	'http://' + window.location.host,
            root =		Ext.ux.ConfigManager.getRoot() + '/LanistaTrainerBrowser2.0/';

        config.tpl = Ext.create("Ext.XTemplate",
                                '<tpl for="."><div class="x-boundlist-item"><img src=' + server + root + 'resources/images/flags/{image} /> {LanguageName}</div></tpl>');

        config.displayTpl = Ext.create("Ext.XTemplate",
                                       '<tpl for=".">{LanguageName}</tpl>');

        config.valueField = 'IdLanguage';

        return config;
    },

    processCustomer_country: function(config) {
        var server =	'http://' + window.location.host,
            root =		Ext.ux.ConfigManager.getRoot() + '/LanistaTrainerBrowser2.0/';

        config.tpl = Ext.create("Ext.XTemplate",
                                '<tpl for="."><div class="x-boundlist-item"><img src=' + server + root + 'resources/images/flags/{value}.png />{text}</div></tpl>');


        config.displayTpl = Ext.create("Ext.XTemplate",
                                       '<tpl for=".">{text}</tpl>');

        config.valueField = 'value';
        config.displayField = 'text';

        return config;
    },

    onCustomer_birthdateChange: function(field, newValue, oldValue, eOpts) {
        //console.log(oldValue);
        //console.log(newValue);
    },

    onUserInfoPanelAfterRender: function(component, eOpts) {

        var fields = component.getForm().getFields(),
            user = Ext.ux.SessionManager.getUser(),

            languagesStore = Ext.create('Ext.data.Store', {
                             fields: ['image', 'LanguageName', 'IdLanguage'],
                             data : [
                                        {"image": "es.png", "LanguageName":"Español", "IdLanguage":"ES"},
                                        {"image": "de.png", "LanguageName":"Deutsch", "IdLanguage":"DE"},
                                        {"image": "gb.png", "LanguageName":"English", "IdLanguage":"EN"}
                                     ]
             }),

            genderStore = Ext.create('Ext.data.Store', {
                             fields: ['GenderName', 'GenderId'],
                             data : [
                                        {"GenderName": Ext.ux.LanguageManager.TranslationArray.GENDER_FEMENINE.toUpperCase(), "GenderId":0},
                                        {"GenderName": Ext.ux.LanguageManager.TranslationArray.GENDER_MASCULINE.toUpperCase(), "GenderId":1}
                                     ]
             }),


            countryStore = Ext.create('Ext.data.Store', {
                           fields: ['value', 'text'],
                           data:   [
                                    {value:"DE",text:"Deutschland"},
                                    {value:"AF",text:"Afghanistan"},
                                    {value:"AX",text:"Åland Islands"},
                                    {value:"AL",text:"Albania"},
                                    {value:"DZ",text:"Algeria"},
                                    {value:"AS",text:"American Samoa"},
                                    {value:"AD",text:"Andorra"},
                                    {value:"AO",text:"Angola"},
                                    {value:"AI",text:"Anguilla"},
                                    {value:"AQ",text:"Antarctica"},
                                    {value:"AG",text:"Antigua and Barbuda"},
                                    {value:"AR",text:"Argentina"},
                                    {value:"AM",text:"Armenia"},
                                    {value:"AW",text:"Aruba"},
                                    {value:"AU",text:"Australia"},
                                    {value:"AT",text:"Austria"},
                                    {value:"AZ",text:"Azerbaijan"},
                                    {value:"BS",text:"Bahamas"},
                                    {value:"BH",text:"Bahrain"},
                                    {value:"BD",text:"Bangladesh"},
                                    {value:"BB",text:"Barbados"},
                                    {value:"BY",text:"Belarus"},
                                    {value:"BE",text:"Belgium"},
                                    {value:"BZ",text:"Belize"},
                                    {value:"BJ",text:"Benin"},
                                    {value:"BM",text:"Bermuda"},
                                    {value:"BT",text:"Bhutan"},
                                    {value:"BO",text:"Bolivia, Plurinational State of"},
                                    {value:"BQ",text:"Bonaire, Sint Eustatius and Saba"},
                                    {value:"BA",text:"Bosnia and Herzegovina"},
                                    {value:"BW",text:"Botswana"},
                                    {value:"BV",text:"Bouvet Island"},
                                    {value:"BR",text:"Brazil"},
                                    {value:"IO",text:"British Indian Ocean Territory"},
                                    {value:"BN",text:"Brunei Darussalam"},
                                    {value:"BG",text:"Bulgaria"},
                                    {value:"BF",text:"Burkina Faso"},
                                    {value:"BI",text:"Burundi"},
                                    {value:"KH",text:"Cambodia"},
                                    {value:"CM",text:"Cameroon"},
                                    {value:"CA",text:"Canada"},
                                    {value:"CV",text:"Cape Verde"},
                                    {value:"KY",text:"Cayman Islands"},
                                    {value:"CF",text:"Central African Republic"},
                                    {value:"TD",text:"Chad"},
                                    {value:"CL",text:"Chile"},
                                    {value:"CN",text:"China"},
                                    {value:"CX",text:"Christmas Island"},
                                    {value:"CC",text:"Cocos (Keeling) Islands"},
                                    {value:"CO",text:"Colombia"},
                                    {value:"KM",text:"Comoros"},
                                    {value:"CG",text:"Congo"},
                                    {value:"CD",text:"Congo, the Democratic Republic of the"},
                                    {value:"CK",text:"Cook Islands"},
                                    {value:"CR",text:"Costa Rica"},
                                    {value:"CI",text:"Côte d'Ivoire"},
                                    {value:"HR",text:"Croatia"},
                                    {value:"CU",text:"Cuba"},
                                    {value:"CW",text:"Curaçao"},
                                    {value:"CY",text:"Cyprus"},
                                    {value:"CZ",text:"Czech Republic"},
                                    {value:"DK",text:"Denmark"},
                                    {value:"DJ",text:"Djibouti"},
                                    {value:"DM",text:"Dominica"},
                                    {value:"DO",text:"Dominican Republic"},
                                    {value:"EC",text:"Ecuador"},
                                    {value:"EG",text:"Egypt"},
                                    {value:"SV",text:"El Salvador"},
                                    {value:"GQ",text:"Equatorial Guinea"},
                                    {value:"ER",text:"Eritrea"},
                                    {value:"EE",text:"Estonia"},
                                    {value:"ET",text:"Ethiopia"},
                                    {value:"FK",text:"Falkland Islands (Malvinas)"},
                                    {value:"FO",text:"Faroe Islands"},
                                    {value:"FJ",text:"Fiji"},
                                    {value:"FI",text:"Finland"},
                                    {value:"FR",text:"France"},
                                    {value:"GF",text:"French Guiana"},
                                    {value:"PF",text:"French Polynesia"},
                                    {value:"TF",text:"French Southern Territories"},
                                    {value:"GA",text:"Gabon"},
                                    {value:"GM",text:"Gambia"},
                                    {value:"GE",text:"Georgia"},
                                    {value:"GH",text:"Ghana"},
                                    {value:"GI",text:"Gibraltar"},
                                    {value:"GR",text:"Greece"},
                                    {value:"GL",text:"Greenland"},
                                    {value:"GD",text:"Grenada"},
                                    {value:"GP",text:"Guadeloupe"},
                                    {value:"GU",text:"Guam"},
                                    {value:"GT",text:"Guatemala"},
                                    {value:"GG",text:"Guernsey"},
                                    {value:"GN",text:"Guinea"},
                                    {value:"GW",text:"Guinea-Bissau"},
                                    {value:"GY",text:"Guyana"},
                                    {value:"HT",text:"Haiti"},
                                    {value:"HM",text:"Heard Island and McDonald Islands"},
                                    {value:"VA",text:"Holy See (Vatican City State)"},
                                    {value:"HN",text:"Honduras"},
                                    {value:"HK",text:"Hong Kong"},
                                    {value:"HU",text:"Hungary"},
                                    {value:"IS",text:"Iceland"},
                                    {value:"IN",text:"India"},
                                    {value:"ID",text:"Indonesia"},
                                    {value:"IR",text:"Iran, Islamic Republic of"},
                                    {value:"IQ",text:"Iraq"},
                                    {value:"IE",text:"Ireland"},
                                    {value:"IM",text:"Isle of Man"},
                                    {value:"IL",text:"Israel"},
                                    {value:"IT",text:"Italy"},
                                    {value:"JM",text:"Jamaica"},
                                    {value:"JP",text:"Japan"},
                                    {value:"JE",text:"Jersey"},
                                    {value:"JO",text:"Jordan"},
                                    {value:"KZ",text:"Kazakhstan"},
                                    {value:"KE",text:"Kenya"},
                                    {value:"KI",text:"Kiribati"},
                                    {value:"KP",text:"Korea, Democratic People's Republic of"},
                                    {value:"KR",text:"Korea, Republic of"},
                                    {value:"KW",text:"Kuwait"},
                                    {value:"KG",text:"Kyrgyzstan"},
                                    {value:"LA",text:"Lao People's Democratic Republic"},
                                    {value:"LV",text:"Latvia"},
                                    {value:"LB",text:"Lebanon"},
                                    {value:"LS",text:"Lesotho"},
                                    {value:"LR",text:"Liberia"},
                                    {value:"LY",text:"Libya"},
                                    {value:"LI",text:"Liechtenstein"},
                                    {value:"LT",text:"Lithuania"},
                                    {value:"LU",text:"Luxembourg"},
                                    {value:"MO",text:"Macao"},
                                    {value:"MK",text:"Macedonia, the former Yugoslav Republic of"},
                                    {value:"MG",text:"Madagascar"},
                                    {value:"MW",text:"Malawi"},
                                    {value:"MY",text:"Malaysia"},
                                    {value:"MV",text:"Maldives"},
                                    {value:"ML",text:"Mali"},
                                    {value:"MT",text:"Malta"},
                                    {value:"MH",text:"Marshall Islands"},
                                    {value:"MQ",text:"Martinique"},
                                    {value:"MR",text:"Mauritania"},
                                    {value:"MU",text:"Mauritius"},
                                    {value:"YT",text:"Mayotte"},
                                    {value:"MX",text:"Mexico"},
                                    {value:"FM",text:"Micronesia, Federated States of"},
                                    {value:"MD",text:"Moldova, Republic of"},
                                    {value:"MC",text:"Monaco"},
                                    {value:"MN",text:"Mongolia"},
                                    {value:"ME",text:"Montenegro"},
                                    {value:"MS",text:"Montserrat"},
                                    {value:"MA",text:"Morocco"},
                                    {value:"MZ",text:"Mozambique"},
                                    {value:"MM",text:"Myanmar"},
                                    {value:"NA",text:"Namibia"},
                                    {value:"NR",text:"Nauru"},
                                    {value:"NP",text:"Nepal"},
                                    {value:"NL",text:"Netherlands"},
                                    {value:"NC",text:"New Caledonia"},
                                    {value:"NZ",text:"New Zealand"},
                                    {value:"NI",text:"Nicaragua"},
                                    {value:"NE",text:"Niger"},
                                    {value:"NG",text:"Nigeria"},
                                    {value:"NU",text:"Niue"},
                                    {value:"NF",text:"Norfolk Island"},
                                    {value:"MP",text:"Northern Mariana Islands"},
                                    {value:"NO",text:"Norway"},
                                    {value:"OM",text:"Oman"},
                                    {value:"PK",text:"Pakistan"},
                                    {value:"PW",text:"Palau"},
                                    {value:"PS",text:"Palestinian Territory, Occupied"},
                                    {value:"PA",text:"Panama"},
                                    {value:"PG",text:"Papua New Guinea"},
                                    {value:"PY",text:"Paraguay"},
                                    {value:"PE",text:"Peru"},
                                    {value:"PH",text:"Philippines"},
                                    {value:"PN",text:"Pitcairn"},
                                    {value:"PL",text:"Poland"},
                                    {value:"PT",text:"Portugal"},
                                    {value:"PR",text:"Puerto Rico"},
                                    {value:"QA",text:"Qatar"},
                                    {value:"RE",text:"Réunion"},
                                    {value:"RO",text:"Romania"},
                                    {value:"RU",text:"Russian Federation"},
                                    {value:"RW",text:"Rwanda"},
                                    {value:"BL",text:"Saint Barthélemy"},
                                    {value:"SH",text:"Saint Helena, Ascension and Tristan da Cunha"},
                                    {value:"KN",text:"Saint Kitts and Nevis"},
                                    {value:"LC",text:"Saint Lucia"},
                                    {value:"MF",text:"Saint Martin (French part)"},
                                    {value:"PM",text:"Saint Pierre and Miquelon"},
                                    {value:"VC",text:"Saint Vincent and the Grenadines"},
                                    {value:"WS",text:"Samoa"},
                                    {value:"SM",text:"San Marino"},
                                    {value:"ST",text:"Sao Tome and Principe"},
                                    {value:"SA",text:"Saudi Arabia"},
                                    {value:"SN",text:"Senegal"},
                                    {value:"RS",text:"Serbia"},
                                    {value:"SC",text:"Seychelles"},
                                    {value:"SL",text:"Sierra Leone"},
                                    {value:"SG",text:"Singapore"},
                                    {value:"SX",text:"Sint Maarten (Dutch part)"},
                                    {value:"SK",text:"Slovakia"},
                                    {value:"SI",text:"Slovenia"},
                                    {value:"SB",text:"Solomon Islands"},
                                    {value:"SO",text:"Somalia"},
                                    {value:"ZA",text:"South Africa"},
                                    {value:"GS",text:"South Georgia and the South Sandwich Islands"},
                                    {value:"SS",text:"South Sudan"},
                                    {value:"ES",text:"Spain"},
                                    {value:"LK",text:"Sri Lanka"},
                                    {value:"SD",text:"Sudan"},
                                    {value:"SR",text:"Suriname"},
                                    {value:"SJ",text:"Svalbard and Jan Mayen"},
                                    {value:"SZ",text:"Swaziland"},
                                    {value:"SE",text:"Sweden"},
                                    {value:"CH",text:"Switzerland"},
                                    {value:"SY",text:"Syrian Arab Republic"},
                                    {value:"TW",text:"Taiwan, Province of China"},
                                    {value:"TJ",text:"Tajikistan"},
                                    {value:"TZ",text:"Tanzania, United Republic of"},
                                    {value:"TH",text:"Thailand"},
                                    {value:"TL",text:"Timor-Leste"},
                                    {value:"TG",text:"Togo"},
                                    {value:"TK",text:"Tokelau"},
                                    {value:"TO",text:"Tonga"},
                                    {value:"TT",text:"Trinidad and Tobago"},
                                    {value:"TN",text:"Tunisia"},
                                    {value:"TR",text:"Turkey"},
                                    {value:"TM",text:"Turkmenistan"},
                                    {value:"TC",text:"Turks and Caicos Islands"},
                                    {value:"TV",text:"Tuvalu"},
                                    {value:"UG",text:"Uganda"},
                                    {value:"UA",text:"Ukraine"},
                                    {value:"AE",text:"United Arab Emirates"},
                                    {value:"GB",text:"United Kingdom"},
                                    {value:"US",text:"United States"},
                                    {value:"UM",text:"United States Minor Outlying Islands"},
                                    {value:"UY",text:"Uruguay"},
                                    {value:"UZ",text:"Uzbekistan"},
                                    {value:"VU",text:"Vanuatu"},
                                    {value:"VE",text:"Venezuela, Bolivarian Republic of"},
                                    {value:"VN",text:"Viet Nam"},
                                    {value:"VG",text:"Virgin Islands, British"},
                                    {value:"VI",text:"Virgin Islands, U.S."},
                                    {value:"WF",text:"Wallis and Futuna"},
                                    {value:"EH",text:"Western Sahara"},
                                    {value:"YE",text:"Yemen"},
                                    {value:"ZM",text:"Zambia"},
                                    {value:"ZW",text:"Zimbabwe"}
                                   ]

            });


        fields.getByKey('customer_birthdate').setValue(Ext.Date.format(fields.getByKey('customer_birthdate').getValue(), 'Y-m-d'));
        fields.getByKey('customer_language').bindStore(languagesStore);
        fields.getByKey('customer_country').bindStore(countryStore);
        fields.getByKey('customer_gender').bindStore(genderStore);

        countryStore.load();
        languagesStore.load();
        genderStore.load();

        fields.getByKey('customer_email').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_EMAIL);
        fields.getByKey('customer_first_name').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_FIRSTNAME);
        fields.getByKey('customer_last_name').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_LASTNAME);
        fields.getByKey('customer_language').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_LANGUAGE);
        fields.getByKey('customer_phone_nr').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.COMPANY_PHONE_NR);
        fields.getByKey('customer_country').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_CONTRY);
        fields.getByKey('customer_zipcode').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_ZIP);
        fields.getByKey('customer_street').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_STREET);
        fields.getByKey('customer_city').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_CITY);
        fields.getByKey('customer_birthdate').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_BIRTHDATE);
        fields.getByKey('customer_gender').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_GENDER);


        document.getElementsByName("email")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_EMAIL;
        document.getElementsByName("first_name")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_FIRSTNAME;
        document.getElementsByName("last_name")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_LASTNAME;
        document.getElementsByName("language")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_LANGUAGE;
        document.getElementsByName("phone_nr")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.COMPANY_PHONE_NR;
        document.getElementsByName("country")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_CONTRY;
        document.getElementsByName("zipcode")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_ZIP;
        document.getElementsByName("street")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_STREET;
        document.getElementsByName("city")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_CITY;
        document.getElementsByName("birthday")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_BIRTHDATE;
        document.getElementsByName("gender")[0].placeholder = Ext.ux.LanguageManager.TranslationArray.FORM_CUSTOMER_DATA_GENDER;

        if (user.role !== '2' ){
            component.down('#customer_companyContacts').hide();
            component.down('#customer_trainerGymName').show();
            fields.getByKey('customer_trainerGym').setFieldLabel(Ext.ux.LanguageManager.TranslationArray.PLAN_FROM_TRAINER);
        }


        fields.each(function(field)
                        {field.on('change',function(f,n,o)
                                    {
                                        //f: field;  n: new value;  o: old value
                                        LanistaTrainer.app.fireEvent('showSavePanel', 'saveSettingsCustomerButton', 'cancelSettingsCustomerButton');
                                    }
                                 );
                         field.on('keypress',function(f,e,opts)
                                    {
                                        //f: field;  e: key pressed;  o: options
                                        if(e.getKey() == e.ENTER){
                                            if ( !Ext.getCmp('rightCommandPanel').down('#saveSettingsCustomerButton').hidden )
                                                Ext.getCmp('rightCommandPanel').down('#saveSettingsCustomerButton').fireEvent('click', function() {
                                                    f.focus();
                                                });
                                        }
                                    }
                                 );
                        }
                   );













    }

});