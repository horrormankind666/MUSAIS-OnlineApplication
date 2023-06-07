/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๕/๐๖/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <โมเดลข้อมูลคณะ>
=============================================
*/

using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class Faculty {
		public static DataSet GetListData() {
			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_acaGetListFaculty",
				new SqlParameter("@uId", "U0001")
			);

			return ds;
		}
	}
}