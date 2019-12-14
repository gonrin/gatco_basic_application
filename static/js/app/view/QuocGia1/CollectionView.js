define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/QuocGia/tpl/collection.html');
    // var	schema 				= require('json!schema/QuocGiaSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	// modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "quocgia",
		tools: [
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "create",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "Tạo quốc gia",
						command: function(){
							var self = this;
							var path = self.collectionName + '/model';
							self.getApp().getRouter().navigate(path);
						}
					},
					{
						name: "print",
						type: "button",
						buttonClass: "btn-warning btn-sm",
						label: "In ấn",
						command: function(){
							alert("User press print button")
						}
					},
					{
						name: "excel",
						type: "button",
						buttonClass: "btn-info btn-sm",
						label: "In ấn",
						command: function(){
							alert("User press Xuất Excel")
						}
					},
				]
			},
		],
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID",
	    	     },
	    	     { field: "ma", label: "Mã"},
				  { field: "ten", label: "Tên", width:250 },
				  { field: "mota", label: "Mô tả" },
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	
		    }
    	},
	    render:function(){
            console.log("Quocgia collection render");
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});