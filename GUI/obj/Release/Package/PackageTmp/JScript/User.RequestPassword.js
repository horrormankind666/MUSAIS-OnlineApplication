/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๐/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับการร้องขอรหัสผ่าน>
=============================================
*/

(function () {
	"use strict";

	angular.module("user.requestPasswordMod", [
		"utilMod",
		"appMod",
		"dictMod"
	])

	.controller("user.requestPasswordCtrl", function (
		$scope,
		$timeout,
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

					self.watchFormChange();
					self.resetValue();
					self.showForm = true;
				});
			}
			else
				self.showForm = false;
		};

		self.formField = {
			username: "",
			verifyCode: "",
			email: ""
		};

		self.formValue = {
			username: "",
			verifyCode: "",
			email: ""
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSendError = false;
				this.isValid = {
					username: true,
					verifyCode: true,
					email1: true,
					email2: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.username,
						self.formField.verifyCode,
						self.formField.email
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.username) ||
						(newValue[1] !== self.formValue.verifyCode) ||
						(newValue[2] !== self.formValue.email)) {
						self.isFormChanged = true;
						self.formValidate.resetValue();
					}
					else
						self.isFormChanged = false;
				}, true);
			}, 0);
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.isFormChanged = false;
			self.showForm = false;

			self.formValidate.setValue();

			$timeout(function () {
				deferred.resolve();
			}, 0);

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formValue.username = "";
			self.formValue.verifyCode = "";
			self.formValue.email = "";

			self.formField.username = self.formValue.username;
			self.formField.verifyCode = self.formValue.verifyCode;
			self.formField.email = self.formValue.email;

			self.formValidate.resetValue();
		};

		self.sendEmail = {
			validate: function () {
				var i = 0;

				if (!self.formField.username) {
					self.formValidate.isValid.username = false;
					i++;
				}

				if (!self.formField.verifyCode) {
					self.formValidate.isValid.verifyCode = false;
					i++;
				}

				if (!self.formField.email) {
					self.formValidate.isValid.email1 = false;
					i++;
				}

				if (self.formField.email &&
					!utilServ.isEmail(self.formField.email)) {
					self.formValidate.isValid.email2 = false;
					i++;
				}

				self.formValidate.showSendError = (i > 0 ? true : false);

				return (i > 0 ? false : true);
			},
			action: function (index) {
				if (this.validate()) {
					utilServ.dialogConfirm(appServ.getLabel(["send", "confirm"]), function (result) {
						if (result) {
							utilServ.getDialogPreloading(dictServ.dict.msgPreloading.sending);

							appServ.getListUser({
								action: "getdata",
								params: [
									"",
									("package=" + appServ.setPackage([self.formField.username, self.formField.verifyCode, "requestPassword"])),
									"sendEmailStatus=Y",
									("email=" + self.formField.email)
								].join("&")
							}).then(function (result) {
								appServ.closeDialogPreloading();

								if (result.length > 0) {
									self.isFormChanged = false;
									self.resetValue();
									utilServ.dialogMessage(appServ.getLabel(["requestPassword", "infoImportantSuccessMsg"]), function () {
									});
								}
								else
									utilServ.dialogError(appServ.getLabel(["authen", "userNotFound"]), function (e) {
									});
							});
						}
					});
				}
			}
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();    