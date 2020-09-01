/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๑>
Modify date : <๐๓/๐๗/๒๕๖๑>
Description : <โมเดลข้อมูลประเภ่ทของนักศึกษาแลกเปลี่ยน>
=============================================
*/

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace API.Models
{
    public class StudentCategory
    {
        public static DataSet GetListData(string cancelledStatus)
        {
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexGetListStudentCategory",
                new SqlParameter("@cancelledStatus", cancelledStatus));

            return ds;
        }
    }
}