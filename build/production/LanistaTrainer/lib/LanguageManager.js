Ext.define("Ext.ux.LanguageManager",{singleton:true,lang:"EN",DE:0,EN:1,ES:2,constructor:function(a){this.callParent();console.log("INITIALIZING LANGUAGE MANAGER...");this.detectLanguage()},detectLanguage:function(){var a=this;var b=localStorage.getItem("lanista-lang");b=b?b:"EN";console.log("Setting language to: "+b);a.setLanguage(b)},setLanguage:function(e,d){var b=this;b.lang=e;var c=document.getElementsByTagName("head")[0];var a=document.createElement("script");a.setAttribute("type","text/javascript");console.log("LOADING TRANSLATION FILE");a.onreadystatechange=a.onload=function(){b.TranslationArray=Messages;console.log("TRANSLATION FILE LOADED");localStorage.setItem("lanista-lang",e);if(d instanceof Function){d()}};a.setAttribute("src","lib/languages/app-"+e+".js");c.appendChild(a)},getLanguage:function(){return this.lang}});