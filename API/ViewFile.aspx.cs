using System;

namespace API
{
	public partial class ViewFile : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
    {
			string fileName = Request.QueryString["f"];

			iUtil.ViewFile((Server.MapPath("~").Replace("API", "").Replace("Publish", "") + iUtil.fileUploadPath), fileName);
    }
	}
}