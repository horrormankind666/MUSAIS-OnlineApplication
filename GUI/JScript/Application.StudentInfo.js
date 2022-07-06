/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๒/๐๗/๒๕๖๑>
Modify date : <๒๕/๐๙/๒๕๖๑>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Student Exchange Information>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.studentInfoMod", [
		"utilMod",
		"appMod",
		"dictMod",
		"pageRouteMod",
		"applicationMod",
		"studentCategoryMod",
		"countryMod",
		"universityMod",
		"facultyMod"
	])

	.controller("application.studentInfoCtrl", function (
		$scope,
		$timeout,
		$location,
		$q,
		utilServ,
		appServ,
		dictServ,
		pageRouteServ,
		applicationServ,
		studentCategoryServ,
		countryServ,
		universityServ,
		facultyServ
	) {
		var self = this;

		pageRouteServ.setMenuActive({
			menuName: (pageRouteServ.pageObject.studentInfo.class + "-menu")
		});

		$scope.datepickerSemester = {
			dateFrom: "",
			dateTo: ""
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
			studentCategory: "",
			studentCategorySelected: "",
			studentCategorySpecify: {
				0: ""
			},
			country: "",
			countrySelected: {},
			university: "",
			universitySelected: {},
			universityOtherSelected: "",
			universityOther: "",
			faculty: "",
			facultySelected: {},
			department: {
				option1: "",
				option2: "",
				option3: ""
			}
		};

		self.formValue = {
			studentCategorySelected: "",
			studentCategorySpecify: "",
			countrySelected: {},
			universitySelected: {},
			universityOtherSelected: "",
			universityOther: "",
			facultySelected: {},
			department: {
				option1: "",
				option2: "",
				option3: ""
			},
			datepickerSemester: {
				dateFrom: "",
				dateTo: ""
			}
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.showSaveError = false;
				this.isValid = {
					studentCategory1: true,
					studentCategory2: true,
					country: true,
					university: true,
					universityOther: true,
					faculty: true,
					semester: true
				};
			}
		};

		self.watchFormChange = function () {
			$timeout(function () {
				$("input:radio[name='studentcategory']").on("ifChecked ifUnchecked", function (event) {
					self.setStudentCategorySpecify(event, $(this).val());
				});
				$("input:radio[name='universityother']").on("ifChecked ifUnchecked", function (event) {
					self.setUniversityOther(event, $(this).val());
				});
			}, 0);

			$timeout(function () {
				$scope.$watch(function () {
					return [
						self.formField.studentCategorySelected,
						self.formField.countrySelected.selected,
						self.formField.universitySelected.selected,
						self.formField.universityOtherSelected,
						self.formField.universityOther,
						self.formField.facultySelected.selected,
						self.formField.department.option1,
						self.formField.department.option2,
						self.formField.department.option3,
						$scope.datepickerSemester.dateFrom,
						$scope.datepickerSemester.dateTo
					];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== self.formValue.studentCategorySelected) ||
						(newValue[1] !== self.formValue.countrySelected.selected) ||
						(newValue[2] !== self.formValue.universitySelected.selected) ||
						(newValue[3] !== self.formValue.universityOtherSelected) ||
						(newValue[4] !== self.formValue.universityOther) ||
						(newValue[5] !== self.formValue.facultySelected.selected) ||
						(newValue[6] !== self.formValue.department.option1) ||
						(newValue[7] !== self.formValue.department.option2) ||
						(newValue[8] !== self.formValue.department.option3) ||
						(newValue[9] !== self.formValue.datepickerSemester.dateFrom) ||
						(newValue[10] !== self.formValue.datepickerSemester.dateTo)) {
						self.isFormChanged = true;
						self.formValidate.resetValue();
					}
					else
						self.isFormChanged = false;
				}, true);
			}, 0);
		};

		self.onSelectCountry = function (item) {
			var deferred = $q.defer();

			self.formField.university = "";
			self.formField.universitySelected.selected = undefined;
			self.showLoadUniversity = true;

			$timeout(function () {
				if (item.id !== undefined) {
					universityServ.getDataSource({
						data: [
							"",
							("country=" + item.id),
							"cancelledStatus=N",
							"sortOrderBy=Full Name ( EN )"
						].join("&")
					}).then(function (result) {
						self.formField.university = angular.copy(result);
						self.showLoadUniversity = false;

						deferred.resolve();
					});
				}
				else
					deferred.resolve();
			}, 0);

			return deferred.promise;
		};

		self.onSelectUniversity = function (item) {
			$timeout(function () {
				$("input:radio[name='universityother']").iCheck("uncheck");
				self.formField.universityOtherSelected = "";
			}, 0);
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.dataRow = {};
			self.isFormChanged = false;
			self.isCheckedUniversityOther = false;
			self.isCheckedStudentCategorySpecify = {
				0: false
			};
			self.showLoadUniversity = true;
			self.showForm = false;

			self.formValidate.setValue();

			applicationServ.getDataSource({}).then(function (result) {
				self.dataRow = result[0];

				if (self.dataRow) {
					studentCategoryServ.getDataSource({
						data: [
							"",
							"cancelledStatus=N"
						].join("&")
					}).then(function (result) {
						self.formField.studentCategory = angular.copy(result);

						angular.forEach(self.formField.studentCategory, function (item) {
							var studentCategorySpecify = {};
							var isCheckedStudentCategorySpecify = {};

							if (item.specify === "Y") {
								studentCategorySpecify[item.id] = "";
								isCheckedStudentCategorySpecify[item.id] = false;
							}

							angular.extend(self.formField.studentCategorySpecify, studentCategorySpecify);
							angular.extend(self.isCheckedStudentCategorySpecify, isCheckedStudentCategorySpecify);
						});

						countryServ.getDataSource({
							data: [
								"",
								"cancelledStatus=N",
								"sortOrderBy=Full Name ( EN )"
							].join("&")
						}).then(function (result) {
							self.formField.country = angular.copy(result);

							facultyServ.getDataSource({}).then(function (result) {
								self.formField.faculty = angular.copy(result);

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
			self.formValue.studentCategorySelected = (self.dataRow.studentCategoryOther ? "0" : self.dataRow.studentCategoryId);
			self.formValue.studentCategorySpecify = (self.dataRow.studentCategoryOther ? self.dataRow.studentCategoryOther : self.dataRow.studentCategorySpecify);
			self.formValue.countrySelected.selected = (self.dataRow.countryHomeUniversityId ? utilServ.getObjectByValue(self.formField.country, "id", self.dataRow.countryHomeUniversityId)[0] : undefined);
			self.onSelectCountry(self.formValue.countrySelected.selected).then(function () {
				self.formValue.universitySelected.selected = (self.dataRow.universityId ? utilServ.getObjectByValue(self.formField.university, "id", self.dataRow.universityId)[0] : undefined);
				self.formValue.universityOtherSelected = (self.dataRow.universityOther ? "0" : "");
				self.formValue.universityOther = self.dataRow.universityOther;
				self.formValue.facultySelected.selected = (self.dataRow.facultyId ? utilServ.getObjectByValue(self.formField.faculty, "id", self.dataRow.facultyId)[0] : undefined);
				self.formValue.department.option1 = (self.dataRow.department.split('<option>')[0] && self.dataRow.department.split('<option>')[0] !== "NULL" ? self.dataRow.department.split('<option>')[0] : "");
				self.formValue.department.option2 = (self.dataRow.department.split('<option>')[1] && self.dataRow.department.split('<option>')[1] !== "NULL" ? self.dataRow.department.split('<option>')[1] : "");
				self.formValue.department.option3 = (self.dataRow.department.split('<option>')[2] && self.dataRow.department.split('<option>')[2] !== "NULL" ? self.dataRow.department.split('<option>')[2] : "");
				self.formValue.datepickerSemester.dateFrom = self.dataRow.semesterDateStart;
				self.formValue.datepickerSemester.dateTo = self.dataRow.semesterDateEnd;

				$timeout(function () {
					$("input:radio[name='studentcategory']").filter("[value='" + self.formValue.studentCategorySelected + "']").iCheck("check");
					self.formField.studentCategorySelected = self.formValue.studentCategorySelected;
					self.formField.studentCategorySpecify[self.formField.studentCategorySelected] = self.formValue.studentCategorySpecify;
					self.formField.countrySelected.selected = self.formValue.countrySelected.selected;
					self.formField.universitySelected.selected = self.formValue.universitySelected.selected;
					$("input:radio[name='universityother']").filter("[value='" + self.formValue.universityOtherSelected + "']").iCheck("check");
					self.formField.universityOtherSelected = self.formValue.universityOtherSelected;
					self.formField.universityOther = self.formValue.universityOther;
					self.formField.facultySelected.selected = self.formValue.facultySelected.selected;
					self.formField.department.option1 = self.formValue.department.option1;
					self.formField.department.option2 = self.formValue.department.option2;
					self.formField.department.option3 = self.formValue.department.option3;
					$scope.datepickerSemester.dateFrom = self.formValue.datepickerSemester.dateFrom;
					$scope.datepickerSemester.dateTo = self.formValue.datepickerSemester.dateTo;
				}, 0);

				self.formValidate.resetValue();
				utilServ.gotoTopPage();
			});
		};

		self.setStudentCategorySpecify = function (e, value) {
			$timeout(function () {
				if (self.formField.studentCategorySpecify[value] !== undefined) {
					var isChecked;

					if (e.type === "ifChecked")
						isChecked = true;

					if (e.type === "ifUnchecked") {
						isChecked = false;
						self.formField.studentCategorySpecify[value] = "";
					}

					self.isCheckedStudentCategorySpecify[value] = isChecked;
				}
			}, 0);
		};

		self.setUniversityOther = function (e, value) {
			$timeout(function () {
				var isChecked;

				if (e.type === "ifChecked") {
					self.formField.universitySelected.selected = undefined;
					isChecked = true;
				}

				if (e.type === "ifUnchecked") {
					self.formField.universityOtherSelected = "";
					self.formField.universityOther = "";
					isChecked = false;
				}

				self.isCheckedUniversityOther = isChecked;
			}, 0);
		};

		self.getValue = function () {
			var department;

			if (self.formField.department.option1 || self.formField.department.option2 || self.formField.department.option3) {
				department = [
					(self.formField.department.option1 ? self.formField.department.option1 : "NULL"),
					(self.formField.department.option2 ? self.formField.department.option2 : "NULL"),
					(self.formField.department.option3 ? self.formField.department.option3 : "NULL")
				].join("<option>");
			}

			var result = {
				"studentCategoryId": (self.formField.studentCategorySelected !== "0" && self.formField.studentCategorySelected ? self.formField.studentCategorySelected : "N/A"),
				"studentCategorySpecify": (self.formField.studentCategorySelected !== "0" && self.formField.studentCategorySpecify[self.formField.studentCategorySelected] ? self.formField.studentCategorySpecify[self.formField.studentCategorySelected] : "N/A"),
				"studentCategoryOther": (self.formField.studentCategorySpecify["0"] ? self.formField.studentCategorySpecify["0"] : "N/A"),
				"countryId": (self.formField.countrySelected.selected ? self.formField.countrySelected.selected.id : "N/A"),
				"universityId": (self.formField.universitySelected.selected ? self.formField.universitySelected.selected.id : "N/A"),
				"universityOther": (self.formField.universityOtherSelected ? self.formField.universityOther : "N/A"),
				"facultyId": (self.formField.facultySelected.selected ? self.formField.facultySelected.selected.id : "N/A"),
				"department": (department ? department : "N/A"),
				"semesterDateStart": ($scope.datepickerSemester.dateFrom ? $scope.datepickerSemester.dateFrom : "N/A"),
				"semesterDateEnd": ($scope.datepickerSemester.dateTo ? $scope.datepickerSemester.dateTo : "N/A")
			};

			return result;
		};

		self.saveChange = {
			validate: function () {
				var i = 0;

				if (!self.formField.studentCategorySelected) {
					self.formValidate.isValid.studentCategory1 = false;
					i++;
				}

				if (self.formField.studentCategorySelected &&
					self.formField.studentCategorySpecify[self.formField.studentCategorySelected] !== undefined &&
					!self.formField.studentCategorySpecify[self.formField.studentCategorySelected]) {
					self.formValidate.isValid.studentCategory2 = false;
					i++;
				}

				if (!self.formField.countrySelected.selected) {
					self.formValidate.isValid.country = false;
					i++;
				}

				if (!self.formField.universitySelected.selected && !self.formField.universityOtherSelected) {
					self.formValidate.isValid.university = false;
					i++;
				}

				if (!self.formField.universitySelected.selected &&
					self.formField.universityOtherSelected &&
					!self.formField.universityOther) {
					self.formValidate.isValid.universityOther = false;
					i++;
				}

				if (!self.formField.facultySelected.selected) {
					self.formValidate.isValid.faculty = false;
					i++;
				}

				if (!$scope.datepickerSemester.dateFrom || !$scope.datepickerSemester.dateTo) {
					self.formValidate.isValid.semester = false;
					i++;
				}

				self.formValidate.showSaveError = (i > 0 ? true : false);

				return (i > 0 ? false : true);
			},
			action: function (index) {
				if (this.validate()) {
					utilServ.dialogConfirm(appServ.getLabel(["save", "confirm"]), function (result) {
						if (result) {
							var data = self.getValue();

							applicationServ.saveChange.update.action({
								data: data
							}).then(function (result) {
								if (result.status) {
									self.dataRow.studentCategoryId = (self.formField.studentCategorySelected !== "0" && self.formField.studentCategorySelected ? self.formField.studentCategorySelected : "");
									self.dataRow.studentCategorySpecify = (self.formField.studentCategorySelected !== "0" && self.formField.studentCategorySpecify[self.formField.studentCategorySelected] ? self.formField.studentCategorySpecify[self.formField.studentCategorySelected] : "");
									self.dataRow.studentCategoryOther = (self.formField.studentCategorySpecify["0"] ? self.formField.studentCategorySpecify["0"] : "");
									self.dataRow.countryHomeUniversityId = (self.formField.countrySelected.selected ? self.formField.countrySelected.selected.id : "");
									self.dataRow.universityId = (self.formField.universitySelected.selected ? self.formField.universitySelected.selected.id : "");
									self.dataRow.universityOther = (self.formField.universityOtherSelected ? self.formField.universityOther : "");
									self.dataRow.facultyId = (self.formField.facultySelected.selected ? self.formField.facultySelected.selected.id : "");
									self.dataRow.department = (data.department !== "N/A" ? data.department : "");
									self.dataRow.semesterDateStart = ($scope.datepickerSemester.dateFrom ? $scope.datepickerSemester.dateFrom : "");
									self.dataRow.semesterDateEnd = ($scope.datepickerSemester.dateTo ? $scope.datepickerSemester.dateTo : "");

									self.isFormChanged = false;
									self.resetValue();

									$location.path("/Application/PersonalInfo").replace();
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