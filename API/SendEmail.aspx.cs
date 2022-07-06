using System;
using System.Web.UI;

namespace API {
    public partial class SendEmail: Page {
        protected void Page_Load(
			object sender,
			EventArgs e
		) {
			string username = "lynmf.22@gmail.com";
			string password = "Esteesnuestrosue�o.";
			string link = "https://musais.mahidol.ac.th/OnlineApplication/#/ActivateAccount/2764/HdPkCpFRCELoQOotmlpFYuM7N5tb678n";
			string mailMessage =
				"Hi, GirlAILYN ANGELICA MARQUEZ<br /><br />" +
				"Your account<br />" +
				"Username : <strong>" + username + "</strong><br />" +
				"Password : <strong>" + password + "</strong><br /><br />" +
				"Before you can signin, you first need to activate your account. To do so, please follow this link.<br />" +
				"<a href='" + link + "'>" + link + "</a>" +
				"<br /><br />Regards,<br />Mahidol University Student, Academic and International Services ( MUSAIS )<br />Email : musais@mahidol.ac.th";

			iUtil.SendMail(username, "MUSAIS : Verify Account", mailMessage);

			Response.Write(mailMessage);
        }
    }
}