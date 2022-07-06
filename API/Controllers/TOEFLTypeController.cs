/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๒/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูล TOEFL Type>
=============================================
*/

using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;

namespace API.Controllers {
	[RoutePrefix("TOEFLType")]
	public class TOEFLTypeController: ApiController {
		[Route("GetListData")]
		[HttpGet]
		public HttpResponseMessage GetListData(string cancelledStatus = "") {
			DataTable dt = TOEFLType.GetListData(cancelledStatus).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}
	}
}
