/*
 * File: app/controller/ImageController.js
 *
 * This file was generated by Sencha Architect version 3.0.2.
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

Ext.define('LanistaTrainer.controller.ImageController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.imageController',

    id: 'imageController',

    refs: [
        {
            ref: 'mainStage',
            selector: '#mainStage'
        },
        {
            ref: 'rightCommandPanel',
            selector: '#rightCommandPanel'
        },
        {
            ref: 'leftCommandPanel',
            selector: '#leftCommandPanel'
        },
        {
            ref: 'mainViewport',
            selector: 'mainViewport'
        },
        {
            autoCreate: true,
            ref: 'imagePanel',
            selector: '#imagePanel',
            xtype: 'imagePanel'
        }
    ],

    onRotateImageButtonClick: function(button, e, eOpts) {
        var controller = this;
        Ext.Ajax.request({
            url: controller.url_params.type ? (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + "/tpmanager/user/rotateimage") : Ext.ux.ConfigManager.getRoot() + "/tpmanager/exercise/rotateimage",
            method: 'post',
            params: {
                user_id: LanistaTrainer.app.currentCustomer ? LanistaTrainer.app.currentCustomer.data.remote_id : localStorage.getItem("user_id"),
                type: controller.url_params.type,
                exercise_id: controller.url_params.exercise_id,
                order: controller.url_params.order
            },
            headers: {
                user_id: localStorage.getItem("user_id")

            },
            failure : function(response){
                var data = Ext.decode(response.responseText);
                Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_INVITATION_ERROR_1, Ext.ux.LanguageManager.TranslationArray.MSG_INVITATION_ERROR_2, Ext.emptyFn);
                console.log("ERROR CROPPING IMAGE");
                console.log(data);
            },
            success: function(response, opts) {
                var data = Ext.decode(response.responseText);
                console.log("ROTATE SUCCESSFULL");
                var src		= controller.image.src;
                controller.getImagePanel().down('#change-image-panel').hide();
                controller.getImagePanel().down('#change-image-panel').destroy(true);
                $('.jcrop-holder').remove();
                controller.setImage(src);
            }
        });
    },

    onCloseImagePanelButtonClick: function(button, e, eOpts) {
        LanistaTrainer.app.panels.splice(LanistaTrainer.app.panels.length - 1, 1);
        LanistaTrainer.app.fireEvent('closeImagePanel', function() {
            LanistaTrainer.app.fireEvent('show' + LanistaTrainer.app.panels[LanistaTrainer.app.panels.length - 1]);
        });
    },

    onCropImageButtonClick: function(button, e, eOpts) {
        var controller = this;
        LanistaTrainer.app.fireEvent("cropImage");

        console.log( controller );

        var params = {
            h: controller.image.h,
            w: controller.image.w,
            x: controller.image.x,
            y: controller.image.y,
            scale: controller.image.scale,
            type: controller.url_params.type
        };
        if (params.h === 0 || params.w === 0) {
            Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_CROP_ERROR_1, Ext.ux.LanguageManager.TranslationArray.MSG_CROP_ERROR_2, Ext.emptyFn);
        }

        console.log ( controller.url_params.type );

        Ext.Ajax.request({
            url: controller.url_params.type ? (Ext.ux.ConfigManager.getServer() + Ext.ux.ConfigManager.getRoot() + "/tpmanager/user/cropphoto") : Ext.ux.ConfigManager.getRoot() + "/tpmanager/exercise/cropphoto",
            method: 'post',
            params: {
                user_id: LanistaTrainer.app.currentCustomer ? LanistaTrainer.app.currentCustomer.data.id : localStorage.getItem("user_id"),
                exercise_id: controller.url_params.exercise_id,
                order: controller.url_params.order,
                x: (params.x/params.scale),
                y: (params.y/params.scale),
                h: (params.h/params.scale),
                w: (params.w/params.scale),
                type: params.type
            },
            headers: {
                user_id: localStorage.getItem("user_id")
            },
            failure : function(response){
                var data = Ext.decode(response.responseText);
                Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_INVITATION_ERROR_1, Ext.ux.LanguageManager.TranslationArray.MSG_INVITATION_ERROR_2, Ext.emptyFn);
                console.log("ERROR CROPPING IMAGE");
                console.log(data);
            },
            success: function(response, opts) {
                var data = Ext.decode(response.responseText);
                console.log("CROP SUCCESSFULL");
                var src		= controller.image.src;
                controller.getImagePanel().down('#change-image-panel').hide();
                controller.getImagePanel().down('#change-image-panel').destroy(true);
                $('.jcrop-holder').remove();
                controller.setImage(src);
            }
        });


    },

    onShowImagePanel: function(imageField, caller, url, url_params, callback) {

        var controller = this,
            mainStage	= controller.getMainStage();

        this.image				= imageField;
        this.callerController	= caller;
        this.url				= url;
        this.url_params			= url_params;

        var width	= imageField.getWidth(),
            height	= imageField.getHeight(),
            src		= imageField.src;

        LanistaTrainer.app.fireEvent('close' + caller, function() {
                mainStage.add(controller.getImagePanel());
                LanistaTrainer.app.setStandardButtons('closeImagePanelButton');

                var img = null;

                console.log("IMAGE WIDTH: " + width);
                console.log("IMAGE HEIGHT: " + height);

                img = controller.setImage(src, height, width);

            /*
                var newButton = Ext.create('Ext.field.File', {
                    iconCls: 'lanista-upload',
                    label: Ext.ux.LanguageManager.TranslationArray.BUTTON_UPLOAD,
                    itemId: 'newImageButton',
                    lable: Ext.ux.LanguageManager.TranslationArray.BUTTON_UPLOAD,
                    accept: 'image',
                    cls: [
                        'image-upload-button',
                        'lanista-command-buton'
                    ]
                });
            */
                var newButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                    //iconCls: 'lanista-upload',
                    glyph: '67@Lanista Icons', //C
                    text: Ext.ux.LanguageManager.TranslationArray.BUTTON_UPLOAD,
                    itemId: 'uploadImageButton',
                    id: 'uploadImageButton'

                });
                newButton.on ('hide', function(component){
                                                            component.destroy(true);
                                                         });

                var changeButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                    //iconCls: 'lanista-crop',
                    glyph: '69@Lanista Icons', //E
                    text: Ext.ux.LanguageManager.TranslationArray.CHANGE,
                    itemId: 'cropImageButton'
                });
                var rotateButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                    //iconCls: 'lanista-undo',
                    glyph: '70@Lanista Icons', //F
                    text: Ext.ux.LanguageManager.TranslationArray.BUTTON_ROTATE,
                    itemId: 'rotateImageButton'
                });
                var removeButton = Ext.create('LanistaTrainer.view.LanistaButton', {
                    //iconCls: 'lanista-trash',
                    glyph: '117@Lanista Icons', //u
                    text: Ext.ux.LanguageManager.TranslationArray.DELETE,
                    itemId: 'deleteImageButton'
                });


          /*  cls: [
                        //'lanista-command-buton',
                        //'lanista-command-buton-red'
                    ]

          */

                controller.getRightCommandPanel().add(
                    newButton
                );
                controller.getRightCommandPanel().add(
                    changeButton
                );
                controller.getRightCommandPanel().add(
                    rotateButton
                );
                controller.getRightCommandPanel().add(
                    removeButton
                );

                newButton.show();
                changeButton.show();
                rotateButton.show();
                removeButton.show();


            console.log('BOTON....');
            console.log(newButton);



                newButton.el.dom.onchange = function(e) {
                    if (e.target.files.length > 0) {
                        Lanista.app.fireEvent("uploadFile", newButton);
                    }  else {
                        Ext.Msg.alert(Ext.ux.LanguageManager.TranslationArray.MSG_FILE_ERROR_1, Ext.ux.LanguageManager.TranslationArray.MSG_FILE_ERROR_2, Ext.emptyFn);
                    }
                };

                LanistaTrainer.app.fireEvent('showImageHeaderUpdate');
                LanistaTrainer.app.fireEvent('showStage');

                controller.uploader = new plupload.Uploader({
                        browse_button: 'uploadImageButton', // this can be an id of a DOM element or the DOM element itself
                        url: controller.url,
                        headers: {
                            user_id: localStorage.getItem("user_id"),
                            exercise_id: controller.url_params.exercise_id,
                            order: controller.url_params.order,
                            type: controller.url_params.type,
                            customer_id: controller.url_params.customer_id
                        },
                        resize: {
                            width: 400,
                            height: 400
                        },
                        file_data_name: 'userfile'
                    });
                    controller.uploader.init();
                    controller.uploader.bind('FilesAdded', function(up, files) {
                        controller.uploader.start();
                    });
                    controller.uploader.bind('UploadComplete', function(up, files) {
                        var src		= imageField.src;
                        console.log (imageField.src);
                        controller.getImagePanel().down('#change-image-panel').hide();
                        controller.getImagePanel().down('#change-image-panel').destroy(true);
                        $('.jcrop-holder').remove();
                        controller.setImage(src);
                    });
        });



    },

    onCloseImagePanel: function(callback) {
        var controller = this;
        var imagePanel = controller.getImagePanel();
        LanistaTrainer.app.fireEvent('hideStage', function () {
            controller.getRightCommandPanel().items.each(function (item) {
                item.hide();
            });
            controller.getLeftCommandPanel().items.each(function (item) {
                item.hide();
            });
            imagePanel.hide();
            imagePanel.destroy(true);
            if (callback instanceof Function) callback();
        });

    },

    onShowImageHeaderUpdate: function() {
        var controller = this;
        if (this.getImagePanel() && !this.getImagePanel().isHidden()) {
            controller.getMainViewport().down("#header").update({
               info: '',
               title: '-' + Ext.ux.LanguageManager.TranslationArray.CUST_MENU_SETUP.toUpperCase()
            });
        }
    },

    onUploadFile: function(imageField) {
        var file = imageField.getFiles()[0],
            controller = this;


        // Create FormData object
        var http = new XMLHttpRequest();
        if (http.upload && http.upload.addEventListener) {
            // Uploading progress handler
            http.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100;
                    console.log( percentComplete.toFixed(0) + '%' );
                }
            };
            // Response handler
            http.onreadystatechange = function (e) {
                if (this.readyState == 4) {
                    if(this.status == 200) {
                        var response = Ext.decode(this.responseText, true);
                        if (response && response.success) {
                            // Success
                            console.log("DOWNLOAD OK");
                        } else if (response && response.message) {
                            // Failure
                            console.log('FAILURE ' + response.message);
                        } else {
                            // Failure
                            console.log('FAILURE Unknown error');
                        }
                    } else {
                        // Failure
                        console.log('FAILURE ' + this.status + ' ' + this.statusText);
                    }
                    LanistaTrainer.app.fireEvent("imageLoadingCompleted", controller.image);
                }
            };

            // Error handler
            http.upload.onerror = function(e) {
                console.log('FAILURE ' + this.status + ' ' + this.statusText);
                LanistaTrainer.app.fireEvent("imageLoadingCompleted", imageField);
            };
        }

        var form = new FormData();
        // Add selected file to form
        form.append('userfile', file);
        // Send form with file using XMLHttpRequest POST request


        http.open('POST', controller.url);
        http.setRequestHeader('user_id', localStorage.getItem("user_id"));

        for(var prop in controller.url_params) {
            if(controller.url_params.hasOwnProperty(prop))
                http.setRequestHeader(prop, controller.url_params[prop]);
        }
        http.send(form);

    },

    onImageLoadingComplete: function(image) {
        var src	= image.getSrc();
        this.getImagePanel().down('#change-image-panel').hide();
        this.getImagePanel().down('#change-image-panel').destroy(true);
        $('.jcrop-holder').remove();
        this.setImage(src);
    },

    showCommands: function(callback) {

        var controller = this;

        controller.getRightCommandPanel().items.each(function (item) {
            item.hide();
        });





    },

    setImage: function(src, width) {
        var controller = this,
            img = null,
            height = 0,
            width = 0;

        console.log("CREATING NEW IMG PANEL");
        var newImage = new Image();
        newImage.src = src;

        $(newImage).load(function () {
            width = newImage.width;
            height = newImage.height;

            if (parseFloat(width) > parseFloat(height)) {
                img = Ext.create('Ext.Img',
                                 {
                                     src: src,
                                     height: 500/width*height,
                                     width: 500,
                                     centered: true,
                                     cls: 'lanista-max-with',
                                     id: 'change-image-panel'
                                 });
                img.scale = 500/width;
            } else {
                img = Ext.create('Ext.Img',
                                 {
                                     src: src,
                                     height: 500,
                                     width: 500/height*width,
                                     centered: true,
                                     cls: 'lanista-max-height',
                                     id: 'change-image-panel'
                                 });
                img.scale = 500/height;
            }
            controller.image = img;
            controller.getImagePanel().add( img );

            selectionPoint_x = (img.getWidth()/2)-100;
            selectionPoint_y = (img.getHeight()/2)-100;

            jcrop = $('#change-image-panel').Jcrop(
                {
                    aspectRatio: 1,
                    setSelect: [ selectionPoint_x, selectionPoint_y , selectionPoint_x + 200, selectionPoint_y + 200],
                    bgColor: 'white',
                    onSelect: function updateCoords(c)
                    {
                        console.log("UPDATE COORDINATES");
                        img.x = c.x;
                        img.y = c.y;
                        img.w = c.w;
                        img.h = c.h;
                    },
                    onRelease: function updateCoords(c)
                    {
                        console.log("RELEASE COORDINATES");
                        img.x = 0;
                        img.y = 0;
                        img.w = 0;
                        img.h = 0;
                    }
                });
            return img;
        }).error(function() {
            width	= 500;
            height	= 500;

            img = Ext.create('Ext.Img',
                             {
                                 src: src,
                                 height: height,
                                 width: width,
                                 centered: true,
                                 cls: 'lanista-max-with blue-glow',
                                 id: 'change-image-panel'
                             });
            img.scale = 1;
            controller.image = img;
            controller.getImagePanel().add( img );

            return img;
        });

    },

    loadData: function() {

    },

    init: function(application) {
        this.control({
            "viewport #rotateImageButton": {
                click: this.onRotateImageButtonClick
            },
            "viewport #closeImagePanelButton": {
                click: this.onCloseImagePanelButtonClick
            },
            "viewport #cropImageButton": {
                click: this.onCropImageButtonClick
            }
        });

        application.on({
            showImagePanel: {
                fn: this.onShowImagePanel,
                scope: this
            },
            closeImagePanel: {
                fn: this.onCloseImagePanel,
                scope: this
            },
            showImageHeaderUpdate: {
                fn: this.onShowImageHeaderUpdate,
                scope: this
            },
            uploadFile: {
                fn: this.onUploadFile,
                scope: this
            },
            imageLoadingComplete: {
                fn: this.onImageLoadingComplete,
                scope: this
            }
        });
    }

});