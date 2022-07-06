using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Threading;
using System.Web;
using System.Web.UI;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace API {
    public partial class ExportData: Page {
        protected void Page_Load(
            object sender,
            EventArgs e
        ) {
            LblMessage.Style.Add("display", "none");
            ClientScript.RegisterStartupScript(this.GetType(), "alert", "doHideProgress(0);", true);
            
            if (!String.IsNullOrEmpty(Request.QueryString["BtnDownload"])) {
                if (Session["ExcelPackage"] == null)
                    LblMessage.Style.Add("display", "block");
            }            
        }

        public static void DoSetCellExcel(
            ExcelWorksheet ws,
            int maxRowCellRange,
            int maxColCellRange,
            int maxRowCellHeader,
            int maxColCellHeader
        ) {
            var cellRange = ws.Cells;
            var cellHeader = ws.Cells;

            ws.Cells.Style.Font.Name = "Cordia New";
            ws.Cells.Style.Font.Size = 14;

            cellRange = ws.Cells[1, 1, maxRowCellRange, maxColCellRange];
            cellRange.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            cellRange.Style.Border.Right.Style = ExcelBorderStyle.Thin;
            cellRange.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            cellRange.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            cellRange.Style.Fill.PatternType = ExcelFillStyle.Solid;
            cellRange.Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#FFFFFF"));

            cellHeader = ws.Cells[1, 1, maxRowCellHeader, maxColCellHeader];
            cellHeader.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            cellHeader.Style.Border.Bottom.Style = ExcelBorderStyle.None;
            cellHeader.Style.Fill.PatternType = ExcelFillStyle.Solid;
            cellHeader.Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#D9D9D9"));

            ws.Cells[(maxRowCellHeader + 1), 1, maxRowCellRange, maxColCellRange].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
            ws.Cells[(maxRowCellHeader + 1), 1, maxRowCellRange, maxColCellRange].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
            ws.View.FreezePanes((maxRowCellHeader + 1), 1);
        }

        public static void DoGetListDataToExcel(
            List<object> cellContent,
            DataTable dt,
            ExcelWorksheet ws,
            int startRow
        ) {
            int i = startRow;
            int j = 0;

            foreach (DataRow dr in dt.Rows) {
                j = 1;

                foreach (object c in cellContent) {
                    string field = ((string[])c)[1];
                    string horizontalAlignment = ((string[])c)[2];
                    string wrapText = ((string[])c)[3];
                    var cell = ws.Cells[i, j];

                    if (!String.IsNullOrEmpty(field)) {
                        if (horizontalAlignment.Equals("center"))
                            cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                        if (horizontalAlignment.Equals("right"))
                            cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                        if (wrapText.Equals("true"))
                            cell.Style.WrapText = true;

                        cell.Value = dr[field].ToString();
                    }

                    j++;
                }

                i++;
            }
        }

        protected void DoExport(
            object sender,
            EventArgs e
        ) {
            Thread.Sleep(1000);

            MemoryStream ms = new MemoryStream();
            ExcelPackage pk = new ExcelPackage();
            ExcelWorksheet ws1 = pk.Workbook.Worksheets.Add("Application");

            string query = "" +
                "select   a.id, " +
                "         a.applicationStatus, " +
                "         ( " +
                "           case a.applicationStatus " +
                "               when 'WA' then 'Written Application' " +
                "               when 'PA' then 'Pending Approval' " +
                "               when 'CC' then 'Pending Approval ( Central Consideration Already )' " +
                "               when 'IA' then 'Incomplete Application' " +
                "               when 'AA' then 'Application Approved' " +
                "               when 'NA' then 'Application is not Approved' " +
                "               else null " +
                "           end " +
                "         ) as applicationStatusName, " +
                "         b.username, " +
                "         b.password, " +
                "         c.enTitleFullName as titlePrefixFullNameEN, " +
                "         c.enTitleInitials as titlePrefixInitialsEN, " +
                "         a.firstName, " +
                "         a.middleName, " +
                "         a.lastName, " +
                "         f.enNationalityName as nationalityNameEN, " +
                "         e.enGenderFullName as genderFullNameEN, " +
                "         e.enGenderInitials as genderInitialsEN, " +
                "         a.email, " +
                "         g.studentCategoryNameEN, " +
                "         a.studentCategorySpecify, " +
                "         a.studentCategoryOther, " +
                "         h.countryNameEN as countryHomeUniversityNameEN, " +
                "         j.universityNameEN, " +
                "         a.universityOther, " +
                "         a.acaFacultyId, " +
                "         l.nameEn as facultyNameEN, " +
                "         a.department, " +
                "         convert(varchar, a.semesterDateStart, 103) as semesterDateStart, " +
                "         convert(varchar, a.semesterDateEnd, 103) as semesterDateEnd, " +
                "         a.passportNumber, " +
                "         convert(varchar, a.passportExpiryDate, 103) as passportExpiryDate, " +
                "         m.disciplineNameEN, " +
                "         a.submitStatus, " +
                "         a.cancelledStatus, " +
                "         a.createDate " +
                "from     Bermuda..sexApplication as a with(nolock) inner join " +
                "         Bermuda..sexUser as b with(nolock) on a.sexUserId = b.id left join " +
                "         Infinity..perTitlePrefix as c with(nolock) on a.perTitlePrefixId = c.id left join " +
                "         Infinity..perGender as d with(nolock) on c.perGenderId = d.id left join " +
                "         Infinity..perGender as e with(nolock) on a.perGenderId = e.id left join " +
                "         Infinity..perNationality as f with(nolock) on a.perNationalityId = f.id left join " +
                "         Bermuda..sexStudentCategory as g with(nolock) on a.sexStudentCategoryId = g.id left join " +
                "         Infinity..plcCountry as h with(nolock) on a.plcCountryId = h.id left join " +
                "         Infinity..plcCountry as i with(nolock) on a.plcCountryHomeId = i.id left join " +
                "         Infinity..plcUniversity as j with(nolock) on a.plcUniversityId = j.id left join " +
                "         Infinity..plcCountry as k with(nolock) on j.plcCountryId = k.id left join " +
                "         Infinity..acaFaculty as l with(nolock) on a.acaFacultyId = l.id left join " +
                "         Bermuda..sexDiscipline as m with(nolock) on a.sexDisciplineId = m.id " +
                "order by a.id";

            SqlConnection conn = iUtil.ConnectDB(iUtil.bermudaConnectionString);
            SqlCommand cmd = new SqlCommand(query, conn);
            
            DataSet ds = new DataSet();

            cmd.CommandType = CommandType.Text;
            cmd.CommandTimeout = 1000;

            conn.Open();

            SqlDataAdapter da = new SqlDataAdapter(cmd);

            ds = new DataSet();
            da.Fill(ds);
            
            cmd.Dispose();

            conn.Close();
            conn.Dispose();

            List<object> applicationColumn = new List<object> {
                new[] { "ID", "id", "", "" },
                new[] { "Application Status", "applicationStatusName", "", "" },
                new[] { "Username", "username", "", "" },
                new[] { "Password", "password", "", "" },
                new[] { "Title Prefix [Full Name]", "titlePrefixFullNameEN", "", "" },
                new[] { "Title Prefix [Initials]", "titlePrefixInitialsEN", "", "" },
                new[] { "First Name", "firstName", "", "" },
                new[] { "Middle Name", "middleName", "", "" },
                new[] { "Last Name", "lastName", "", "" },
                new[] { "Nationality", "nationalityNameEN", "", "" },
                new[] { "Gender [Full Name]", "genderFullNameEN", "", "" },
                new[] { "Gender [Initials]", "genderInitialsEN", "", "" },
                new[] { "Email", "email", "", "" },
                new[] { "Student Category", "studentCategoryNameEN", "", "" },
                new[] { "Student Category Specify", "studentCategorySpecify", "", "" },
                new[] { "Student Category Other", "studentCategoryOther", "", "" },
                new[] { "Country Home University", "countryHomeUniversityNameEN", "", "" },
                new[] { "University", "universityNameEN", "", "" },
                new[] { "University Other", "universityOther", "", "" },
                new[] { "Faculty ID", "acaFacultyId", "", "" },
                new[] { "Faculty", "facultyNameEN", "", "" },
                new[] { "Department", "department", "", "" },
                new[] { "Semester Date Start", "semesterDateStart", "", "" },
                new[] { "Semester Date End", "semesterDateEnd", "", "" },
                new[] { "Passport Number", "passportNumber", "", "" },
                new[] { "Passport Expiry Date", "passportExpiryDate", "", "" },
                new[] { "Discipline", "disciplineNameEN", "", "" },
                new[] { "Submit Status", "submitStatus", "", "" },
                new[] { "Cancelled Status", "cancelledStatus", "", "" },
                new[] { "Create Date", "createDate", "", "" }
            };

            int i = 1;

            foreach (object a in applicationColumn) {
                ws1.Cells[1, i].Value = ((string[])a)[0];
                i++;
            }

            DoGetListDataToExcel(applicationColumn, ds.Tables[0], ws1, 2);
            DoSetCellExcel(ws1, (ds.Tables[0].Rows.Count + 1), applicationColumn.Count, 1, applicationColumn.Count);

            ws1.Cells.AutoFitColumns();

            pk.SaveAs(ms);

            ClientScript.RegisterStartupScript(this.GetType(), "alert", "doHideProgress(0);", true);

            Session.Add("ExcelPackage", Convert.ToBase64String(pk.GetAsByteArray()));
        }

        protected void DoDownload(
            object sender,
            EventArgs e
        ) {
            var excelPackage = Session["ExcelPackage"];

            Session.Remove("ExcelPackage");

            if (excelPackage != null) {
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=Register.for.Exchange.Program@" + DateTime.Now.ToString("dd-MM-yyyy@HH-mm-ss", new CultureInfo("en-US")) + ".xlsx");
                HttpContext.Current.Response.BinaryWrite(Convert.FromBase64String(excelPackage.ToString()));
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
        }
    }
}