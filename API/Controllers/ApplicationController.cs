/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๐๖/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <คอนโทลเลอร์ข้อมูลใบสมัคร>
=============================================
*/

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
			string applicationID = string.Empty;
			string userID = string.Empty;
			string verifyCode = string.Empty;

			if (!string.IsNullOrEmpty(package)) {
				try {
                    string[] packageDecode = iUtil.DecodeBase64String(package).Split('.');
					string cookieValue = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));

					if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
						applicationID = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
						userID = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[2]));
						verifyCode = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[3]));
					}
				}
				catch {
				}
			}

			DataTable dt = Application.GetData(applicationID, userID, verifyCode).Tables[0];

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
