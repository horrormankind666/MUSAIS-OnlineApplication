/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๖/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Personal Information ข้อมูล Profile>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.personalInfo.profileMod", [
		"utilMod",
		"appMod",
		"applicationMod",
		"application.personalInfoMod",
		"titlePrefixMod",
		"genderMod",
		"nationalityMod",
		"maritalStatusMod"
	])

	.controller("application.personalInfo.profileCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		applicationServ,
		personalInfoServ,
		titlePrefixServ,
		genderServ,
		nationalityServ,
		maritalStatusServ
	) {
		var self = this;

		$scope.datepickerBirthDate = {
			date: ""
		};

		$scope.datepickerPassportExpiryDate = {
			date: ""
		};

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
			titlePrefix: "",
			titlePrefixSelected: {},
			firstName: "",
			middleName: "",
			lastName: "",
			gender: "",
			genderSelected: "",
			nationality: "",
			nationalitySelected: {},
			maritalStatus: "",
			maritalStatusSelected: "",
			passportNumber: ""
		};

		self.formValue = {
			titlePrefixSelected: {},
			firstName: "",
			middleName: "",
			lastName: "",
			datepickerBirthDate: {
				date: ""
			},
			genderSelected: "",
			nationalitySelected: {},
			maritalStatusSelected: "",
			passportNumber: "",
			datepickerPassportExpiryDate: {
				date: ""
			}
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					titlePrefix: true,
					firstName: true,
					lastName: true,
					birthDate: true,
					gender: true,
					nationality: true,
					maritalStatus: true,
					passportNumber: true,
					passportExpiryDate: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.titlePrefixSelected.selected,
						self.formField.firstName,
						self.formField.middleName,
						self.formField.lastName,
						$scope.datepickerBirthDate.date,
						self.formField.genderSelected,
						self.formField.nationalitySelected.selected,
						self.formField.maritalStatusSelected,
						self.formField.passportNumber,
						$scope.datepickerPassportExpiryDate.date
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.titlePrefixSelected.selected) ||
						(newValue[1] !== self.formValue.firstName) ||
						(newValue[2] !== self.formValue.middleName) ||
						(newValue[3] !== self.formValue.lastName) ||
						(newValue[4] !== self.formValue.datepickerBirthDate.date) ||
						(newValue[5] !== self.formValue.genderSelected) ||
						(newValue[6] !== self.formValue.nationalitySelected.selected) ||
						(newValue[7] !== self.formValue.maritalStatusSelected) ||
						(newValue[8] !== self.formValue.passportNumber) ||
						(newValue[9] !== self.formValue.datepickerPassportExpiryDate.date)) {
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

			self.dataRow = {};
			self.isFormChanged = false;
			self.showForm = false;

			self.formValidate.setValue();

			applicationServ.getDataSource({}).then(function (result) {
				self.dataRow = result[0];

				if (self.dataRow) {
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

								maritalStatusServ.getDataSource({
									data: [
										"",
										"cancelledStatus=N"
									].join("&")
								}).then(function (result) {
									self.formField.maritalStatus = angular.copy(result);

									$timeout(function () {
										deferred.resolve();
									}, 0);
								});
							});
						});
					});
				}
				else
					$timeout(function () {
						deferred.resolve();
					}, 0);
			});

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formValue.titlePrefixSelected.selected = (self.dataRow.titlePrefixId ? utilServ.getObjectByValue(self.formField.titlePrefix, "id", self.dataRow.titlePrefixId)[0] : undefined);
			self.onSelectTitlePrefix(self.formValue.titlePrefixSelected.selected);
			self.formValue.firstName = self.dataRow.firstName;
			self.formValue.middleName = self.dataRow.middleName;
			self.formValue.lastName = self.dataRow.lastName;
			self.formValue.datepickerBirthDate.date = self.dataRow.birthDate;
			self.formValue.genderSelected = self.dataRow.genderId;
			self.formValue.nationalitySelected.selected = (self.dataRow.nationalityId ? utilServ.getObjectByValue(self.formField.nationality, "id", self.dataRow.nationalityId)[0] : undefined);;
			self.formValue.maritalStatusSelected = self.dataRow.maritalStatusId;
			self.formValue.passportNumber = self.dataRow.passportNumber;
			self.formValue.datepickerPassportExpiryDate.date = self.dataRow.passportExpiryDate;

			$timeout(function () {
				self.formField.titlePrefixSelected.selected = self.formValue.titlePrefixSelected.selected;
				self.formField.firstName = self.formValue.firstName;
				self.formField.middleName = self.formValue.middleName;
				self.formField.lastName = self.formValue.lastName;
				$scope.datepickerBirthDate.date = self.formValue.datepickerBirthDate.date;
				$("input:radio[name='gender']").filter("[value='" + self.formValue.genderSelected + "']").iCheck("check");
				self.formField.genderSelected = self.formValue.genderSelected;
				self.formField.nationalitySelected.selected = self.formValue.nationalitySelected.selected;
				$("input:radio[name='maritalstatus']").filter("[value='" + self.formValue.maritalStatusSelected + "']").iCheck("check");
				self.formField.maritalStatusSelected = self.formValue.maritalStatusSelected;
				self.formField.passportNumber = self.formValue.passportNumber;
				$scope.datepickerPassportExpiryDate.date = self.formValue.datepickerPassportExpiryDate.date;
			}, 0);

			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.getValue = function () {
			var result = {
				"titlePrefixId": (self.formField.titlePrefixSelected.selected ? self.formField.titlePrefixSelected.selected.id : "N/A"),
				"firstName": (self.formField.firstName ? self.formField.firstName : "N/A"),
				"middleName": (self.formField.middleName ? self.formField.middleName : "N/A"),
				"lastName": (self.formField.lastName ? self.formField.lastName : "N/A"),
				"birthdate": ($scope.datepickerBirthDate.date ? $scope.datepickerBirthDate.date : "N/A"),
				"genderId": (self.formField.genderSelected ? self.formField.genderSelected : "N/A"),
				"nationalityId": (self.formField.nationalitySelected.selected ? self.formField.nationalitySelected.selected.id : "N/A"),
				"maritalStatusId": (self.formField.maritalStatusSelected ? self.formField.maritalStatusSelected : "N/A"),
				"passportNumber": (self.formField.passportNumber ? self.formField.passportNumber : "N/A"),
				"passportExpiryDate": ($scope.datepickerPassportExpiryDate.date ? $scope.datepickerPassportExpiryDate.date : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;

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

				if (!$scope.datepickerBirthDate.date) {
					self.formValidate.isValid.birthDate = false;
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

				if (!self.formField.maritalStatusSelected) {
					self.formValidate.isValid.maritalStatus = false;
					i++;
				}

				if (!self.formField.passportNumber) {
					self.formValidate.isValid.passportNumber = false;
					i++;
				}

				if (!$scope.datepickerPassportExpiryDate.date) {
					self.formValidate.isValid.passportExpiryDate = false;
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
									self.dataRow.titlePrefixId = (self.formField.titlePrefixSelected.selected ? self.formField.titlePrefixSelected.selected.id : "");
									self.dataRow.firstName = (self.formField.firstName ? self.formField.firstName : "");
									self.dataRow.middleName = (self.formField.middleName ? self.formField.middleName : "");
									self.dataRow.lastName = (self.formField.lastName ? self.formField.lastName : "");
									self.dataRow.birthDate = ($scope.datepickerBirthDate.date ? $scope.datepickerBirthDate.date : "");
									self.dataRow.genderId = (self.formField.genderSelected ? self.formField.genderSelected : "");
									self.dataRow.nationalityId = (self.formField.nationalitySelected.selected ? self.formField.nationalitySelected.selected.id : "");
									self.dataRow.maritalStatusId = (self.formField.maritalStatusSelected ? self.formField.maritalStatusSelected : "");
									self.dataRow.passportNumber = (self.formField.passportNumber ? self.formField.passportNumber : "");
									self.dataRow.passportExpiryDate = ($scope.datepickerPassportExpiryDate.date ? $scope.datepickerPassportExpiryDate.date : "");

									self.isFormChanged = false;
									self.resetValue();

									personalInfoServ.tabSelect("homeAddress");
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