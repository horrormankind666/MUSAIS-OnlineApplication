/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๐๘/๐๔/๒๕๖๕>
Description : <รวบรวมคลาสและฟังก์ชั่นสำหรับใช้งานทั่วไป>
=============================================
*/

using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace API {
	public class iUtil {
		public class APIResponse {
			public bool status { 
				get; 
				set;
			}

			public object data { 
				get; 
				set;
			}

			public string message {
				get;
				set;
			}

			public APIResponse(
				bool status = true,
				string message = null
			) {
				this.status = status;
				this.message = (!status ? message : null);
			}

			public static APIResponse GetData(DataTable dt) {
				APIResponse obj = null;

				try {
					obj = new APIResponse {
						data = dt
					};
				}
				catch (Exception ex) {
					obj = new APIResponse(false, ex.Message);
				}

				return obj;
			}
		}

		public static string infinityConnectionString = ConfigurationManager.ConnectionStrings["infinityConnectionString"].ConnectionString;
		public static string bermudaConnectionString = ConfigurationManager.ConnectionStrings["bermudaConnectionString"].ConnectionString;
		public static string cookieName = "ExchangeStudentCookie";
		/*
		public static string fileUploadPath = "GUI/FileUpload";
		*/
		public static string fileUploadPath = "OnlineApplication/FileUpload";

		public static SqlConnection ConnectDB(string connString) {
			SqlConnection conn = new SqlConnection(connString);

			return conn;
		}

		public static DataSet ExecuteCommandStoredProcedure(
			string connString,
			string spName,
			params SqlParameter[] values
		) {
			SqlConnection conn = ConnectDB(connString);
			SqlCommand cmd = new SqlCommand(spName, conn);
			DataSet ds = new DataSet();

			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 1000;

			if (values != null && values.Length > 0)
				cmd.Parameters.AddRange(values);

			try {
				conn.Open();

				SqlDataAdapter da = new SqlDataAdapter(cmd);

				ds = new DataSet();
				da.Fill(ds);
			}
			finally {
				cmd.Dispose();
                    
				conn.Close();
				conn.Dispose();
			}

			return ds;
		}

		public static bool CompareCookie(
			string cookieName,
			string cookieSource
		) {
			StudentService.StudentService ss = new StudentService.StudentService();        
			string cookieValue = ss.ConvertAsciiToString(HttpContext.Current.Request.Cookies[cookieName].Value.ToString());

			cookieValue = cookieValue.Replace("key", "");
			cookieValue = cookieValue.Replace("{", "");
			cookieValue = cookieValue.Replace("}", "");
			cookieValue = cookieValue.Replace(":", "");
			cookieValue = cookieValue.Replace("\"", "");

			return (cookieSource.Equals(cookieValue) ? true : false);
		}

		public static void ViewFile(
			string filePath,
			string fileName
		) {
			bool fileExist = File.Exists(filePath + "/" + fileName);
			StudentService.StudentService ss = new StudentService.StudentService();

			fileName = (fileExist.Equals(true) ? fileName : "NoFile.png");

			try {
				if (!String.IsNullOrEmpty(fileName)) {
					string[] viewFileArray = fileName.Split('.');
					string fileExtension = viewFileArray[viewFileArray.GetLength(0) - 1];

					FileStream sourceFile = new FileStream((filePath + "/" + fileName), FileMode.Open);
					float fileSize = sourceFile.Length;
					byte[] getContent = new byte[(int)fileSize];
					sourceFile.Read(getContent, 0, (int)fileSize);
					sourceFile.Close();

					HttpContext.Current.Response.ClearContent();
					HttpContext.Current.Response.ClearHeaders();
					HttpContext.Current.Response.Buffer = true;
					HttpContext.Current.Response.ContentType = ss.GetHeaderContentType(fileExtension.ToLower());
					HttpContext.Current.Response.AddHeader("Content-Length", getContent.Length.ToString());
					HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" + fileName);
					HttpContext.Current.Response.BinaryWrite(getContent);
					HttpContext.Current.Response.Flush();
					HttpContext.Current.Response.End();
				}
			}
			catch {
			}
		}

		public static string GetIP() {
			string ip = String.Empty;

			if (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
				ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
			else
				if (!String.IsNullOrWhiteSpace(HttpContext.Current.Request.UserHostAddress))
					ip = HttpContext.Current.Request.UserHostAddress;

			if (ip == "::1")
				ip = "127.0.0.1";

			return ip;
		}

		public static void SendMail(
			string receiver,
			string subject,
			string body
		) {
			string sender = "musais@mahidol.ac.th";
			string password = "kalalandforever";

			MailMessage mail = new MailMessage(sender, receiver);
			SmtpClient smtp = new SmtpClient();

			smtp.Host = "mumail.mahidol.ac.th";
			smtp.Port = 587;
			smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
			smtp.UseDefaultCredentials = false;
			smtp.Credentials = new NetworkCredential(sender, password);

			mail.From = new MailAddress(sender);
			mail.Subject = subject;
			mail.IsBodyHtml = true;
			mail.Body = body;

			smtp.Send(mail);
		}
	}
}