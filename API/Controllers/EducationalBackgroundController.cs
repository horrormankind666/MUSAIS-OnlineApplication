/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๒/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลวุฒิการศึกษา>
=============================================
*/

using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;

namespace API.Controllers {
	[RoutePrefix("EducationalBackground")]
	public class EducationalBackgroundController: ApiController {
		[Route("GetListData")]
		[HttpGet]
		public HttpResponseMessage GetListData(
			string keyword = "",
			string educationalLevel = "",
			string cancelledStatus = "",
			string sortOrderBy = "",
			string sortExpression = ""
		) {
			DataTable dt = EducationalBackground.GetListData(keyword, educationalLevel, cancelledStatus, sortOrderBy, sortExpression).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}
	}
}
