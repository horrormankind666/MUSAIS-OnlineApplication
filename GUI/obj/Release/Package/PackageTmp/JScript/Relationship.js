/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับข้อมูลความสัมพันธ์ในครอบครัว>
=============================================
*/

(function () {
	"use strict";

	angular.module("relationshipMod", [
		"appMod"
	])

	.service("relationshipServ", function (
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
				appServ.getListRelationship({
					action: "getlist",
					params: param.data
				}).then(function (result) {
					var dt = [];

					for (var i = 0; i < result.length; i++) {
						var dr = result[i];

						dt.push({
							id: (dr.id ? dr.id : ""),
							name: {
								TH: (dr.relationshipNameTH ? dr.relationshipNameTH : ""),
								EN: (dr.relationshipNameEN ? dr.relationshipNameEN : "")
							},
							genderId: (dr.perGenderId ? dr.perGenderId : ""),
							selectFilter: ((dr.relationshipNameTH ? dr.relationshipNameTH : "") +
								(dr.relationshipNameEN ? dr.relationshipNameEN : ""))
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