USE [Bermuda]
GO
/****** Object:  Trigger [dbo].[tg_sexUser]    Script Date: 06/06/2566 13:41:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER trigger [dbo].[tg_sexUser]
   on [dbo].[sexUser]
   after insert, delete, update
as
begin
    set concat_null_yields_null off

	declare @table varchar(50) = 'sexUser'
    declare @action varchar(10) = null
	
	if exists (select * from inserted)
	begin
		if exists (select * from deleted)
			set @action = 'UPDATE'
		else
			set @action = 'INSERT'
			
		insert into BermudaLog..sexUserLog
		(
			sexUserId,
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
			modifyIp,
			logDatabase,
			logTable,
			logAction,
			logActionDate,
			logActionBy,
			logIp
		)
		select	*,
				db_name(),
				@table,
				@action,
				getdate(),
				system_user,
				null
		from	inserted				
	end
	else
		begin
			set @action = 'DELETE'
			
			insert into BermudaLog..sexUserLog
			(			
				sexUserId,
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
				modifyIp,
				logDatabase,
				logTable,
				logAction,
				logActionDate,
				logActionBy,
				logIp
			)
			select	*,
					db_name(),
					@table,
					@action,
					getdate(),
					system_user,
					null
			from	deleted			
		end
end
