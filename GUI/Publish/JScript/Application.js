/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๗/๒๕๖๑>
Modify date : <๑๙/๐๙/๒๕๖๒>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับใบสมัคร>
=============================================
*/

(function () {
	"use strict";

    angular.module("applicationMod", [
	    "utilMod",
	    "appMod",
	    "dictMod",
	    "pageRouteMod"
    ])
    
    .service("applicationServ", function (
        $rootScope,
        $timeout,
        $location,
        $q,
        utilServ,
        appServ,
        dictServ,
        pageRouteServ
    ) {
        var self = this;

        self.isSubmitStatus = false;

        self.getDataSource = function (param) {
		    param.dataSource = (param.dataSource === undefined || param.dataSource === "" ? [] : param.dataSource);

		    var deferred = $q.defer();
		    var cookie = utilServ.getCookie({ cookieName: appServ.cookieName });

		    appServ.getCookieValue(["userId", "verifyCode", "applicationId", "applicationStatus"]);

            if (param.dataSource.length === 0) {
                appServ.getListApplication({
				    action: "get",
				    params: [
					    "",
					    ("package=" + appServ.setPackage([cookie.key, appServ.cookieInfo.applicationId, appServ.cookieInfo.userId, appServ.cookieInfo.verifyCode]))
				    ].join("&")
                }).then(function (result) {
                    var dt = [];

                    if (result.length > 0) {
                        for (var i = 0; i < result.length; i++) {
                            var dr = result[i];

                            dt.push({
                                id: (dr.id ? dr.id : ""),
                                UserId: (dr.sexUserId ? dr.sexUserId : ""),
                                applicationStatus: (dr.applicationStatus ? dr.applicationStatus : ""),
                                applicationStatusName: (dr.applicationStatusName ? dr.applicationStatusName : ""),
                                titlePrefixId: (dr.perTitlePrefixId ? dr.perTitlePrefixId : ""),
                                titlePrefixFullName: {
								    TH: "",
                                    EN: (dr.titlePrefixFullNameEN ? dr.titlePrefixFullNameEN : "")
                                },
                                titlePrefixInitials: {
                                    TH: "",
                                    EN: (dr.titlePrefixInitialsEN ? dr.titlePrefixInitialsEN : "")
                                },
                                firstName: (dr.firstName ? dr.firstName : ""),
                                middleName: (dr.firstName ? dr.middleName : ""),
                                lastName: (dr.lastName ? dr.lastName : ""),
                                fullName: (dr.fullName ? dr.fullName : ""),
                                nationalityId: (dr.perNationalityId ? dr.perNationalityId : ""),
                                nationalityName: {
                                    TH: "",
                                    EN: (dr.nationalityNameEN ? dr.nationalityNameEN : "")
                                },
                                isoNationalityName2Letter: (dr.isoNationalityName2Letter ? dr.isoNationalityName2Letter : ""),
                                isoNationalityName3Letter: (dr.isoNationalityName3Letter ? dr.isoNationalityName3Letter : ""),
                                genderId: (dr.perGenderId ? dr.perGenderId : ""),
                                genderFullName: {
								    TH: "",
                                    EN: (dr.genderFullNameEN ? dr.genderFullNameEN : "")
                                },
                                genderInitials: {
                                    TH: "",
                                    EN: (dr.genderInitialsEN ? dr.genderInitialsEN : "")
                                },
                                email: (dr.email ? dr.email : ""),
                                studentCategoryId: (dr.sexStudentCategoryId ? dr.sexStudentCategoryId : ""),
                                studentCategoryName: {
                                    TH: "",
                                    EN: (dr.studentCategoryNameEN ? dr.studentCategoryNameEN : "")
                                },
                                studentCategorySpecify: (dr.studentCategorySpecify ? dr.studentCategorySpecify : ""),
                                studentCategoryOther: (dr.studentCategoryOther ? dr.studentCategoryOther : ""),
                                countryHomeUniversityId: (dr.countryHomeUniversityId ? dr.countryHomeUniversityId : ""),
                                countryHomeUniversityName: {
                                    TH: "",
                                    EN: (dr.countryHomeUniversityNameEN ? dr.countryHomeUniversityNameEN : "")
                                },
                                universityId: (dr.plcUniversityId ? dr.plcUniversityId : ""),
                                universityName: {
                                    TH: "",
                                    EN: (dr.universityNameEN ? dr.universityNameEN : "")
                                },
                                universityOther: (dr.universityOther ? dr.universityOther : ""),
                                facultyId: (dr.acaFacultyId ? dr.acaFacultyId : ""),
                                facultyName: {
                                    TH: "",
                                    EN: (dr.facultyNameEN ? dr.facultyNameEN : "")
                                },
                                department: (dr.department ? dr.department : ""),
                                semesterDateStart: (dr.semesterDateStart ? dr.semesterDateStart : ""),
                                semesterDateEnd: (dr.semesterDateEnd ? dr.semesterDateEnd : ""),
                                homeAddress: (dr.homeAddress ? dr.homeAddress : ""),
                                homeDistrict: (dr.homeDistrict ? dr.homeDistrict : ""),
                                homeCity: (dr.homeCity ? dr.homeCity : ""),
                                homeProvince: (dr.homeProvince ? dr.homeProvince : ""),
                                homePostalCode: (dr.homePostalCode ? dr.homePostalCode : ""),
                                countryHomeId: (dr.plcCountryHomeId ? dr.plcCountryHomeId : ""),
                                countryHomeName: {
                                    TH: "",
                                    EN: (dr.countryHomeNameEN ? dr.countryHomeNameEN : "")
                                },
                                mailingAddress: (dr.mailingAddress ? dr.mailingAddress : ""),
                                mailingDistrict: (dr.mailingDistrict ? dr.mailingDistrict : ""),
                                mailingCity: (dr.mailingCity ? dr.mailingCity : ""),
                                mailingProvince: (dr.mailingProvince ? dr.mailingProvince : ""),
                                mailingPostalCode: (dr.mailingPostalCode ? dr.mailingPostalCode : ""),
                                countryMailingId: (dr.plcCountryMailingId ? dr.plcCountryMailingId : ""),
                                countryMailingName: {
                                    TH: "",
                                    EN: (dr.countryMailingNameEN ? dr.countryMailingNameEN : "")
                                },
                                contactTel: (dr.contactTel ? dr.contactTel : ""),
                                birthDate: (dr.birthDate ? dr.birthDate : ""),
                                maritalStatusId: (dr.perMaritalStatusId ? dr.perMaritalStatusId : ""),
                                maritalStatusName: {
                                    TH: "",
                                    EN: (dr.maritalStatusNameEN ? dr.maritalStatusNameEN : "")
                                },
                                passportNumber: (dr.passportNumber ? dr.passportNumber : ""),
                                passportExpiryDate: (dr.passportExpiryDate ? dr.passportExpiryDate : ""),
                                emergencyName: (dr.emergencyName ? dr.emergencyName : ""),
                                relationshipId: (dr.perRelationshipId ? dr.perRelationshipId : ""),
                                relationshipName: {
                                    TH: "",
                                    EN: (dr.relationshipNameEN ? dr.relationshipNameEN : "")
                                },
                                emergencyMailingAddress: (dr.emergencyMailingAddress ? dr.emergencyMailingAddress : ""),
                                emergencyMailingDistrict: (dr.emergencyMailingDistrict ? dr.emergencyMailingDistrict : ""),
                                emergencyMailingCity: (dr.emergencyMailingCity ? dr.emergencyMailingCity : ""),
                                emergencyMailingProvince: (dr.emergencyMailingProvince ? dr.emergencyMailingProvince : ""),
                                emergencyMailingPostalCode: (dr.emergencyMailingPostalCode ? dr.emergencyMailingPostalCode : ""),
                                countryMailingEmergencyId: (dr.plcCountryMailingEmergencyId ? dr.plcCountryMailingEmergencyId : ""),
                                countryMailingEmergencyName: {
                                    TH: "",
                                    EN: (dr.countryMailingEmergencyNameEN ? dr.countryMailingEmergencyNameEN : "")
                                },
                                emergencyHomeTel: (dr.emergencyHomeTel ? dr.emergencyHomeTel : ""),
                                emergencyOfficeTel: (dr.emergencyOfficeTel ? dr.emergencyOfficeTel : ""),
                                emergencyMobile: (dr.emergencyMobile ? dr.emergencyMobile : ""),
                                emergencyFax: (dr.emergencyFax ? dr.emergencyFax : ""),
                                emergencyEmail: (dr.emergencyEmail ? dr.emergencyEmail : ""),
                                curEduInstitution: (dr.curEduInstitution ? dr.curEduInstitution : ""),
                                curEduFaculty: (dr.curEduFaculty ? dr.curEduFaculty : ""),
                                disciplineId: (dr.sexDisciplineId ? dr.sexDisciplineId : ""),
                                disciplineName: {
                                    TH: "",
                                    EN: (dr.disciplineNameEN ? dr.disciplineNameEN : "")
                                },
                                educationalBackgroundId: (dr.perEducationalBackgroundId ? dr.perEducationalBackgroundId : ""),
                                educationalBackgroundName: {
                                    TH: "",
                                    EN: (dr.educationalBackgroundNameEN ? dr.educationalBackgroundNameEN : "")
                                },
                                curEduYear: (dr.curEduYear ? dr.curEduYear : ""),
                                TOEFLScore: (dr.TOEFLScore ? dr.TOEFLScore : ""),
                                TOEFLTypeId: (dr.sexTOEFLTypeId ? dr.sexTOEFLTypeId : ""),
                                TOEFLTypeName: {
                                    TH: "",
                                    EN: (dr.TOEFLTypeNameEN ? dr.TOEFLTypeNameEN : "")
                                },
                                IELTSResult: (dr.IELTSResult ? dr.IELTSResult : ""),
                                englishNativeOther: (dr.englishNativeOther ? dr.englishNativeOther : ""),
                                passportFile: (dr.passportFile ? dr.passportFile : ""),
                                facePhotographsFile: (dr.facePhotographsFile ? dr.facePhotographsFile : ""),
                                transcriptFile: (dr.transcriptFile ? dr.transcriptFile : ""),
                                travelInsuranceFile: (dr.travelInsuranceFile ? dr.travelInsuranceFile : ""),
                                letterHomeUniversityFile: (dr.letterHomeUniversityFile ? dr.letterHomeUniversityFile : ""),
                                curriculumVitaeFile: (dr.curriculumVitaeFile ? dr.curriculumVitaeFile : ""),
                                TOEFLIELTSFile: (dr.TOEFLIELTSFile ? dr.TOEFLIELTSFile : ""),
                                letterIntentFile: (dr.letterIntentFile ? dr.letterIntentFile : ""),
                                declarationA: (dr.declarationA ? dr.declarationA : ""),
                                declarationAName: (dr.declarationAName ? dr.declarationAName : ""),
                                declarationB: (dr.declarationB ? dr.declarationB : ""),
                                declarationC: (dr.declarationC ? dr.declarationC : ""),
                                declarationD: (dr.declarationD ? dr.declarationD : ""),
                                declarationE: (dr.declarationE ? dr.declarationE : ""),
                                declarationEName: (dr.declarationEName ? dr.declarationEName : ""),
                                declarationESpecify: (dr.declarationESpecify ? dr.declarationESpecify : ""),
                                submitStatus: (dr.submitStatus ? dr.submitStatus : "")
                            });
                        }

                        param.dataSource = dt;

                        deferred.resolve(param.dataSource);
                    }
                    else
					    utilServ.dialogError(utilServ.getLabel(["application", "applicationNotFound"]), function (e) {
						    param.dataSource = [];

						    deferred.resolve(param.dataSource);
					    });
                });
            }
            else
                deferred.resolve(param.dataSource);

            return deferred.promise;
        };

        self.saveChange = {
            update: {
                action: function (param) {
                    param.data = (param.data === undefined || param.data === "" ? {} : param.data);

                    var deferred = $q.defer();
                    var data = param.data;

                    appServ.getCookie().then(function (result) {
                        if (result.status === true) {                                                
                            appServ.getCookieValue(["userId", "verifyCode", "applicationId", "applicationStatus"]);

                            var cookie = utilServ.getCookie({ cookieName: appServ.cookieName });                                                                          

                            angular.extend(data, {
                                "package": ((cookie !== null && cookie.key !== undefined && cookie.key.length > 0) ? appServ.setPackage([cookie.key, appServ.cookieInfo.applicationId, appServ.cookieInfo.userId, appServ.cookieInfo.verifyCode]) : ""),
                                "by": appServ.cookieInfo.userId
                            });
                        }

                        appServ.save.action({
                            url: (utilServ.getURLAPI(appServ.pathAPI) + "Application/PutData"),
                            method: "PUT",
                            data: [data]
                        }).then(function (result) {
                            deferred.resolve(result);
                        });                    
                    });

                    return deferred.promise;
                }
            }
        };

        self.submit = {            
            getValue: function () {
                var result = {
		            "submitStatus": "Y",
		            "applicationStatus": "PA"
                };

                return result;
            },
            validate: function () {
                var deferred = $q.defer();
                var dataRow = {};

                self.getDataSource({}).then(function (result) {
                    var res = {
					    status: true
                    };

                    dataRow = result[0];

                    if (res.status &&
                        (
                            (!dataRow.studentCategoryId && !dataRow.studentCategorySpecify && !dataRow.studentCategoryOther) ||
                            !dataRow.countryHomeUniversityId ||
                            (!dataRow.universityId && !dataRow.universityOther) ||
                            !dataRow.facultyId ||
                            !dataRow.semesterDateStart ||
                            !dataRow.semesterDateEnd
                        )) {
                        res.status = false;
                        res.error = {
                            msg: appServ.getLabel(["application", "studentInfo", "submit"])
                        };
                        res.location = pageRouteServ.pageObject.studentInfo.url;
                    }

                    if (res.status &&
                        (
                            !dataRow.titlePrefixId ||
                            !dataRow.firstName ||
                            !dataRow.lastName ||
                            !dataRow.birthDate ||
                            !dataRow.genderId ||
                            !dataRow.nationalityId ||
                            !dataRow.maritalStatusId ||
                            !dataRow.passportNumber ||
                            !dataRow.passportExpiryDate
                        )) {
		                res.status = false;
					    res.error = {
						    msg: appServ.getLabel(["application", "personalInfo", "submit"])
					    };
					    res.location = pageRouteServ.pageObject.personalInfo.url;
                    }

                    if (res.status &&
                        (
                            !dataRow.homeAddress ||
                            !dataRow.homeCity ||
                            !dataRow.homeProvince ||
                            !dataRow.countryHomeId
                        )) {
                        res.status = false;
                        res.error = {
						    msg: appServ.getLabel(["application", "personalInfo", "submit"])
                        };
                        res.location = pageRouteServ.pageObject.personalInfo.url;
                    }

                    if (res.status &&
                        (
                            !dataRow.mailingAddress ||
                            !dataRow.mailingCity ||
                            !dataRow.mailingProvince ||
                            !dataRow.countryMailingId
                        )) {
					    res.status = false;
					    res.error = {
						    msg: appServ.getLabel(["application", "personalInfo", "submit"])
					    };
					    res.location = pageRouteServ.pageObject.personalInfo.url;
                    }

                    if (res.status &&
                        (
                            !dataRow.email ||
                            (dataRow.email && !utilServ.isEmail(dataRow.email))
                        )) {
					    res.status = false;
					    res.error = {
						    msg: appServ.getLabel(["application", "personalInfo", "submit"])
					    };
					    res.location = pageRouteServ.pageObject.personalInfo.url;
                    }

                    if (res.status &&
                        (
                            !dataRow.emergencyName ||
                            !dataRow.relationshipId ||
                            !dataRow.emergencyMailingAddress ||
                            !dataRow.emergencyMailingCity ||
                            !dataRow.emergencyMailingProvince ||
                            !dataRow.countryMailingEmergencyId ||
                            !dataRow.emergencyHomeTel ||
                            !dataRow.emergencyMobile ||
                            !dataRow.emergencyEmail ||
                            (dataRow.emergencyEmail && !utilServ.isEmail(dataRow.emergencyEmail))
                        )) {
					    res.status = false;
					    res.error = {
						    msg: appServ.getLabel(["application", "personalInfo", "submit"])
					    };
					    res.location = pageRouteServ.pageObject.personalInfo.url;
                    }

                    if (res.status &&
                        (
                            !dataRow.curEduInstitution ||
                            !dataRow.curEduFaculty ||
                            !dataRow.disciplineId ||
                            !dataRow.educationalBackgroundId ||
                            !dataRow.curEduYear
                        )) {
					    res.status = false;
					    res.error = {
						    msg: appServ.getLabel(["application", "academicInfo", "submit"])
					    };
					    res.location = pageRouteServ.pageObject.academicInfo.url;
                    }

                    if (res.status &&
                        (
                            !dataRow.passportFile ||
                            !dataRow.facePhotographsFile ||
                            !dataRow.travelInsuranceFile
                        )) {
                        res.status = false;
                        res.error = {
						    msg: appServ.getLabel(["application", "uploadDocuments", "submit"])
                        };
                        res.location = pageRouteServ.pageObject.uploadDocuments.url;
                    }

                    if (res.status &&
                        (
                            !dataRow.declarationA ||
                            (dataRow.declarationA === "Y" && !dataRow.declarationB) ||
                            !dataRow.declarationC ||
                            !dataRow.declarationD ||
                            !dataRow.declarationE ||
                            (dataRow.declarationE === "Y" && !dataRow.declarationESpecify)
                        )) {
                        res.status = false;
                        res.error = {
	                        msg: appServ.getLabel(["application", "declaration", "submit"])
                        };
                        res.location = pageRouteServ.pageObject.declaration.url;
                    }

                    $timeout(function () {
                        deferred.resolve(res);
                    }, 0);
                });

                return deferred.promise;
            },
            action: function () {
                utilServ.getDialogPreloading(dictServ.dict.msgPreloading.submitting);

                this.validate().then(function (result) {
                    if (result.status) {
                        self.saveChange.update.action({
                            data: self.submit.getValue()
                        }).then(function (result) {
                            appServ.closeDialogPreloading();

                            self.isSubmitStatus = result.status;

                            if (result.status) {                                                     
                                $rootScope.$appServ.getUserInfo.applicationStatus = "PA";
                                $rootScope.$appServ.getUserInfo.applicationStatusName = "Pending Approval";
                                
                                pageRouteServ.setSlideMenuOff();

                                appServ.getCookieValue(["userId", "verifyCode", "applicationId", "applicationStatus"]);

                                appServ.setCookie({
                                    userId: appServ.cookieInfo.userId,
                                    verifyCode: appServ.cookieInfo.verifyCode,
                                    applicationId: appServ.cookieInfo.applicationId,
                                    applicationStatus: $rootScope.$appServ.getUserInfo.applicationStatus
                                });
                            }
                        });
                    }
                    else {
                        appServ.closeDialogPreloading();

                        utilServ.dialogError(result.error.msg, function (e) {
						    if (e === "close")
							    $timeout(function () {
						            $location.path(result.location).replace();
							    }, 0);
                        });
                    }                    
                });
            }
        };
    })        

    .run(function ($rootScope, applicationServ) {
        $rootScope.$applicationServ = applicationServ;
    });
})();