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
			bool status;			
           
			try {
                string[] packageDecode = iUtil.DecodeBase64String(package).Split('.');
				string cookieValue = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));
				string userId = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
				string applicationId = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[2]));

				if (iUtil.CompareCookie(iUtil.cookieName, cookieValue)) {
					FileInfo f = new FileInfo(Request.Files[0].FileName);

					fileName = (applicationId + what + fileName + f.Extension.ToLower());
					string saveFile = (Server.MapPath("~").Replace("API", "").Replace("Publish", "") + iUtil.fileUploadPath + "/" + fileName);

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

            Dictionary<string, object> result = new Dictionary<string, object> {
                { "status", status },
                { "fileName", fileName }
            };

            Response.Write(new JavaScriptSerializer().Serialize(result));
		}
	}
}