/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Personal Information ข้อมูล Emergency Contact>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.personalInfo.emergencyContactMod", [
		"utilMod",
		"appMod",
		"applicationMod",
		"relationshipMod",
		"countryMod"
	])

	.controller("application.personalInfo.emergencyContactCtrl", function (
		$scope,
		$timeout,
		$location,
		$q,
		utilServ,
		appServ,
		applicationServ,
		relationshipServ,
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
			name: "",
			relationship: "",
			relationshipSelected: {},
			address: "",
			district: "",
			city: "",
			province: "",
			postalCode: "",
			country: "",
			countrySelected: {},
			homeTel: "",
			officeTel: "",
			mobile: "",
			fax: "",
			email: ""
		};

		self.formValue = {
			name: "",
			relationshipSelected: {},
			address: "",
			district: "",
			city: "",
			province: "",
			postalCode: "",
			countrySelected: {},
			homeTel: "",
			officeTel: "",
			mobile: "",
			fax: "",
			email: ""
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					name: true,
					relationship: true,
					address: true,
					city: true,
					province: true,
					country: true,
					homeTel: true,
					mobile: true,
					email1: true,
					email2: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.name,
						self.formField.relationshipSelected.selected,
						self.formField.address,
						self.formField.district,
						self.formField.city,
						self.formField.province,
						self.formField.postalCode,
						self.formField.countrySelected.selected,
						self.formField.homeTel,
						self.formField.officeTel,
						self.formField.mobile,
						self.formField.fax,
						self.formField.email
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.name) ||
						(newValue[1] !== self.formValue.relationshipSelected.selected) ||
						(newValue[2] !== self.formValue.address) ||
						(newValue[3] !== self.formValue.district) ||
						(newValue[4] !== self.formValue.city) ||
						(newValue[5] !== self.formValue.province) ||
						(newValue[6] !== self.formValue.postalCode) ||
						(newValue[7] !== self.formValue.countrySelected.selected) ||
						(newValue[8] !== self.formValue.homeTel) ||
						(newValue[9] !== self.formValue.officeTel) ||
						(newValue[10] !== self.formValue.mobile) ||
						(newValue[11] !== self.formValue.fax) ||
						(newValue[12] !== self.formValue.email)) {
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

			self.formValidate.setValue();

			applicationServ.getDataSource({}).then(function (result) {
				self.dataRow = result[0];

				if (self.dataRow) {
					relationshipServ.getDataSource({
						data: [
							"",
							"cancelledStatus=N"
						].join("&")
					}).then(function (result) {
						self.formField.relationship = angular.copy(result);

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
				}
				else
					$timeout(function () {
						deferred.resolve();
					}, 0);
			});

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formValue.name = self.dataRow.emergencyName;
			self.formValue.relationshipSelected.selected = (self.dataRow.relationshipId ? utilServ.getObjectByValue(self.formField.relationship, "id", self.dataRow.relationshipId)[0] : undefined);
			self.formValue.address = self.dataRow.emergencyMailingAddress;
			self.formValue.district = self.dataRow.emergencyMailingDistrict;
			self.formValue.city = self.dataRow.emergencyMailingCity;
			self.formValue.province = self.dataRow.emergencyMailingProvince;
			self.formValue.postalCode = self.dataRow.emergencyMailingPostalCode;
			self.formValue.countrySelected.selected = (self.dataRow.countryMailingEmergencyId ? utilServ.getObjectByValue(self.formField.country, "id", self.dataRow.countryMailingEmergencyId)[0] : undefined);
			self.formValue.homeTel = self.dataRow.emergencyHomeTel;
			self.formValue.officeTel = self.dataRow.emergencyOfficeTel;
			self.formValue.mobile = self.dataRow.emergencyMobile;
			self.formValue.fax = self.dataRow.emergencyFax;
			self.formValue.email = self.dataRow.emergencyEmail;

			self.formField.name = self.formValue.name;
			self.formField.relationshipSelected.selected = self.formValue.relationshipSelected.selected;
			self.formField.address = self.formValue.address;
			self.formField.district = self.formValue.district;
			self.formField.city = self.formValue.city;
			self.formField.province = self.formValue.province;
			self.formField.postalCode = self.formValue.postalCode;
			self.formField.countrySelected.selected = self.formValue.countrySelected.selected;
			self.formField.homeTel = self.formValue.homeTel;
			self.formField.officeTel = self.formValue.officeTel;
			self.formField.mobile = self.formValue.mobile;
			self.formField.fax = self.formValue.fax;
			self.formField.email = self.formValue.email;

			$timeout(function () {
				$("textarea").blur();
			}, 0);

			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.getValue = function () {
			var result = {
				"emergencyName": (self.formField.name ? self.formField.name : "N/A"),
				"relationshipId": (self.formField.relationshipSelected.selected ? self.formField.relationshipSelected.selected.id : "N/A"),
				"emergencyMailingAddress": (self.formField.address ? self.formField.address : "N/A"),
				"emergencyMailingDistrict": (self.formField.district ? self.formField.district : "N/A"),
				"emergencyMailingCity": (self.formField.city ? self.formField.city : "N/A"),
				"emergencyMailingProvince": (self.formField.province ? self.formField.province : "N/A"),
				"emergencyMailingPostalCode": (self.formField.postalCode ? self.formField.postalCode : "N/A"),
				"countryMailingEmergencyId": (self.formField.countrySelected.selected ? self.formField.countrySelected.selected.id : "N/A"),
				"emergencyHomeTel": (self.formField.homeTel ? self.formField.homeTel : "N/A"),
				"emergencyOfficeTel": (self.formField.officeTel ? self.formField.officeTel : "N/A"),
				"emergencyMobile": (self.formField.mobile ? self.formField.mobile : "N/A"),
				"emergencyFax": (self.formField.fax ? self.formField.fax : "N/A"),
				"emergencyEmail": (self.formField.email ? self.formField.email : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;

				if (!self.formField.name) {
					self.formValidate.isValid.name = false;
					i++;
				}

				if (!self.formField.relationshipSelected.selected) {
					self.formValidate.isValid.relationship = false;
					i++;
				}

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

				if (!self.formField.homeTel) {
					self.formValidate.isValid.homeTel = false;
					i++;
				}

				if (!self.formField.mobile) {
					self.formValidate.isValid.mobile = false;
					i++;
				}

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
									self.dataRow.emergencyName = (self.formField.name ? self.formField.name : "");
									self.dataRow.relationshipId = (self.formField.relationshipSelected.selected ? self.formField.relationshipSelected.selected.id : "");
									self.dataRow.emergencyMailingAddress = (self.formField.address ? self.formField.address : "");
									self.dataRow.emergencyMailingDistrict = (self.formField.district ? self.formField.district : "");
									self.dataRow.emergencyMailingCity = (self.formField.city ? self.formField.city : "");
									self.dataRow.emergencyMailingProvince = (self.formField.province ? self.formField.province : "");
									self.dataRow.emergencyMailingPostalCode = (self.formField.postalCode ? self.formField.postalCode : "");
									self.dataRow.countryMailingEmergencyId = (self.formField.countrySelected.selected ? self.formField.countrySelected.selected.id : "");
									self.dataRow.emergencyHomeTel = (self.formField.homeTel ? self.formField.homeTel : "");
									self.dataRow.emergencyOfficeTel = (self.formField.officeTel ? self.formField.officeTel : "");
									self.dataRow.emergencyMobile = (self.formField.mobile ? self.formField.mobile : "");
									self.dataRow.emergencyFax = (self.formField.fax ? self.formField.fax : "");
									self.dataRow.emergencyEmail = (self.formField.email ? self.formField.email : "");

									self.isFormChanged = false;
									self.resetValue();

									$location.path("/Application/AcademicInfo").replace();
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