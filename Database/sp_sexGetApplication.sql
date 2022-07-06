USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexGetApplication]    Script Date: 12/7/2564 11:27:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๓๑/๐๗/๒๕๖๑>
-- Description	: <สำหรับแสดงข้อมูลใบสมัคร>
-- Parameter
--  1. id			เป็น varchar	รับค่ารหัสใบสมัคร
--  2. userId		เป็น varchar	รับค่ารหัสผู้ใช้งาน
--  3. verifyCode	เป็น varchar	รับค่ารหัสยืนยันตัวตน
-- =============================================
ALTER procedure [dbo].[sp_sexGetApplication]
(
	@id varchar(10) = null,
	@userId varchar(50) = null,
	@verifyCode varchar(50) = null
)
as
begin
	set concat_null_yields_null off
	
	set @id = ltrim(rtrim(isnull(@id, '')))
	set @userId = ltrim(rtrim(isnull(@userId, '')))
	set @verifyCode = ltrim(rtrim(isnull(@verifyCode, '')))
	
	select	sexapp.id,
			sexapp.sexUserId,
			sexapp.applicationStatus,
			(
				case sexapp.applicationStatus
					when 'WA' then 'Written Application'
					when 'PA' then 'Pending Approval'
					when 'CC' then 'Pending Approval ( Central Consideration Already )'
					when 'IA' then 'Incomplete Application'
					when 'AA' then 'Application Approved'
					when 'NA' then 'Application is not Approved'
					else null
				end
			) as applicationStatusName,
			sexapp.perTitlePrefixId,
			pertip.enTitleFullName as titlePrefixFullNameEN,
			pertip.enTitleInitials as titlePrefixInitialsEN,
			sexapp.firstName,
			sexapp.middleName,
			sexapp.lastName,
			(isnull(pertip.enTitleInitials, '') + isnull(sexusr.firstName, '') + ' ' + (case when (len(isnull(sexusr.middleName, '')) > 0) then (sexusr.middleName + ' ') else '' end) + isnull(sexusr.lastName, '')) as fullName, 
			sexapp.perNationalityId, 
			pernat.enNationalityName as nationalityNameEN,
			pernat.isoCountryCodes2Letter as isoNationalityName2Letter,
			pernat.isoCountryCodes3Letter as isoNationalityName3Letter,
			sexapp.perGenderId,
			pergus.enGenderFullName as genderFullNameEN,
			pergus.enGenderInitials as genderInitialsEN,
			sexapp.email,
			sexapp.sexStudentCategoryId,
			sexsct.studentCategoryNameEN,
			sexsct.specify as sexStudentCategorySpecify,
			sexapp.studentCategorySpecify,
			sexapp.studentCategoryOther,
			sexapp.plcCountryId as countryHomeUniversityId,
			plccou.countryNameEN as countryHomeUniversityNameEN,
			sexapp.plcUniversityId,
			plcunv.universityNameEN,
			sexapp.universityOther,
			sexapp.acaFacultyId,
			acafac.nameEn as facultyNameEN,
			sexapp.department,
			convert(varchar, sexapp.semesterDateStart, 103) as semesterDateStart,
			convert(varchar, sexapp.semesterDateEnd, 103) as semesterDateEnd,
			sexapp.homeAddress,
			sexapp.homeDistrict,
			sexapp.homeCity,
			sexapp.homeProvince,
			sexapp.homePostalCode,
			sexapp.plcCountryHomeId,
			plccouhad.countryNameEN as countryHomeNameEN,
			sexapp.mailingAddress,
			sexapp.mailingDistrict,
			sexapp.mailingCity,
			sexapp.mailingProvince,
			sexapp.mailingPostalCode,
			sexapp.plcCountryMailingId,
			plccoumad.countryNameEN as countryMailingNameEN,
			sexapp.contactTel,
			convert(varchar, sexapp.birthDate, 103) as birthDate,
			sexapp.perMaritalStatusId,
			permas.enMaritalStatusName as maritalStatusNameEN,
			sexapp.passportNumber,
			convert(varchar, sexapp.passportExpiryDate, 103) as passportExpiryDate,
			sexapp.emergencyName,
			sexapp.perRelationshipId,
			perrls.relationshipNameEN,
			sexapp.emergencyMailingAddress,
			sexapp.emergencyMailingDistrict,
			sexapp.emergencyMailingCity,
			sexapp.emergencyMailingProvince,
			sexapp.emergencyMailingPostalCode,
			sexapp.plcCountryMailingEmergencyId,
			plccouect.countryNameEN as countryMailingEmergencyNameEN,
			sexapp.emergencyHomeTel,
			sexapp.emergencyOfficeTel,
			sexapp.emergencyMobile,
			sexapp.emergencyFax,
			sexapp.emergencyEmail,
			sexapp.curEduInstitution,
			sexapp.curEduFaculty,
			sexapp.sexDisciplineId,
			sexdcp.disciplineNameEN,
			sexapp.perEducationalBackgroundId,
			perebk.enEducationalBackgroundName as educationalBackgroundNameEN,
			sexapp.curEduYear,
			sexapp.TOEFLScore,
			sexapp.sexTOEFLTypeId,
			sextft.TOEFLTypeNameEN,
			sexapp.IELTSResult,
			sexapp.englishNativeOther,
			sexapp.passportFile,
			sexapp.facePhotographsFile,
			sexapp.transcriptFile,
			sexapp.travelInsuranceFile,
			sexapp.letterHomeUniversityFile,
			sexapp.curriculumVitaeFile,
			sexapp.TOEFLIELTSFile,
			sexapp.letterIntentFile,
			sexapp.declarationA,
			(
				case sexapp.declarationA
					when 'Y' then 'Yes'
					when 'N' then 'No'
					else null
				end
			) as declarationAName,
			sexapp.declarationB,
			sexapp.declarationC,
			sexapp.declarationD,
			sexapp.declarationE,
			(
				case sexapp.declarationE
					when 'Y' then 'Yes'
					when 'N' then 'No'
					else null
				end
			) as declarationEName,
			sexapp.declarationESpecify,
			sexapp.submitStatus
	from	Bermuda..sexApplication as sexapp with(nolock) inner join
			Bermuda..sexUser as sexusr with(nolock) on sexapp.sexUserId = sexusr.id left join
			Infinity..perTitlePrefix as pertip with(nolock) on sexapp.perTitlePrefixId = pertip.id left join
			Infinity..perGender as pergtp with(nolock) on pertip.perGenderId = pergtp.id left join
			Infinity..perGender as pergus with(nolock) on sexapp.perGenderId = pergus.id left join
			Infinity..perNationality as pernat with(nolock) on sexapp.perNationalityId = pernat.id left join
			Bermuda..sexStudentCategory as sexsct with(nolock) on sexapp.sexStudentCategoryId = sexsct.id left join
			Infinity..plcCountry as plccou with(nolock) on sexapp.plcCountryId = plccou.id left join
			Infinity..plcCountry as plccouhad with(nolock) on sexapp.plcCountryHomeId = plccouhad.id left join
			Infinity..plcCountry as plccoumad with(nolock) on sexapp.plcCountryMailingId = plccoumad.id left join
			Infinity..plcCountry as plccouect with(nolock) on sexapp.plcCountryMailingEmergencyId = plccouect.id left join
			Infinity..plcUniversity as plcunv with(nolock) on sexapp.plcUniversityId = plcunv.id left join
			Infinity..plcCountry as plccouunv with(nolock) on plcunv.plcCountryId = plccouunv.id left join
			Infinity..acaFaculty as acafac with(nolock) on sexapp.acaFacultyId = acafac.id left join
			Infinity..perMaritalStatus as permas with(nolock) on sexapp.perMaritalStatusId = permas.id left join
			Infinity..perRelationship as perrls with(nolock) on sexapp.perRelationshipId = perrls.id left join
			Bermuda..sexDiscipline as sexdcp with(nolock) on sexapp.sexDisciplineId = sexdcp.id left join
			Infinity..perEducationalBackground as perebk with(nolock) on sexapp.perEducationalBackgroundId = perebk.id left join
			Bermuda..sexTOEFLType as sextft with(nolock) on sexapp.sexTOEFLTypeId = sextft.id
	where	(sexapp.cancelledStatus = 'N') and
			(sexapp.id = @id) and
			(sexapp.sexUserId = @userId) and
			(sexusr.verifyCode = @verifyCode)
end