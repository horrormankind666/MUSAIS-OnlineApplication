select	a.id,
		a.applicationStatus,
		(
			case a.applicationStatus
				when 'WA' then 'Written Application'
                when 'PA' then 'Pending Approval'
                when 'CC' then 'Pending Approval ( Central Consideration Already )'
                when 'IA' then 'Incomplete Application'
                when 'AA' then 'Application Approved'
                when 'NA' then 'Application is not Approved'
				else null
			end
		) as applicationStatusName,
		b.username,
		b.password,
		c.enTitleFullName as titlePrefixFullNameEN,
		c.enTitleInitials as titlePrefixInitialsEN,
		a.firstName,
		a.middleName,
        a.lastName,
		f.enNationalityName as nationalityNameEN,
		e.enGenderFullName as genderFullNameEN,
		e.enGenderInitials as genderInitialsEN,
		a.email,
		g.studentCategoryNameEN,
		a.studentCategorySpecify,
		a.studentCategoryOther,
		h.countryNameEN as countryHomeUniversityNameEN,
		j.universityNameEN,
		a.universityOther,
		a.acaFacultyId,
		l.nameEn as facultyNameEN,
		a.department,
		convert(varchar, a.semesterDateStart, 103) as semesterDateStart,
		convert(varchar, a.semesterDateEnd, 103) as semesterDateEnd,
		a.passportNumber,
        convert(varchar, a.passportExpiryDate, 103) as passportExpiryDate,
        m.disciplineNameEN,
		a.submitStatus,
		a.cancelledStatus,
		a.createDate
from	Bermuda..sexApplication as a with(nolock) inner join
		Bermuda..sexUser as b with(nolock) on a.sexUserId = b.id left join
		Infinity..perTitlePrefix as c with(nolock) on a.perTitlePrefixId = c.id left join
		Infinity..perGender as d with(nolock) on c.perGenderId = d.id left join
		Infinity..perGender as e with(nolock) on a.perGenderId = e.id left join
		Infinity..perNationality as f with(nolock) on a.perNationalityId = f.id left join
		Bermuda..sexStudentCategory as g with(nolock) on a.sexStudentCategoryId = g.id left join
        Infinity..plcCountry as h with(nolock) on a.plcCountryId = h.id left join
        Infinity..plcCountry as i with(nolock) on a.plcCountryHomeId = i.id left join
		Infinity..plcUniversity as j with(nolock) on a.plcUniversityId = j.id left join
		Infinity..plcCountry as k with(nolock) on j.plcCountryId = k.id left join
		Infinity..acaFaculty as l with(nolock) on a.acaFacultyId = l.id left join
		Bermuda..sexDiscipline as m with(nolock) on a.sexDisciplineId = m.id
where	(a.createDate >= '01/01/2022')
order by a.id