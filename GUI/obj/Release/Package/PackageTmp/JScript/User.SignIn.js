/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๐/๐๖/๒๕๖๑>
Modify date : <๐๙/๐๙/๒๕๖๓>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับการเข้าสู่ระบบ>
=============================================
*/

(function () {
	"use strict";

	angular.module("user.signinMod", [
		"utilMod",
		"appMod",
		"dictMod"
	])

	.controller("user.signinCtrl", function (
		$scope,
		$window,
		$timeout,
		$location,
		$q,
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
				});
			}
			else
				self.showForm = false;
		};

		self.formField = {
			username: "",
			password: ""
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.showForm = false;

			deferred.resolve();

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formField.username = "";
			self.formField.password = "";

			utilServ.gotoTopPage();
		};

		self.signin = {
			action: function (index) {
				utilServ.getDialogPreloading(dictServ.dict.msgPreloading.signin);

				appServ.getListUser({
					action: "getdata",
					params: [
						"",
						("package=" + appServ.setPackage([self.formField.username, self.formField.password, "signin"]))
					].join("&")
				}).then(function (result) {
					var dr = {};

					if (result.length > 0) {
						dr = result[0];

						if (dr.verifiedStatus === "N") {
							appServ.closeDialogPreloading();

							utilServ.dialogError(appServ.getLabel(["authen", "userNotVerify"]), function (e) {
							});
						}
						else {
							if (!dr.sexApplicationId) {
								var data = {
									"package": appServ.setPackage([dr.id, dr.verifyCode]),
									"by": (dr.id ? dr.id : null)
								};

								appServ.save.action({
									url: (utilServ.getURLAPI(appServ.pathAPI) + "Application/PostData"),
									method: "POST",
									data: [data],
									showMessageSuccess: false
								}).then(function (result) {
									appServ.setCookie({
										userId: dr.id,
										verifyCode: dr.verifyCode,
										applicationId: result.applicationId,
										applicationStatus: result.applicationStatus
									});
									/*
									$location.path("/Application/StudentInfo").replace();
									*/
									$location.path("/TermServiceConsent/PrivacyPolicy").replace();
								});
							}
							else {
								appServ.closeDialogPreloading();

								if (dr.applicationStatus) {
									appServ.setCookie({
										userId: dr.id,
										verifyCode: dr.verifyCode,
										applicationId: dr.sexApplicationId,
										applicationStatus: dr.applicationStatus
									});
									/*
									if (dr.applicationStatus !== "WA")
										$location.path("/Application/View").replace();
									else
										$location.path("/Application/StudentInfo").replace();
									*/
									$location.path("/TermServiceConsent/PrivacyPolicy").replace();
								}
								else
									utilServ.dialogError(appServ.getLabel(["application", "applicationStatusNotValid"]), function (e) {
									});
							}
						}
					}
					else {
						appServ.closeDialogPreloading();

						utilServ.dialogError(appServ.getLabel(["authen", "userNotFound"]), function (e) {
						});
					}
				});
			}
		};

		self.requestPassword = {
			getDialogForm: {
				template: "Module/User.RequestPassword.html",
				action: function () {
					utilServ.getDialogPreloading(dictServ.dict.msgPreloading.loading);

					utilServ.getDialogForm(this.template, $scope, "requestpassword", appServ.getLabel(["requestPassword"])).then(function () {
					});
				}
			}
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();