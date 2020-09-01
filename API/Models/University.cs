/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๐๗/๒๕๖๑>
Modify date : <๐๔/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลมหาวิทยาลัย>
=============================================
*/

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace API.Models
{
    public class University
    {
        public static DataSet GetListData(
            string keyword,
            string country,
            string cancelledStatus,
            string sortOrderBy,
            string sortExpression
        )
        {
            StudentService.StudentService ss = new StudentService.StudentService();
            DataSet ds = ss.GetListUniversity(iUtil.infinityConnectionString, keyword, country, cancelledStatus, sortOrderBy, sortExpression);

            return ds;
        }
    }
}