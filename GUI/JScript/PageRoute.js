/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๐๖/๒๕๖๑>
Modify date : <๐๙/๐๙/๒๕๖๓>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับจัดการเมนูของระบบ>
=============================================
*/

(function () {
	"use strict";

	angular.module("pageRouteMod", [
		"ngRoute",
		"ngAnimate",
		"utilMod",
		"appMod",
		"dictMod"
	])

	.config(function (
		$locationProvider,
		$routeProvider
	) {
		$locationProvider.hashPrefix("");
		$routeProvider
			.when("/SignIn", {
				templateUrl: "Module/User.SignIn.html",
				requireSignIn: false,
				permission: ["signin"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRoute({
									requireSignIn: false,
									permission: pageRouteServ.pageObject.signin.permission
								})
							]);
						}
				}
			})
			.when("/CreateNewAccount", {
				templateUrl: "Module/User.CreateNewAccount.html",
				requireSignIn: false,
				permission: ["createNewAccount"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRoute({
									requireSignIn: false,
									permission: pageRouteServ.pageObject.createNewAccount.permission
								})
							]);
					}
				}
			})
			.when("/ActivateAccount/:userId/:verifyCode", {
				templateUrl: "Module/User.ActivateAccount.html",
				requireSignIn: false,
				permission: ["activateAccount"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRoute({
									requireSignIn: false,
									permission: pageRouteServ.pageObject.activateAccount.permission
								})
							]);
						}
				}
			})
			.when("/TermServiceConsent/PrivacyPolicy", {
				templateUrl: "Module/TermServiceConsent.PrivacyPolicy.html",
				requireSignIn: true,
				permission: ["termServiceConsent"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRouteAndActionAgreePrivacyPolicy({
									requireSignIn: true,
									permission: pageRouteServ.pageObject.termServiceConsent.permission
								})
							]);
						}
				}
			})
			.when("/Application/StudentInfo", {
				templateUrl: "Module/Application.StudentInfo.html",
				requireSignIn: true,
				permission: ["application"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRouteAndActionAgreePrivacyPolicy({
									requireSignIn: true,
									permission: pageRouteServ.pageObject.application.permission
								})
							]);
						}
				}
			})
			.when("/Application/PersonalInfo", {
				templateUrl: "Module/Application.PersonalInfo.html",
				requireSignIn: true,
				permission: ["application"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRouteAndActionAgreePrivacyPolicy({
									requireSignIn: true,
									permission: pageRouteServ.pageObject.application.permission
								})
							]);
						}
				}
			})
			.when("/Application/AcademicInfo", {
				templateUrl: "Module/Application.AcademicInfo.html",
				requireSignIn: true,
				permission: ["application"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRouteAndActionAgreePrivacyPolicy({
									requireSignIn: true,
									permission: pageRouteServ.pageObject.application.permission
								})
							]);
						}
				}
			})
			.when("/Application/UploadDocuments", {
				templateUrl: "Module/Application.UploadDocuments.html",
				requireSignIn: true,
				permission: ["application"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRouteAndActionAgreePrivacyPolicy({
									requireSignIn: true,
									permission: pageRouteServ.pageObject.application.permission
								})
							]);
						}
				}
			})
			.when("/Application/Declaration", {
				templateUrl: "Module/Application.Declaration.html",
				requireSignIn: true,
				permission: ["application"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRouteAndActionAgreePrivacyPolicy({
									requireSignIn: true,
									permission: pageRouteServ.pageObject.application.permission
								})
							]);
						}
				}
			})
			.when("/Application/View", {
				templateUrl: "Module/Application.View.html",
				requireSignIn: true,
				permission: ["application"],
				resolve: {
					'': function (
							$q,
							$route,
							appServ,
							pageRouteServ
						) {
							return $q.all([
								appServ.isAuthenRouteAndActionAgreePrivacyPolicy({
									requireSignIn: true,
									permission: pageRouteServ.pageObject.application.permission
								})
							]);
						}
				}
			})
			.otherwise({
				redirectTo: "/SignIn"
			});
	})

	.service("pageRouteServ", function (
		$timeout,
		utilServ,
		appServ
	) {
		var self = this;

		self.menuList = {
			menu: ["studentInfo", "personalInfo", "academicInfo", "uploadDocuments", "declaration"]
		};

		self.pageObject = {
			signin: {
				class: "signin",
				nameDict: ["authen", "signin"],
				permission: "*",
				url: "SignIn"
			},
			createNewAccount: {
				class: "createnewaccount",
				nameDict: ["createNewAccount"],
				permission: "*",
				url: "CreateNewAccount"
			},
			activateAccount: {
				class: "activateaccount",
				nameDict: ["activateAccount"],
				permission: "*",
				url: "ActivateAccount"
			},
			requestPassword: {
				class: "requestpassword",
				permission: "*"
			},
			editAccount: {
				class: "editaccount",
				permission: "*"
			},
			termServiceConsent: {
				class: "termserviceconsent",
				permission: "*",
				privacyPolicy: {
					class: "privacypolicy"
				}
			},
			application: {
				class: "application",
				permission: "*"
			},
			studentInfo: {
				class: "studentinfo",
				icon: "fa fa-group",
				nameDict: ["application", "studentInfo"],
				permission: "*",
				url: "Application/StudentInfo"
			},
			personalInfo: {
				class: "personalinfo",
				icon: "fa fa-id-card-o",
				nameDict: ["application", "personalInfo"],
				permission: "*",
				url: "Application/PersonalInfo",
				profile: {
					class: "profile",
					template: "Module/Application.PersonalInfo.Profile.html"
				},
				homeAddress: {
					class: "homeaddress",
					template: "Module/Application.PersonalInfo.HomeAddress.html"
				},
				mailingAddress: {
					class: "mailingaddress",
					template: "Module/Application.PersonalInfo.MailingAddress.html"
				},
				contact: {
					class: "contact",
					template: "Module/Application.PersonalInfo.Contact.html"
				},
				emergencyContact: {
					class: "emergencycontact",
					template: "Module/Application.PersonalInfo.EmergencyContact.html"
				}
			},
			academicInfo: {
				class: "academicinfo",
				icon: "fa fa-institution",
				nameDict: ["application", "academicInfo"],
				permission: "*",
				url: "Application/AcademicInfo",
				curEdu: {
					class: "curedu",
					template: "Module/Application.AcademicInfo.CurEdu.html"
				},
				englishProficiency: {
					class: "englishproficiency",
					template: "Module/Application.AcademicInfo.EnglishProficiency.html"
				}
			},
			uploadDocuments: {
				class: "uploaddocuments",
				icon: "fa fa-upload",
				nameDict: ["application", "uploadDocuments"],
				permission: "*",
				url: "Application/UploadDocuments"
			},
			declaration: {
				class: "declaration",
				icon: "fa fa-newspaper-o",
				nameDict: ["application", "declaration"],
				permission: "*",
				url: "Application/Declaration"
			},
			applicationView: {
				class: "applicationview",
				permission: "*",
				url: "Application/View"
			}
		}

		self.setSlideMenuOnOff = function () {
			$timeout(function () {
				if ($("main section .panel-col.col-menu").is(":visible") === false)
					self.setSlideMenuOn();
				else
					self.setSlideMenuOff();
			}, 0);
		};

		self.setSlideMenuOn = function () {
			$timeout(function () {
				$("main section .panel-col.col-menu").show();
				appServ.slideLeftActive = true;
			}, 0);
		};

		self.setSlideMenuOff = function () {
			$timeout(function () {
				$("main section .panel-col.col-menu").hide();
				appServ.slideLeftActive = false;
			}, 0);
		};

		self.setMenuActive = function (param) {
			param.menuName = (param.menuName === undefined ? "" : param.menuName);

			var menu = "main section .panel-col.col-menu .slidemenu .nav li";

			$(menu + " a").removeClass("active");
			$(menu + " .subsubmenu").removeClass("active").addClass("hidden");

			if (param.menuName.length > 0) {
				var menuClass = "";

				menuClass = (menu + " a." + param.menuName);

				if ($(menuClass).hasClass("submenu") === true) {
					$(menu + " ul#" + $(menuClass).data("parent")).addClass("in");
					$(menuClass).addClass("active");
				}
				else
					$(menuClass).addClass("active");

				$(menu + " .subsubmenu." + param.menuName).removeClass("hidden").addClass("active");
			}
		};

		self.getPermissionInPage = function (pageName) {
			var permission;
			var tmp = this.pageObject;
			var i;

			if (pageName !== undefined)
				permission = tmp[pageName].permission;

			return permission;
		};
	})

	.run(function (
		$rootScope,
		$timeout,
		$location,
		utilServ,
		appServ,
		dictServ,
		pageRouteServ
	) {
		var requireSignIn;
		var permission;

		$rootScope.$on("$routeChangeStart", function (
			event,
			nextRoute,
			currentRoute
		) {
			appServ.closeDialogPreloading();
			appServ.showView = true;

			$timeout(function () {
				appServ.showPreloading = true;
			}, 0);
			utilServ.getDialogPreloading(dictServ.dict.msgPreloading.loading);

			if (nextRoute.templateUrl === undefined)
				$location.path("/").replace();
			else
				nextRoute.templateUrl = (nextRoute.templateUrl + "?ver=" + utilServ.dateTimeOnURL);
		});

		$rootScope.$on("$routeChangeSuccess", function (
			nextRoute,
			currentRoute
		) {
			appServ.showView = true;
			
			if ($location.path() !== "/" &&
				currentRoute.requireSignIn === true &&
				appServ.authenInfo.status === false) {
				appServ.closeDialogPreloading();

				utilServ.dialogError(appServ.authenInfo.error.msg, function (e) {
					if (e === "close")
						$timeout(function () {
							$location.path("/SignIn").replace();
						}, 0);
				});
			}
			else {
				if (appServ.authenInfo.status === true) {
					if ($location.path() === "/TermServiceConsent/PrivacyPolicy") {
						if (appServ.isActionAgreePrivacyPolicy) {
							if (appServ.getUserInfo.applicationStatus !== "WA")
								$location.path("/Application/View").replace();
							else
								$location.path("/Application/StudentInfo").replace();
						}
					}
					else {
						if (!appServ.isActionAgreePrivacyPolicy)
							$location.path("/TermServiceConsent/PrivacyPolicy").replace();
						else {
							if (currentRoute.requireSignIn === false)
								$location.path("/Application/StudentInfo").replace();
							else {
								if (appServ.getUserInfo.applicationStatus !== "WA")
									$location.path("/Application/View").replace();
							}
						}
					}
				}
			}
		});
	});
})();
