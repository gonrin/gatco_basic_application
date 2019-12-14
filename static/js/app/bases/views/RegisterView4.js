define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!app/bases/tpl/register.html'),
    	schema 				= require('json!schema/UserDonviSchema.json');
    
    var TuyenDonViSelectView = require('app/view/HeThong/DangKyDonVi/view/SelectViewTuyenDonVi');
    var DonViSelectView = require('app/view/HeThong/DangKyDonVi/view/SelectViewDonVi');
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "user_donvi",
    	uiControl: {
			fields: [
				{
	  				  field:"captren",
					  uicontrol: "ref",
					  textField: "ten",
					  foreignRemoteField: "id",
					  foreignField: "captren_id",
					  dataSource: DonViSelectView,
				},
				{
					field:"donvi_tuyendonvi",
					uicontrol: "ref",
		  				textField: "ten",
						foreignRemoteField: "id",
						foreignField: "donvi_tuyendonvi_id",
						dataSource: TuyenDonViSelectView
	  			 },				
	  			 ],
	  			 
	  			 
				},							       					
    	tools : 
    		[
	    	    {
	    	    	name: "defaultgr",
	    	    	type: "group",
	    	    	groupClass: "toolbar-group",
	    	    	buttons: [
						
						{
			    	    	name: "export",
			    	    	type: "button",
			    	    	buttonClass: "btn-success btn-sm",
							label: "Đăng ký",
						
							command: function(){
								var self = this;
								
								var fullname = self.model.get("fullname");
								var phone = self.model.get("phone");
								var captren_id = self.model.get("captren_id");
								var donvi_tuyendonvi_id = self.model.get("donvi_tuyendonvi_id");
								var email = self.model.get("email");
								var password = self.model.get("password");
								var cfpassword = self.model.get("cfpassword");
								var donvi_ten = self.model.get("donvi_ten");
								var donvi_sodienthoai = self.model.get("donvi_sodienthoai");
								var donvi_diachi = self.model.get("donvi_diachi");
							
								
								
								var data = JSON.stringify({
			       	   		        fullname: fullname,
			       	   		        phone:phone,
			       	   		        captren_id: captren_id,
			       	   		        donvi_tuyendonvi_id:donvi_tuyendonvi_id,
			       	   		        email: email,
			       	   		        donvi_ten:donvi_ten,
			       	   		        donvi_diachi:donvi_diachi,
			       	   		        password: password,
			       	   		        cfpassword: cfpassword,
									});
								var url = "/api/donvi/adduser/new";
						
								$.ajax({
			    	 				url: url,
			    	 				data:data,
			    	 				dataType: "json",
			    					contentType: "application/json",
			    	 				success: function(data) {
			    	 					console.log(self.model.toJSON());
			    	 					//self.getApp().getRouter().navigate(self.collectionName + "/collection");
			    	 					self.getApp().notify("Đăng ký tài khoản thành công");
			    	 				},
			    	 				error: function (xhr, status, error) {
			    	 			       try {
			    	 			    	    var msgJson = $.parseJSON(xhr.responseText); 
			    	 			    	    if(msgJson){
			    	 			    	    	self.getApp().notify(msgJson.error_message);
			    	 			    	    }
			    	 			    	}
			    	 			    	catch(err) {
			    	 			    		self.getApp().notify("Đăng ký thất bại");
			    	 			    		
			    	 			    	
			    	 			    	}
			    	 			    
			    	 			    }
			    	 			});
							},
			    	    },						
	    	    	],
	    	    }],	    	
    	render:function(){
    		var self = this;    			     		  		
   	     	var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        			},
        			error:function(){
    					self.getApp().notify("Get data Eror");
    				},
        		});
    		}else
    		{
    			self.applyBindings();
    		}
    		
    	},	
    	
       		
    });

});