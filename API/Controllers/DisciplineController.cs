/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๒/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูล Discipline>
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
    [RoutePrefix("Discipline")]
    public class DisciplineController : ApiController
    {
        [Route("GetListData")]
        [HttpGet]
        public HttpResponseMessage GetListData(
            string cancelledStatus = "",
            string sortOrderBy = "",
            string sortExpression = ""
        )
        {
            DataTable dt = Discipline.GetListData(cancelledStatus, sortOrderBy, sortExpression).Tables[0];

            return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
        }
    }
}
