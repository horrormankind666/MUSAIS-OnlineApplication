/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <คอนโทลเลอร์ข้อมูลคำนำหน้าชื่อ>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class TitlePrefix {
		public static DataSet GetListData(
			string keyword,
			string gender,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_perGetListTitlePrefix",
                new SqlParameter("@keyword", keyword),
                new SqlParameter("@gender", gender),
                new SqlParameter("@cancelledStatus", cancelledStatus),
                new SqlParameter("@sortOrderBy", sortOrderBy),
                new SqlParameter("@sortExpression", sortExpression)
			);

            return ds;
		}
	}
}