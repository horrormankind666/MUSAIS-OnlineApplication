/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Academic Information ข้อมูล Current Education>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.academicInfo.curEduMod", [
		"utilMod",
		"appMod",
		"applicationMod",
		"application.academicInfoMod",
		"disciplineMod",
		"educationalBackgroundMod",
		"yearStudyMod"
	])

	.controller("application.academicInfo.curEduCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		applicationServ,
		academicInfoServ,
		disciplineServ,
		educationalBackgroundServ,
		yearStudyServ
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
			eduInstitution: "",
			eduFaculty: "",
			discipline: "",
			disciplineSelected: {},
			educationalBackground: "",
			educationalBackgroundSelected: {},
			yearStudy: "",
			yearStudySelected: {}
		};

		self.formValue = {
			eduInstitution: "",
			eduFaculty: "",
			disciplineSelected: {},
			educationalBackgroundSelected: {},
			yearStudySelected: {}
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					eduInstitution: true,
					eduFaculty: true,
					discipline: true,
					educationalBackground: true,
					yearStudy: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.eduInstitution,
						self.formField.eduFaculty,
						self.formField.disciplineSelected.selected,
						self.formField.educationalBackgroundSelected.selected,
						self.formField.yearStudySelected.selected
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.eduInstitution) ||
						(newValue[1] !== self.formValue.eduFaculty) ||
						(newValue[2] !== self.formValue.disciplineSelected.selected) ||
						(newValue[3] !== self.formValue.educationalBackgroundSelected.selected) ||
						(newValue[4] !== self.formValue.yearStudySelected.selected)) {
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
					disciplineServ.getDataSource({
						data: [
							"",
							"cancelledStatus=N",
							"sortOrderBy=Full Name ( EN )"
						].join("&")
					}).then(function (result) {
						self.formField.discipline = angular.copy(result);

						educationalBackgroundServ.getDataSource({
							data: [
								"",
								"educationalLevel=05,06",
								"cancelledStatus=N"
							].join("&")
						}).then(function (result) {
							self.formField.educationalBackground = angular.copy(result);

							yearStudyServ.getDataSource({}).then(function (result) {
								self.formField.yearStudy = angular.copy(result);

								$timeout(function () {
									deferred.resolve();
								}, 0);
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
			self.formValue.eduInstitution = (self.dataRow.curEduInstitution ? self.dataRow.curEduInstitution : (self.dataRow.universityId ? self.dataRow.universityName[utilServ.lang] : self.dataRow.universityOther));
			self.formValue.eduFaculty = self.dataRow.curEduFaculty;
			self.formValue.disciplineSelected.selected = (self.dataRow.disciplineId ? utilServ.getObjectByValue(self.formField.discipline, "id", self.dataRow.disciplineId)[0] : undefined);
			self.formValue.educationalBackgroundSelected.selected = (self.dataRow.educationalBackgroundId ? utilServ.getObjectByValue(self.formField.educationalBackground, "id", self.dataRow.educationalBackgroundId)[0] : undefined);
			self.formValue.yearStudySelected.selected = (self.dataRow.curEduYear ? utilServ.getObjectByValue(self.formField.yearStudy, "id", self.dataRow.curEduYear)[0] : undefined);

			self.formField.eduInstitution = self.formValue.eduInstitution;
			self.formField.eduFaculty = self.formValue.eduFaculty;
			self.formField.disciplineSelected.selected = self.formValue.disciplineSelected.selected;
			self.formField.educationalBackgroundSelected.selected = self.formValue.educationalBackgroundSelected.selected;
			self.formField.yearStudySelected.selected = self.formValue.yearStudySelected.selected;
            
			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.getValue = function () {
			var result = {
				"curEduInstitution": (self.formField.eduInstitution ? self.formField.eduInstitution : "N/A"),
				"curEduFaculty": (self.formField.eduFaculty ? self.formField.eduFaculty : "N/A"),
				"disciplineId": (self.formField.disciplineSelected.selected ? self.formField.disciplineSelected.selected.id : "N/A"),
				"educationalBackgroundId": (self.formField.educationalBackgroundSelected.selected ? self.formField.educationalBackgroundSelected.selected.id : "N/A"),
				"curEduYear": (self.formField.yearStudySelected.selected ? self.formField.yearStudySelected.selected.id : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;

				if (!self.formField.eduInstitution) {
					self.formValidate.isValid.eduInstitution = false;
					i++;
				}

				if (!self.formField.eduFaculty) {
					self.formValidate.isValid.eduFaculty = false;
					i++;
				}

				if (!self.formField.disciplineSelected.selected) {
					self.formValidate.isValid.discipline = false;
					i++;
				}

				if (!self.formField.educationalBackgroundSelected.selected) {
					self.formValidate.isValid.educationalBackground = false;
					i++;
				}

				if (!self.formField.yearStudySelected.selected) {
					self.formValidate.isValid.yearStudy = false;
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
									self.dataRow.curEduInstitution = (self.formField.eduInstitution ? self.formField.eduInstitution : "");
									self.dataRow.curEduFaculty = (self.formField.eduFaculty ? self.formField.eduFaculty : "");
									self.dataRow.disciplineId = (self.formField.disciplineSelected.selected ? self.formField.disciplineSelected.selected.id : "");
									self.dataRow.educationalBackgroundId = (self.formField.educationalBackgroundSelected.selected ? self.formField.educationalBackgroundSelected.selected.id : "");
									self.dataRow.curEduYear = (self.formField.yearStudySelected.selected ? self.formField.yearStudySelected.selected.id : "");

									self.isFormChanged = false;
									self.resetValue();

									academicInfoServ.tabSelect("englishProficiency");
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