USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexGetUserTermServiceConsent]    Script Date: 12/7/2564 11:28:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๐๓/๐๙/๒๕๖๓>
-- Description	: <>
-- Parameter
--  1. userId			เป็น varchar	รับค่ารหัสผู้ใช้งาน
--  2. termServiceType	เป็น varchar	รับค่าชื่อเนื้อหาการแสดงความยินยอม
-- =============================================
-- exec sp_sexGetUserTermServiceConsent '58', 'MUSAIS_ONLINEAPPLICATION_AGREE_PRIVACY_POLICY'

ALTER procedure [dbo].[sp_sexGetUserTermServiceConsent]
(
	@userId varchar(50) = null,
	@termServiceType varchar(50) = null
)
as
begin
	set @userId = ltrim(rtrim(isnull(@userId, '')))
	set @termServiceType = ltrim(rtrim(isnull(@termServiceType, '')))

	select	sexapp.*,
			stdtsv.termType,
			stdtsv.termStatus,
			stdtsv.note as termNote,
			stdtsv.termDate
	from	Bermuda..sexApplication as sexapp with(nolock) inner join
			Bermuda..sexUser as sexusr with(nolock) on sexapp.sexUserId = sexusr.id inner join
			Infinity..stdStudentTermService as stdtsv with(nolock) on sexusr.id = stdtsv.studentId
	where	(stdtsv.studentId = @userId) and
			(stdtsv.termType = @termServiceType) and
			(sexapp.cancelledStatus = 'N') and
			(sexusr.cancelledStatus = 'N') and
			(stdtsv.cancelStatus is null)
end