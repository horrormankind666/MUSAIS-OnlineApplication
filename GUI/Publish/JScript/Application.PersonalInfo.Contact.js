/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Personal Information ข้อมูล Contact>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.personalInfo.contactMod", [
		"utilMod",
		"appMod",
		"applicationMod",
		"application.personalInfoMod"
	])

	.controller("application.personalInfo.contactCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		applicationServ,
		personalInfoServ
	) {
		var self = this;

		self.init = function () {
			if (appServ.isUser && appServ.getUserInfo.applicationStatus === "WA") {
				self.setValue().then(function () {
					appServ.closeDialogPreloading();

					self.watchFormChange();

					if (self.dataRow) {
							self.resetValue();
							self.showForm = true;
					}
				});
			}
			else
				self.showForm = false;
		};

		self.formField = {
			contactTel: "",
			email: ""
		};

		self.formValue = {
			contactTel: "",
			email: ""
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					email1: true,
					email2: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.contactTel,
						self.formField.email
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.contactTel) ||
						(newValue[1] !== self.formValue.email)) {
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

			self.dataRow = {};
			self.isFormChanged = false;
			self.showForm = false;

			applicationServ.getDataSource({}).then(function (result) {
				self.dataRow = result[0];

				$timeout(function () {
					deferred.resolve();
				});
			});

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formValue.contactTel = self.dataRow.contactTel;
			self.formValue.email = self.dataRow.email;

			self.formField.contactTel = self.formValue.contactTel;
			self.formField.email = self.formValue.email;

			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.getValue = function () {
			var result = {
				"contactTel": (self.formField.contactTel ? self.formField.contactTel : "N/A"),
				"email": (self.formField.email ? self.formField.email : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;

				if (!self.formField.email) {
					self.formValidate.isValid.email1 = false;
					i++;
				}

				if (self.formField.email && !utilServ.isEmail(self.formField.email)) {
					self.formValidate.isValid.email2 = false;
					i++;
				}

				self.formValidate.showSaveError = (i > 0 ? true : false);

				return (i > 0 ? false : true);
			},
			action: function (index) {
				if (this.validate()) {
					utilServ.dialogConfirm(appServ.getLabel(["save", "confirm"]), function (result) {
						if (result) {
							applicationServ.saveChange.update.action({
								data: self.getValue()
							}).then(function (result) {
								if (result.status) {
									self.dataRow.contactTel = (self.formField.contactTel ? self.formField.contactTel : "");
									self.dataRow.email = (self.formField.email ? self.formField.email : "");

									self.isFormChanged = false;
									self.resetValue();

									personalInfoServ.tabSelect("emergencyContact");
								}
							});
						}
					});
				}
				else
					utilServ.dialogError(appServ.getLabel(["application", "save"]), function () { });
			}
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();