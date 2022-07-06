/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๕/๐๘/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับการแก้ไขบัญชีผู้ใช้>
=============================================
*/

(function () {
	"use strict";

	angular.module("user.editAccountMod", [
		"utilMod",
		"appMod",
		"dictMod",
		"titlePrefixMod",
		"genderMod"
	])

	.controller("user.editAccounBeforeCtrl", function (
		$scope,
		utilServ,
		appServ,
		dictServ
	) {
		var self = this;

		self.getDialogForm = {
			template: "Module/User.EditAccount.html",
			action: function () {
				utilServ.getDialogPreloading(dictServ.dict.msgPreloading.loading);

				utilServ.getDialogForm(this.template, $scope, "editaccount", appServ.getLabel(["editAccount"])).then(function () {
				});
			}
		};
	})

	.controller("user.editAccounCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		dictServ,
		titlePrefixServ,
		genderServ
	) {
		var self = this;

		self.init = function () {
			if (appServ.isUser) {
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
			password: "",
			verifyPassword: "",
			titlePrefix: "",
			titlePrefixSelected: {},
			firstName: "",
			middleName: "",
			lastName: "",
			gender: "",
			genderSelected: "",
			email: ""
		};

		self.formValue = {
			username: "",
			password: "",
			verifyPassword: "",
			titlePrefixSelected: {},
			firstName: "",
			middleName: "",
			lastName: "",
			genderSelected: "",
			email: ""
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					username: true,
					password: true,
					verifyPassword1: true,
					verifyPassword2: true,
					titlePrefix: true,
					firstName: true,
					lastName: true,
					gender: true,
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
						self.formField.password,
						self.formField.verifyPassword,
						self.formField.titlePrefixSelected.selected,
						self.formField.firstName,
						self.formField.middleName,
						self.formField.lastName,
						self.formField.genderSelected,
						self.formField.email
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.username) ||
						(newValue[1] !== self.formValue.password) ||
						(newValue[2] !== self.formValue.verifyPassword) ||
						(newValue[3] !== self.formValue.titlePrefixSelected.selected) ||
						(newValue[4] !== self.formValue.firstName) ||
						(newValue[5] !== self.formValue.middleName) ||
						(newValue[6] !== self.formValue.lastName) ||
						(newValue[7] !== self.formValue.genderSelected) ||
						(newValue[8] !== self.formValue.email)) {
						self.isFormChanged = true;
						self.formValidate.resetValue();
					}
					else
						self.isFormChanged = false;
				}, true);
			}, 0);
		};

		self.onSelectTitlePrefix = function (item) {
			appServ.setRadioBy({
				name: "accountgender",
				data: item,
				key: "genderId"
			}).then(function () {
				if (item === undefined)
					$timeout(function () {
						$("input:radio[name='accountgender']").iCheck("uncheck");
						self.formField.genderSelected = "";
					}, 0);
				else
					self.formField.genderSelected = item.genderId;
			});
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.isFormChanged = false;
			self.showForm = false;

			self.formValidate.setValue();

			titlePrefixServ.getDataSource({
				data: [
					"",
					"cancelledStatus=N"
				].join("&")
			}).then(function (result) {
				self.formField.titlePrefix = angular.copy(result);

				genderServ.getDataSource({
					data: [
						"",
						"cancelledStatus=N"
					].join("&")
				}).then(function (result) {
					self.formField.gender = angular.copy(result);

					$timeout(function () {
						deferred.resolve();
					}, 0);
				});
			});

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formValue.username = appServ.getUserInfo.username;
			self.formValue.password = "";
			self.formValue.verifyPassword = "";
			self.formValue.titlePrefixSelected.selected = (appServ.getUserInfo.titlePrefixId ? utilServ.getObjectByValue(self.formField.titlePrefix, "id", appServ.getUserInfo.titlePrefixId)[0] : undefined);
			self.onSelectTitlePrefix(self.formValue.titlePrefixSelected.selected);
			self.formValue.firstName = appServ.getUserInfo.firstName;
			self.formValue.middleName = appServ.getUserInfo.middleName;
			self.formValue.lastName = appServ.getUserInfo.lastName;
			self.formValue.genderSelected = appServ.getUserInfo.genderId;
			self.formValue.email = appServ.getUserInfo.email;

			$timeout(function () {
				self.formField.username = self.formValue.username;
				self.formField.password = self.formValue.password;
				self.formField.verifyPassword = self.formValue.verifyPassword;
				self.formField.titlePrefixSelected.selected = self.formValue.titlePrefixSelected.selected;
				self.formField.firstName = self.formValue.firstName;
				self.formField.middleName = self.formValue.middleName;
				self.formField.lastName = self.formValue.lastName;
				$("input:radio[name='accountgender']").filter("[value='" + self.formValue.genderSelected + "']").iCheck("check");
				self.formField.genderSelected = self.formValue.genderSelected;
				self.formField.email = self.formValue.email;
			}, 0);

			self.formValidate.resetValue();
		};

		self.getValue = function () {
			var result = {
				"package": appServ.setPackage([appServ.getUserInfo.userId, appServ.getUserInfo.verifyCode, self.formField.username, self.formField.password]),
				"titlePrefixId": (self.formField.titlePrefixSelected.selected ? self.formField.titlePrefixSelected.selected.id : "N/A"),
				"firstName": (self.formField.firstName ? self.formField.firstName : "N/A"),
				"middleName": (self.formField.middleName ? self.formField.middleName : "N/A"),
				"lastName": (self.formField.lastName ? self.formField.lastName : "N/A"),
				"genderId": (self.formField.genderSelected ? self.formField.genderSelected : "N/A"),
				"email": (self.formField.email ? self.formField.email : "N/A"),
				"by": (appServ.getUserInfo.userId ? appServ.getUserInfo.userId : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;

				if (!self.formField.username) {
					self.formValidate.isValid.username = false;
					i++;
				}

				if (self.formField.password.length === 1) {
					self.formValidate.isValid.password = false;
					i++;
				}

				if (self.formField.password.length > 1 &&
					!self.formField.verifyPassword) {
					self.formValidate.isValid.verifyPassword1 = false;
					i++;
				}

				if (self.formField.verifyPassword &&
					self.formField.password !== self.formField.verifyPassword) {
					self.formValidate.isValid.verifyPassword2 = false;
					i++;
				}

				if (!self.formField.titlePrefixSelected.selected) {
					self.formValidate.isValid.titlePrefix = false;
					i++;
				}

				if (!self.formField.firstName) {
					self.formValidate.isValid.firstName = false;
					i++;
				}

				if (!self.formField.lastName) {
					self.formValidate.isValid.lastName = false;
					i++;
				}

				if (!self.formField.genderSelected) {
					self.formValidate.isValid.gender = false;
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

				self.formValidate.showSaveError = (i > 0 ? true : false);

				return (i > 0 ? false : true);
			},
			action: function (index) {
				if (this.validate()) {
					utilServ.dialogConfirm(appServ.getLabel(["save", "confirm"]), function (result) {
						if (result) {
							utilServ.getDialogPreloading(dictServ.dict.msgPreloading.saving);

							appServ.getListUser({
								action: "getexist",
								params: [
									"",
									("packageOld=" + appServ.setPackage([appServ.getUserInfo.userId, self.formField.username, self.formField.password]))
								].join("&")
							}).then(function (result) {
								if (result[0].exist === "Y") {
									appServ.closeDialogPreloading();

									utilServ.dialogError(appServ.getLabel(["editAccount", "save", "userExistError"]), function () { });
								}
								else {
									var data = self.getValue();

									appServ.save.action({
										url: (utilServ.getURLAPI(appServ.pathAPI) + "User/PutData"),
										method: "PUT",
										data: [data]
									}).then(function (result) {
										if (result.status) {
											appServ.userInfo.username = self.formField.username;
											appServ.userInfo.titlePrefixId = self.formField.titlePrefixSelected.selected.id;
											appServ.userInfo.titlePrefixFullName = self.formField.titlePrefixSelected.selected.name.EN;
											appServ.userInfo.titlePrefixInitials = self.formField.titlePrefixSelected.selected.initials.EN;
											appServ.userInfo.firstName = self.formField.firstName;
											appServ.userInfo.middleName = self.formField.middleName;
											appServ.userInfo.lastName = self.formField.lastName;
											appServ.userInfo.fullName = (appServ.userInfo.titlePrefixInitials + appServ.userInfo.firstName + " " + (appServ.userInfo.middleName ? (appServ.userInfo.middleName + " ") : " ") + appServ.userInfo.lastName);
											appServ.userInfo.genderId = self.formField.genderSelected;
											appServ.userInfo.email = self.formField.email;

											appServ.getUserInfo = appServ.userInfo;

											$timeout(function () {
												$("#" + utilServ.idDialogForm).modal("hide");
											}, 0);
										}
									});
								}
							});
						}
					});
				}
				else
					utilServ.dialogError(appServ.getLabel(["editAccount", "save"]), function () { });
			}
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();