/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๗/๒๕๖๑>
Modify date : <๑๘/๐๙/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูล Year of Study>
=============================================
*/

using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers {
	[RoutePrefix("YearStudy")]
	public class YearStudyController: ApiController {
		[Route("GetListData")]
		[HttpGet]
		public HttpResponseMessage GetListData() {
			StudentService.StudentService ss = new StudentService.StudentService();
			DataTable dt = new DataTable();
			int i = 1;

			dt.Columns.Add("id");
			dt.Columns.Add("name");

			for (i = 1; i <= 8; i++) {
				DataRow dr = dt.NewRow();

				dr["id"]    = i.ToString();
				dr["name"]  = (i.ToString() + ss.GetOrdinal(i.ToString()));

				dt.Rows.Add(dr);
			}

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}
	}
}
