define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    var tpl                 = require('text!app/bases/tpl/NotifyVersion.html');
    return Gonrin.DialogView.extend({
    	template : tpl,
    	render:function(){
    		var self = this;
    		var currUser = self.getApp().currentUser;
    		if(currUser !== undefined && currUser!== null){
    			self.$el.find("#link_app").attr("href",currUser.version.url_google_store).html('<strong>'+currUser.version.url_google_store+'</strong>');
			}
			self.applyBindings();
    	},
    });

});