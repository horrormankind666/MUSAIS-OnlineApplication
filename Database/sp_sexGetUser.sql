USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexGetUser]    Script Date: 8/4/2565 13:45:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๒๐/๐๖/๒๕๖๐>
-- Description	: <สำหรับตรวจสอบผู้ใช้งาน>
-- Parameter
--  1. id 				เป็น varchar	รับค่ารหัสผู้ใช้งาน
--  2. username			เป็น nvarchar	รับค่าชื่อผู้ใช้งาน
--  3. password			เป็น nvarchar	รับค่ารหัสผ่าน
--  4. verifyCode		เป็น varchar	รับค่ารหัสยืนยันตัวตน
--  5. sendEmailStatus	เป็น varchar	รับค่าสถานะการส่งอีเมล์หรือไม่
--  6. email			เป็น nvarchar	รับค่าอีเมล์
-- =============================================
ALTER procedure [dbo].[sp_sexGetUser]
(
	@id varchar(50) = null,
	@username nvarchar(100) = null,
	@password nvarchar(100) = null,	
	@verifyCode varchar(50) = null,
	@sendEmailStatus varchar(1) = null,
	@email nvarchar(255) = null
)
as
begin
	set concat_null_yields_null off
	
	set @id = ltrim(rtrim(isnull(@id, '')))
	set @username = ltrim(rtrim(isnull(@username, '')))
	set @password = ltrim(rtrim(isnull(@password, '')))
	set @verifyCode = ltrim(rtrim(isnull(@verifyCode, '')))
	set @sendEmailStatus = ltrim(rtrim(isnull(@sendEmailStatus, '')))
	set @email = ltrim(rtrim(isnull(@email, '')))

	declare @rowCount int = 0
	declare @subject nvarchar(255) = null
	declare @mail nvarchar(max) = null
	declare @fullName nvarchar(255) = null

	select	sexusr.id,
			isnull(sexapp.id, '') as sexApplicationId,
			isnull(sexapp.applicationStatus, '') as applicationStatus,
			sexusr.username,
			sexusr.password,
			sexusr.verifyCode,
			sexusr.verifiedStatus,
			sexusr.verifyDate,
			sexusr.perTitlePrefixId,
			pertip.enTitleFullName as titlePrefixFullNameEN,
			pertip.enTitleInitials as titlePrefixInitialsEN,
			sexusr.firstName,
			sexusr.middleName,
			sexusr.lastName,
			(isnull(pertip.enTitleInitials, '') + isnull(sexusr.firstName, '') + ' ' + (case when (len(isnull(sexusr.middleName, '')) > 0) then (sexusr.middleName + ' ') else '' end) + isnull(sexusr.lastName, '')) as fullName, 
			sexusr.perNationalityId, 
			pernat.enNationalityName as nationalityNameEN,
			pernat.isoCountryCodes2Letter as isoNationalityName2Letter,
			pernat.isoCountryCodes3Letter as isoNationalityName3Letter,
			sexusr.perGenderId,
			pergus.enGenderFullName as genderFullNameEN,
			pergus.enGenderInitials as genderInitialsEN,
			sexusr.email,
			sexusr.plcCountryId, 
			plccou.countryNameEN,
			plccou.isoCountryCodes2Letter,
			plccou.isoCountryCodes3Letter,
			sexusr.cancelledStatus,
			sexusr.createDate,
			sexusr.createBy,
			sexusr.createIp,
			sexusr.modifyDate,
			sexusr.modifyBy,
			sexusr.modifyIp
	into	#tmp1
	from	Bermuda..sexUser as sexusr with(nolock) left join
			Infinity..perTitlePrefix as pertip with(nolock) on sexusr.perTitlePrefixId = pertip.id left join
			Infinity..perGender as pergtp with(nolock) on pertip.perGenderId = pergtp.id left join
			Infinity..perGender as pergus with(nolock) on sexusr.perGenderId = pergus.id left join
			Infinity..perNationality as pernat with(nolock) on sexusr.perNationalityId = pernat.id left join
			Infinity..plcCountry as plccou with(nolock) on sexusr.plcCountryId = plccou.id left join
			(
				select	sexapp.id,
						sexapp.sexUserId,
						sexapp.applicationStatus
				from	Bermuda..sexApplication as sexapp with(nolock)
				where	sexapp.cancelledStatus = 'N'
			) as sexapp on sexusr.id = sexapp.sexUserId
	where	(sexusr.cancelledStatus = 'N') and
			(
				(sexusr.id = @id) and
				(1 = (case when (len(@verifyCode) > 0) then (case when (sexusr.verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS) then 1 else 0 end) else 1 end))
			) or
			(
				(sexusr.username = @username) and
				(sexusr.password = @password)
			) or
			(
				(sexusr.username = @username) and
				(sexusr.verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS)
			)

	set @rowCount = (select count(id) from #tmp1)
	
	if (@rowCount > 0 and @sendEmailStatus = 'Y' and len(@email) > 0)
	begin
		begin try
			select	@fullName = fullName,
					@username = username,
					@password = password
			from	#tmp1

			set @subject = 'MUSAIS : User Info';
			set @mail =  
				N'Hi, ' + @fullName + '<br /><br />' +  
				N'Your account<br />' +  
				N'Username : <strong>' + @username + '</strong><br />' +  
				N'Password : <strong>' + @password + '</strong>' +  
				N'<br /><br />Regards,<br />Mahidol University Student, Academic and International Services ( MUSAIS )<br />Email : musais@mahidol.ac.th'
			/*
			exec msdb.dbo.sp_send_dbmail
				@profile_name = 'MUSAIS',  
				@recipients = @email,
				@subject = @subject,  
				@body = @mail, 
				@body_format = 'HTML'
			*/
		end try
		begin catch
		end catch
	end

	select	convert(varchar(50), id) as id,
			username,
			sexApplicationId,
			applicationStatus,
			(
				case applicationStatus
					when 'WA' then 'Written Application'
					when 'PA' then 'Pending Approval'
					when 'CC' then 'Pending Approval ( Central Consideration Already )'
					when 'IA' then 'Incomplete Application'
					when 'AA' then 'Application Approved'
					when 'NA' then 'Application is not Approved'
					else ''
				end
			) as applicationStatusName,
			verifyCode,
			verifiedStatus,
			verifyDate,
			perTitlePrefixId,
			titlePrefixFullNameEN,
			titlePrefixInitialsEN,
			firstName,
			middleName,
			lastName,
			fullName, 
			perNationalityId, 
			nationalityNameEN,
			isoNationalityName2Letter,
			isoNationalityName3Letter,
			perGenderId,
			genderFullNameEN,
			genderInitialsEN,
			email,
			plcCountryId, 
			countryNameEN,
			isoCountryCodes2Letter,
			isoCountryCodes3Letter,
			cancelledStatus,
			createDate,
			createBy,
			createIp,
			modifyDate,
			modifyBy,
			modifyIp,
			@subject as mailSubject,
			@mail as mailMessage
	from	#tmp1	
end