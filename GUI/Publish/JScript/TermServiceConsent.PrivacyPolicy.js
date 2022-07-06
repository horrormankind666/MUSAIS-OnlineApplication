/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๙/๐๙/๒๕๖๓>
Modify date : <๑๐/๐๙/๒๕๖๓>
Description : <>
=============================================
*/

(function () {
	"use strict";

	angular.module("termServiceConsent.privacyPolicyMod", [
		"utilMod",
		"appMod",
		"dictMod"
	])

	.controller("termServiceConsent.privacyPolicyCtrl", function (
		$scope,
		$timeout,
		$location,
		$q,
		$route,
		utilServ,
		appServ,
		dictServ
	) {
		var self = this;

		self.template = "Module/PrivacyPolicy.html";

		self.init = function () {
			if (appServ.isUser && !appServ.isActionAgreePrivacyPolicy) {
				self.setValue().then(function () {
					appServ.closeDialogPreloading();

					self.resetValue();
					self.showForm = true;
				});
			}
			else
				self.showForm = false;
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.showForm = false;

			$timeout(function () {
				deferred.resolve();
			}, 0);

			return deferred.promise;
		};

		self.resetValue = function () {
			utilServ.gotoTopPage();
		};

		self.saveChange = {
			action: function () {
				var cookie = utilServ.getCookie({ cookieName: appServ.cookieName });
				var data = {
					"package": appServ.setPackage([cookie.key, appServ.userInfo.userId, appServ.termServiceTypeAgreePrivacyPolicy])
				};
				var requireSignIn = $route.current.requireSignIn;

				utilServ.getDialogPreloading(dictServ.dict.msgPreloading.saving);

				appServ.isActionValidateAuthen().then(function (result) {
					if (result === true || requireSignIn === false) {
						utilServ.http({
							url: (utilServ.getURLAPI(appServ.pathAPI) + "User/SetTermServiceConsent"),
							method: "POST",
							data: data
						}).then(function () {
							appServ.getListTermServiceConsent({
								action: "get",
								params: [
									"",
									("package=" + data.package)
								].join("&")
							}).then(function (result) {
								appServ.closeDialogPreloading();

								var dt = result;

								if (dt.length > 0) {
									if (appServ.getUserInfo.applicationStatus !== "WA")
										$location.path("/Application/View").replace();
									else
										$location.path("/Application/StudentInfo").replace();
								}
							});
						});
					}
				});
			}
		};

		self.getDialogForm = {
			action: function () {
				utilServ.getDialogPreloading(dictServ.dict.msgPreloading.loading);

				utilServ.getDialogForm(self.template, $scope, "privacypolicy", appServ.getLabel(["privacyPolicy"])).then(function () {
					appServ.closeDialogPreloading();
				});
			}
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();