define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    // var template 			= require('text!app/view/QuocGia/tpl/collection.html');
    // var	schema 				= require('json!schema/QuocGiaSchema.json');
    
    return Gonrin.CollectionView.extend({
    	// template : template,
    	// modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "quocgia",
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