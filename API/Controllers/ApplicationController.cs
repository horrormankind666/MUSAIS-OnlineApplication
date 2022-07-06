/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๐๖/๒๕๖๑>
Modify date : <๑๕/๐๘/๒๕๖๑>
Description : <คอนโทลเลอร์ข้อมูลใบสมัคร>
=============================================
*/

using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using API.Models;

namespace API.Controllers {
	[RoutePrefix("Application")]
	public class ApplicationController: ApiController {
		public dynamic GetJSONFromRequest() {
			string content = Request.Content.ReadAsStringAsync().Result;
			dynamic json = JsonConvert.DeserializeObject<dynamic>(content);

			return json;
		}

		[Route("GetData")]
		[HttpGet]
		public HttpResponseMessage GetData(string package = "") {
			StudentService.StudentService ss = new StudentService.StudentService();
			string cookieValue = String.Empty;
			string[] packageDecode = null;
			string applicationId = String.Empty;
			string userId = String.Empty;
			string verifyCode = String.Empty;

			if (!String.IsNullOrEmpty(package)) {
				try {
					packageDecode = ss.DecodeBase64String(package).Split('.');
					cookieValue = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));

					if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
						applicationId = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
						userId = ss.DecodeBase64String(ss.StringReverse(packageDecode[2]));
						verifyCode = ss.DecodeBase64String(ss.StringReverse(packageDecode[3]));
					}
				}
				catch {
				}
			}

			DataTable dt = API.Models.Application.GetData(applicationId, userId, verifyCode).Tables[0];

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}

		[Route("PostData")]
		[HttpPost]
		public HttpResponseMessage PostData() {
			DataTable dt = new DataTable();

			try {
				List<Application> list = GetJSONFromRequest().data.ToObject<List<Application>>();
				dt = Application.SetData("POST", list).Tables[0];
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
				List<Application> list = GetJSONFromRequest().data.ToObject<List<Application>>();
				dt = Application.SetData("PUT", list).Tables[0];
			}
			catch {
			}

			return Request.CreateResponse(HttpStatusCode.OK, iUtil.APIResponse.GetData(dt));
		}
	}
}
