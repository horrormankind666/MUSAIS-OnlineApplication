/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๐/๐๗/๒๕๖๑>
Modify date : <๑๐/๐๗/๒๕๖๑>
Description : <โมเดลข้อมูลสถานภาพทางการสมรส>
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
    public class MaritalStatus
    {
        public static DataSet GetListData(
            string keyword,
            string cancelledStatus,
            string sortOrderBy,
            string sortExpression
        )
        {
            StudentService.StudentService ss = new StudentService.StudentService();
            DataSet ds = ss.GetListMaritalStatus(iUtil.infinityConnectionString, keyword, cancelledStatus, sortOrderBy, sortExpression);

            return ds;
        }
    }
}