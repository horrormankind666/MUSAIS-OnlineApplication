/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๖/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลเพศ>
=============================================
*/

using System.Data;

namespace API.Models {
	public class Gender {
		public static DataSet GetListData(
			string keyword,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
			StudentService.StudentService ss = new StudentService.StudentService();
			DataSet ds = ss.GetListGender(iUtil.infinityConnectionString, keyword, cancelledStatus, sortOrderBy, sortExpression);

			return ds;
		}
	}
}