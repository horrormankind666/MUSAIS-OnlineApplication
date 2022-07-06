USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexGetUserExist]    Script Date: 12/7/2564 11:28:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๑๘/๐๖/๒๕๖๑>
-- Description	: <สำหรับตรวจสอบการมีอยู่ของผู้ใช้งาน>
-- Parameter
--  1. id 			เป็น varchar	รับค่ารหัสผู้ใช้งาน
--  2. username		เป็น nvarchar	รับค่าชื่อผู้ใช้งาน
--  3. password		เป็น nvarchar	รับค่ารหัสผ่าน
--  4. verifyCode	เป็น varchar	รับค่ารหัสยืนยันตัวตน
-- =============================================
ALTER procedure [dbo].[sp_sexGetUserExist]
(
	@id varchar(50) = null,
	@username nvarchar(100) = null,
	@password nvarchar(100) = null,	
	@verifyCode varchar(50) = null
)
as
begin
	set concat_null_yields_null off

	set @id = ltrim(rtrim(isnull(@id, '')))
	set @username = ltrim(rtrim(isnull(@username, '')))
	set @password = ltrim(rtrim(isnull(@password, '')))
	set @verifyCode = ltrim(rtrim(isnull(@verifyCode, '')))

	declare @usernameOld nvarchar(100) = null
	declare @passwordOld nvarchar(100) = null	
	declare @recordCount int = 0
	
	set @usernameOld = ltrim(rtrim(isnull(@usernameOld, '')))
	set @passwordOld = ltrim(rtrim(isnull(@passwordOld, '')))

	if (len(@id) > 0)
	begin
		select	@usernameOld = sexusr.username,
				@passwordOld = sexusr.password
		from	Bermuda..sexUser as sexusr with(nolock)
		where	(sexusr.id = @id)

		set @password = (case when (len(@password) = 0) then @passwordOld else @password end)
	end

	select	@recordCount = count(sexusr.id)
	from	Bermuda..sexUser as sexusr with(nolock)
	where	(
				(sexusr.username = @username) and
				(1 = (case when (len(@usernameOld) > 0) then (case when (sexusr.username <> @usernameOld) then 1 else 0 end) else 1 end))
			) or
			(
				(sexusr.password = @password) and
				(1 = (case when (len(@passwordOld) > 0) then (case when (sexusr.password <> @passwordOld) then 1 else 0 end) else 1 end))
			) or
			(sexusr.verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS)

	select (case when (@recordCount > 0) then 'Y' else 'N' end) as exist
end