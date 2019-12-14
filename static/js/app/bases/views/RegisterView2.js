define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
        storejs				= require('store'),
        tpl                 = require('text!app/bases/tpl/register.html'),
        template = _.template(tpl);

    return Gonrin.View.extend({
    	
        render: function () {
        	var self = this;
            this.$el.html(template());
            this.uicontrolRegister();
            this.uicontrolTuyenTW_SO();
            this.$el.find("#register-form").unbind("submit").bind("submit", function(){
            	self.processRegister();
            	return false;
            });
            return this;
        },
        uicontrolTuyenTW_SO: function() {
        	const self = this;
        	$.ajax({
				url: "/api/v1/register",
				dataType: "json",
				contentType: "application/json",
				success: function(data) {
					console.log('success ', data);
					self.$el.find('input#tuyendv_tw').combobox({
						textField: "ten",
						valueField: "id",
						dataSource: data
					});
					self.$el.find('input#tuyendv_so').combobox({
						textField: "ten",
						valueField: "id",
						dataSource: data
					});
				},
				error: function() {
//					self.$el.find("#tuyendonvitw").combobox({
//						textField: "ten",
//						valueField: "id",
//						dataSource: [
//							{id: "1", ten: "Cuong 1"},
//							{id: "1", ten: "Cuong 2"},
//							{id: "1", ten: "Cuong 3"}
//						]
//					});	
				}
			});      	      	       	
        },                
        uicontrolRegister: function() {
        	const self = this;
        	$.ajax({
				url: "/api/v1/donvilist",
				dataType: "json",
				contentType: "application/json",
				success: function(data) {
					console.log('success ', data);
					self.$el.find('input#captren_id').combobox({
						textField: "ten",
						valueField: "id",
						dataSource: data
					});
				},
				error: function() {
				}
			});
        	
        	
        	
        },
        
       	processRegister: function(){
       		var self = this;
       		var hoten = this.$('[name=hoten]').val();
       		var phone = this.$('[name=user_phone]').val();
       		var email = this.$('[name=user_email]').val();
       	
       		var captren = this.$('[name=captren_id]').val();
       		var donvi_tuyendonvi = this.$('[name=tuyendv_so]')
       	
       		var password = this.$('[name=user_password]').val();
       		var confirm_password = this.$('[name=user_password_confirm]').val();
       		var diachi = this.$('[name=donvi_diachi]').val();
       		var tendonvi = this.$('[name=donvi_ten]').val();
       		
       		if(phone === undefined || phone === ""){
       			self.getApp().notify("Số điện thoại không được bỏ trống");
       			return false;
       		}
       		if(email === undefined || email === ""){
       			self.getApp().notify("Email không được bỏ trống");
       			return false;
       		}
       		if(password === undefined || password === "" || password !== confirm_password){
       			self.getApp().notify("Mật khẩu không khớp");
       			return false;
       		}
       		var data = JSON.stringify({
       	   		        fullname: hoten,
       	   		        phone:phone,
       	   		        captren: captren,
       	   		        donvi_tuyendonvi:donvi_tuyendonvi,
       	   		        email: email,
       	   		        donvi_ten:tendonvi,
       	   		        donvi_diachi:diachi,
       	   		        password: password,
       	   		        password_confirm: confirm_password
       		});
       		var self = this;
       		$.ajax({
       			// (self.getApp().serviceURL || "") +
       		    url: '/api/v1/register',
       		    type: 'post',
       		    data: data,
       		    dataType: "json",
				contentType: "application/json",
				
//    		    beforeSend: function(){
//       		    	$("#loading").removeClass("hidden");
//       		    },
//       		    complete: function(){
//    		    	$("#loading").addClass("hidden");
//    		    },
       		    success: function (data) {
       		    	
       		    },
       		    error: function(request, textStatus, errorThrown) {
       		    	try {
       		    		self.getApp().notify($.parseJSON(request.responseJSON).error_message);
       		    		}				  	  				    	
       		    	catch(err) {
       		    		self.getApp().notify('có lỗi xảy ra, vui lòng thử lại sau');
       		    		}
       		    }
       		});
       	}

    });

});