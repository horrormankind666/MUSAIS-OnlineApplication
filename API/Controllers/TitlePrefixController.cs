/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๖/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลคำนำหน้าชื่อ>
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
using API.Models;

namespace API.Controllers
{
    [RoutePrefix("TitlePrefix")]
    public class TitlePrefixController : ApiController
    {
        [Route("GetListData")]
        [HttpGet]
        public HttpResponseMessage GetListData(
            string keyword = "",
            string gender = "",
            string cancelledStatus = "",
            string sortOrderBy = "",
            string sortExpression = ""
        )
        {
            DataTable dt = TitlePrefix.GetListData(keyword, gender, cancelledStatus, sortOrderBy, sortExpression).Tables[0];

            return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
        }
    }
}
