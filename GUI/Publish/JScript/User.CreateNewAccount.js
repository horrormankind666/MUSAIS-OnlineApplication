/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๘/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับการสร้างบัญชีผู้ใช้ใหม่>
=============================================
*/

(function () {
	"use strict";

	angular.module("user.createNewAccountMod", [
		"utilMod",
		"appMod",
		"dictMod",
		"titlePrefixMod",
		"genderMod",
		"nationalityMod",
		"countryMod"
	])

	.controller("user.createNewAccountCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		dictServ,
		titlePrefixServ,
		genderServ,
		nationalityServ,
		countryServ
	) {
		var self = this;

		$scope.selectables = [
			1, 2, 3
		];

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
			email: "",
			password: "",
			verifyPassword: "",
			titlePrefix: "",
			titlePrefixSelected: {},
			firstName: "",
			middleName: "",
			lastName: "",
			gender: "",
			genderSelected: "",
			nationality: "",
			nationalitySelected: {},
			country: "",
			countrySelected: {}
		};

		self.formValue = {
			email: "",
			password: "",
			verifyPassword: "",
			titlePrefixSelected: {},
			firstName: "",
			middleName: "",
			lastName: "",
			genderSelected: "",
			nationalitySelected: {},
			countrySelected: {}
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					email1: true,
					email2: true,
					password1: true,
					password2: true,
					verifyPassword1: true,
					verifyPassword2: true,
					titlePrefix: true,
					firstName: true,
					lastName: true,
					gender: true,
					nationality: true,
					country: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.email,
						self.formField.password,
						self.formField.verifyPassword,
						self.formField.titlePrefixSelected.selected,
						self.formField.firstName,
						self.formField.middleName,
						self.formField.lastName,
						self.formField.genderSelected,
						self.formField.nationalitySelected.selected,
						self.formField.countrySelected.selected
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.email) ||
						(newValue[1] !== self.formValue.password) ||
						(newValue[2] !== self.formValue.verifyPassword) ||
						(newValue[3] !== self.formValue.titlePrefixSelected.selected) ||
						(newValue[4] !== self.formValue.firstName) ||
						(newValue[5] !== self.formValue.middleName) ||
						(newValue[6] !== self.formValue.lastName) ||
						(newValue[7] !== self.formValue.genderSelected) ||
						(newValue[8] !== self.formValue.nationalitySelected.selected) ||
						(newValue[9] !== self.formValue.countrySelected.selected)) {
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
				name: "gender",
				data: item,
				key: "genderId"
			}).then(function () {
				if (item === undefined)
					$timeout(function () {
						$("input:radio[name='gender']").iCheck("uncheck");
						self.formField.genderSelected = "";
					}, 0);
				else
					self.formField.genderSelected = item.genderId;
			});
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.isFormChanged = false;
			self.isSaveStatus = false;
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

					nationalityServ.getDataSource({
						data: [
							"",
							"cancelledStatus=N",
							"sortOrderBy=Full Name ( EN )"
						].join("&")
					}).then(function (result) {
						self.formField.nationality = angular.copy(result);

						countryServ.getDataSource({
							data: [
								"",
								"cancelledStatus=N",
								"sortOrderBy=Full Name ( EN )"
							].join("&")
						}).then(function (result) {
							self.formField.country = angular.copy(result);

							$timeout(function () {
								deferred.resolve();
							}, 0);
						});
					});
				});
			});

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formValue.email = "";
			self.formValue.password = "";
			self.formValue.verifyPassword = "";
			self.formValue.titlePrefixSelected.selected = undefined;
			self.onSelectTitlePrefix(self.formValue.titlePrefixSelected.selected);
			self.formValue.firstName = "";
			self.formValue.middleName = "";
			self.formValue.lastName = "";
			self.formValue.genderSelected = "";
			self.formValue.nationalitySelected.selected = undefined;
			self.formValue.countrySelected.selected = undefined;

			$timeout(function () {
				self.formField.email = self.formValue.email;
				self.formField.password = self.formValue.password;
				self.formField.verifyPassword = self.formValue.verifyPassword;
				self.formField.titlePrefixSelected.selected = self.formValue.titlePrefixSelected.selected;
				self.formField.firstName = self.formValue.firstName;
				self.formField.middleName = self.formValue.middleName;
				self.formField.lastName = self.formValue.lastName;
				$("input:radio[name='gender']").iCheck("uncheck");
				self.formField.genderSelected = self.formValue.genderSelected;
				self.formField.nationalitySelected.selected = self.formValue.nationalitySelected.selected;
				self.formField.countrySelected.selected = self.formValue.countrySelected.selected;
			}, 0);

			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.getValue = function () {
			var result = {
				"package": appServ.setPackage([self.formField.email, self.formField.password]),
				"verifyStatus": "Y",
				"titlePrefixId": (self.formField.titlePrefixSelected.selected ? self.formField.titlePrefixSelected.selected.id : "N/A"),
				"firstName": (self.formField.firstName ? self.formField.firstName : "N/A"),
				"middleName": (self.formField.middleName ? self.formField.middleName : "N/A"),
				"lastName": (self.formField.lastName ? self.formField.lastName : "N/A"),
				"genderId": (self.formField.genderSelected ? self.formField.genderSelected : "N/A"),
				"nationalityId": (self.formField.nationalitySelected.selected ? self.formField.nationalitySelected.selected.id : "N/A"),
				"countryId": (self.formField.countrySelected.selected ? self.formField.countrySelected.selected.id : "N/A"),
				"email": (self.formField.email ? self.formField.email : "N/A"),
				"cancelledStatus": "N",
				"by": (self.formField.email ? self.formField.email : "N/A")
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

				if (self.formField.email &&
					!utilServ.isEmail(self.formField.email)) {
					self.formValidate.isValid.email2 = false;
					i++;
				}

				if (!self.formField.password) {
					self.formValidate.isValid.password1 = false;
					i++;
				}

				if (self.formField.password.length === 1) {
					self.formValidate.isValid.password2 = false;
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

				if (!self.formField.nationalitySelected.selected) {
					self.formValidate.isValid.nationality = false;
					i++;
				}

				if (!self.formField.countrySelected.selected) {
					self.formValidate.isValid.country = false;
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
									("package=" + appServ.setPackage([self.formField.email, self.formField.password]))
								].join("&")
							}).then(function (result) {
								if (result[0].exist === "Y") {
									appServ.closeDialogPreloading();

									utilServ.dialogError(appServ.getLabel(["createNewAccount", "save", "userExistError"]), function () { });
								}
								else {
									var data = self.getValue();

									appServ.save.action({
										url: (utilServ.getURLAPI(appServ.pathAPI) + "User/PostData"),
										method: "POST",
										data: [data]
									}).then(function (result) {
										self.isSaveStatus = result.status;

										if (result.status) {
											self.isFormChanged = false;
											self.resetValue();
										}
									});
								}
							});
						}
					});
				}
				else
					utilServ.dialogError(appServ.getLabel(["createNewAccount", "save"]), function () { });
			}
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();