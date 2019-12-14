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