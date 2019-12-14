define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		{
			"collectionName": "quocgia",
			"route": "quocgia/collection(/:id)",
			"$ref": "app/view/QuocGia/CollectionView",
		},
		{
			"collectionName": "quocgia",
			"route": "quocgia/model(/:id)",
			"$ref": "app/view/QuocGia/ModelView",
		},
		{
			"collectionName": "tinhthanh",
			"route": "tinhthanh/collection(/:id)",
			"$ref": "app/view/TinhThanh/CollectionView",
		},
		{
			"collectionName": "tinhthanh",
			"route": "tinhthanh/model(/:id)",
			"$ref": "app/view/TinhThanh/ModelView",
		},
	];

});


