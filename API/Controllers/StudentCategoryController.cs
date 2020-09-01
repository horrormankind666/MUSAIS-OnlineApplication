/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๑>
Modify date : <๐๓/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลประเภ่ทของนักศึกษาแลกเปลี่ยน>
=============================================
*/

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using API.Models;

namespace API.Controllers
{
    [RoutePrefix("StudentCategory")]
    public class StudentCategoryController : ApiController
    {
        [Route("GetListData")]
        [HttpGet]
        public HttpResponseMessage GetListData(string cancelledStatus = "")
        {
            DataTable dt = StudentCategory.GetListData(cancelledStatus).Tables[0];

            return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
        }
    }
}
