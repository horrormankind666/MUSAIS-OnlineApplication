/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๐๗/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <คอนโทลเลอร์ข้อมูลมหาวิทยาลัย>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class University {
		public static DataSet GetListData(
			string keyword,
			string country,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_plcGetListUniversity",
                new SqlParameter("@keyword", keyword),
                new SqlParameter("@country", country),
                new SqlParameter("@cancelledStatus", cancelledStatus),
                new SqlParameter("@sortOrderBy", sortOrderBy),
                new SqlParameter("@sortExpression", sortExpression)
			);

            return ds;
		}
	}
}