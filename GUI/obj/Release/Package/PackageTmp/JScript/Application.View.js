/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๘/๐๘/๒๕๖๑>
Modify date : <๑๙/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ View>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.viewMod", [
		"utilMod",
		"appMod",
		"pageRouteMod",
		"applicationMod"
	])

	.controller("application.viewCtrl", function (
		$rootScope,
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		pageRouteServ,
		applicationServ
	) {
		var self = this;

		self.init = function () {
			if (appServ.isUser && appServ.getUserInfo.applicationStatus !== "WA") {
				self.setValue().then(function () {
					appServ.closeDialogPreloading();

					pageRouteServ.setSlideMenuOff();

					if (self.dataRow)
						self.showForm = true;
				});
			}
			else
				self.showForm = false;
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.dataRow = {};
			self.showForm = false;

			applicationServ.getDataSource({}).then(function (result) {
				self.dataRow = result[0];

				if (self.dataRow) {
					self.dataRow.department = self.dataRow.department.replace(/NULL<option>/g, "").replace(/<option>NULL/g, "").replace(/<option>/g, ",<br/>");
					self.dataRow.department = self.dataRow.department.replace(/<option>/g, ",<br/>");
					self.dataRow.homeAddress = self.dataRow.homeAddress.replace(/\r?\n/g, "<br/>");
					self.dataRow.mailingAddress = self.dataRow.mailingAddress.replace(/\r?\n/g, "<br/>");
					self.dataRow.emergencyMailingAddress = self.dataRow.emergencyMailingAddress.replace(/\r?\n/g, "<br/>");
					self.dataRow.englishNativeOther = self.dataRow.englishNativeOther.replace(/\r?\n/g, "<br/>");
					self.dataRow.declarationB = self.dataRow.declarationB.replace(/\r?\n/g, "<br/>");
					self.dataRow.declarationESpecify = self.dataRow.declarationESpecify.replace(/\r?\n/g, "<br/>");
				}

				$timeout(function () {
					deferred.resolve();
				}, 0);
			});

			return deferred.promise;
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();