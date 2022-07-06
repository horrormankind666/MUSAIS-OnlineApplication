/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๐/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Personal Information ข้อมูล Mailing Address>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.personalInfo.mailingAddressMod", [
		"utilMod",
		"appMod",
		"dictMod",
		"applicationMod",
		"application.personalInfoMod",
		"countryMod"
	])

	.controller("application.personalInfo.mailingAddressCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		dictServ,
		applicationServ,
		personalInfoServ,
		countryServ
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
			address: "",
			district: "",
			city: "",
			province: "",
			postalCode: "",
			country: "",
			countrySelected: {}
		};

		self.formValue = {
			address: "",
			district: "",
			city: "",
			province: "",
			postalCode: "",
			countrySelected: {}
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					address: true,
					city: true,
					province: true,
					country: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.address,
						self.formField.district,
						self.formField.city,
						self.formField.province,
						self.formField.postalCode,
						self.formField.countrySelected.selected
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.address) ||
						(newValue[1] !== self.formValue.district) ||
						(newValue[2] !== self.formValue.city) ||
						(newValue[3] !== self.formValue.province) ||
						(newValue[4] !== self.formValue.postalCode) ||
						(newValue[5] !== self.formValue.countrySelected.selected)) {
						self.isFormChanged = true;
						self.formValidate.resetValue();
					}
					else
						self.isFormChanged = false;
				}, true);
			}, 0);
		};

		self.copyAddress = function () {
			utilServ.getDialogPreloading(dictServ.dict.msgPreloading.copying);

			applicationServ.getDataSource({}).then(function (result) {
				appServ.closeDialogPreloading();

				self.formField.address = result[0].homeAddress;
				self.formField.district = result[0].homeDistrict;
				self.formField.city = result[0].homeCity;
				self.formField.province = result[0].homeProvince;
				self.formField.postalCode = result[0].homePostalCode;
				self.formField.countrySelected.selected = (result[0].countryHomeId ? utilServ.getObjectByValue(self.formField.country, "id", result[0].countryHomeId)[0] : undefined);

				$timeout(function () {
					$("textarea").blur();
				}, 0);
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
						});
					});
				}
				else
					$timeout(function () {
						deferred.resolve();
					});
			});

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formValue.address = self.dataRow.mailingAddress;
			self.formValue.district = self.dataRow.mailingDistrict;
			self.formValue.city = self.dataRow.mailingCity;
			self.formValue.province = self.dataRow.mailingProvince;
			self.formValue.postalCode = self.dataRow.mailingPostalCode;
			self.formValue.countrySelected.selected = (self.dataRow.countryMailingId ? utilServ.getObjectByValue(self.formField.country, "id", self.dataRow.countryMailingId)[0] : undefined);

			self.formField.address = self.formValue.address;
			self.formField.district = self.formValue.district;
			self.formField.city = self.formValue.city;
			self.formField.province = self.formValue.province;
			self.formField.postalCode = self.formValue.postalCode;
			self.formField.countrySelected.selected = self.formValue.countrySelected.selected;

			$timeout(function () {
				$("textarea").blur();
			}, 0);

			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.getValue = function () {
			var result = {
				"mailingAddress": (self.formField.address ? self.formField.address : "N/A"),
				"mailingDistrict": (self.formField.district ? self.formField.district : "N/A"),
				"mailingCity": (self.formField.city ? self.formField.city : "N/A"),
				"mailingProvince": (self.formField.province ? self.formField.province : "N/A"),
				"mailingPostalCode": (self.formField.postalCode ? self.formField.postalCode : "N/A"),
				"countryMailingId": (self.formField.countrySelected.selected ? self.formField.countrySelected.selected.id : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;

				if (!self.formField.address) {
					self.formValidate.isValid.address = false;
					i++;
				}

				if (!self.formField.city) {
					self.formValidate.isValid.city = false;
					i++;
				}

				if (!self.formField.province) {
					self.formValidate.isValid.province = false;
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
							applicationServ.saveChange.update.action({
								data: self.getValue()
							}).then(function (result) {
								if (result.status) {
									self.dataRow.mailingAddress = (self.formField.address ? self.formField.address : "");
									self.dataRow.mailingDistrict = (self.formField.district ? self.formField.district : "");
									self.dataRow.mailingCity = (self.formField.city ? self.formField.city : "");
									self.dataRow.mailingProvince = (self.formField.province ? self.formField.province : "");
									self.dataRow.mailingPostalCode = (self.formField.postalCode ? self.formField.postalCode : "");
									self.dataRow.countryMailingId = (self.formField.countrySelected.selected ? self.formField.countrySelected.selected.id : "");

									self.isFormChanged = false;
									self.resetValue();

									personalInfoServ.tabSelect("contact");
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