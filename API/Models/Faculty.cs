/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๕/๐๖/๒๕๖๑>
Modify date : <๐๕/๐๖/๒๕๖๑>
Description : <โมเดลข้อมูลคณะ>
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
    public class Faculty
    {
        public static DataSet GetListData()
        {
            DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_acaGetListFaculty",
                new SqlParameter("@uId", "U0001"));

            return ds;
        }
    }
}