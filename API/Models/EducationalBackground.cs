/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๒/๐๗/๒๕๖๑>
Description : <โมเดลข้อมูลวุฒิการศึกษา>
=============================================
*/

using System.Data;

namespace API.Models {
	public class EducationalBackground {
		public static DataSet GetListData(
			string keyword,
			string educationalLevel,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
			StudentService.StudentService ss = new StudentService.StudentService();
			DataSet ds = ss.GetListEducationalBackground(iUtil.infinityConnectionString, keyword, educationalLevel, cancelledStatus, sortOrderBy, sortExpression);

			return ds;
		}
	}
}