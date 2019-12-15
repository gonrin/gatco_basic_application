define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/HoaDon/tpl/model.html'),
		schema 				= require('json!schema/HoaDonSchema.json');
		
	var ChiTietHoaDonModelView = require("app/view/HoaDon/ChiTietHoaDonModelView");
	var KhachHangSelectView   = require('app/view/KhachHang/SelectView');
	
	var Model = Gonrin.Model.extend({
		defaults: Gonrin.getDefaultModel(schema),
		computeds: {
			khachhang: {
				deps: ["khachhang_id", "tenkhachhang"],
				get: function( khachhang_id, tenkhachhang ) {
					return {
						"id": khachhang_id,
						"ten": tenkhachhang,
						};
				},
				set: function( obj ) {
					return {khachhang_id: obj.id, tenkhachhang: obj.ten};
				}
			},
		},
		urlRoot : "/api/v1/hoadon"
	});
	

    return Gonrin.ModelView.extend({
    	template : template,
		//modelSchema	: schema,
		modelClass: Model,
    	urlPrefix: "/api/v1/",
    	collectionName: "hoadon",
    	
		uiControl: {
			fields: [
				{
					field: "chitiethoadon",
					uicontrol: false,
					itemView: ChiTietHoaDonModelView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_chitiet_hoadon"
				},
				{
					field:"khachhang",
					uicontrol:"ref",
					textField: "ten",
					dataSource: KhachHangSelectView
				},
			]
		},
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			//progresbar quay quay
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        			},
        			error:function(){
    					self.getApp().notify("Get data Eror");
    				},
        		});
    		}else{
    			self.applyBindings();
    		}
    		
    	},
    });

});