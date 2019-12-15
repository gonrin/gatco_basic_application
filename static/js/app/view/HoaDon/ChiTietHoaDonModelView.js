define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/HoaDon/tpl/chitiet.html'),
		schema 				= require('json!schema/ChiTietHoaDonSchema.json');
	
	var HangHoaSelectView   = require('app/view/HangHoa/SelectView');
	
	var Model = Gonrin.Model.extend({
		defaults: Gonrin.getDefaultModel(schema),
		computeds: {
			hanghoa: {
				deps: ["hanghoa_id", "tenhanghoa", "dongia"],
				get: function( hanghoa_id, tenhanghoa, dongia ) {
					return {
						"id": hanghoa_id,
						"ten": tenhanghoa,
						"gia": dongia
						};
				},
				set: function( obj ) {
					return {hanghoa_id: obj.id, tenhanghoa: obj.ten, dongia: obj.gia};
				}
			},
		},
		urlRoot : "/api/v1/chitiethoadon"
	});
    
    return Gonrin.ItemView.extend({
    	template : template,
		//modelSchema	: schema,
		modelClass: Model,
		tagName: 'tr',
    	urlPrefix: "/api/v1/",
		collectionName: "chitiethoadon",
		foreignRemoteField: "id",
		foreignField: "hoadon_id",

		uiControl:{
    		fields:[
        		{
    				field:"hanghoa",
    				uicontrol:"ref",
    				textField: "ten",
    				dataSource: HangHoaSelectView
    			},
        	]
    	},
		
    	render:function(){
    		var self = this;
			this.applyBindings();
			
			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
			});
    		
    	},
    });

});