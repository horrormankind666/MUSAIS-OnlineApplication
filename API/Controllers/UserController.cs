/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๘/๐๖/๒๕๖๑>
Modify date : <๐๙/๐๙/๒๕๖๓>
Description : <คอนโทลเลอร์ข้อมูลผู้ใช้งาน>
=============================================
*/

using System;
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
			StudentService.StudentService ss = new StudentService.StudentService();
			string[] packageDecode = null;
			string[] packageOldDecode = null;
			string userId = String.Empty;
			string username = String.Empty;
			string password = String.Empty;

			try {
				if (!String.IsNullOrEmpty(package)) {
					packageDecode = ss.DecodeBase64String(package).Split('.');
					username = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));
					password = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
				}

				if (!String.IsNullOrEmpty(packageOld)) {
					packageOldDecode = ss.DecodeBase64String(packageOld).Split('.');
					userId = ss.DecodeBase64String(ss.StringReverse(packageOldDecode[0]));
					username = ss.DecodeBase64String(ss.StringReverse(packageOldDecode[1]));
					password = ss.DecodeBase64String(ss.StringReverse(packageOldDecode[2]));
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
			StudentService.StudentService ss = new StudentService.StudentService();
			string[] packageDecode = null;
			string action = String.Empty;
			string userId = String.Empty;
			string username = String.Empty;
			string password = String.Empty;
			string verifyCode = String.Empty;

			if (!String.IsNullOrEmpty(package)) {
				try {
					packageDecode = ss.DecodeBase64String(package).Split('.');
					action = ss.DecodeBase64String(ss.StringReverse(packageDecode[packageDecode.GetLength(0) - 1]));

					if (action.Equals("signin")) {
						username = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));
						password = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
					}

					if (action.Equals("info")) {
						userId = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));
						verifyCode = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
					}

					if (action.Equals("requestPassword")) {
						username = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));
						verifyCode = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
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
			StudentService.StudentService ss = new StudentService.StudentService();
			string[] packageDecode = null;
			string cookieValue = String.Empty;
			string userId = String.Empty;
			string termServiceType = String.Empty;

			if (!String.IsNullOrEmpty(package)) {
				try {
					packageDecode = ss.DecodeBase64String(package).Split('.');
					cookieValue = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));

					if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
						userId = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
						termServiceType = ss.DecodeBase64String(ss.StringReverse(packageDecode[2]));
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
			string userId = String.Empty;
			string termServiceType = String.Empty;
			StringBuilder xmlData = new StringBuilder();

			try {
				dynamic json = GetJSONFromRequest();
				string package = json["package"];			
				
				StudentService.StudentService ss = new StudentService.StudentService();
				string[] packageDecode = null;
				string cookieValue = String.Empty;

				if (!String.IsNullOrEmpty(package)) {
					packageDecode = ss.DecodeBase64String(package).Split('.');
					cookieValue = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));
					
					if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
						userId = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
						termServiceType = ss.DecodeBase64String(ss.StringReverse(packageDecode[2]));
					}
				}
			}
			catch {
			}

			if (!String.IsNullOrEmpty(userId) && !String.IsNullOrEmpty(termServiceType)) {
				xmlData.AppendFormat(
					"<table>" +
					"<row>" +
					"<studentId>{0}</studentId>" +
					"<termType>{1}</termType>" +
					"<termStatus>Y</termStatus>" +
					"<ip>{2}</ip>" +
					"<createdBy>{3}</createdBy>" +
					"</row>" +
					"</table>", userId, termServiceType, iUtil.GetIP(), userId
				);
			}

			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.infinityConnectionString, "sp_stdSetStudentTermService",
				new SqlParameter("@xmlData", (!String.IsNullOrEmpty(xmlData.ToString()) ? xmlData.ToString() : null))
			);

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(ds.Tables[0]));
		}
	}
}
