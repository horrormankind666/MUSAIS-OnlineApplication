/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๕/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับข้อมูลมหาวิทยาลัย>
=============================================
*/

(function () {
	"use strict";

	angular.module("universityMod", [
		"appMod"
	])

	.service("universityServ", function (
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
				appServ.getListUniversity({
					action: "getlist",
					params: param.data
				}).then(function (result) {
					var dt = [];

					for (var i = 0; i < result.length; i++) {
						var dr = result[i];

						dt.push({
							id: (dr.id ? dr.id : ""),
							isoCountryCodes3Letter: (dr.isoCountryCodes3Letter ? dr.isoCountryCodes3Letter : ""),
							name: {
								TH: (dr.universityNameTH ? dr.universityNameTH : ""),
								EN: (dr.universityNameEN ? dr.universityNameEN : "")
							},
							selectFilter: ((dr.universityNameTH ? dr.universityNameTH : "") +
								(dr.universityNameEN ? dr.universityNameEN : ""))
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