/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๒/๐๗/๒๕๖๑>
Description : <โมเดลข้อมูลวุฒิการศึกษา>
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
    public class EducationalBackground
    {
        public static DataSet GetListData(
            string keyword,
            string educationalLevel,
            string cancelledStatus,
            string sortOrderBy,
            string sortExpression
        )
        {
            StudentService.StudentService ss = new StudentService.StudentService();
            DataSet ds = ss.GetListEducationalBackground(iUtil.infinityConnectionString, keyword, educationalLevel, cancelledStatus, sortOrderBy, sortExpression);

            return ds;
        }
    }
}