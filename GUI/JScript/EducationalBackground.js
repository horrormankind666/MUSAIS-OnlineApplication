/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับข้อมูลวุฒิการศึกษา>
=============================================
*/

(function () {
	"use strict";

	angular.module("educationalBackgroundMod", [
		"appMod"
	])

	.service("educationalBackgroundServ", function (
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
				appServ.getListEducationalBackground({
					action: "getlist",
					params: param.data
				}).then(function (result) {
					var dt = [];

					for (var i = 0; i < result.length; i++) {
						var dr = result[i];

						dt.push({
							id: (dr.id ? dr.id : ""),
							name: {
								TH: (dr.educationalBackgroundNameTH ? dr.educationalBackgroundNameTH : ""),
								EN: (dr.educationalBackgroundNameEN ? dr.educationalBackgroundNameEN : "")
							},
							initials: {
								TH: (dr.educationalBackgroundNameInitTH ? dr.educationalBackgroundNameInitTH : ""),
								EN: (dr.educationalBackgroundNameInitEN ? dr.educationalBackgroundNameInitEN : "")
							},
							educationalLevelId: (dr.perEducationalLevelId ? dr.perEducationalLevelId : ""),
							selectFilter: ((dr.educationalBackgroundNameTH ? dr.educationalBackgroundNameTH : "") +
								(dr.educationalBackgroundNameEN ? dr.educationalBackgroundNameEN : ""))
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