define(function (require) {

    "use strict";
    
    var $           = require('jquery'),
        Gonrin    	= require('gonrin');
    
    var navdata = require('app/bases/nav/route');
    var Login = require('app/bases/views/LoginView');
    
    return Gonrin.Router.extend({
        routes: {
        	"index" : "index",
            "login":"login",
            "logout": "logout",
//            "forgot":"forgotPassword",
//            "dangky":"dangky",
            "error":"error_page",
            "*path":  "defaultRoute"
        },
        defaultRoute:function(){
            console.log("defaultRoute");
        	//this.navigate("index",true);
        },
        index:function(){
        },
        login: function () {
            var loginview = new Login({ el: $('body') });
            loginview.render();
        },
        logout: function () {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + '/api/logout',
                dataType: "json",
                success: function (data) {
                    self.navigate("login");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    self.getApp().notify(self.getApp().translate("LOGOUT_ERROR"));
                }
            });
        },
        error_page: function(){
        	var app = this.getApp();
        	if(app.$content){
        		app.$content.html("Error Page");
        	}
        	return;
        },
        registerAppRoute: function(){
            var self = this;
            $.each(navdata, function(idx, entry){
                var entry_path = _.result(entry,'route');
                console.log(entry_path);
                self.route(entry_path, entry.collectionName, function(){
                    require([ entry['$ref'] ], function ( View) {
                        var view = new View({el: self.getApp().$content, viewData:entry.viewData});
                        view.render();
                    });
                });
            });
        },
    });

});