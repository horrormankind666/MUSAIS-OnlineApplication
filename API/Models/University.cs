/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๐๗/๒๕๖๑>
Modify date : <๐๔/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลมหาวิทยาลัย>
=============================================
*/

using System.Data;

namespace API.Models {
	public class University {
		public static DataSet GetListData(
			string keyword,
			string country,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
			StudentService.StudentService ss = new StudentService.StudentService();
			DataSet ds = ss.GetListUniversity(iUtil.infinityConnectionString, keyword, country, cancelledStatus, sortOrderBy, sortExpression);

			return ds;
		}
	}
}