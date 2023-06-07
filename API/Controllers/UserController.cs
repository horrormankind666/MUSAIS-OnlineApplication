/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๘/๐๖/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <คอนโทลเลอร์ข้อมูลผู้ใช้งาน>
=============================================
*/

using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Newtonsoft.Json;
using API.Models;

namespace API.Controllers {
	[RoutePrefix("User")]
	public class UserController: ApiController {
		public dynamic GetJSONFromRequest() {
			string content = Request.Content.ReadAsStringAsync().Result;
			dynamic json = JsonConvert.DeserializeObject<dynamic>(content);

			return json;
		}

		[Route("GetExist")]
		[HttpGet]
		public HttpResponseMessage GetExist(
			string package = "",
			string packageOld = "",
			string verifyCode = ""
		) {
			string userId = string.Empty;
			string username = string.Empty;
			string password = string.Empty;

			try {
				if (!string.IsNullOrEmpty(package)) {
                    string[] packageDecode = iUtil.DecodeBase64String(package).Split('.');

					username = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));
					password = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
				}

				if (!string.IsNullOrEmpty(packageOld)) {
                    string[] packageOldDecode = iUtil.DecodeBase64String(packageOld).Split('.');

					userId = iUtil.DecodeBase64String(iUtil.StringReverse(packageOldDecode[0]));
					username = iUtil.DecodeBase64String(iUtil.StringReverse(packageOldDecode[1]));
					password = iUtil.DecodeBase64String(iUtil.StringReverse(packageOldDecode[2]));
				}
			}
			catch {
			}

			DataTable dt = API.Models.User.GetExist(userId, username, password, verifyCode).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}

		[Route("GetData")]
		[HttpGet]
		public HttpResponseMessage GetData(
			string package = "",
			string sendEmailStatus = "",
			string email = ""
		) {
			string userId = string.Empty;
			string username = string.Empty;
			string password = string.Empty;
			string verifyCode = string.Empty;

			if (!string.IsNullOrEmpty(package)) {
				try {
                    string[] packageDecode = iUtil.DecodeBase64String(package).Split('.');
					string action = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[packageDecode.GetLength(0) - 1]));

					if (action.Equals("signin")) {
						username = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));
						password = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
					}

					if (action.Equals("info")) {
						userId = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));
						verifyCode = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
					}

					if (action.Equals("requestPassword")) {
						username = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));
						verifyCode = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
					}
				}
				catch {
				}
			}

			DataTable dt = API.Models.User.GetData(userId, username, password, verifyCode, sendEmailStatus, email).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));			
		}

		[Route("PostData")]
		[HttpPost]
		public HttpResponseMessage PostData() {
			DataTable dt = new DataTable();

			try {
				List<User> list = GetJSONFromRequest().data.ToObject<List<User>>();
				dt = API.Models.User.SetData("POST", list).Tables[0];
			}
			catch {
			}

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}

		[Route("PutData")]
		[HttpPut]
		public HttpResponseMessage PutData() {
			DataTable dt = new DataTable();

			try {
				List<User> list = GetJSONFromRequest().data.ToObject<List<User>>();
				dt = API.Models.User.SetData("PUT", list).Tables[0];
			}
			catch {
			}

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}

		[Route("GetTermServiceConsent")]
		[HttpGet]
		public HttpResponseMessage GetTermServiceConsent(string package = "") {
			string userId = string.Empty;
			string termServiceType = string.Empty;

			if (!string.IsNullOrEmpty(package)) {
				try {
                    string[] packageDecode = iUtil.DecodeBase64String(package).Split('.');
                    string cookieValue = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));

					if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
						userId = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
						termServiceType = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[2]));
					}
				}
				catch {
				}
			}

			DataTable dt = API.Models.User.GetTermServiceConsent(userId, termServiceType).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}

		[Route("SetTermServiceConsent")]
		[HttpPost]
		public HttpResponseMessage SetTermServiceConsent() {
			string userId = string.Empty;
			string termServiceType = string.Empty;
			StringBuilder xmlData = new StringBuilder();

			try {
				dynamic json = GetJSONFromRequest();
				string package = json["package"];			

				if (!string.IsNullOrEmpty(package)) {
                    string[] packageDecode = iUtil.DecodeBase64String(package).Split('.');
                    string cookieValue = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));
					
					if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
						userId = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
						termServiceType = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[2]));
					}
				}
			}
			catch {
			}

			if (!string.IsNullOrEmpty(userId) &&
				!string.IsNullOrEmpty(termServiceType)) {
				xmlData.AppendFormat(
					"<table>" +
					"<row>" +
					"<studentId>{0}</studentId>" +
					"<termType>{1}</termType>" +
					"<termStatus>Y</termStatus>" +
					"<ip>{2}</ip>" +
					"<createdBy>{3}</createdBy>" +
					"</row>" +
					"</table>",
					userId,
					termServiceType,
					iUtil.GetIP(),
					userId
				);
			}

			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_stdSetStudentTermService",
				new SqlParameter("@xmlData", (!string.IsNullOrEmpty(xmlData.ToString()) ? xmlData.ToString() : null))
			);

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(ds.Tables[0]));
		}
	}
}
