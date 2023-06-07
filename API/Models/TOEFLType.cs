/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <โมเดลข้อมูล TOEFL Type>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class TOEFLType {
		public static DataSet GetListData(string cancelledStatus) {
			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexGetListTOEFLType",
				new SqlParameter("@cancelledStatus", cancelledStatus)
			);

			return ds;
		}
	}
}