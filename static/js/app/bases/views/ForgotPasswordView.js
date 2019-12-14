define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
//        storejs				= require('store'),
        tpl                 = require('text!app/bases/tpl/forgotpassword.html'),
        template = _.template(tpl);

    return Gonrin.View.extend({
        render: function () {

            this.$el.html(template());
            this.handleRegister();
            return this;
        },
        handleRegister : function(){
        	var self = this;
        	$('.login-form').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    email: {
                        required: true
                    }
                },

                messages: {
                    email: {
                        required: "Email is required."
                    }
                },

                invalidHandler: function(event, validator) { //display error alert on form submit   
                    $('.alert-danger', $('.login-form')).show();
                },

                highlight: function(element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                success: function(label) {
                    label.closest('.form-group').removeClass('has-error');
                    label.remove();
                },

                errorPlacement: function(error, element) {
                    error.insertAfter(element.closest('.input-icon'));
                },

                submitHandler: function(form) {
                    //form.submit(); // form validation success, call ajax form submit
                	self.processForgotPass();
                }
            });
        	
        },
        events: {
       	 //'click #login-btn' : 'processLogin',
       	 //'click button#submit-btn': 'processLogin'
       	},

       	processForgotPass: function(){
       		
       		var email = this.$('[name=email]').val();
       		var data = JSON.stringify({
       			email: email
       		});
       		var self = this;

       		$.ajax({
       		    url: (self.getApp().serviceURL || "") + '/api/resetpw',
       		    type: 'post',
       		    data: data,
	       		headers: {
	    		    	'content-type': 'application/json'
	    		    },
       		    dataType: 'json',
       		    success: function (data) {
       		    	$('.form-actions').html('<label class="control-label">'+data.error_msg+'</label>');
       		    	//self.getApp().getRouter().navigate("login");
       		    },
       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
       		    	self.getApp().notify("Request forgot password error");
       		    }
       		});
       	},

    });

});