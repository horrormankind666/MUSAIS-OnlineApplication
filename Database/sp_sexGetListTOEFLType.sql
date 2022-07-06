USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexGetListTOEFLType]    Script Date: 12/7/2564 11:27:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๑๒/๐๗/๒๕๖๑>
-- Description	: <สำหรับแสดงข้อมูล TOEFL Type>
-- Parameter
--	1. cancelledStatus	เป็น varchar	รับค่าสถานะการยกเลิก
-- =============================================
ALTER procedure [dbo].[sp_sexGetListTOEFLType]
(
	@cancelledStatus varchar(1) = null
)
as
begin
	set concat_null_yields_null off

	set @cancelledStatus = ltrim(rtrim(isnull(@cancelledStatus, '')))

	select	 sextft.id,
			 sextft.TOEFLTypeNameTH,
			 sextft.TOEFLTypeNameEN,
			 sextft.cancelledStatus
	from	 Bermuda..sexTOEFLType as sextft with(nolock)
	where	 (len(@cancelledStatus) = 0 or sextft.cancelledStatus = @cancelledStatus)
	order by sextft.id
end