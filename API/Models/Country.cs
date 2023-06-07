/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <คอนโทลเลอร์ข้อมูลประเทศ>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class Country {
		public static DataSet GetListData(
			string keyword,
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_plcGetListCountry",
                new SqlParameter("@keyword", keyword),
                new SqlParameter("@cancelledStatus", cancelledStatus),
                new SqlParameter("@sortOrderBy", sortOrderBy),
                new SqlParameter("@sortExpression", sortExpression)
			);

            return ds;
		}
	}
}