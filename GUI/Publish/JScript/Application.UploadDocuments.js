/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๐๘/๐๑/๒๕๖๒>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัครในส่วนของ Upload Supporting Documents>
=============================================
*/

(function () {
	"use strict";

	angular.module("application.uploadDocumentsMod", [
		"utilMod",
		"appMod",
		"dictMod",
		"pageRouteMod",
		"applicationMod"
	])

	.controller("application.uploadDocumentsCtrl", function (
		$scope,
		$timeout,
		$location,
		$q,
		utilServ,
		appServ,
		dictServ,
		pageRouteServ,
		applicationServ
	) {
		var self = this;

		pageRouteServ.setMenuActive({
			menuName: (pageRouteServ.pageObject.uploadDocuments.class + "-menu")
		});

		self.init = function () {
			if (appServ.isUser && appServ.getUserInfo.applicationStatus === "WA") {
				self.setValue().then(function () {
					appServ.closeDialogPreloading();

					if (self.dataRow) {
						self.resetValue();
						self.showForm = true;

						utilServ.initBrowseFile({
							id: ("#" + pageRouteServ.pageObject.uploadDocuments.class + "-passportfile")
						}, function (result) {
							$timeout(function () {
								self.formField.passportFile = result;
								self.formValidate.isValid.passportFile1 = true;
								self.formValidate.isValid.passportFile2 = true;
								self.formValidate.isValid.passportFile3 = true;
							}, 0);
						});
						utilServ.initBrowseFile({
							id: ("#" + pageRouteServ.pageObject.uploadDocuments.class + "-facephotographsfile")
						}, function (result) {
							$timeout(function () {
								self.formField.facePhotographsFile = result;
								self.formValidate.isValid.facePhotographsFile1 = true;
								self.formValidate.isValid.facePhotographsFile2 = true;
								self.formValidate.isValid.facePhotographsFile3 = true;
							}, 0);
						});
						utilServ.initBrowseFile({
							id: ("#" + pageRouteServ.pageObject.uploadDocuments.class + "-travelinsurancefile")
						}, function (result) {
							$timeout(function () {
								self.formField.travelInsuranceFile = result;
								self.formValidate.isValid.travelInsuranceFile1 = true;
								self.formValidate.isValid.travelInsuranceFile2 = true;
								self.formValidate.isValid.travelInsuranceFile3 = true;
							}, 0);
						});
						utilServ.initBrowseFile({
							id: ("#" + pageRouteServ.pageObject.uploadDocuments.class + "-transcriptfile")
						}, function (result) {
							$timeout(function () {
								self.formField.transcriptFile = result;
								self.formValidate.isValid.transcriptFile1 = true;
								self.formValidate.isValid.transcriptFile2 = true;
								self.formValidate.isValid.transcriptFile3 = true;
							}, 0);
						});
						utilServ.initBrowseFile({
							id: ("#" + pageRouteServ.pageObject.uploadDocuments.class + "-letterhomeuniversityfile")
						}, function (result) {
							$timeout(function () {
								self.formField.letterHomeUniversityFile = result;
								self.formValidate.isValid.letterHomeUniversityFile1 = true;
								self.formValidate.isValid.letterHomeUniversityFile2 = true;
								self.formValidate.isValid.letterHomeUniversityFile3 = true;
							}, 0);
						});
						utilServ.initBrowseFile({
							id: ("#" + pageRouteServ.pageObject.uploadDocuments.class + "-curriculumvitaefile")
						}, function (result) {
							$timeout(function () {
								self.formField.curriculumVitaeFile = result;
								self.formValidate.isValid.curriculumVitaeFile1 = true;
								self.formValidate.isValid.curriculumVitaeFile2 = true;
								self.formValidate.isValid.curriculumVitaeFile3 = true;
							}, 0);
						});
						utilServ.initBrowseFile({
							id: ("#" + pageRouteServ.pageObject.uploadDocuments.class + "-toeflieltsfile")
						}, function (result) {
							$timeout(function () {
								self.formField.TOEFLIELTSFile = result;
								self.formValidate.isValid.TOEFLIELTSFile1 = true;
								self.formValidate.isValid.TOEFLIELTSFile2 = true;
								self.formValidate.isValid.TOEFLIELTSFile3 = true;
							}, 0);
						});
						utilServ.initBrowseFile({
							id: ("#" + pageRouteServ.pageObject.uploadDocuments.class + "-letterintentfile")
						}, function (result) {
							$timeout(function () {
								self.formField.letterIntentFile = result;
								self.formValidate.isValid.letterIntentFile1 = true;
								self.formValidate.isValid.letterIntentFile2 = true;
								self.formValidate.isValid.letterIntentFile3 = true;
							}, 0);
						});
					}
				});
			}
			else
				self.showForm = false;
		};

		self.formField = {
			passportFile: "",
			facePhotographsFile: "",
			travelInsuranceFile: "",
			transcriptFile: "",
			letterHomeUniversityFile: "",
			curriculumVitaeFile: "",
			TOEFLIELTSFile: "",
			letterIntentFile: ""
		};

		self.formValue = {
			passportFile: "",
			facePhotographsFile: "",
			travelInsuranceFile: "",
			transcriptFile: "",
			letterHomeUniversityFile: "",
			curriculumVitaeFile: "",
			TOEFLIELTSFile: "",
			letterIntentFile: ""
		};

		self.formValidate = {
			setValue: function () {
				this.resetValue();
			},
			resetValue: function () {
				this.isValid = {
					passportFile1: true,
					passportFile2: true,
					passportFile3: true,
					facePhotographsFile1: true,
					facePhotographsFile2: true,
					facePhotographsFile3: true,
					travelInsuranceFile1: true,
					travelInsuranceFile2: true,
					travelInsuranceFile3: true,
					transcriptFile1: true,
					transcriptFile2: true,
					transcriptFile3: true,
					letterHomeUniversityFile1: true,
					letterHomeUniversityFile2: true,
					letterHomeUniversityFile3: true,
					curriculumVitaeFile1: true,
					curriculumVitaeFile2: true,
					curriculumVitaeFile3: true,
					TOEFLIELTSFile1: true,
					TOEFLIELTSFile2: true,
					TOEFLIELTSFile3: true,
					letterIntentFile1: true,
					letterIntentFile2: true,
					letterIntentFile3: true
				};
			}
		};

		self.setValue = function () {
			var deferred = $q.defer();

			self.dataRow = {};
			self.isFormChanged = false;
			self.isView = {
				passportFile: false,
				facePhotographsFile: false,
				travelInsuranceFile: false,
				transcriptFile: false,
				letterHomeUniversityFile: false,
				curriculumVitaeFile: false,
				TOEFLIELTSFile: false,
				letterIntentFile: false
			};
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
			self.formValue.passportFile = self.dataRow.passportFile;
			self.formValue.facePhotographsFile = self.dataRow.facePhotographsFile;
			self.formValue.travelInsuranceFile = self.dataRow.travelInsuranceFile;
			self.formValue.transcriptFile = self.dataRow.transcriptFile;
			self.formValue.letterHomeUniversityFile = self.dataRow.letterHomeUniversityFile;
			self.formValue.curriculumVitaeFile = self.dataRow.curriculumVitaeFile;
			self.formValue.TOEFLIELTSFile = self.dataRow.TOEFLIELTSFile;
			self.formValue.letterIntentFile = self.dataRow.letterIntentFile;

			self.isView.passportFile = (self.formValue.passportFile ? true : false);
			self.isView.facePhotographsFile = (self.formValue.facePhotographsFile ? true : false);
			self.isView.travelInsuranceFile = (self.formValue.travelInsuranceFile ? true : false);
			self.isView.transcriptFile = (self.formValue.transcriptFile ? true : false);
			self.isView.letterHomeUniversityFile = (self.formValue.letterHomeUniversityFile ? true : false);
			self.isView.curriculumVitaeFile = (self.formValue.curriculumVitaeFile ? true : false);
			self.isView.TOEFLIELTSFile = (self.formValue.TOEFLIELTSFile ? true : false);
			self.isView.letterIntentFile = (self.formValue.letterIntentFile ? true : false);

			self.formField.passportFile = "";
			self.formField.facePhotographsFile = "";
			self.formField.travelInsuranceFile = "";
			self.formField.transcriptFile = "";
			self.formField.letterHomeUniversityFile = "";
			self.formField.curriculumVitaeFile = "";
			self.formField.TOEFLIELTSFile = "";
			self.formField.letterIntentFile = "";

			self.formValidate.resetValue();
			utilServ.gotoTopPage();
		};

		self.upload = {
			validate: function (document) {
				var idContent = (pageRouteServ.pageObject.uploadDocuments.class + "-" + document.toLowerCase());
				var relativeFile = self.formField[document].split(".");
				var absoluteFile = $("#" + idContent + "-absolutefile")[0].files[0];
				var i = 0;

				if (relativeFile.length < 2) {
					self.formValidate.isValid[document + "1"] = false;
					i++;
				}

				if (dictServ.dict.application.table[document].format[utilServ.lang].indexOf(relativeFile[relativeFile.length - 1]) < 0) {
					self.formValidate.isValid[document + "2"] = false;
					i++;
				}

				if (i === 0) {
					var f = new FormData();

					f.append("file", absoluteFile);

					if (absoluteFile.size <= 0) {
						self.formValidate.isValid[document + "3"] = false;
						i++;
					}
				}

				return (i > 0 ? false : true);
			},
			action: function (document) {
				if (this.validate(document)) {
					utilServ.dialogConfirm(appServ.getLabel(["upload", "confirm", "before"]), function (result) {
						if (result) {
							var idContent = (pageRouteServ.pageObject.uploadDocuments.class + "-" + document.toLowerCase());
							var absoluteFile = $("#" + idContent + "-absolutefile")[0].files[0];
							var f = new FormData();

							f.append("file", absoluteFile);

							appServ.upload.action({
								what: dictServ.dict.application.table[document].fileName,
								data: f
							}).then(function (result) {
								if (result.status) {
									var fileName = result.fileName;
									var data = {};

									if (document === "passportFile")
										data = {
											passportFile: fileName
										};

									if (document === "facePhotographsFile")
										data = {
											facePhotographsFile: fileName
										};

									if (document === "travelInsuranceFile")
										data = {
											travelInsuranceFile: fileName
										};

									if (document === "transcriptFile")
										data = {
											transcriptFile: fileName
										};

									if (document === "letterHomeUniversityFile")
										data = {
											letterHomeUniversityFile: fileName
										};

									if (document === "curriculumVitaeFile")
										data = {
											curriculumVitaeFile: fileName
										};

									if (document === "TOEFLIELTSFile")
										data = {
											TOEFLIELTSFile: fileName
										};

									if (document === "letterIntentFile")
										data = {
											letterIntentFile: fileName
										};

									applicationServ.saveChange.update.action({
										data: data
									}).then(function (result) {
										if (result.status) {
											self.dataRow[document] = fileName;
											self.formValue[document] = self.dataRow[document];
											self.isView[document] = (self.formValue[document] ? true : false);
											self.formField[document] = "";

											utilServ.dialogConfirm(appServ.getLabel(["upload", "confirm", "after"]), function (result) {
												if (!result)
													$timeout(function () {
														$location.path("/Application/Declaration").replace();
													}, 0);
											});
										}
									});
								}
							});
						}
					});
				}
				else
					utilServ.dialogError(appServ.getLabel(["application", "upload"]), function () { });
			}
		};

		self.view = {
			action: function (document) {
				utilServ.viewFile({
					url: (utilServ.getURLAPI(appServ.pathAPI) + "ViewFile.aspx/?ver=" + utilServ.dateTimeOnURL + "&f=" + self.formValue[document])
				});
			}
		};

		$timeout(function () {
			self.init();
		}, appServ.timeoutInit);
	});
})();