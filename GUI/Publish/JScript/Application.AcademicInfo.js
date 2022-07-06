/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Academic Information>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.academicInfoMod", [
		"utilMod",
		"appMod",
		"dictMod",
		"pageRouteMod"
	])

	.service("academicInfoServ", function (
		$timeout,
		utilServ,
		dictServ,
		pageRouteServ
	) {
		var self = this;

		self.activeTabIndex = 0;

		self.tabSelect = function (tabName) {
			if (self[tabName].template.length === 0)
				utilServ.getDialogPreloading(dictServ.dict.msgPreloading.loading);

			if (tabName === "curEdu") {
				self.curEdu.template = pageRouteServ.pageObject.academicInfo.curEdu.template;
				self.activeTabIndex = 0;
			}

			if (tabName === "englishProficiency") {
				self.englishProficiency.template = pageRouteServ.pageObject.academicInfo.englishProficiency.template;
				self.activeTabIndex = 1;
			}
		};

		self.curEdu = {
			template: ""
		};

		self.englishProficiency = {
			template: ""
		};
	})

	.controller("application.academicInfoCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		dictServ,
		pageRouteServ,
		academicInfoServ
	) {
		var self = this;

		pageRouteServ.setMenuActive({
			menuName: (pageRouteServ.pageObject.academicInfo.class + "-menu")
		});

		self.init = function () {
			if (appServ.isUser && appServ.getUserInfo.applicationStatus === "WA") {
				self.setValue().then(function () {
					appServ.closeDialogPreloading();

					self.showForm = true;
					self.resetValue();
					academicInfoServ.tabSelect("curEdu");
				});
			}
			else
				self.showForm = false;
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.isFormChanged = false;
			self.showForm = false;

			deferred.resolve();

			return deferred.promise;
		};

		self.resetValue = function () {
			utilServ.gotoTopPage();
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	})

	.run(function ($rootScope, academicInfoServ) {
		$rootScope.$academicInfoServ = academicInfoServ;
	});
})();