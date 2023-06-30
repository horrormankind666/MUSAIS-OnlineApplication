update Bermuda..sexApplication set
	applicationStatus = 'AA',
	centralApprovalStatus = 'Y',
	centralApprovalDate = getdate(),
	centralApprovalBy = 'yutthaphoom.taw',
	centralApprovalIp = '10.62.127.184',
	divisionApprovalStatus = 'Y',
	divisionApprovalDate = getdate(),
	divisionApprovalBy = 'yutthaphoom.taw',
	divisionApprovalIp ='10.62.127.184'
where	(id in (
			'A202300023',
			'A202300029',
			'A202300030',
			'A202300031',
			'A202300032',
			'A202300035',
			'A202300042',
			'A202300045',
			'A202300046',
			'A202300047',
			'A202300048',
			'A202300050',
			'A202300056',
			'A202300057',
			'A202300058',
			'A202300118',
			'A202300119',
			'A202300120',
			'A202300121',
			'A202300143',
			'A202300158',
			'A202300163',
			'A202300173',
			'A202300182'
		))

select	sexapp.id,
		sexapp.sexUserId,
		sexusr.username,
		sexusr.password,
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
where	(sexapp.id in (
			'A202100005',
			'A202100007',
			'A202100012',
			'A202100013',
			'A202100016',
			'A202100017',
			'A202100018',
			'A202100019',
			'A202100020',
			'A202100021',
			'A202100022',
			'A202100023',
			'A202100024',
			'A202100025',
			'A202100026',
			'A202100028',
			'A202100029',
			'A202100031',
			'A202100032',
			'A202100034',
			'A202100035',
			'A202100036',
			'A202100039'
		))

select	a.id,
		a.sexUserId,
		b.username,
		b.password,
		a.applicationStatus,
		a.perTitlePrefixId,
		(isnull(a.firstName, '') + ' ' + (case when (len(isnull(a.middleName, '')) > 0) then (a.middleName + ' ') else '' end)) as firstNameTH, 
		'' as middleNameTH,
		isnull(a.lastName, '') as lastNameTH,
		(isnull(a.firstName, '') + ' ' + (case when (len(isnull(a.middleName, '')) > 0) then (a.middleName + ' ') else '' end)) as firstNameEN, 
		'' as middleNameEN,
		isnull(a.lastName, '') as lastNameEN,		
		c.enGenderInitials as genderInitialsEN,
		a.passportNumber,
		(case when (a.birthDate is not null) then (substring(convert(varchar, a.birthDate, 103),1, 6) + convert(varchar, (year(a.birthDate) + 543))) else null end) as birthDateTH,
		d.isoCountryCodes3Letter
from	Bermuda..sexApplication as a with(nolock) inner join
		Bermuda..sexUser as b with(nolock) on a.sexUserId = b.id left join
		Infinity..perGender as c with(nolock) on a.perGenderId = c.id left join
		Infinity..perNationality as d with(nolock) on a.perNationalityId = d.id
where	(applicationStatus = 'AA') and
		(centralApprovalStatus = 'Y') and
		(divisionApprovalStatus = 'Y') and
		(
			a.id in (
				'A202300023',
				'A202300029',
				'A202300030',
				'A202300031',
				'A202300032',
				'A202300035',
				'A202300042',
				'A202300045',
				'A202300046',
				'A202300047',
				'A202300048',
				'A202300050',
				'A202300056',
				'A202300057',
				'A202300058',
				'A202300118',
				'A202300119',
				'A202300120',
				'A202300121',
				'A202300143',
				'A202300158',
				'A202300163',
				'A202300173',
				'A202300182'
			)
		)

select	 b.id,
		 a.studentCode,
		 (isnull(c.firstName, '') + ' ' + (case when (len(isnull(c.middleName, '')) > 0) then (c.middleName + ' ') else '' end) + isnull(c.lastName, '') + ' ( ' + c.email + ' )') as fullName, 
		 c.passportNumber,
		 e.enGenderInitials as gender,
		 f.enNationalityName as nationalityNameEN,
		 a.admissionDate,
		 a.yearEntry,
		 (case when (len(isnull(c.universityOther, '')) > 0) then c.universityOther else g.universityNameEN end) as universityNameEN,
		 h.countryNameEN as countryUniversityNameEN,
		 i.facultyCode,
		 j.enEducationalBackgroundName as educationalBackgroundNameEN,
		 c.semesterDateStart,
		 c.semesterDateEnd,
		 (datediff(day, convert(date, c.semesterDateStart), convert(date, c.semesterDateEnd)) + 1) as countDay,
		 a.status
from	 Infinity..stdStudent as a with(nolock) inner join
		 Infinity..perPerson as b with(nolock) on a.personId = b.id inner join
		 Bermuda..sexApplication as c with(nolock) on b.idCard = c.passportNumber inner join
		 Bermuda..sexUser as d with(nolock) on c.sexUserId = d.id inner join
		 Infinity..perGender as e with(nolock) on c.perGenderId = e.id left join
		 Infinity..perNationality as f with(nolock) on c.perNationalityId = f.id left join
		 Infinity..plcUniversity as g with(nolock) on c.plcUniversityId = g.id left join
		 Infinity..plcCountry as h with(nolock) on g.plcCountryId = h.id left join
		 Infinity..acaFaculty as i with(nolock) on c.acaFacultyId = i.id left join
		 Infinity..perEducationalBackground as j with(nolock) on c.perEducationalBackgroundId = j.id
where	 (facultyId = 'MU-01') and 
		 (programId = 'MUIR-001-B') and
		 (c.applicationStatus = 'AA') and
		 (c.centralApprovalStatus = 'Y') and
		 (c.divisionApprovalStatus = 'Y') and
		 (a.yearEntry >= '2563')
order by a.studentCode