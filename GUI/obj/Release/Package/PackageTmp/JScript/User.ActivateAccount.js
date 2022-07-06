/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๐/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับการยืนยันตัวตน>
=============================================
*/

(function () {
	"use strict";

	angular.module("user.activateAccountMod", [
		"base64",
		"utilMod",
		"appMod",
		"dictMod"
	])

	.controller("user.activateAccountCtrl", function (
		$scope,
		$timeout,
		$q,
		$filter,
		$routeParams,
		utilServ,
		appServ,
		dictServ
	) {
		var self = this;

		self.init = function () {
			if (appServ.isUser === false) {
				self.setValue().then(function () {
					appServ.closeDialogPreloading();

					self.resetValue();
					self.showForm = true;

					self.isUser = (self.formValue.userId ? true : false);
					self.isSaveStatus = (self.formValue.verifiedStatus === "Y" ? true : false);

					if (!self.isUser)
						utilServ.dialogError(appServ.getLabel(["authen", "userNotFound"]), function (e) {
						});
				});
			}
			else
				self.showForm = false;
		};

		self.formField = {
			userId: "",
			email: "",
			fullName: "",
			gender: "",
			nationality: "",
			country: ""
		};

		self.formValue = {
			userId: "",
			verifiedStatus: "",
			email: "",
			fullName: "",
			gender: "",
			nationality: "",
			country: ""
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.showForm = false;
			self.isUser = false;
			self.isSaveStatus = false;

			appServ.getListUser({
				action: "getdata",
				params: [
					"",
					("package=" + appServ.setPackage([$routeParams.userId, $routeParams.verifyCode, "info"]))
				].join("&")
			}).then(function (result) {
				var dr = {};

				if (result.length > 0)
					dr = result[0];

				self.formValue = {
					userId: (dr.id ? dr.id : ""),
					verifiedStatus: (dr.verifiedStatus ? dr.verifiedStatus : ""),
					email: (dr.email ? dr.email : ""),
					fullName: (dr.fullName ? dr.fullName : ""),
					gender: (dr.genderFullNameEN ? dr.genderFullNameEN : ""),
					nationality: (dr.nationalityNameEN ? dr.nationalityNameEN : ""),
					country: (dr.countryNameEN ? dr.countryNameEN : "")
				};

				$timeout(function () {
					deferred.resolve();
				}, 0);
			});

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formField.email = self.formValue.email;
			self.formField.fullName = self.formValue.fullName;
			self.formField.gender = self.formValue.gender;
			self.formField.nationality = $filter("capitalize")(self.formValue.nationality);
			self.formField.country = self.formValue.country.toUpperCase();

			utilServ.gotoTopPage();
		};

		self.getValue = function () {
			var result = {
				"package": appServ.setPackage([$routeParams.userId, $routeParams.verifyCode]),
				"verifyStatus": "Y",
				"by": $routeParams.userId
			};

			return result;
		};

		self.saveChange = {
			action: function (index) {
				utilServ.dialogConfirm(appServ.getLabel(["activateAccount", "confirm"]), function (result) {
					if (result) {
						var data = self.getValue();

						appServ.save.action({
							url: (utilServ.getURLAPI(appServ.pathAPI) + "User/PutData"),
							method: "PUT",
							data: [data]
						}).then(function (result) {
							self.isSaveStatus = result.status;
						});
					}
				});
			}
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();