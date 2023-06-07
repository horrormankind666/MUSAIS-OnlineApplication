/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๘/๐๖/๒๕๖๑>
Modify date : <๐๖/๐๖/๒๕๖๖>
Description : <โมเดลข้อมูลผู้ใช้งาน>
=============================================
*/

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace API.Models {
	public class User {
		public string package {
			get;
			set;
		}

		public string verifyStatus {
			get;
			set;
		}

		public string titlePrefixId {
			get;
			set;
		}

		public string firstName {
			get;
			set;
		}

		public string middleName {
			get;
			set;
		}

		public string lastName {
			get;
			set;
		}

		public string nationalityId {
			get;
			set;
		}

		public string genderId {
			get;
			set;
		}

		public string email {
			get;
			set;
		}

		public string countryId {
			get;
			set;
		}

		public string cancelledStatus {
			get;
			set;
		}

		public string by {
			get;
			set;
		}

		public static DataSet GetExist(
			string userId,
			string username,
			string password,
			string verifyCode
		) {
			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexGetUserExist",
				new SqlParameter("@id", userId),
				new SqlParameter("@username", username),
				new SqlParameter("@password", password),
				new SqlParameter("@verifyCode",	verifyCode)
			);

			return ds;
		}

		public static DataSet GetData(
			string userId,
			string username,
			string password,
			string verifyCode,
			string sendEmailStatus,
			string email
		) {
			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexGetUser",
				new SqlParameter("@id", userId),
				new SqlParameter("@username", username),
				new SqlParameter("@password", password),
				new SqlParameter("@verifyCode", verifyCode),
				new SqlParameter("@sendEmailStatus", sendEmailStatus),
				new SqlParameter("@email", email)
			);
			
			if (ds.Tables[0].Rows.Count > 0) {
				DataRow dr = ds.Tables[0].Rows[0];

				if (sendEmailStatus.Equals("Y") &&
					!String.IsNullOrEmpty(email))
					iUtil.SendMail(email, dr["mailSubject"].ToString(), dr["mailMessage"].ToString());

				dr["mailMessage"] = null;
			}
			
			return ds;
		}

		public static DataSet SetData(
			string method,
			List<User> data
		) {
			string action = String.Empty;
			string userId = String.Empty;
			string username = String.Empty;
			string password = String.Empty;
			string verifyCode = String.Empty;
			DataSet ds = new DataSet();

			if (method.Equals("POST"))
				action = "INSERT";

			if (method.Equals("PUT"))
				action = "UPDATE";

			if (method.Equals("DELETE"))
				action = "DELETE";

			foreach (var d in data) {
				try {
                    string[] packageDecode = iUtil.DecodeBase64String(d.package).Split('.');

					if (action.Equals("INSERT")) {
						username = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));
						password = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));
					}

					if (action.Equals("UPDATE")) {
						userId = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[0]));
						verifyCode = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[1]));

						if (packageDecode.GetLength(0).Equals(4)) {
							username = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[2]));
							password = iUtil.DecodeBase64String(iUtil.StringReverse(packageDecode[3]));
						}
					}
                
					ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexSetUser",
						new SqlParameter("@action", action),
						new SqlParameter("@id", userId),
						new SqlParameter("@username", username),
						new SqlParameter("@password", password),
						new SqlParameter("@verifyCode", verifyCode),
						new SqlParameter("@verifyStatus", d.verifyStatus),
						new SqlParameter("@titlePrefixId", d.titlePrefixId),
						new SqlParameter("@firstName", d.firstName),
						new SqlParameter("@middleName", d.middleName),
						new SqlParameter("@lastName", d.lastName),
						new SqlParameter("@nationalityId", d.nationalityId),
						new SqlParameter("@genderId", d.genderId),
						new SqlParameter("@email", d.email),
						new SqlParameter("@countryId", d.countryId),
						new SqlParameter("@cancelledStatus", d.cancelledStatus),
						new SqlParameter("@by", d.by),
						new SqlParameter("@ip", iUtil.GetIP())
					);
					
					if (ds.Tables[0].Rows.Count > 0) {
						DataRow dr = ds.Tables[0].Rows[0];

						if (dr["success"].ToString().Equals("Y")) {
							if ((action.Equals("INSERT") && !String.IsNullOrEmpty(dr["mailRecipients"].ToString())) ||
								(action.Equals("UPDATE") && String.IsNullOrEmpty(dr["verifyStatus"].ToString())))
								iUtil.SendMail(dr["mailRecipients"].ToString(), dr["mailSubject"].ToString(), dr["mailMessage"].ToString());
                        }

						dr["mailMessage"] = null;
					}					
				}
				catch {
				}
			}

			return ds;
		}

		public static DataSet GetTermServiceConsent(
			string userId,
			string termServiceType
		) {
			DataSet ds = iUtil.ExecuteCommandStoredProcedure(iUtil.bermudaConnectionString, "sp_sexGetUserTermServiceConsent",
				new SqlParameter("@userId", userId),
				new SqlParameter("@termServiceType", termServiceType)
			);

			return ds;
		}
	}
}