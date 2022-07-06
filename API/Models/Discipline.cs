/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๒/๐๗/๒๕๖๑>
Description : <โมเดลข้อมูล Discipline>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class Discipline {
		public static DataSet GetListData(
			string cancelledStatus,
			string sortOrderBy,
			string sortExpression
		) {
			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexGetListDiscipline",
				new SqlParameter("@cancelledStatus", cancelledStatus),
				new SqlParameter("@sortOrderBy", sortOrderBy),
				new SqlParameter("@sortExpression", sortExpression));

			return ds;
		}
	}
}