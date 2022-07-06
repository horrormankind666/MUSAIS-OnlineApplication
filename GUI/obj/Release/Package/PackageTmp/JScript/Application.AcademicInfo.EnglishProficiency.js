/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Academic Information ข้อมูล English Language Proficiency>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.academicInfo.englishProficiencyMod", [
		"ui.utils.masks",
		"utilMod",
		"appMod",
		"applicationMod",
		"TOEFLTypeMod"
	])

	.controller("application.academicInfo.englishProficiencyCtrl", function (
		$scope,
		$timeout,
		$location,
		$q,
		utilServ,
		appServ,
		applicationServ,
		TOEFLTypeServ
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
			notEnglishSelected: "",
			TOEFLScore: "",
			TOEFLType: "",
			TOEFLTypeSelected: {},
			IELTSResult: "",
			englishProficiencyOther: ""
		};

		self.formValue = {
			notEnglishSelected: "",
			TOEFLScore: "",
			TOEFLTypeSelected: {},
			IELTSResult: "",
			englishProficiencyOther: ""
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					TOEFLScore: true,
					TOEFLType: true,
					IELTSResult: true,
					englishProficiencyOther: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$("input:checkbox[name='notenglish']").on("ifChecked ifUnchecked", function (event) {
					self.setNotEnglish(event, $(this).val());
				});
			}, 0);
            
			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.notEnglishSelected,
						self.formField.TOEFLScore,
						self.formField.TOEFLTypeSelected.selected,
						self.formField.IELTSResult,
						self.formField.englishProficiencyOther
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.notEnglishSelected) ||
						(newValue[1] !== self.formValue.TOEFLScore) ||
						(newValue[2] !== self.formValue.TOEFLTypeSelected.selected) ||
						(newValue[3] !== self.formValue.IELTSResult) ||
						(newValue[4] !== self.formValue.englishProficiencyOther)) {
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
			self.isCheckedNotEnglish = true;
			self.showForm = false;

			self.formValidate.setValue();

			applicationServ.getDataSource({}).then(function (result) {
				self.dataRow = result[0];

				if (self.dataRow) {
					TOEFLTypeServ.getDataSource({
						data: [
							"",
							"cancelledStatus=N"
						].join("&")
					}).then(function (result) {
						self.formField.TOEFLType = angular.copy(result);

						$timeout(function () {
							deferred.resolve();
						}, 0);
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
			self.formValue.notEnglishSelected = (!self.dataRow.TOEFLScore && !self.dataRow.TOEFLTypeId && !self.dataRow.IELTSResult && !self.dataRow.englishNativeOther ? true : false);
			self.setNotEnglish({ type: (self.formValue.notEnglishSelected ? "ifChecked" : "ifUnchecked") }, "");
			self.formValue.TOEFLScore = self.dataRow.TOEFLScore;
			self.formValue.TOEFLTypeSelected.selected = (self.dataRow.TOEFLTypeId ? utilServ.getObjectByValue(self.formField.TOEFLType, "id", self.dataRow.TOEFLTypeId)[0] : undefined);
			self.formValue.IELTSResult = self.dataRow.IELTSResult;
			self.formValue.englishProficiencyOther = self.dataRow.englishNativeOther;

			$timeout(function () {
				$("input:checkbox[name='notenglish']").iCheck(self.formValue.notEnglishSelected ? "check" : "uncheck");
				self.formField.notEnglishSelected = self.formValue.notEnglishSelected;
				self.formField.TOEFLScore = self.formValue.TOEFLScore;
				self.formField.TOEFLTypeSelected.selected = self.formValue.TOEFLTypeSelected.selected;
				self.formField.IELTSResult = self.formValue.IELTSResult;
				self.formField.englishProficiencyOther = self.formValue.englishProficiencyOther;

				$("textarea").blur();
			}, 0);

			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.setNotEnglish = function (
			e,
			value
		) {
			$timeout(function () {
				var isChecked;

				if (e.type === "ifChecked") {
					self.formField.notEnglishSelected = true;
					self.formField.TOEFLScore = "";
					self.formField.TOEFLTypeSelected.selected = undefined;
					self.formField.IELTSResult = "";
					self.formField.englishProficiencyOther = "";
					isChecked = true;
				}

				if (e.type === "ifUnchecked") {
					self.formField.notEnglishSelected = false;
					isChecked = false;
				}

				self.isCheckedNotEnglish = isChecked;
			}, 0);
		};

		self.getValue = function () {
			var result = {
				"TOEFLScore": (self.formField.TOEFLScore ? self.formField.TOEFLScore : "N/A"),
				"TOEFLTypeId": (self.formField.TOEFLTypeSelected.selected ? self.formField.TOEFLTypeSelected.selected.id : "N/A"),
				"IELTSResult": (self.formField.IELTSResult ? self.formField.IELTSResult : "N/A"),                
				"englishNativeOther": (self.formField.englishProficiencyOther ? self.formField.englishProficiencyOther : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;

				if (self.formField.notEnglishSelected === false &&
					!self.formField.TOEFLScore &&
					!self.formField.TOEFLTypeSelected.selected &&
					!self.formField.IELTSResult &&
					!self.formField.englishProficiencyOther) {
					self.formValidate.isValid.TOEFLScore = false;
					self.formValidate.isValid.TOEFLType = false;
					self.formValidate.isValid.IELTSResult = false;
					self.formValidate.isValid.englishProficiencyOther = false;

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
									self.dataRow.TOEFLScore = (self.formField.TOEFLScore ? self.formField.TOEFLScore : "");
									self.dataRow.TOEFLTypeId = (self.formField.TOEFLTypeSelected.selected ? self.formField.TOEFLTypeSelected.selected.id : "");
									self.dataRow.IELTSResult = (self.formField.IELTSResult ? self.formField.IELTSResult : "");
									self.dataRow.englishNativeOther = (self.formField.englishProficiencyOther ? self.formField.englishProficiencyOther : "");

									self.isFormChanged = false;
									self.resetValue();

									$location.path("/Application/UploadDocuments").replace();
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