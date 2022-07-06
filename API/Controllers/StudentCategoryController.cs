/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๓/๐๗/๒๕๖๑>
Modify date : <๐๓/๐๗/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลประเภ่ทของนักศึกษาแลกเปลี่ยน>
=============================================
*/

using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;

namespace API.Controllers {
	[RoutePrefix("StudentCategory")]
	public class StudentCategoryController: ApiController {
		[Route("GetListData")]
		[HttpGet]
		public HttpResponseMessage GetListData(string cancelledStatus = "") {
			DataTable dt = StudentCategory.GetListData(cancelledStatus).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}
	}
}
