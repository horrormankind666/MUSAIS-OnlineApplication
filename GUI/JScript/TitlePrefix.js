/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๓๐/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับข้อมูลคำนำหน้าชื่อ>
=============================================
*/

(function () {
	"use strict";

	angular.module("titlePrefixMod", [
		"appMod"
	])

	.service("titlePrefixServ", function (
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
				appServ.getListTitlePrefix({
					action: "getlist",
					params: param.data
				}).then(function (result) {
					var dt = [];

					for (var i = 0; i < result.length; i++) {
						var dr = result[i];

						dt.push({
							id: (dr.id ? dr.id : ""),
							name: {
								TH: (dr.titlePrefixFullNameTH ? dr.titlePrefixFullNameTH : ""),
								EN: (dr.titlePrefixFullNameEN ? dr.titlePrefixFullNameEN : "")
							},
							initials: {
								TH: (dr.titlePrefixInitialsTH ? dr.titlePrefixInitialsTH : ""),
								EN: (dr.titlePrefixInitialsEN ? dr.titlePrefixInitialsEN : dr.titlePrefixInitialsTH)
							},
							genderId: (dr.perGenderId ? dr.perGenderId : ""),
							selectFilter: ((dr.titlePrefixInitialsTH ? dr.titlePrefixInitialsTH : "") +
								(dr.titlePrefixInitialsEN ? dr.titlePrefixInitialsEN : ""))
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