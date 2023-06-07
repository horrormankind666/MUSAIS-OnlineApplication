/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <โมเดลข้อมูลวุฒิการศึกษา>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class EducationalBackground {
		public static DataSet GetListData(
			string keyword,
			string educationalLevel,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_perGetListEducationalBackground",
                new SqlParameter("@keyword", keyword),
                new SqlParameter("@educationalLevel", educationalLevel),
                new SqlParameter("@cancelledStatus", cancelledStatus),
                new SqlParameter("@sortOrderBy", sortOrderBy),
                new SqlParameter("@sortExpression", sortExpression)
			);

            return ds;
		}
	}
}