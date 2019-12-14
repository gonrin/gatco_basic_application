define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
        storejs				= require('store'),
        tpl                 = require('text!app/bases/tpl/login.html'),
        template = _.template(tpl);
    return Gonrin.View.extend({
        render: function () {
        	var self = this;
        	storejs.set('X-USER-TOKEN', '');
        	self.getApp().currentUser = null;
        	this.getApp().data("current_so", null);
            this.$el.html(template());
            
//            var qrcode = self.getApp().getRouter().getParam("qr");
            var qrcode = self.getApp().getParameterUrl("qr", window.location.href);
//            console.log(window.location.href);
//            console.log(qrcode);
//            if(qrcode !== undefined && qrcode!== null && qrcode !==""){
//            	this.$el.find("#msg_qrcode").html('Mã Qr "'+qrcode+'" chưa được gắn với sổ chăm sóc.');
//            }
            $("#recover_account").unbind('click').bind('click', function(){
            	self.getApp().getRouter().navigate("recorver");
        	});
            $("#register-btn").unbind('click').bind('click', function(){
            	if(qrcode !== undefined && qrcode!== null && qrcode !==""){
        			self.getApp().getRouter().navigate("dangky?qr="+qrcode);
                }else{
                	self.getApp().getRouter().navigate("dangky");
                }
                
        	});
        	$("#forget-password").unbind('click').bind('click', function(){
                self.getApp().getRouter().navigate("forgot");
        	});

        	$("#loginfacebook").unbind('click').bind('click',function(){
                var fbLoginSuccess = function (userData) {
                  console.log("UserInfo: ", userData);
                  facebookConnectPlugin.getAccessToken(function(token) {
                    console.log("Token: " + token);
                  });
                }

                facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
                  function (error) {
                    console.log(error)
                  }
                );
        	});
            
            this.$el.find("#login-form").unbind("submit").bind("submit", function(){
            	self.processLogin();
            	return false;
            });
            return this;
        },
       	processLogin: function(){
       		var username = this.$('[name=username]').val();
			   var password = this.$('[name=password]').val();
			   console.log(name);
			   console.log(password);
//       		var qrcode = this.getApp().getRouter().getParam("qr");
       		var qrcode = this.getApp().getParameterUrl("qr", window.location.href);
       		var data;
       		if(qrcode !== undefined && qrcode!== null && qrcode !==""){
       			data = JSON.stringify({
       		        data: username,
       		        password: password,
       		        qr: qrcode
       		    });
       		} else {
       			data = JSON.stringify({
       		        data: username,
       		        password: password
       		    });
       		}
       		var self = this;
       		$.ajax({
       		    url:  self.getApp().serviceURL+'/api/v1/login',
       		    type: 'post',
       		    data: data,
       		    headers: {
       		    	'content-type': 'application/json'
       		    },
	       		beforeSend: function(){
	    		    $("#loading").removeClass("hidden");
	    		   },
	    		complete: function(){
	 		    	$("#loading").addClass("hidden");
	 		    },
       		    dataType: 'json',
       		    success: function (data) {
       		    	console.log(data);
       		    	$.ajaxSetup({
       		    	    headers: {
       		    	    	'X-USER-TOKEN': data.token
       		    	    }
       		    	});
       		    	storejs.set('X-USER-TOKEN', data.token);
       		    	self.getApp().postLogin(data);
       		    	if(password === undefined || password===""){
       		    		self.router.navigate("user/profile");
       		    	}
       		    },
       		    error: function(request, textStatus, errorThrown) {
       		    	//console.log(request);
       		    	try {
       		    		self.getApp().notify($.parseJSON(request.responseJSON).error_message);
       		    	} catch(err) {
       		    		self.getApp().notify({message: 'Có lỗi xảy ra, vui lòng thử lại sau'},{type: "danger"});
       		    	}
       		    }
       		});
       	},

    });

});