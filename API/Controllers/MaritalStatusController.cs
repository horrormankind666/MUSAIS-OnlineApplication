/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๐/๐๗/๒๕๖๑>
Modify date : <๑๐/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลสถานภาพทางการสมรส>
=============================================
*/

using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;

namespace API.Controllers {
	[RoutePrefix("MaritalStatus")]
	public class MaritalStatusController: ApiController {
		[Route("GetListData")]
		[HttpGet]
		public HttpResponseMessage GetListData(
			string keyword = "",
			string cancelledStatus = "",
			string sortOrderBy = "",
			string sortExpression = ""
		) {
			DataTable dt = MaritalStatus.GetListData(keyword, cancelledStatus, sortOrderBy, sortExpression).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}
	}
}
