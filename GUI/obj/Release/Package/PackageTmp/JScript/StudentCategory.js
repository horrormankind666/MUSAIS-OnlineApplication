/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับข้อมูลประเภทของนักศึกษาแลกเปลี่ยน>
=============================================
*/

(function () {
	"use strict";

	angular.module("studentCategoryMod", [
		"appMod"
	])

	.service("studentCategoryServ", function (
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
				appServ.getListStudentCategory({
					action: "getlist",
					params: param.data
				}).then(function (result) {
					var dt = [];

					for (var i = 0; i < result.length; i++) {
						var dr = result[i];

						dt.push({
							id: (dr.id ? dr.id : ""),
							name: {
								TH: (dr.studentCategoryNameTH ? dr.studentCategoryNameTH : ""),
								EN: (dr.studentCategoryNameEN ? dr.studentCategoryNameEN : "")
							},
							specify: (dr.specify ? dr.specify : "")
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