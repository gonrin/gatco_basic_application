define(function (require) {
	"use strict";
	return [
		{
			"text":"Quốc gia",
			"icon":"fa fa-child",
			"type":"view",
			"collectionName":"quocgia",
		    "route":"quocgia/collection"
		},
		{
			"text":"Tỉnh thành",
			"icon":"fa fa-child",
			"type":"view",
			"collectionName":"tinhthanh",
		    "route":"tinhthanh/collection"
		},

		{
			"text":"Khách hàng",
			"icon":"fa fa-child",
			"type":"view",
			"collectionName":"khachhang",
		    "route":"khachhang/collection"
		},
		{
			"text":"Hàng hoá",
			"icon":"fa fa-child",
			"type":"view",
			"collectionName":"hanghoa",
		    "route":"hanghoa/collection"
		},
		{
			"text":"Hoá đơn",
			"icon":"fa fa-child",
			"type":"view",
			"collectionName":"hoadon",
		    "route":"hoadon/collection"
		},
		{
			"text":"Hệ thống",
			"icon":"fa fa-child",
			"type": "category",
			"entries": [
				{
					"text":"Người dùng",
					"icon":"fa fa-child",
					"type":"view",
					"collectionName":"user",
					"route":"user/collection"
				},
				{
					"text":"Vai trò",
					"icon":"fa fa-child",
					"type":"view",
					"collectionName":"user",
					"route":"role/collection"
				},
			]
		},

		
	];

});