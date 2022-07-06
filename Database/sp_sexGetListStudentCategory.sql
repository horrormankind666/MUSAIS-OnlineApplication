USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexGetListStudentCategory]    Script Date: 12/7/2564 11:27:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๐๓/๐๗/๒๕๖๑>
-- Description	: <สำหรับแสดงข้อมูลประเภทของนักศึกษาแลกเปลี่ยน>
-- Parameter
--	1. cancelledStatus	เป็น varchar	รับค่าสถานะการยกเลิก
-- =============================================
ALTER procedure [dbo].[sp_sexGetListStudentCategory]
(
	@cancelledStatus varchar(1) = null
)
as
begin
	set concat_null_yields_null off

	set @cancelledStatus = ltrim(rtrim(isnull(@cancelledStatus, ''))) 

	select	 sexsct.id,
			 sexsct.studentCategoryNameTH,
			 sexsct.studentCategoryNameEN,
			 sexsct.specify,
			 sexsct.cancelledStatus
	from	 Bermuda..sexStudentCategory as sexsct with(nolock)
	where	 (len(@cancelledStatus) = 0 or sexsct.cancelledStatus = @cancelledStatus)
	order by sexsct.id
end