define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/bases/tpl/register.html'),
		schema = require('json!schema/UserDonviSchema.json');

	var TuyenDonViSelectView = require('app/view/HeThong/DangKyDonVi/view/SelectViewTuyenDonVi');
	var DonViSelectView = require('app/view/HeThong/DangKyDonVi/view/SelectViewDonVi');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "user_donvi",
		uiControl: {
			fields: [{
					field: "captren",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "captren_id",
					dataSource: DonViSelectView,
				},
				{
					field: "donvi_tuyendonvi",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "donvi_tuyendonvi_id",
					dataSource: TuyenDonViSelectView
				},
			],


		},
		tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [

				{
					name: "save",
					type: "button",
					buttonClass: "btn-success btn-sm",
					label: "Đăng ký",

					command: function () {
						var self = this;

						var email = self.model.get("email");
						var phone = self.model.get("phone");
						var pass = self.model.get("password");
						var cfpass = self.model.get("cfpassword");
						if (email == null || email.length > 20) {
							console.log(email);
							self.getApp().notify({message: "Email trống of không đúng định dạng"},{type: "danger"});
						} else if (phone == null || phone.length > 13) {
							self.getApp().notify({message: "Số điện thoại không of không đúng định dạng"},{type: "danger"});
						} else if (pass == null || pass != cfpass) {
							self.getApp().notify({message: "Password không được để trống of không giống nhau"},{type: "danger"});
						}else {
							self.model.save(null, {
								success: function (model, respose, options) {								
									self.getApp().getRouter().navigate("/login");
									self.getApp().notify("Lưu thông tin thành công");
								},
								error: function (model, xhr, options) {
									self.getApp().notify('Lưu thông tin không thành công!');
	
								}
							});
						}

						

					},
				},
			],
		}],

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
			}

		},

		validateEmail: function (email) {
			var checkE = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
			return checkE.test(email);
		},
		checkPhone: function (phone) {
			var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
			var digits = p.replace(/\D/g, "");
			return phoneRe.test(digits);
		}
	});

});