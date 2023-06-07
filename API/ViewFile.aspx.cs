using System;
using System.IO;
using System.Web;
using System.Web.UI;

namespace API {
	public partial class ViewFile: Page {
		protected void Page_Load(
			object sender,
			EventArgs e
		) {
			string fileName = Request.QueryString["f"];

            iUtil.ViewFile((Server.MapPath("~").Replace("API", "").Replace("Publish", "") + iUtil.fileUploadPath), fileName);
        }
	}
}