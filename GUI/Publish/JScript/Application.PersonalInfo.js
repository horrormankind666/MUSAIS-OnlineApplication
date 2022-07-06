/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๕/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Personal Information>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.personalInfoMod", [
		"utilMod",
		"appMod",
		"dictMod",
		"pageRouteMod"
	])

	.service("personalInfoServ", function (
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

			if (tabName === "profile") {
				self.profile.template = pageRouteServ.pageObject.personalInfo.profile.template;
				self.activeTabIndex = 0;
			}

			if (tabName === "homeAddress") {
				self.homeAddress.template = pageRouteServ.pageObject.personalInfo.homeAddress.template;
				self.activeTabIndex = 1;
			}

			if (tabName === "mailingAddress") {
				self.mailingAddress.template = pageRouteServ.pageObject.personalInfo.mailingAddress.template;
				self.activeTabIndex = 2;
			}

			if (tabName === "contact") {
				self.contact.template = pageRouteServ.pageObject.personalInfo.contact.template;
				self.activeTabIndex = 3;
			}

			if (tabName === "emergencyContact") {
				self.emergencyContact.template = pageRouteServ.pageObject.personalInfo.emergencyContact.template;
				self.activeTabIndex = 4;
			}
		};

		self.profile = {
			template: ""
		};

		self.homeAddress = {
			template: ""
		};

		self.mailingAddress = {
			template: ""
		};

		self.contact = {
			template: ""
		};

		self.emergencyContact = {
			template: ""
		};
	})

	.controller("application.personalInfoCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		dictServ,
		pageRouteServ,
		personalInfoServ
	) {
		var self = this;

		pageRouteServ.setMenuActive({
			menuName: (pageRouteServ.pageObject.personalInfo.class + "-menu")
		});

		self.init = function () {
			if (appServ.isUser && appServ.getUserInfo.applicationStatus === "WA") {
				self.setValue().then(function () {
					appServ.showPreloading = false;

					self.showForm = true;
					self.resetValue();
                    
					personalInfoServ.tabSelect("profile");
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

	.run(function ($rootScope, personalInfoServ) {
		$rootScope.$personalInfoServ = personalInfoServ;
	});
})();