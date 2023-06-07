/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๗/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <โมเดลข้อมูลความสัมพันธ์ในครอบครัว>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

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
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_perGetListRelationship",
                new SqlParameter("@keyword", keyword),
                new SqlParameter("@gender", gender),
                new SqlParameter("@relationship", relationship),
                new SqlParameter("@cancelledStatus", cancelledStatus),
                new SqlParameter("@sortOrderBy", sortOrderBy),
                new SqlParameter("@sortExpression", sortExpression)
			);

            return ds;
		}
	}
}