/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๕/๐๗/๒๕๖๑>
Modify date : <๐๕/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลคณะ>
=============================================
*/

using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;

namespace API.Controllers {
	[RoutePrefix("Faculty")]
	public class FacultyController: ApiController {
		[Route("GetListData")]
		[HttpGet]
		public HttpResponseMessage GetListData() {
			DataTable dt = Faculty.GetListData().Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}
	}
}
