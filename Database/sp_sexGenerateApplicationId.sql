USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexGenerateApplicationId]    Script Date: 12/7/2564 11:27:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๒๗/๐๖/๒๕๖๑>
-- Description	: <สำหรับสร้างรหัสให้กับตาราง sexApplication>
-- Parameter
--  1. applicationId	เป็น varchar ส่งค่ารหัสใบสมัคร
-- =============================================
ALTER procedure [dbo].[sp_sexGenerateApplicationId]
(
	@applicationId varchar(10) output
)
as
begin
	set concat_null_yields_null off
	
	declare @year int = null
	declare @seq int = null

	set @year = year(getdate())
	set @seq = (select max(seqApplication) as seq from sexApplicationIdLog where yearApplication = @year group by yearApplication)

	if (@seq is null) set @seq = 0

	insert into sexApplicationIdLog (yearApplication, seqApplication) values (@year, @seq + 1)	
	
	set @applicationId = (select 'A' + convert(varchar(4), @year) + right('00000' + convert(varchar, (@seq + 1)), 5))
end