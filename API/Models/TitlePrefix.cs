/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๖/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลคำนำหน้าชื่อ>
=============================================
*/

using System.Data;

namespace API.Models {
	public class TitlePrefix {
		public static DataSet GetListData(
			string keyword,
			string gender,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
			StudentService.StudentService ss = new StudentService.StudentService();            
			DataSet ds = ss.GetListTitlePrefix(iUtil.infinityConnectionString, keyword, gender, cancelledStatus, sortOrderBy, sortExpression);

			return ds;
		}
	}
}