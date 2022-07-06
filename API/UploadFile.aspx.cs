using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Web.UI;
using System.Web.Script.Serialization;

namespace API {
	public partial class UploadFile: Page {
		protected void Page_Load(
			object sender,
			EventArgs e
		) {
			string what = Request.QueryString["what"];
			string package = Request.QueryString["package"];
			string fileName = (DateTime.Now).ToString("dd-MM-yyyy@HH-mm-ss", new CultureInfo("en-US"));
			string saveFile = String.Empty;
			string cookieValue = String.Empty;
			string userId = String.Empty;
			string applicationId = String.Empty;
			string verifyCode = String.Empty;
			string[] packageDecode = null;
			bool status = true;            
			Dictionary<string, object> result = new Dictionary<string, object>();
			JavaScriptSerializer json = new JavaScriptSerializer();
			StudentService.StudentService ss = new StudentService.StudentService();
           
			try {
				packageDecode = ss.DecodeBase64String(package).Split('.');
				cookieValue = ss.DecodeBase64String(ss.StringReverse(packageDecode[0]));
				userId = ss.DecodeBase64String(ss.StringReverse(packageDecode[1]));
				applicationId = ss.DecodeBase64String(ss.StringReverse(packageDecode[2]));

				if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
					FileInfo f = new FileInfo(Request.Files[0].FileName);

					fileName = (applicationId + what + fileName + f.Extension.ToLower());
					saveFile = (Server.MapPath("~").Replace("API", "").Replace("Publish", "") + iUtil.fileUploadPath + "/" + fileName);

					Request.Files[0].SaveAs(saveFile);

					status = true;
				}
				else {
					status = false;
				}
			}
			catch {
				status = false;
			}

			result.Add("status", status);
			result.Add("fileName", fileName);

			Response.Write(json.Serialize(result));
		}
	}
}