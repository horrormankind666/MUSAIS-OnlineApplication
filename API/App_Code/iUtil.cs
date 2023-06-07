/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๐๖/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <รวบรวมคลาสและฟังก์ชั่นสำหรับใช้งานทั่วไป>
=============================================
*/

using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
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
                APIResponse obj;

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
			string cookieValue = ConvertAsciiToString(HttpContext.Current.Request.Cookies[cookieName].Value.ToString());

			cookieValue = cookieValue.Replace("key", "");
			cookieValue = cookieValue.Replace("{", "");
			cookieValue = cookieValue.Replace("}", "");
			cookieValue = cookieValue.Replace(":", "");
			cookieValue = cookieValue.Replace("\"", "");

			return (cookieSource.Equals(cookieValue));
		}

		public static void ViewFile(
			string filePath,
			string fileName
		) {
			bool fileExist = File.Exists(filePath + "/" + fileName);

			fileName = (fileExist.Equals(true) ? fileName : "NoFile.png");

            try {
                if (!string.IsNullOrEmpty(fileName)) {
					string[] viewFileArray = fileName.Split('.');
					string fileExtension = viewFileArray[viewFileArray.GetLength(0) - 1];

					FileStream sourceFile = new FileStream((filePath + "/" + fileName), FileMode.Open);
					float fileSize = sourceFile.Length;
					byte[] getContent = new byte[(int)fileSize];
					sourceFile.Read(getContent, 0, (int)sourceFile.Length);
					sourceFile.Close();

					HttpContext.Current.Response.ClearContent();
					HttpContext.Current.Response.ClearHeaders();
					HttpContext.Current.Response.Buffer = true;
					HttpContext.Current.Response.ContentType = GetHeaderContentType(fileExtension.ToLower());
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
			string ip = string.Empty;

			if (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
				ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
			else
				if (!string.IsNullOrWhiteSpace(HttpContext.Current.Request.UserHostAddress))
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
			string password = "Kalaland2022";

			MailMessage mail = new MailMessage(sender, receiver) {
                From = new MailAddress(sender),
				Subject = subject,
				IsBodyHtml = true,
				Body = body
			};
			SmtpClient smtp = new SmtpClient() {
				Host = "mumail.mahidol.ac.th",
				Port = 587,
				DeliveryMethod = SmtpDeliveryMethod.Network,
				UseDefaultCredentials = false,
				Credentials = new NetworkCredential(sender, password)
			};

			smtp.Send(mail);
		}

        public static string DecodeBase64String(string base64String) {
            return Encoding.UTF8.GetString(Convert.FromBase64String(base64String));
        }

		public static string ConvertAsciiToString(string str) {
			string result = str;

			result = result.Replace("%20", " ");
			result = result.Replace("%21", "!");
			result = result.Replace("%22", "\"");
			result = result.Replace("%23", "#");
			result = result.Replace("%24", "$");
			result = result.Replace("%25", "%");
			result = result.Replace("%26", "&");
			result = result.Replace("%27", "'");
			result = result.Replace("%28", "(");
			result = result.Replace("%29", ")");
			result = result.Replace("%2A", "*");
			result = result.Replace("%2B", "+");
			result = result.Replace("%2C", ",");
			result = result.Replace("%2D", "-");
			result = result.Replace("%2E", ".");
			result = result.Replace("%2F", "/");
			result = result.Replace("%3A", ":");
			result = result.Replace("%3B", ";");
			result = result.Replace("%3C", "<");
			result = result.Replace("%3D", "=");
			result = result.Replace("%3E", ">");
			result = result.Replace("%3F", "?");
			result = result.Replace("%5B", "[");
			result = result.Replace("%5C", "\\");
			result = result.Replace("%5D", "]");
			result = result.Replace("%5E", "^");
			result = result.Replace("%5F", "_");
			result = result.Replace("%60", "`");
			result = result.Replace("%7B", "{");
			result = result.Replace("%7C", "|");
			result = result.Replace("%7D", "}");
			result = result.Replace("%7E", "~");

			return result;
		}

		public static string GetHeaderContentType(string fileExtension) {
			switch (fileExtension) {
				case "txt":
                    return "text/plain";
                case "doc":
                    return "application/ms-word";
                case "xls":
				case "xlsx":
                    return "application/vnd.ms-excel";
                case "gif":
                    return "image/gif";
                case "jpg":
                case "jpeg":
                    return "image/jpeg";
				case "png":
                    return "image/png";
                case "bmp":
                    return "image/bmp";
                case "wav":
                    return "audio/wav";
                case "ppt":
                    return "application/mspowerpoint";
                case "dwg":
                    return "image/vnd.dwg";
                case "zip":
                    return "application/zip";
                case "pdf":
                    return "application/pdf";
                default:
                    return "application/octet-stream";
            }
		}

        public static string StringReverse(string str) {
            char[] strArr = str.ToCharArray();
            Array.Reverse(strArr);

            return new string(strArr);
        }

        public static string GetOrdinal(string num) {
            try {
                int number = int.Parse(num);

                switch (number % 100) {
                    case 11:
                    case 12:
                    case 13: return "th";
                }

                switch (number % 10) {
                    case 1: return "st";
                    case 2: return "nd";
                    case 3: return "rd";
                    default: return "th";
                }
            }
            catch {
                return string.Empty;
            }
        }
    }
}