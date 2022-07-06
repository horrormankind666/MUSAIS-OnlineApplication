/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๓/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับข้อมูลคำนำหน้าชื่อ>
=============================================
*/

(function () {
	"use strict";

	angular.module("genderMod", [
		"appMod"
	])

	.service("genderServ", function (
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
				appServ.getListGender({
					action: "getlist",
					params: param.data
				}).then(function (result) {
					var dt = [];

					for (var i = 0; i < result.length; i++) {
						var dr = result[i];

						dt.push({
							id: (dr.id ? dr.id : ""),
							name: {
								TH: (dr.genderFullNameTH ? dr.genderFullNameTH : ""),
								EN: (dr.genderFullNameEN ? dr.genderFullNameEN : "")
							},
							initials: {
								TH: (dr.genderInitialsTH ? dr.genderInitialsTH : ""),
								EN: (dr.genderInitialsEN ? dr.genderInitialsEN : "")
							}
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