/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๐๖/๒๕๖๑>
Modify date : <๑๙/๐๙/๒๕๖๒>
Description : <รวมรวบฟังก์ชั่นใช้งานทั่วไปของระบบ>
=============================================
*/

(function () {
	"use strict";

	angular.module("appMod", [
		"base64",
		"ngCookies",
		"ngSanitize",
		"ngRoute",
		"ngAnimate",
		"ui.select",
		"ui.bootstrap",
		"utilMod",
		"dictMod",
		"pageRouteMod",
		"titlePrefixMod",
		"genderMod",
		"nationalityMod",
		"countryMod",
		"universityMod",
		"studentCategoryMod",
		"facultyMod",
		"maritalStatusMod",
		"relationshipMod",
		"disciplineMod",
		"educationalBackgroundMod",
		"yearStudyMod",
		"TOEFLTypeMod",
		"user.signinMod",
		"user.createNewAccountMod",
		"user.activateAccountMod",
		"user.requestPasswordMod",
		"user.editAccountMod",
		"applicationMod",
		"application.studentInfoMod",
		"application.personalInfoMod",
		"application.personalInfo.profileMod",
		"application.personalInfo.homeAddressMod",
		"application.personalInfo.mailingAddressMod",
		"application.personalInfo.contactMod",
		"application.personalInfo.emergencyContactMod",
		"application.academicInfoMod",
		"application.academicInfo.curEduMod",
		"application.academicInfo.englishProficiencyMod",
		"application.uploadDocumentsMod",
		"application.declarationMod",
		"application.viewMod"
	])

	.directive("appMain", function ($window, $timeout, utilServ, appServ) {
		return {
			link: function (scope, element, attr) {
				angular.element($window).on("resize", function () {
					try {
						appServ.watchChangeScreen();
					}
					catch (e) {
					}
				});

				scope.$watch(function () {
					return [appServ.langTH, appServ.langEN];
				}, function (newValue, oldValue) {
					if ((newValue[0] !== oldValue[0]) || (newValue[1] !== oldValue[1])) {
						appServ.setLanguageOnHeaderFooter();
						angular.forEach($(".date"), function (elm) {
							angular.element(elm).data("DateTimePicker").locale(utilServ.lang.toLowerCase());
						});
					}

					appServ.watchChangeScreen();
				}, true);
			}
		};
	})

	.directive("appContent", function ($timeout, appServ) {
		return {
			link: function (scope, element, attr) {
				scope.$watch(function () {
					return appServ.showView;
				}, function (newValue, oldValue) {
					if (newValue === false) $("main").addClass("hidden");
					if (newValue === true) $("main").removeClass("hidden");

					appServ.watchChangeScreen();
				}, true);
			}
		};
	})

	.service("appServ", function ($rootScope, $window, $cookies, $timeout, $location, $q, $base64, $route, $http, utilServ, dictServ) {
		var self = this;

		utilServ.lang = "EN";

		self.langTH = false;
		self.langEN = false;
		self.pathAPI = "API";
		self.showPreloading = true;
		self.showView = false;
		self.slideLeftToggle = true;
		self.slideLeftActive = false;
		self.timeoutInit = 0;
		self.labelStyle = "";
		self.windowWidth = 0;
		self.datetimepickerOptions = {
			format: "DD/MM/YYYY",
			ignoreReadonly: true,
			useCurrent: false,
			locale: utilServ.lang.toLowerCase()
		};
		self.cookieName = "ExchangeStudentCookie";
		self.cookiePath = "/";
		self.cookieInfo = {
			userId: "",
			verifyCode: "",
			applicationId: "",
			applicationStatus: ""
		};
		self.getCookieInfo = self.cookieInfo;
		self.authenInfo = {};
		self.isUser = false;
		self.userInfo = {};
		self.getUserInfo = self.userInfo;

		//ฟังก์ชั่นสำหรับปิด Dialog Preloading
		self.closeDialogPreloading = function () {
			utilServ.dialogClose();
			$timeout(function () {
				self.showPreloading = false;
				utilServ.msgPreloading = null;
				$("#" + utilServ.idDialogPreloading).modal("hide");
			}, 0);
		};

		//ฟังก์ชั่นสำหรับกำหนดภาษาที่่ต้องการ
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//lang  รับค่าภาษา
		self.setLanguageDefault = function (param) {
			param.lang = (param.lang === undefined || param.lang === "" ? utilServ.lang : param.lang);

			self.langTH = false;
			self.langEN = false;

			utilServ.setLanguage({
				lang: param.lang
			});

			if (utilServ.lang === "TH") self.langTH = true;
			if (utilServ.lang === "EN") self.langEN = true;

			$window.document.title = (dictServ.dict.systemOwner[utilServ.lang] + " : " + dictServ.dict.systemName[utilServ.lang]);
			self.labelStyle = utilServ.getLabelStyle();
		};

		//ฟังก์ชั่นสำหรับแสดงข้อความเป็นภาษาที่กำหนดไว้ในส่วนของเนื้อหาส่วนหัวและส่วนท้าย
		self.setLanguageOnHeaderFooter = function () {
			$("main nav.navbar .navbar-top .lang").addClass("hidden");
			$("main nav.navbar .navbar-header .lang").addClass("hidden");

			$("main nav.navbar .navbar-top .lang-" + utilServ.lang.toLowerCase()).removeClass("hidden");
			$("main nav.navbar .navbar-header .lang-" + utilServ.lang.toLowerCase()).removeClass("hidden");
		};

		//ฟังก์ชั่นสำหรับปรับขนาดของสไลด์เมนู
		self.setSlideMenuLayout = function () {
			$timeout(function () {
				if ($("main section .panel-col.col-menu").hasClass("hidden") === false) {
					$("main section .panel-col.col-menu").height($(window).height() - $("main .sticky").outerHeight() - 30);
					if ($(window).width() <= 825) {
						$("main section .panel-col.col-menu").hide();
						self.slideLeftActive = false;
						self.windowWidth = $(window).width();
					}
					else {
						if (self.windowWidth <= 825) {
							$("main section .panel-col.col-menu").show();
							self.slideLeftActive = true;
							self.windowWidth = $(window).width();
						}
					}
				}
			}, 0);
		};

		//ฟังก์ชั่นสำหรับกำหนดข้อมูลของผู้ใช้งานหลังจากเข้าสู่ระบบ
		//โดยมีพารามิเตอร์ดังนี้
		//1. userData รับค่าข้อมูลผู้ใช้งาน
		self.setUserInfo = function (userData) {
			var dr = {};

			if (userData.length > 0)
				dr = userData[0];

			self.userInfo = {
				userId: (dr.id ? dr.id : ""),
				username: (dr.username ? dr.username : ""),
				applicationId: (dr.sexApplicationId ? dr.sexApplicationId : ""),
				applicationStatus: (dr.applicationStatus ? dr.applicationStatus : ""),
				applicationStatusName: (dr.applicationStatusName ? dr.applicationStatusName : ""),
				verifyCode: (dr.verifyCode ? dr.verifyCode : ""),
				verifiedStatus: (dr.verifiedStatus ? dr.verifiedStatus : ""),
				verifyDate: (dr.verifyDate ? dr.verifyDate : ""),
				titlePrefixId: (dr.perTitlePrefixId ? dr.perTitlePrefixId : ""),
				titlePrefixFullName: (dr.titlePrefixFullNameEN ? dr.titlePrefixFullNameEN : ""),
				titlePrefixInitials: (dr.titlePrefixInitialsEN ? dr.titlePrefixInitialsEN : ""),
				firstName: (dr.firstName ? dr.firstName : ""),
				middleName: (dr.middleName ? dr.middleName : ""),
				lastName: (dr.lastName ? dr.lastName : ""),
				fullName: (dr.fullName ? dr.fullName.toUpperCase() : ""),
				nationalityId: (dr.perNationalityId ? dr.perNationalityId : ""),
				nationalityName: (dr.nationalityNameEN ? dr.nationalityNameEN : ""),
				isoNationalityName2Letter: (dr.isoNationalityName2Letter ? dr.isoNationalityName2Letter : ""),
				isoNationalityName3Letter: (dr.isoNationalityName3Letter ? dr.isoNationalityName3Letter : ""),
				genderId: (dr.perGenderId ? dr.perGenderId : ""),
				genderFullName: (dr.genderFullNameEN ? dr.genderFullNameEN : ""),
				genderInitials: (dr.genderInitialsEN ? dr.genderInitialsEN : ""),
				email: (dr.email ? dr.email : ""),
				countryId: (dr.plcCountryId ? dr.plcCountryId : ""),
				countryName: (dr.countryNameEN ? dr.countryNameEN : ""),
				isoCountryCodes2Letter: (dr.isoCountryCodes2Letter ? dr.isoCountryCodes2Letter : ""),
				isoCountryCodes3Letter: (dr.isoCountryCodes3Letter ? dr.isoCountryCodes3Letter : ""),
				permission: "*"
			};

			self.getUserInfo = self.userInfo;
		};

		//ฟังก์ชั่นสำหรับกำหนดให้ input radio กำหนดค่าตามที่ต้องการ
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//name  รับค่าชื่อของ input radio
		//data  รัยค่าข้อมูลที่ต้องการกำหนดค่าให้ input radio
		//key   รับค่า key สำหรับเข้าถึงข้อมูล JSON
		self.setRadioBy = function (param) {
			param.name = (param.name === undefined ? "" : param.name);
			param.data = (param.data === undefined || param.data.length === 0 ? {} : param.data);
			param.key = (param.key === undefined ? "" : param.key);

			var deferred = $q.defer();

			if (param.name && param.key) {
				var enable;

				if (param.data)
					enable = (param.data[param.key] ? false : true);
				else
					enable = true;

				$timeout(function () {
					$("input[name='" + param.name + "']:radio").iCheck(enable ? "enable" : "disable").filter("[value='" + (enable ? "" : param.data[param.key]) + "']").iCheck(enable ? "uncheck" : "check");
					deferred.resolve();
				}, 0);
			}
			else
				deferred.resolve();

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับกำหนดค่าให้กับ Cookie
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//userId            รับค่ารหัสผู้ใช้งาน
		//verifyCode        รับค่ารหัสยืนยันตัวตนสำหรับผู้ใช้งาน
		//applicationId     รับค่ารหัสใบสมัคร
		//applicationStatus รับค่าสถานะใบสมัคร
		self.setCookie = function (param) {
			param.userId = (param.userId === undefined ? "" : param.userId);
			param.verifyCode = (param.verifyCode === undefined ? "" : param.verifyCode);
			param.applicationId = (param.applicationId === undefined ? "" : param.applicationId);
			param.applicationStatus = (param.applicationStatus === undefined ? "" : param.applicationStatus);

			$cookies.put(self.cookieName, JSON.stringify({ key: $base64.encode(self.setPackage([param.userId, param.verifyCode, param.applicationId, param.applicationStatus]).split("").reverse().join("")) }), { path: self.cookiePath });
		};

		//ฟังก์ชั่นสำหรับเข้ารหัสค่าที่ต้องการ
		//โดยมีพารามิเตอร์ดังนี้
		//1. value  รับค่าค่าที่ต้องการให้เข้ารหัส
		self.setPackage = function (value) {
			var i;
			var result = [];

			for (i = 0; i < value.length; i++) {
				result[i] = $base64.encode(value[i] ? value[i] : "").split("").reverse().join("");
			}

			return $base64.encode(result.join("."));
		};

		//ฟังก์ชั่นสำหรับแสดงข้อความที่กำหนดไว้ตามที่ต้องการ
		//โดยมีพารามิเตอร์ดังนี้
		//1. key รับค่าคีย์ที่ต้องการให้แสดงข้อความ
		self.getLabel = function (key) {
			var word;
			var tmp = dictServ.dict;

			for (var i = 0; i < key.length; i++) {
				tmp = tmp[key[i]];
			}

			word = tmp[utilServ.lang];

			return word;
		};

		//ฟังก์ชั่นสำหรับแสดงจำนวนเรคคอร์ด
		self.getRecordCount = function (totalSearch, total) {
			return (totalSearch !== undefined ? (dictServ.dict.found[utilServ.lang] + " " + (totalSearch !== total ? ($filter("number")(total, 0) + " " + dictServ.dict.from[utilServ.lang] + " " + $filter("number")(totalSearch, 0)) : $filter("number")(totalSearch, 0)) + " " + dictServ.dict.entries[utilServ.lang]) : "");
		};

		//ฟังก์ชั่นสำหรับแสดง Cookie
		self.getCookie = function () {
			var cookie;
			var deferred = $q.defer();
			var res = {};

			if (utilServ.isHasCookie({ cookieName: this.cookieName })) {
				cookie = utilServ.getCookie({
					cookieName: this.cookieName
				});

				if (cookie !== null && cookie.key !== undefined && cookie.key.length > 0)
					res.status = true;
				else {
					res.status = false;
					res.error = {
						msg: this.getLabel(["authen", "accessNotFound"])
					};
				}
			}
			else {
				res.status = false;
				res.error = {
					msg: this.getLabel(["authen", "accessNotFound"])
				};
			}

			deferred.resolve(res);

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับแสดงค่าของ Cookie ที่ถูกกำหนดไว้
		self.getCookieValue = function (variable) {
			var cookie = utilServ.getCookie({
				cookieName: self.cookieName
			});

			var keyDecode = $base64.decode($base64.decode(cookie.key).split("").reverse().join("")).split(".");
			var i;

			for (i = 0; i < keyDecode.length; i++) {
				self.cookieInfo[variable[i]] = $base64.decode(keyDecode[i].split("").reverse().join(""));
			}
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลผู้ใช้งานจากระบบ AD
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//requireSignIn รับค่าต้องการมีการเข้าสู่ระบบหรือไม่
		//permission    รับค่าสิทธิ์ของผู้ใช้งาน
		self.getUser = function (param) {
			param.requireSignIn = (param.requireSignIn === undefined ? false : param.requireSignIn);
			param.permission = (param.permission === undefined ? "*" : param.permission);

			var cookie;
			var cookieDecode;
			var deferred = $q.defer();
			var res = {};

			self.getCookie().then(function (result) {
				res = result;

				if (res.status === true && param.requireSignIn === true) {
					self.getCookieValue(["userId", "verifyCode", "applicationId", "applicationStatus"]);

					utilServ.http({
						url: (utilServ.getURLAPI(self.pathAPI) + "User/GetData?ver =" + utilServ.dateTimeOnURL + "&package=" + self.setPackage([self.getCookieInfo.userId, self.getCookieInfo.verifyCode, "info"]))
					}).then(function (result) {
						var dt = (result.data.data !== undefined ? result.data.data : []);

						if (dt.length > 0) {
							res = result.data;

							if ((dt[0].id !== undefined && dt[0].id.length > 0 && dt[0].id === self.getCookieInfo.userId) &&
								(dt[0].verifyCode !== undefined && dt[0].verifyCode.length > 0 && dt[0].verifyCode === self.getCookieInfo.verifyCode) &&
								(dt[0].sexApplicationId !== undefined && dt[0].sexApplicationId.length > 0 && dt[0].sexApplicationId === self.getCookieInfo.applicationId) &&
								(dt[0].applicationStatus !== undefined && dt[0].applicationStatus.length > 0 && dt[0].applicationStatus === self.getCookieInfo.applicationStatus) &&
								(dt[0].verifiedStatus === "Y"))
								res.status = true;
							else {
								res.status = false;

								if (dt[0].id === undefined || dt[0].id.length === 0 || dt[0].id !== self.getCookieInfo.userId ||
									dt[0].verifyCode === undefined || dt[0].verifyCode.length === 0 && dt[0].verifyCode !== self.getCookieInfo.verifyCode ||
									dt[0].verifiedStatus === undefined || dt[0].verifiedStatus !== "Y")
									res.error = {
										msg: utilServ.getLabel(["authen", "userNotFound"])
									};
								else {
									if (dt[0].sexApplicationId === undefined || dt[0].sexApplicationId.length === 0 || dt[0].sexApplicationId !== self.getCookieInfo.applicationId)
										res.error = {
											msg: utilServ.getLabel(["application", "applicationNotFound"])
										};
									else {
										if (dt[0].applicationStatus === undefined || dt[0].applicationStatus.length === 0 || dt[0].applicationStatus !== self.getCookieInfo.applicationStatus)
											res.error = {
												msg: utilServ.getLabel(["application", "applicationStatusNotValid"])
											};
									}
								}
							}
						}
						else {
							res = result.data;

							res.status = false;
							res.error = {
								msg: utilServ.getLabel(["authen", "accessInvalid"])
							};
						}

						deferred.resolve(res);
					});
				}
				else
					deferred.resolve(res);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับออกจากระบบ
		self.getSignOut = function () {
			if (utilServ.isHasCookie({ cookieName: self.cookieName }) === true)
				$cookies.remove(self.cookieName, { path: self.cookiePath });

			self.setUserInfo({});
		};

		//ฟังก์ชั่นสำหรับตรวจสอบการเปลี่ยนแปลง
		self.watchChangeScreen = function () {
			utilServ.setSectionLayout();

			if (self.getUserInfo.userId !== undefined && self.getUserInfo.userId.length > 0)
				self.setSlideMenuLayout();
		};

		//ฟังก์ชั่นสำหรับการบันทึกข้อมูล
		self.save = {
			action: function (param) {
				param.url = (param.url === undefined ? "" : param.url);
				param.method = (param.method === undefined ? "GET" : param.method);
				param.data = (param.data === undefined || param.data === "" ? {} : param.data);
				param.showMessageSuccess = (param.showMessageSuccess === undefined ? true : param.showMessageSuccess);

				var deferred = $q.defer();
				var res = {};
				var data = {
					data: param.data
				};
				var requireSignIn = $route.current.requireSignIn;

				utilServ.getDialogPreloading(dictServ.dict.msgPreloading.saving);

				self.isActionValidateAuthen().then(function (result) {
					if (result === true || requireSignIn === false) {
						utilServ.http({
							url: param.url,
							method: param.method,
							data: data
						}).then(function (result) {
							self.closeDialogPreloading();

							res = (result.data.data !== undefined ? result.data.data[0] : {});

							var status = false;

							if (res) {
								if (res.success === "Y")
									status = true;
							}

							angular.extend(res, {
								status: status
							});

							if (param.method === "POST" || param.method === "PUT" || param.method === "DELETE") {
								if (param.method === "POST" || param.method === "PUT") {
									if (status) {
										if (param.showMessageSuccess)
											utilServ.dialogMessage(self.getLabel(["saveSuccess"]), function () {
												deferred.resolve(res);
											});
										else
											deferred.resolve(res);
									}
									else
										utilServ.dialogError(self.getLabel(["saveNotSuccess"]), function () {
											deferred.resolve(res);
										});
								}
								if (param.method === "DELETE") {
									if (status)
										deferred.resolve(res);
									else
										utilServ.dialogError(self.getLabel(["deleteNotSuccess"]), function () {
											deferred.resolve(res);
										});
								}
							}
							else {
								if (status)
									utilServ.dialogMessage((self.getLabel(["processingSuccessful"]) + ", " + self.getLabel(["modeUndefined"])), function () {
										deferred.resolve(res);
									});
								else
									utilServ.dialogError((self.getLabel(["processingNotSuccessful"]) + ", " + self.getLabel(["modeUndefined"])), function () {
										deferred.resolve(res);
									});
							}
						});
					}
					else {
						self.closeDialogPreloading();

						res.status = false;

						deferred.resolve(res);
					}
				});

				return deferred.promise;
			}
		};

		//ฟังก์ชั่นสำหรับการอัพโหลดไฟล์
		self.upload = {
			action: function (param) {
				param.what = (param.what === undefined ? "" : param.what);
				param.data = (param.data === undefined ? "" : param.data);

				var deferred = $q.defer();
				var res = {};
				var url = (utilServ.getURLAPI(self.pathAPI) + "UploadFile.aspx/");
				var requireSignIn = $route.current.requireSignIn;
				var params = [];

				self.getCookie().then(function (result) {
					if (result.status === true) {
						self.getCookieValue(["userId", "verifyCode", "applicationId", "applicationStatus"]);

						var cookie = utilServ.getCookie({ cookieName: self.cookieName });

						params = [
							"",
							("what=" + param.what),
							("package=" + ((cookie !== null && cookie.key !== undefined && cookie.key.length > 0) ? self.setPackage([cookie.key, self.cookieInfo.userId, self.cookieInfo.applicationId]) : ""))
						].join("&");
					}

					url += ("?ver=" + utilServ.dateTimeOnURL + params);

					utilServ.getDialogPreloading(dictServ.dict.msgPreloading.uploading);

					self.isActionValidateAuthen().then(function (result) {
						if (result === true || requireSignIn === false) {
							utilServ.http({
								url: url,
								method: "POST",
								headers: { "Content-Type": undefined },
								data: param.data
							}).then(function (result) {
								res = (result.data !== undefined ? result.data : {});

								if (res.status)
									deferred.resolve(res);
								else {
									self.closeDialogPreloading();

									utilServ.dialogError(self.getLabel(["uploadNotSuccess"]), function () {
										deferred.resolve(res);
									});
								}
							});
						}
						else {
							self.closeDialogPreloading();

							res.status = false;

							deferred.resolve(res);
						}
					});
				});

				return deferred.promise;
			}
		};

		//ฟังก์ชั่นสำหรับการออกจากระบบ
		self.signOut = {
			action: function () {
				utilServ.dialogConfirm(self.getLabel(["authen", "signout", "confirm"]), function (result) {
					if (result) {
						self.slideLeftActive = false;
						self.getSignOut();
						$timeout(function () {
							$location.path("/SignIn").replace();
						}, 0);
					}
				});
			}
		};

		self.isAuthenRoute = function (param) {
			param.requireSignIn = (param.requireSignIn === undefined ? false : param.requireSignIn);
			param.permission = (param.permission === undefined ? "*" : param.permission);

			var deferred = $q.defer();
			var res = {};

			return self.isAuthen({
				requireSignIn: param.requireSignIn,
				permission: param.permission
			}).then(function (result) {
				self.authenInfo = result;
			});
		};

		//ฟังก์ชั่นสำหรับตรวจสอบการยืนยันตัวตน
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//requireSignIn รับค่าต้องการมีการเข้าสู่ระบบหรือไม่
		//permission    รับค่าสิทธิ์ของผู้ใช้งาน
		self.isAuthen = function (param) {
			param.requireSignIn = (param.requireSignIn === undefined ? false : param.requireSignIn);
			param.permission = (param.permission === undefined ? "*" : param.permission);

			var deferred = $q.defer();
			var res = {};

			self.getUser({
				requireSignIn: param.requireSignIn,
				permission: param.permission
			}).then(function (result) {
				res = result;

				if (res.status === true) {
					if (param.requireSignIn === true) {
						self.isUser = true;
						self.setUserInfo(res.data);
						self.slideLeftToggle = true;
						self.slideLeftActive = true;
					}
				}
				else {
					self.isUser = false;
					self.slideLeftToggle = false;
					self.slideLeftActive = false;
					self.getSignOut();

					res.status = false;
					res.error = {
						msg: ((result.error !== undefined ? (result.error.msg + ", ").replace((", " + utilServ.getLabel(["authen", "reqSignin"])), "") : "") + utilServ.getLabel(["authen", "reqSignin"]))
					};
				}

				deferred.resolve(res);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับตรวจสอบสิทธิ์การเข้าใช้งานระบบก่อนการทำงานใด ๆ
		self.isActionValidateAuthen = function () {
			var deferred = $q.defer();
			var requireSignIn = $route.current.requireSignIn;
			var permission = $rootScope.$pageRouteServ.getPermissionInPage($route.current.permission);

			self.isAuthen({
				requireSignIn: requireSignIn,
				permission: permission
			}).then(function (result) {
				if (result.status === false && requireSignIn === true) {
					self.closeDialogPreloading();

					utilServ.dialogError(result.error.msg, function (e) {
						if (e === "close")
							$timeout(function () {
								$location.path("/SignIn").replace();
							}, 0);

						deferred.resolve(result.status);
					});
				}
				else
					deferred.resolve(result.status);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลคำนำหน้าชื่อ
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListTitlePrefix = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "TitlePrefix/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลเพศ
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListGender = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "Gender/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลสัญชาติและเชื้อชาติ
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListNationality = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "Nationality/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลประเทศ
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListCountry = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "Country/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลผู้ใช้งาน
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListUser = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "User/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getexist": {
					url += "GetExist";
					break;
				}
				case "getdata": {
					url += "GetData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลประเภทของนักศึกษาแลกเปลี่ยน
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListStudentCategory = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "StudentCategory/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลมหาวิทยาลัย
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListUniversity = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "University/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลคณะ
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListFaculty = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "Faculty/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลสถานภาพทางการสมรส
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListMaritalStatus = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "MaritalStatus/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลความสัมพันธ์ในครอบครัว
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListRelationship = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "Relationship/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูล Discipline
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListDiscipline = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "Discipline/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลวุฒิการศึกษา
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListEducationalBackground = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "EducationalBackground/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูล Year of Study
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListYearStudy = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "YearStudy/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูล TOEFL Type
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListTOEFLType = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "TOEFLType/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "getlist": {
					url += "GetListData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};

		//ฟังก์ชั่นสำหรับเรียกดูข้อมูลใบสมัคร
		//โดยมีพารามิเตอร์ดังนี้
		//1. param รับค่าพารามิเตอร์ต่าง ๆ ที่ต้องการ
		//action    รับค่ารูปแบบการเรียกดูข้อมูล
		//params    รับค่าพารามิเตอร์ที่ต้องใช้สำหรับเรียกดูข้อมูล
		self.getListApplication = function (param) {
			param.action = (param.action === undefined ? "" : param.action);
			param.params = (param.params === undefined || param.params.length === 0 ? "" : param.params);

			var deferred = $q.defer();
			var dt = [];
			var url = (utilServ.getURLAPI(self.pathAPI) + "Application/");
			var requireSignIn = $route.current.requireSignIn;

			switch (param.action) {
				case "get": {
					url += "GetData";
					break;
				}
			}

			url += ("?ver=" + utilServ.dateTimeOnURL + param.params);

			self.isActionValidateAuthen().then(function (result) {
				if (result === true || requireSignIn === false) {
					utilServ.http({
						url: url
					}).then(function (result) {
						deferred.resolve(result.data.data !== undefined ? result.data.data : []);
					});
				}
				else
					deferred.resolve(dt);
			});

			return deferred.promise;
		};
	})

	.run(function ($rootScope, $routeParams, utilServ, appServ, dictServ, pageRouteServ, applicationServ) {
		$rootScope.$routeParams = $routeParams;
		$rootScope.$utilServ = utilServ;
		$rootScope.$appServ = appServ;
		$rootScope.$dictServ = dictServ;
		$rootScope.$pageRouteServ = pageRouteServ;

		appServ.setLanguageDefault({});
		appServ.setLanguageOnHeaderFooter();
		$("main section .panel-col.col-menu .slidemenu").scrollbar();
		appServ.watchChangeScreen();
	});
})();