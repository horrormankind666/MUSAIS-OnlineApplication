USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexSetUser]    Script Date: 8/4/2565 13:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๑๕/๐๖/๒๕๖๑>
-- Description	: <สำหรับบันทึกข้อมูลตาราง sexUser ครั้งละ ๑ เรคคอร์ด>
-- Parameter
--  1. action			เป็น varchar		รับค่าการกระทำกับฐานข้อมูล
--  2. id 				เป็น varchar		รับค่ารหัสผู้ใช้งาน
--  3. username			เป็น nvarchar	รับค่าชื่อผู้ใช้งาน
--  4. password			เป็น nvarchar	รับค่ารหัสผ่าน
--  5. verifyCode		เป็น varchar		รับค่ารหัสยืนยันตัวตน
--  6. verifyStatus		เป็น varchar		รับค่าสถานะการยืนยันตัวตน
--  7. verifyDate		เป็น varchar		รับค่าวันที่ยืนยันตัวตน
--  8. titlePrefixId	เป็น varchar		รับค่ารหัสคำนำหน้าชื่อ
--  9. firstName 		เป็น nvarchar	รับค่าชื่อ
-- 10. middleName 		เป็น nvarchar	รับค่าชื่อกลาง
-- 11. lastName 		เป็น nvarchar	รับค่านามสกุล
-- 12. nationalityId	เป็น varchar		รับค่ารหัสสัญชาติ
-- 13. genderId			เป็น varchar		รับค่าเพศ
-- 14. email			เป็น nvarchar	รับค่าอีเมล์
-- 15. countryId		เป็น varchar		รับค่ารหัสประเทศของมหาวิทยาลัย
-- 16. cancelledStatus	เป็น varchar		รับค่าสถานะการยกเลิก
-- 17. by				เป็น varchar		รับค่าชื่อของผู้ที่กระทำกับฐานข้อมูล
-- 18. ip				เป็น varchar		รับค่าหมายเลขไอพีของผู้ที่กระทำกับฐานข้อมูล
-- =============================================
ALTER procedure [dbo].[sp_sexSetUser]
(
	@action varchar(10) = null,
	@id varchar(50) = null,
	@username nvarchar(100) = null,
	@password nvarchar(100) = null,	
	@verifyCode varchar(50) = null,
	@verifyStatus varchar(5) = null,
	@titlePrefixId varchar(5) = null,
	@firstName nvarchar(50) = null,
	@middleName nvarchar(50) = null,
	@lastName nvarchar(50) = null,
	@nationalityId varchar(5) = null,
	@genderId varchar(5) = null,
	@email nvarchar(255) = null,
	@countryId varchar(5) = null,
	@cancelledStatus varchar(5) = null,
	@by varchar(255) = null,
	@ip varchar(255) = null
)
as
begin
	set concat_null_yields_null off

	set @action = upper(ltrim(rtrim(isnull(@action, ''))))
	set @id = ltrim(rtrim(isnull(@id, '')))
	set @username = ltrim(rtrim(isnull(@username, '')))
	set @password = ltrim(rtrim(isnull(@password, '')))
	set @verifyCode = ltrim(rtrim(isnull(@verifyCode, '')))
	set @verifyStatus = ltrim(rtrim(isnull(@verifyStatus, '')))
	set @titlePrefixId = ltrim(rtrim(isnull(@titlePrefixId, '')))
	set @firstName = ltrim(rtrim(isnull(@firstName, '')))
	set @middleName = ltrim(rtrim(isnull(@middleName, '')))
	set @lastName = ltrim(rtrim(isnull(@lastName, '')))
	set @nationalityId = ltrim(rtrim(isnull(@nationalityId, '')))
	set @genderId = ltrim(rtrim(isnull(@genderId, '')))
	set @email = ltrim(rtrim(isnull(@email, '')))
	set @countryId = ltrim(rtrim(isnull(@countryId, '')))
	set @cancelledStatus = ltrim(rtrim(isnull(@cancelledStatus, '')))
	set @by = ltrim(rtrim(isnull(@by, '')))
	set @ip = ltrim(rtrim(isnull(@ip, '')))	
	
	declare @table varchar(50) = 'sexUser'
	declare @rowCount int = 0
	declare @rowCountUpdate int = 0
	declare @value nvarchar(max) = null
	declare	@strBlank varchar(50) = '----------**********.........0.0000000000000000000'	
	declare @userId varchar(50) = null	
	declare @verifyDate varchar(50) = (case when (@verifyStatus = 'Y') then convert(varchar, getdate()) else null end)	
	declare @recipients varchar(max) = null
	declare @subject nvarchar(255) = null
	declare @mail nvarchar(max) = null
	declare @titlePrefixName nvarchar(50) = null
	declare @link varchar(255) = null					
	
	if (@action = 'INSERT' or @action = 'UPDATE' or @action = 'DELETE')
	begin
		set @value = 'id='				+ dbo.fnc_utilCheckString(1, @id, @id, 'null') + ', ' +
					 'username='		+ dbo.fnc_utilCheckString(1, @username, ('"' + @username + '"'), 'null') + ', ' +
					 'password='		+ dbo.fnc_utilCheckString(1, @password, ('"' + @password + '"'), 'null') + ', ' +
					 'verifyStatus='	+ dbo.fnc_utilCheckString(1, @verifyStatus, ('"' + @verifyStatus + '"'), 'null') + ', ' +
					 'verifyDate='		+ dbo.fnc_utilCheckString(1, @verifyDate, ('"' + @verifyDate + '"'), 'null') + ', ' +
					 'titlePrefixId='	+ dbo.fnc_utilCheckString(1, @titlePrefixId, ('"' + @titlePrefixId + '"'), 'null') + ', ' +					 
					 'firstName='		+ dbo.fnc_utilCheckString(1, @firstName, ('"' + @firstName + '"'), 'null') + ', ' +
					 'middleName='		+ dbo.fnc_utilCheckString(1, @middleName, ('"' + @middleName + '"'), 'null') + ', ' +
					 'lastName='		+ dbo.fnc_utilCheckString(1, @lastName, ('"' + @lastName + '"'), 'null') + ', ' +
					 'nationalityId='	+ dbo.fnc_utilCheckString(1, @nationalityId, ('"' + @nationalityId + '"'), 'null') + ', ' +
					 'genderId='		+ dbo.fnc_utilCheckString(1, @genderId, ('"' + @genderId + '"'), 'null') + ', ' +
					 'email='			+ dbo.fnc_utilCheckString(1, @email, ('"' + @email + '"'), 'null') + ', ' +
					 'countryId='		+ dbo.fnc_utilCheckString(1, @countryId, ('"' + @countryId + '"'), 'null') + ', ' +
					 'cancelledStatus='	+ dbo.fnc_utilCheckString(1, @cancelledStatus, ('"' + @cancelledStatus + '"'), 'null')
					 
		begin try
			begin tran
				if (@action = 'INSERT')
				begin
					set @verifyCode = dbo.fnc_sexGetVerifyCode(32)
					
					insert into Bermuda..sexUser
 					(
						username,
						password,
						verifyCode,
						verifiedStatus,
						verifyDate,
						perTitlePrefixId,
						firstName,
						middleName,
						lastName,
						perNationalityId,
						perGenderId,
						email,
						plcCountryId,
						cancelledStatus,
						createDate,
						createBy,
						createIp,
						modifyDate,
						modifyBy,
						modifyIp
					)
					values
					(
						dbo.fnc_utilCheckString(1, @username, @username, null),
						dbo.fnc_utilCheckString(1, @password, @password, null),
						dbo.fnc_utilCheckString(1, @verifyCode, @verifyCode, null),
						dbo.fnc_utilCheckString(1, @verifyStatus, @verifyStatus, null),
						(case when (dbo.fnc_utilCheckString(1, @verifyDate, @verifyDate, null) is not null) then convert(datetime, @verifyDate, 103) else null end),
						dbo.fnc_utilCheckString(1, @titlePrefixId, @titlePrefixId, null),
						dbo.fnc_utilCheckString(1, @firstName, @firstName, null),
						dbo.fnc_utilCheckString(1, @middleName, @middleName, null),
						dbo.fnc_utilCheckString(1, @lastName, @lastName, null),
						dbo.fnc_utilCheckString(1, @nationalityId, @nationalityId, null),
						dbo.fnc_utilCheckString(1, @genderId, @genderId, null),
						dbo.fnc_utilCheckString(1, @email, @email, null),
						dbo.fnc_utilCheckString(1, @countryId, @countryId, null),
						dbo.fnc_utilCheckString(1, @cancelledStatus, @cancelledStatus, null),
						getdate(),
						dbo.fnc_utilCheckString(1, @by, @by, null),
						dbo.fnc_utilCheckString(1, @ip, @ip, null),
						null,
						null,
						null
					)		
					
					set @rowCount = @rowCount + 1
				end
				
				if (@action = 'UPDATE' or @action = 'DELETE')					
				begin
					if (dbo.fnc_utilCheckString(1, @id, @id, null) is not null and dbo.fnc_utilCheckString(1, @verifyCode, @verifyCode, null) is not null)
					begin
						set @rowCountUpdate = (select count(id) from Bermuda..sexUser with(nolock) where (id = @id) and (verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS))
						
						if (@rowCountUpdate > 0)
						begin
							if (@action = 'UPDATE')
							begin
								update Bermuda..sexUser set
									username			= dbo.fnc_utilCheckString(1, @username, @username, dbo.fnc_utilCheckString(2, @username, null, username)),
									password			= dbo.fnc_utilCheckString(1, @password, @password, dbo.fnc_utilCheckString(2, @password, null, password)),
									verifiedStatus		= dbo.fnc_utilCheckString(1, @verifyStatus, @verifyStatus, dbo.fnc_utilCheckString(2, @verifyStatus, null, verifiedStatus)),
									verifyDate			= (case when (dbo.fnc_utilCheckString(1, @verifyStatus, @verifyStatus, null) is not null) then (case when (@verifyDate is not null) then convert(datetime, @verifyDate, 103) else null end) else dbo.fnc_utilCheckString(2, @verifyStatus, null, verifyDate) end),																		
									perTitlePrefixId	= dbo.fnc_utilCheckString(1, @titlePrefixId, @titlePrefixId, dbo.fnc_utilCheckString(2, @titlePrefixId, null, perTitlePrefixId)),
									firstName			= dbo.fnc_utilCheckString(1, @firstName, @firstName, dbo.fnc_utilCheckString(2, @firstName, null, firstName)),
									middleName			= dbo.fnc_utilCheckString(1, @middleName, @middleName, dbo.fnc_utilCheckString(2, @middleName, null, middleName)),
									lastName			= dbo.fnc_utilCheckString(1, @lastName, @lastName, dbo.fnc_utilCheckString(2, @lastName, null, lastName)),
									perNationalityId	= dbo.fnc_utilCheckString(1, @nationalityId, @nationalityId, dbo.fnc_utilCheckString(2, @nationalityId, null, perNationalityId)),
									perGenderId			= dbo.fnc_utilCheckString(1, @genderId, @genderId, dbo.fnc_utilCheckString(2, @genderId, null, perGenderId)),
									email				= dbo.fnc_utilCheckString(1, @email, @email, dbo.fnc_utilCheckString(2, @email, null, email)),
									plcCountryId		= dbo.fnc_utilCheckString(1, @countryId, @countryId, dbo.fnc_utilCheckString(2, @countryId, null, plcCountryId)),
									cancelledStatus		= dbo.fnc_utilCheckString(1, @cancelledStatus, @cancelledStatus, dbo.fnc_utilCheckString(2, @cancelledStatus, null, cancelledStatus)),
									modifyDate			= getdate(),
									modifyBy			= dbo.fnc_utilCheckString(1, @by, @by, dbo.fnc_utilCheckString(2, @by, null, modifyBy)),
									modifyIp			= dbo.fnc_utilCheckString(1, @ip, @ip, dbo.fnc_utilCheckString(2, @ip, null, modifyIp))
								where (id = @id) and (verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS)
										
							end
							
							if (@action = 'DELETE')
							begin
								delete from Bermuda..sexUser where (id = @id) and (verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS)
							end
							
							set @rowCount = @rowCount + 1							
						end
					end
				end
			commit tran
		end try
		begin catch
			rollback tran
			insert into BermudaLog..sexErrorLog
			(
				errorDatabase,
				errorTable,
				errorAction,
				errorValue,
				errorMessage,
				errorNumber,
				errorSeverity,
				errorState,
				errorLine,
				errorProcedure,
				errorActionDate,
				errorActionBy,
				errorIp
			)
			values
			(
				db_name(),
				@table,
				@action,
				@value,
				error_message(),
				error_number(),
				error_severity(),
				error_state(),
				error_line(),
				error_procedure(),
				getdate(),
				dbo.fnc_utilCheckString(1, @by, @by, null),
				dbo.fnc_utilCheckString(1, @ip, @ip, null)
			)			
		end catch
	end
	
	if (@rowCount = 1)
	begin
		if (@action = 'INSERT' and len(@email) > 0)
		begin
			begin try
				set @userId = (select id from Bermuda..sexUser where (username = @username) and (password = @password) and (verifyCode = @verifyCode))
				set @titlePrefixName = (select enTitleInitials from Infinity..perTitlePrefix with(nolock) where id = @titlePrefixId)
				set @link = ('https://musais.mahidol.ac.th/OnlineApplication/#/ActivateAccount/' + @userId + '/' + @verifyCode)
				--set @link = ('http://10.90.101.101:8080/MUSAIS.OnlineApplication/#/ActivateAccount/' + @userId + '/' + @verifyCode)
				set @middleName = dbo.fnc_utilCheckString(2, @middleName, null, @middleName)
				set @recipients = @email
				set @subject = 'MUSAIS : Verify Account'
				set @mail =
					N'Hi, ' + (isnull(@titlePrefixName, '') + @firstName + ' ' + (case when (len(@middleName) > 0) then (@middleName + ' ') else '' end) + @lastName) + '<br /><br />' +  
					N'Your account<br />' +  
					N'Username : <strong>' + @username + '</strong><br />' +  
					N'Password : <strong>' + @password + '</strong><br /><br />' +  
					N'Before you can signin, you first need to activate your account. To do so, please follow this link.<br />' +  
					N'<a href="' + @link + '">' + @link + '</a>' +
					N'<br /><br />Regards,<br />Mahidol University Student, Academic and International Services ( MUSAIS )<br />Email : musais@mahidol.ac.th'
				/*
				exec msdb.dbo.sp_send_dbmail
					@profile_name = 'MUSAIS',  
					@recipients = @recipients,
					@subject = @subject,  
					@body = @mail, 
					@body_format = 'HTML'
				*/
			end try
			begin catch
			end catch
		end
		
		if (@action = 'UPDATE' and len(@verifyStatus) = 0)
		begin
			begin try
				select	@username = username,
						@password = password
				from	Bermuda..sexUser
				where	(id = @id) and (verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS)

				set @userId = @id
				set @titlePrefixName = (select enTitleInitials from Infinity..perTitlePrefix with(nolock) where id = @titlePrefixId)
				set @middleName = dbo.fnc_utilCheckString(2, @middleName, null, @middleName)
				set @recipients = @email
				set @subject = 'MUSAIS : User Info'
				set @mail =
					N'Hi, ' + (isnull(@titlePrefixName, '') + @firstName + ' ' + (case when (len(@middleName) > 0) then (@middleName + ' ') else '' end) + @lastName) + '<br /><br />' +  
					N'Your account<br />' +  
					N'Username : <strong>' + @username + '</strong><br />' +  
					N'Password : <strong>' + @password + '</strong>' +
					N'<br /><br />Regards,<br />Mahidol University Student, Academic and International Services ( MUSAIS )<br />Email : musais@mahidol.ac.th'
				/*
				exec msdb.dbo.sp_send_dbmail
					@profile_name = 'MUSAIS',  
					@recipients = @recipients,
					@subject = @subject,  
					@body = @mail, 
					@body_format = 'HTML'
				*/
			end try
			begin catch
			end catch
		end
	end
	
	select	(case when (@rowCount = 1) then 'Y' else 'N' end) as success,
			@recipients as mailRecipients,
			@subject as mailSubject,
			@mail as mailMessage,
			(case when (len(@verifyStatus) = 0) then null else @verifyStatus end) as verifyStatus
end