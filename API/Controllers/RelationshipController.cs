/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๗/๒๕๖๑>
Modify date : <๑๑/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลความสัมพันธ์ในครอบครัว>
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
    [RoutePrefix("Relationship")]
    public class RelationshipController : ApiController
    {
        [Route("GetListData")]
        [HttpGet]
        public HttpResponseMessage GetListData(
            string keyword = "",
            string gender = "",
            string relationship = "",
            string cancelledStatus = "",
            string sortOrderBy = "",
            string sortExpression = ""
        )
        {
            DataTable dt = Relationship.GetListData(keyword, gender, relationship, cancelledStatus, sortOrderBy, sortExpression).Tables[0];

            return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
        }
    }
}
