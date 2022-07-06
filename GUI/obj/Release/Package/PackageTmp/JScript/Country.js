/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับข้อมูลประเทศ>
=============================================
*/

(function () {
	"use strict";

	angular.module("countryMod", [
		"appMod"
	])

	.service("countryServ", function (
		$timeout,
		$q,
		appServ
	) {
		var self = this;

		self.getDataSource = function (param) {
			param.dataSource = (param.dataSource === undefined || param.dataSource === "" ? [] : param.dataSource);
			param.data = (param.data === undefined || param.data === "" ? {} : param.data);

			var deferred = $q.defer();

			if (param.dataSource.length === 0) {
				appServ.getListCountry({
					action: "getlist",
					params: param.data
				}).then(function (result) {
					var dt = [];

					for (var i = 0; i < result.length; i++) {
						var dr = result[i];

						dt.push({
							id: (dr.id ? dr.id : ""),
							name: {
								TH: (dr.countryNameTH ? dr.countryNameTH : ""),
								EN: (dr.countryNameEN ? dr.countryNameEN : "")
							},
							isoCountryCodes2Letter: (dr.isoCountryCodes2Letter ? dr.isoCountryCodes2Letter : ""),
							isoCountryCodes3Letter: (dr.isoCountryCodes3Letter ? dr.isoCountryCodes3Letter : ""),
							selectFilter: ((dr.countryNameTH ? dr.countryNameTH : "") +
								(dr.countryNameEN ? dr.countryNameEN : ""))
						});
					}

					param.dataSource = dt;

					deferred.resolve(param.dataSource);
				});
			}
			else
				deferred.resolve(param.dataSource);

			return deferred.promise;
		};
	});
})();