/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๓/๐๗/๒๕๖๑>
Modify date : <๑๙/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Declaration>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.declarationMod", [       
		"utilMod",
		"appMod",
		"pageRouteMod",
		"applicationMod"
	])

	.controller("application.declarationCtrl", function (
		$scope,
		$timeout,
		$q,
		utilServ,
		appServ,
		pageRouteServ,
		applicationServ
	) {
		var self = this;

		pageRouteServ.setMenuActive({
			menuName: (pageRouteServ.pageObject.declaration.class + "-menu")
		});

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
			declarationASelected: "",
			declarationB: "",
			declarationCSelected: "",
			declarationDSelected: "",
			declarationESelected: "",
			declarationE: ""
		};

		self.formValue = {
			declarationASelected: "",
			declarationB: "",
			declarationCSelected: "",
			declarationDSelected: "",
			declarationESelected: "",
			declarationE: ""
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					declarationA: true,
					declarationB: true,
					declarationC: true,
					declarationD: true,
					declarationE1: true,
					declarationE2: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$("input:radio[name='declarationa']").on("ifChecked ifUnchecked", function (event) {
					self.setDeclarationB(event, $(this).val());
				});
				$("input:radio[name='declaratione']").on("ifChecked ifUnchecked", function (event) {
					self.setDeclarationE(event, $(this).val());
				});
			}, 0);

			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.declarationASelected,
						self.formField.declarationB,
						self.formField.declarationCSelected,
						self.formField.declarationDSelected,
						self.formField.declarationESelected,
						self.formField.declarationE
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.declarationASelected) ||
						(newValue[1] !== self.formValue.declarationB) ||
						(newValue[2] !== self.formValue.declarationCSelected) ||
						(newValue[3] !== self.formValue.declarationDSelected) ||
						(newValue[4] !== self.formValue.declarationESelected) ||
						(newValue[5] !== self.formValue.declarationE)) {
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
			applicationServ.isSubmitStatus = false;
			self.isFormChanged = false;
			self.isCheckedDeclarationB = false;
			self.isCheckedDeclarationE = false;
			self.showForm = false;

			self.formValidate.setValue();

			applicationServ.getDataSource({}).then(function (result) {
				self.dataRow = result[0];

				$timeout(function () {
					deferred.resolve();
				}, 0);
			});

			return deferred.promise;
		};

		self.resetValue = function () {
			self.formValue.declarationASelected = self.dataRow.declarationA;
			self.formValue.declarationB = self.dataRow.declarationB;
			self.formValue.declarationCSelected = false;
			self.formValue.declarationDSelected = false;
			self.formValue.declarationESelected = self.dataRow.declarationE;
			self.formValue.declarationE = self.dataRow.declarationESpecify;            

			if (!self.formValue.declarationB)
				self.isCheckedDeclarationB = false;

			if (!self.formValue.declarationE)
				self.isCheckedDeclarationE = false;

			$timeout(function () {
				$("input:radio[name='declarationa']").filter("[value='" + self.formValue.declarationASelected + "']").iCheck("check");
				self.formField.declarationASelected = self.formValue.declarationASelected;
				self.formField.declarationB = self.formValue.declarationB;
				$("input:checkbox[name='declarationc']").iCheck("uncheck");
				self.formField.declarationCSelected = self.formValue.declarationCSelected;
				$("input:checkbox[name='declarationd']").iCheck("uncheck");
				self.formField.declarationDSelected = self.formValue.declarationDSelected;
				$("input:radio[name='declaratione']").filter("[value='" + self.formValue.declarationESelected + "']").iCheck("check");
				self.formField.declarationESelected = self.formValue.declarationESelected;
				self.formField.declarationE = self.formValue.declarationE;

				$("textarea").blur();
			}, 0);

			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.setDeclarationB = function (
			e,
			value
		) {
			$timeout(function () {
				var isChecked = false;

				if (e.type === "ifChecked") {
					if (value === "Y")
						isChecked = true;

					if (value === "N") {
						self.formField.declarationB = "";
						isChecked = false;
					}
				}

				self.isCheckedDeclarationB = isChecked;
			}, 0);
		};

		self.setDeclarationE = function (
			e,
			value
		) {
			$timeout(function () {
				var isChecked = false;

				if (e.type === "ifChecked") {
					if (value === "Y")
						isChecked = true;

					if (value === "N") {
						self.formField.declarationE = "";
						isChecked = false;
					}
				}

				self.isCheckedDeclarationE = isChecked;
			}, 0);
		};

		self.getValue = function () {
			var result = {
				"declarationA": (self.formField.declarationASelected ? self.formField.declarationASelected : "N/A"),
				"declarationB": (self.formField.declarationB ? self.formField.declarationB : "N/A"),
				"declarationC": (self.formField.declarationCSelected ? "Y" : "N"),
				"declarationD": (self.formField.declarationDSelected ? "Y" : "N"),
				"declarationE": (self.formField.declarationESelected ? self.formField.declarationESelected : "N/A"),
				"declarationESpecify": (self.formField.declarationE ? self.formField.declarationE : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;
                
				if (!self.formField.declarationASelected) {
					self.formValidate.isValid.declarationA = false;
					i++;
				}

				if (self.formField.declarationASelected === "Y" && !self.formField.declarationB) {
					self.formValidate.isValid.declarationB = false;
					i++;
				}

				if (!self.formField.declarationCSelected) {
					self.formValidate.isValid.declarationC = false;
					i++;
				}

				if (!self.formField.declarationDSelected) {
					self.formValidate.isValid.declarationD = false;
					i++;
				}

				if (!self.formField.declarationESelected) {
					self.formValidate.isValid.declarationE1 = false;
					i++;
				}

				if (self.formField.declarationESelected === "Y" && !self.formField.declarationE) {
					self.formValidate.isValid.declarationE2 = false;
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
									self.dataRow.declarationA = (self.formField.declarationASelected ? self.formField.declarationASelected : "");
									self.dataRow.declarationB = (self.formField.declarationB ? self.formField.declarationB : "");
									self.dataRow.declarationE = (self.formField.declarationESelected ? self.formField.declarationESelected : "");
									self.dataRow.declarationESpecify = (self.formField.declarationE ? self.formField.declarationE : "");

									self.isFormChanged = false;
									self.formValidate.resetValue();
									utilServ.gotoTopPage();
								}
							});
						}
					});
				}
				else
					utilServ.dialogError(appServ.getLabel(["application", "save"]), function () { });
			}
		};

		self.submit = {
			action: function () {
				if (self.saveChange.validate()) {
					utilServ.dialogConfirm(appServ.getLabel(["submit", "confirm"]), function (result) {
						if (result) {
							applicationServ.submit.action();
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