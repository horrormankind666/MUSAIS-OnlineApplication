/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๑๘/๐๖/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลสัญชาติและเชื้อชาติ>
=============================================
*/

using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;

namespace API.Controllers {
	[RoutePrefix("Nationality")]
	public class NationalityController: ApiController {
		[Route("GetListData")]
		[HttpGet]
		public HttpResponseMessage GetListData(
			string keyword = "",
			string cancelledStatus = "",
			string sortOrderBy = "",
			string sortExpression = ""
		) {
			DataTable dt = Nationality.GetListData(keyword, cancelledStatus, sortOrderBy, sortExpression).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}
	}
}
