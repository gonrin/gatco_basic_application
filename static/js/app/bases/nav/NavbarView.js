define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');

	var template = '<div style="background: #DDDDDD;" id="leftmenu" class="form-group"> <ul  class="page-navbar-menu scroll-nav clearfix" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="250">'
		+ '<li class="navbar-toggler-wrapper"><div class="navbar-toggler"></div></li></ul></div>';
	var navdata = require('app/bases/nav/nav');
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $( window ).width() <= 767;
    return Gonrin.View.extend({
    	checkUser: function(){
    	    var isUser = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole('User'): false;
    	    return isUser;
    	},
    	checkTuyendonvi:function(tuyendonvi){
    		var currentUser = gonrinApp().currentUser;
    		if (currentUser !==null && (currentUser.donvi.tuyendonvi === tuyendonvi || currentUser.hasRole('Admin'))){
    			return true;
    		}
    		return false;
    	},
    	userHasRole: function(role){
    	    var is = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole(role): false;
    	    return is;
    	},
    	loadEntries: function($el, entries, is_root){
			var self = this;
			if(entries && (entries.length > 0)){
				_.each(entries, function(entry, index){
					var entry_type = _.result(entry, 'type');
					var entry_collectionName = _.result(entry, 'collectionName');
					var entry_ref = _.result(entry, '$ref');
					var entry_text = _.result(entry, 'text');
					var entry_icon = _.result(entry, 'icon');
					var entry_entries = _.result(entry, 'entries');
					var entry_viewData = _.result(entry, 'viewData');
					var entry_name = _.result(entry, 'name');
					var entry_loadmore = _.result(entry, 'loadmore');
					var _html = '';
					if(entry_type === "category"  && entry_text !== undefined){
						var title_category = "";
						if(!!entry_viewData && !!entry_viewData.text){
							title_category = entry_viewData.text;
						}
						_html = _html + '<a href="javascript:void(0);" title="'+title_category+'">';
						if(entry_icon){
							_html = _html + '<i class="' + entry_icon + '" aria-hidden="true"></i>';
//							_html = _html + '<img class="nav-menu-icon" src="' + entry_icon + '"/>'; //change icon
						}
						
						_html = _html + '<span class="title">'+ entry_text +'</span>';
						
						if(!!entry_loadmore && !! entry_name){
							var more = self.getApp().data("loadmore_"+entry_name) || false;
							var moretxt = "";
							if(!!more){
								moretxt = "Xem rút gọn";
							}else{
								moretxt = "Xem tất cả";
							}
							_html = _html + '<span class="arrow" style="float:right"></span>';
							_html = _html + '<button id="btn-loadmore_'+entry_name+'" style="float:right; font-size: 12px;" class="btn btn-success btn-xs">' + moretxt + '</button>';
						}else{
							_html = _html + '<span class="arrow"></span>';
						}
						_html = _html + '</a>';
					}
					
					if(entry_type === "link"  && entry_text !== undefined){
						_html = _html + '<a href="'+ entry_ref +'">';
						if(entry_icon){
							_html = _html + '<i class="' + entry_icon + '"></i>'; //change icon
						}
						_html = _html + '<span class="title">'+ entry_text +'</span>';
						_html = _html + '</a>';
					}
					
					if(entry_type === "view" && entry_text !== undefined){
						_html = _html + '<a class="grview" href="javascript:;">';
						if(entry_icon){
							_html = _html + '<i class="' + entry_icon + '"></i>'; //change icon
						}
						_html = _html + '<span class="title">'+ entry_text +'</span>';
						_html = _html + '</a>';
					}
					
					var $entry = $('<li>').html(_html);
					
					
					//loadmore click
					if(!!entry_loadmore){
						var $btnloadmore = $entry.find('#btn-loadmore_'+entry_name);
						$btnloadmore.unbind("click").bind('click', {obj:entry_name}, function(event){
							event.stopPropagation();
							var data_name = event.data.obj;
							var more = self.getApp().data("loadmore_"+ data_name) || false;
							self.getApp().data("loadmore_"+ data_name,!more);
							self.render();
						});
					}
					if (entry_type === "category"){
						
					}
					var current_category = self.getApp().data("current_category") || "";
					if(!!current_category && current_category !== ""){
						if (current_category === entry_name){
							$entry.addClass("open");
							$entry.find('span.arrow').addClass("open");
							$entry.children('a').append($('<span>').addClass("selected"));
						}
					} else if((index === 0)&&(is_root === true)){
						$entry.addClass("open");
						$entry.find('span.arrow').addClass("open");
						$entry.children('a').append($('<span>').addClass("selected"));
					}
					if($el){
						$el.append($entry);
					}
					index ++;
					if (entry_entries) {
						var _nav_list = $('<ul>').addClass("sub-menu").appendTo($entry);
						self.loadEntries(_nav_list, entry_entries, false);
					}
					self.loadView(entry);
					
					if(self.isEntryVisible(entry)){
						self.handleEntryClick($entry, entry);
					} else {
						self.handleEntryClick($entry, entry);
						$entry.hide();
					}
					
				});// end _.each
			};
			return this;
		},

		isEntryVisible : function(entry) {
			var self = this;
	        var visible = "visible";
	        return !entry.hasOwnProperty(visible) || (entry.hasOwnProperty(visible) && (_.isFunction(entry[visible]) ? entry[visible].call(self) : (entry[visible] === true)) );
			
	    },
		render: function(entries){
			this.$el.empty();
			entries = entries || navdata;
			var self = this;
			this.$el.addClass("page-navbar navbar-collapse collapse").html(template);
			var nav_list = this.$el.find('ul.page-navbar-menu');
			this.loadEntries(nav_list, entries, true);

			if(isMobile){
				var currentUser = self.getApp().currentUser;
				var displayName = !!currentUser? currentUser.fullname: "";
				nav_list.prepend('<div class="user-panel">'+
	                                      '<div class="pull-left image">'+
	                                        '<img alt="User Image" class="img-circle" src="static/images/user.png">'+
	                                      '</div>'+
	                                      '<div class="pull-left info">'+
	                                        '<p style="font-size:18px;"><b>'+displayName +'</b></p>'+
	                                        '<a href="javascript:void(0);" onClick="gonrinApp().router.navigate(\'user/profile\');" id="userprofile">Thông tin cá nhân  </a>'+
	                                        '<a href="javascript:void(0);" onClick="gonrinApp().router.navigate(\'logout\');" id="logout">| Đăng xuất</a>'+
	                                      '</div>'+
	                                    '</div>')
				
			}
			this.handleToggler();
			
			return this;
		},
		handleEntryClick : function ($entry, entry) {
			var self = this;
	       
			if(entry.type === "category"){
				var $a = $entry.children('a');
				if($a === undefined){
					return this;
				}
				var entry_name = _.result(entry, 'name');
				$a.unbind("click").bind("click", {obj:entry_name}, function(e){
					self.getApp().data("current_category", e.data.obj);
		        	var hasSubMenu = $(this).next().hasClass('sub-menu');
		            if ($(this).next().hasClass('sub-menu always-open')) {
		                return;
		            }
		            
		            var parent = $entry.parent().parent();
		            
		            var menu = self.$el.find('.page-navbar-menu');
		            var sub = $(this).next();

		            var autoScroll = menu.data("auto-scroll");
		            var slideSpeed = parseInt(menu.data("slide-speed"));
		            var keepExpand = menu.data("keep-expanded");

		            if (keepExpand !== true) {
		                parent.children('li.open').children('a').children('.arrow').removeClass('open');
		                parent.children('li.open').removeClass('open');
		            }
		         
		            if (sub.is(':visible')) {
		                $('.arrow', $(this)).removeClass("open");
		                $(this).parent().removeClass("open");
		          
		            } else if (hasSubMenu) {
		                $('.arrow', $(this)).addClass("open");
		                $(this).parent().addClass("open");
		         
		            };
		            //e.preventDefault();
		        });
			};
			if(entry.type === "view"){
				var $a = $entry.children('a');
				if($a === undefined){
					return this;
				}
				$a.unbind("click").bind("click", function(e){
					e.preventDefault();
		            var url = $entry.attr("href");
		            var menuContainer = self.$el.find('ul');
		            
		            menuContainer.children('li.active').removeClass('active');
		            menuContainer.children('li.open').removeClass('open');
		            menuContainer.find('span.arrow').removeClass('open');
		            menuContainer.find('span.selected').remove();

		            $(this).parents('li').each(function (){
		            	$(this).addClass('active open');
		            	$(this).children('div').children('span.arrow').addClass("open");
		            	$(this).children('div').append($('<span>').addClass("selected"));
		            });
		            $(this).parents('li').addClass('active');
		            if(entry.collectionName){
		            	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		            		 $('.menu-toggler').trigger("click");
		            	}
		            	var link = _.result(entry, 'href') || _.result(entry, 'route') ;
		            	self.getApp().getRouter().navigate(link, {trigger:true});
//		            	self.getApp().getRouter().navigate(entry.route, {trigger:true});
		            	
		            }
				});
			};
	        return this;
	        
		},
		toggleNav : function(){
			var self = this;
			var body = $('body');
        	var _navMenu = $('.page-navbar-menu');
        	var _navbar = self.$el;
        	var _navMenu = self.$el.find('.page-navbar-menu');
        	
            if (body.hasClass("page-navbar-closed")) {
                body.removeClass("page-navbar-closed");
                _navMenu.removeClass("page-navbar-menu-closed");
            } else {
                body.addClass("page-navbar-closed");
                _navMenu.addClass("page-navbar-menu-closed");
                if (body.hasClass("page-navbar-fixed")) {
                	_navMenu.trigger("mouseleave");
                }
                /*if ($.cookie) {
                    $.cookie('navbar_closed', '1');
                }*/
            }
            //$('.page-navbar').collapse();
            $(window).trigger('resize');
			
		},
		// Hanles sidebar toggler
	    handleToggler : function () {
	        var self = this;
	        var navtoggler = this.$el.find(".navbar-toggler");
	        
	        navtoggler.unbind('click').bind('click', function(e){
	        	self.toggleNav();
	        });
	        return this;
	    },
	    
	    
	    //move from router
	    loadView: function(entry){
			var self = this;
			var router = this.getApp().getRouter();
            if(entry && entry.collectionName && (entry.type === "view") && (entry['$ref'])){
            	var entry_path = this.buildPath(entry);
            	router.route(entry_path, entry.collectionName, function(){
    				require([ entry['$ref'] ], function ( View) {
    					var view = new View({el: self.getApp().$content, viewData:entry.viewData});
    					view.render();
    				});
    			});
            };
            return this;
        },
        buildPath:function(entry){
        	var entry_path;
        	if(entry.type === "view"){
        		entry_path = _.result(entry,'route');
        	}
			return entry_path;
		},
	    
	});

});