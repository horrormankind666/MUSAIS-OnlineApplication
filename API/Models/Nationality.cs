/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖๖>
Description : <คอนโทลเลอร์ข้อมูลสัญชาติและเชื้อชาติ>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class Nationality {
		public static DataSet GetListData(
			string keyword,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_perGetListNationality",
				new SqlParameter("@keyword", keyword),
				new SqlParameter("@cancelledStatus", cancelledStatus),
				new SqlParameter("@sortOrderBy", sortOrderBy),
				new SqlParameter("@sortExpression", sortExpression)
			);

            return ds;
		}
	}
}