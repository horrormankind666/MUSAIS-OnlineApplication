select	b.firstName,
		b.middleName,
		b.lastName,
		a.semesterDateStart,
		a.semesterDateEnd,
		c.status,
		(year(a.semesterDateEnd) + 543) as graduateYear,
		c.*
from	Bermuda..sexApplication as a inner join
		Infinity..perPerson as b on a.passportNumber = b.idCard inner join
		Infinity..stdStudent as c on b.id = c.personId
where	(c.programId = 'MUIR-001-B') and
		(c.status = '000') and
		(a.semesterDateStart is not null) and
		(a.semesterDateEnd is not null) and
		(a.semesterDateEnd < getdate())
order by c.studentCode

begin tran
update Infinity..stdStudent set
	status = '104',
	graduateYear = (year(a.semesterDateEnd) + 543),
	graduateDate = a.semesterDateEnd
from	Bermuda..sexApplication as a inner join
		Infinity..perPerson as b on a.passportNumber = b.idCard inner join
		Infinity..stdStudent as c on b.id = c.personId
where	(c.programId = 'MUIR-001-B') and
		(c.status = '000') and
		(a.semesterDateStart is not null) and
		(a.semesterDateEnd is not null) and
		(a.semesterDateEnd < getdate())
