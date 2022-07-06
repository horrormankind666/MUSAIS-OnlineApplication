/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๗/๐๖/๒๕๖๑>
Modify date : <๐๘/๐๔/๒๕๖๕>
Description : <โมเดลข้อมูลใบสมัคร>
=============================================
*/

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class Application {
		public string package {
			get;
			set;
		}

		public string titlePrefixId {
			get;
			set;
		}

		public string firstName {
			get;
			set;
		}

		public string middleName {
			get;
			set;
		}

		public string lastName {
			get;
			set;
		}

		public string nationalityId {
			get;
			set;
		}

		public string genderId {
			get;
			set;
		}

		public string email {
			get;
			set;
		}

		public string studentCategoryId {
			get;
			set;
		}

		public string studentCategorySpecify {
			get;
			set;
		}

		public string studentCategoryOther {
			get;
			set;
		}

		public string countryId {
			get;
			set;
		}

		public string universityId {
			get;
			set;
		}

		public string universityOther {
			get;
			set;
		}

		public string facultyId {
			get;
			set;
		}

		public string department {
			get;
			set;
		}

		public string semesterDateStart {
			get;
			set;
		}

		public string semesterDateEnd {
			get;
			set;
		}

		public string homeAddress {
			get;
			set;
		}

		public string homeDistrict {
			get;
			set;
		}

		public string homeCity {
			get;
			set;
		}

		public string homeProvince {
			get;
			set;
		}

		public string homePostalCode {
			get;
			set;
		}

		public string countryHomeId {
			get;
			set;
		}

		public string mailingAddress {
			get;
			set;
		}

		public string mailingDistrict {
			get;
			set;
		}

		public string mailingCity {
			get;
			set;
		}

		public string mailingProvince {
			get;
			set;
		}

		public string mailingPostalCode {
			get;
			set;
		}

		public string countryMailingId {
			get;
			set;
		}

		public string contactTel {
			get;
			set;
		}

		public string birthdate {
			get;
			set;
		}

		public string maritalStatusId {
			get;
			set;
		}

		public string passportNumber {
			get;
			set;
		}

		public string passportExpiryDate {
			get;
			set;
		}

		public string emergencyName {
			get;
			set;
		}

		public string relationshipId {
			get;
			set;
		}

		public string emergencyMailingAddress {
			get;
			set;
		}

		public string emergencyMailingDistrict {
			get;
			set;
		}

		public string emergencyMailingCity {
			get;
			set;
		}

		public string emergencyMailingProvince {
			get;
			set;
		}

		public string emergencyMailingPostalCode {
			get;
			set;
		}

		public string countryMailingEmergencyId {
			get;
			set;
		}

		public string emergencyHomeTel {
			get;
			set;
		}

		public string emergencyOfficeTel {
			get;
			set;
		}

		public string emergencyMobile {
			get;
			set;
		}

		public string emergencyFax {
			get;
			set;
		}

		public string emergencyEmail {
			get;
			set;
		}

		public string curEduInstitution {
			get;
			set;
		}

		public string curEduFaculty {
			get;
			set;
		}

		public string disciplineId {
			get;
			set;
		}

		public string educationalBackgroundId {
			get;
			set;
		}

		public string curEduYear {
			get;
			set;
		}

		public string TOEFLScore {
			get;
			set;
		}

		public string TOEFLTypeId {
			get;
			set;
		}

		public string IELTSResult {
			get;
			set;
		}

		public string englishNativeOther {
			get;
			set;
		}

		public string passportFile {
			get;
			set;
		}

		public string facePhotographsFile {
			get;
			set;
		}

		public string transcriptFile {
			get;
			set;
		}

		public string travelInsuranceFile {
			get;
			set;
		}

		public string letterHomeUniversityFile {
			get;
			set;
		}

		public string curriculumVitaeFile {
			get;
			set;
		}

		public string TOEFLIELTSFile {
			get;
			set;
		}

		public string letterIntentFile {
			get;
			set;
		}

		public string declarationA {
			get;
			set;
		}

		public string declarationB {
			get;
			set;
		}

		public string declarationC {
			get;
			set;
		}

		public string declarationD {
			get;
			set;
		}

		public string declarationE {
			get;
			set;
		}

		public string declarationESpecify {
			get;
			set;
		}

		public string submitStatus {
			get;
			set;
		}

		public string submitBy {
			get;
			set;
		}

		public string submitIp {
			get;
			set;
		}

		public string applicationStatus {
			get;
			set;
		}

		public string centralApprovalStatus {
			get;
			set;
		}

		public string centralApprovalBy {
			get;
			set;
		}

		public string centralApprovalIp {
			get;
			set;
		}

		public string divisionApprovalStatus {
			get;
			set;
		}

		public string divisionApprovalBy {
			get;
			set;
		}

		public string divisionApprovalIp {
			get;
			set;
		}

		public string reason {
			get;
			set;
		}

		public string cancelledStatus {
			get;
			set;
		}

		public string by {
			get;
			set;
		}

		public static DataSet GetData(
			string applicationId,
			string userId,
			string verifyCode
		) {
			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexGetApplication",
				new SqlParameter("@id", applicationId),
				new SqlParameter("@userId", userId),
				new SqlParameter("@verifyCode",	verifyCode)
			);

			return ds;
		}

		public static DataSet SetData(
			string method,
			List<Application> data
		) {
			string action = String.Empty;
			string cookieValue = String.Empty;
			string[] packageDecode = null;
			string applicationId = String.Empty;
			string userId = String.Empty;
			string verifyCode = String.Empty;
			DataSet ds = new DataSet();
			StudentService.StudentService ss = new StudentService.StudentService();

			if (method.Equals("POST"))
				action = "INSERT";

			if (method.Equals("PUT"))
				action = "UPDATE";

			if (method.Equals("DELETE"))
				action = "DELETE";
            
			foreach (var d in data) {
				try { 
					packageDecode = ss.DecodeBase64String(d.package).Split('.');

					if (action.Equals("INSERT")) {
						userId = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));
						verifyCode = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
					}

					if (action.Equals("UPDATE")) {
						cookieValue = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));

						if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
							applicationId = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
							userId = ss.DecodeBase64String(ss.StringReverse(packageDecode[2]));
							verifyCode = ss.DecodeBase64String(ss.StringReverse(packageDecode[3]));
						}
					}

					ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexSetApplication",
						new SqlParameter("@action", action),
						new SqlParameter("@id", applicationId),
						new SqlParameter("@userId", userId),
						new SqlParameter("@verifyCode", verifyCode),
						new SqlParameter("@titlePrefixId", d.titlePrefixId),
						new SqlParameter("@firstName", d.firstName),
						new SqlParameter("@middleName", d.middleName),
						new SqlParameter("@lastName", d.lastName),
						new SqlParameter("@nationalityId", d.nationalityId),
						new SqlParameter("@genderId", d.genderId),
						new SqlParameter("@email", d.email),
						new SqlParameter("@studentCategoryId", d.studentCategoryId),
						new SqlParameter("@studentCategorySpecify", d.studentCategorySpecify),
						new SqlParameter("@studentCategoryOther", d.studentCategoryOther),
						new SqlParameter("@countryId", d.countryId),
						new SqlParameter("@universityId", d.universityId),
						new SqlParameter("@universityOther", d.universityOther),
						new SqlParameter("@facultyId", d.facultyId),
						new SqlParameter("@department", d.department),
						new SqlParameter("@semesterDateStart", d.semesterDateStart),
						new SqlParameter("@semesterDateEnd", d.semesterDateEnd),
						new SqlParameter("@homeAddress", d.homeAddress),
						new SqlParameter("@homeDistrict", d.homeDistrict),
						new SqlParameter("@homeCity", d.homeCity),
						new SqlParameter("@homeProvince", d.homeProvince),
						new SqlParameter("@homePostalCode", d.homePostalCode),
						new SqlParameter("@countryHomeId", d.countryHomeId),
						new SqlParameter("@mailingAddress", d.mailingAddress),
						new SqlParameter("@mailingDistrict", d.mailingDistrict),
						new SqlParameter("@mailingCity", d.mailingCity),
						new SqlParameter("@mailingProvince", d.mailingProvince),
						new SqlParameter("@mailingPostalCode", d.mailingPostalCode),
						new SqlParameter("@countryMailingId", d.countryMailingId),
						new SqlParameter("@contactTel", d.contactTel),
						new SqlParameter("@birthdate", d.birthdate),
						new SqlParameter("@maritalStatusId", d.maritalStatusId),
						new SqlParameter("@passportNumber", d.passportNumber),
						new SqlParameter("@passportExpiryDate", d.passportExpiryDate),
						new SqlParameter("@emergencyName", d.emergencyName),
						new SqlParameter("@relationshipId", d.relationshipId),
						new SqlParameter("@emergencyMailingAddress", d.emergencyMailingAddress),
						new SqlParameter("@emergencyMailingDistrict", d.emergencyMailingDistrict),
						new SqlParameter("@emergencyMailingCity", d.emergencyMailingCity),
						new SqlParameter("@emergencyMailingProvince", d.emergencyMailingProvince),
						new SqlParameter("@emergencyMailingPostalCode",	d.emergencyMailingPostalCode),
						new SqlParameter("@countryMailingEmergencyId", d.countryMailingEmergencyId),
						new SqlParameter("@emergencyHomeTel", d.emergencyHomeTel),
						new SqlParameter("@emergencyOfficeTel", d.emergencyOfficeTel),
						new SqlParameter("@emergencyMobile", d.emergencyMobile),
						new SqlParameter("@emergencyFax", d.emergencyFax),
						new SqlParameter("@emergencyEmail", d.emergencyEmail),
						new SqlParameter("@curEduInstitution", d.curEduInstitution),
						new SqlParameter("@curEduFaculty", d.curEduFaculty),
						new SqlParameter("@disciplineId", d.disciplineId),
						new SqlParameter("@educationalBackgroundId", d.educationalBackgroundId),
						new SqlParameter("@curEduYear", d.curEduYear),
						new SqlParameter("@TOEFLScore", d.TOEFLScore),
						new SqlParameter("@TOEFLTypeId", d.TOEFLTypeId),
						new SqlParameter("@IELTSResult", d.IELTSResult),
						new SqlParameter("@englishNativeOther", d.englishNativeOther),
						new SqlParameter("@passportFile", d.passportFile),
						new SqlParameter("@facePhotographsFile", d.facePhotographsFile),
						new SqlParameter("@transcriptFile", d.transcriptFile),
						new SqlParameter("@travelInsuranceFile", d.travelInsuranceFile),
						new SqlParameter("@letterHomeUniversityFile", d.letterHomeUniversityFile),
						new SqlParameter("@curriculumVitaeFile", d.curriculumVitaeFile),
						new SqlParameter("@TOEFLIELTSFile", d.TOEFLIELTSFile),
						new SqlParameter("@letterIntentFile", d.letterIntentFile),
						new SqlParameter("@declarationA", d.declarationA),
						new SqlParameter("@declarationB", d.declarationB),
						new SqlParameter("@declarationC", d.declarationC),
						new SqlParameter("@declarationD", d.declarationD),
						new SqlParameter("@declarationE", d.declarationE),
						new SqlParameter("@declarationESpecify", d.declarationESpecify),
						new SqlParameter("@submitStatus", d.submitStatus),
						new SqlParameter("@submitBy", d.by),
						new SqlParameter("@submitIp", iUtil.GetIP()),
						new SqlParameter("@applicationStatus", d.applicationStatus),
						new SqlParameter("@centralApprovalStatus", d.centralApprovalStatus),
						new SqlParameter("@centralApprovalBy", d.by),
						new SqlParameter("@centralApprovalIp", iUtil.GetIP()),
						new SqlParameter("@divisionApprovalStatus", d.divisionApprovalStatus),
						new SqlParameter("@divisionApprovalBy", d.by),
						new SqlParameter("@divisionApprovalIp", iUtil.GetIP()),
						new SqlParameter("@reason", d.reason),
						new SqlParameter("@cancelledStatus", d.cancelledStatus),
						new SqlParameter("@by", d.by),
						new SqlParameter("@ip", iUtil.GetIP())
					);

					if (ds.Tables[0].Rows.Count > 0) {
						DataRow dr = ds.Tables[0].Rows[0];

						if (dr["success"].ToString().Equals("Y")) {
							if (action.Equals("UPDATE") && dr["submitStatus"].ToString().Equals("Y"))
								iUtil.SendMail(dr["mailRecipients"].ToString(), dr["mailSubject"].ToString(), dr["mailMessage"].ToString());
						}

						dr["mailMessage"] = null;
					}
				}
				catch {
				}
			}

			return ds;
		}
	}
}