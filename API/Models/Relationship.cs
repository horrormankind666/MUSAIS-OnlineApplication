/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๗/๒๕๖๑>
Modify date : <๑๑/๐๗/๒๕๖๑>
Description : <โมเดลข้อมูลความสัมพันธ์ในครอบครัว>
=============================================
*/

using System.Data;

namespace API.Models {
	public class Relationship {
		public static DataSet GetListData(
			string keyword,
			string gender,
			string relationship,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
			StudentService.StudentService ss = new StudentService.StudentService();
			DataSet ds = ss.GetListRelationship(iUtil.infinityConnectionString, keyword, gender, relationship, cancelledStatus, sortOrderBy, sortExpression);

			return ds;
		}
	}
}