USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexGetListDiscipline]    Script Date: 12/7/2564 11:27:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๑๑/๐๗/๒๕๖๑>
-- Description	: <สำหรับแสดงข้อมูล Discipline>
-- Parameter
--	1. cancelledStatus	เป็น varchar	รับค่าสถานะการยกเลิก
--  2. sortOrderBy		เป็น varchar	รับค่าคอลัมภ์ที่ต้องการเรียงลำดับ
--  3. sortExpression	เป็น varchar	รับค่าวิธีการเรียงลำดับ
-- =============================================
ALTER procedure [dbo].[sp_sexGetListDiscipline]
(
	@cancelledStatus varchar(1) = null,
	@sortOrderBy varchar(255) = null,
	@sortExpression varchar(255) = null
)
as
begin
	set concat_null_yields_null off

	set @cancelledStatus = ltrim(rtrim(isnull(@cancelledStatus, '')))
	set @sortOrderBy = ltrim(rtrim(isnull(@sortOrderBy, '')))
	set @sortExpression = ltrim(rtrim(isnull(@sortExpression, '')))	

	declare @sort varchar(255) = ''
	
	set @sortOrderBy = (case when (@sortOrderBy is not null and len(@sortOrderBy) > 0) then @sortOrderBy else 'ID' end)
	set @sortExpression = (case when (@sortExpression is not null and len(@sortExpression) > 0) then @sortExpression else 'Ascending' end)
	set @sort = (@sortOrderBy + ' ' + @sortExpression)

	select	row_number() over(order by
				case when @sort = 'ID Ascending'				then sexdcp.id end asc,
				case when @sort = 'Full Name ( TH ) Ascending'	then sexdcp.disciplineNameTH end asc,
				case when @sort = 'Full Name ( EN ) Ascending'	then sexdcp.disciplineNameEN end asc,
				case when @sort = 'Cancelled Status Ascending'	then sexdcp.cancelledStatus end asc,
				case when @sort = 'Create Date Ascending'		then sexdcp.createDate end asc,
				case when @sort = 'Modify Date Ascending'		then sexdcp.modifyDate end asc,
						
				case when @sort = 'ID Descending'				then sexdcp.id end desc,
				case when @sort = 'Full Name ( TH ) Descending'	then sexdcp.disciplineNameTH end desc,
				case when @sort = 'Full Name ( EN ) Descending'	then sexdcp.disciplineNameEN end desc,
				case when @sort = 'Cancelled Status Descending'	then sexdcp.cancelledStatus end desc,
				case when @sort = 'Create Date Descending'		then sexdcp.createDate end desc,
				case when @sort = 'Modify Date Descending'		then sexdcp.modifyDate end desc
			) as rowNum,
			sexdcp.id,
			sexdcp.disciplineNameTH,
			sexdcp.disciplineNameEN,
			sexdcp.cancelledStatus
	from	Bermuda..sexDiscipline as sexdcp with(nolock)
	where	(len(@cancelledStatus) = 0 or sexdcp.cancelledStatus = @cancelledStatus)
end