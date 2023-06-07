/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๐/๐๗/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <โมเดลข้อมูลสถานภาพทางการสมรส>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class MaritalStatus {
		public static DataSet GetListData(
			string keyword,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_perGetListMaritalStatus",
                new SqlParameter("@keyword", keyword),
                new SqlParameter("@cancelledStatus", cancelledStatus),
                new SqlParameter("@sortOrderBy", sortOrderBy),
                new SqlParameter("@sortExpression", sortExpression)
			);

            return ds;
		}
	}
}