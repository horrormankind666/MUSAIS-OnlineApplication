/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๕/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับข้อมูลคณะ>
=============================================
*/

(function () {
	"use strict";

	angular.module("facultyMod", [
		"appMod"
	])

	.service("facultyServ", function (
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
				appServ.getListFaculty({
					action: "getlist",
					params: param.data
				}).then(function (result) {
					var dt = [];

					for (var i = 0; i < result.length; i++) {
						var dr = result[i];

						dt.push({
							id: (dr.id ? dr.id : ""),
							code: (dr.facultyCode ? dr.facultyCode : ""),
							name: {
								TH: (dr.nameTh ? dr.nameTh : ""),
								EN: (dr.nameEn ? dr.nameEn : "")
							},
							abbrev: {
								TH: (dr.abbrevTh ? dr.abbrevTh : ""),
								EN: (dr.abbrevEn ? dr.abbrevEn : "")
							},
							selectFilter: ((dr.facultyCode ? dr.facultyCode : "") +
								(dr.nameTh ? dr.nameTh : "") +
								(dr.nameEn ? dr.nameEn : ""))
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