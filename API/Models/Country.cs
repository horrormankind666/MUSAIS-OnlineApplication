/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๖/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลประเทศ>
=============================================
*/

using System.Data;

namespace API.Models {
	public class Country {
		public static DataSet GetListData(
			string keyword,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
			StudentService.StudentService ss = new StudentService.StudentService();
			DataSet ds = ss.GetListCountry(iUtil.infinityConnectionString, keyword, cancelledStatus, sortOrderBy, sortExpression);

			return ds;
		}
	}
}