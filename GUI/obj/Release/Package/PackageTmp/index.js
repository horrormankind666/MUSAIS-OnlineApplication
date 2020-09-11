/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๐๖/๒๕๖๑>
Modify date : <๐๙/๐๙/๒๕๖๓>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับหน้า index>
=============================================
*/

(function () {
	"use strict";

	var dt = new Date();
	var ver = (dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear() + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());
    
	document.write("<link href='CSS/CSS.css?ver=" + ver + "' rel='stylesheet' />");
	document.write("<script type='text/javascript' src='JScript/AppUtil.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Dictionary.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/PageRoute.js?ver=" + ver + "'><\/script>");   
	document.write("<script type='text/javascript' src='JScript/TitlePrefix.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Gender.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Nationality.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Country.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/University.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/StudentCategory.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Faculty.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/MaritalStatus.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Relationship.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Discipline.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/EducationalBackground.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/YearStudy.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/TOEFLType.js?ver=" + ver + "'><\/script>");    
	document.write("<script type='text/javascript' src='JScript/User.SignIn.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/User.CreateNewAccount.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/User.ActivateAccount.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/User.RequestPassword.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/User.EditAccount.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/TermServiceConsent.PrivacyPolicy.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.StudentInfo.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.PersonalInfo.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.PersonalInfo.Profile.js?ver=" + ver + "'><\/script>");    
	document.write("<script type='text/javascript' src='JScript/Application.PersonalInfo.HomeAddress.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.PersonalInfo.MailingAddress.js?ver=" + ver + "'><\/script>");    
	document.write("<script type='text/javascript' src='JScript/Application.PersonalInfo.Contact.js?ver=" + ver + "'><\/script>");    
	document.write("<script type='text/javascript' src='JScript/Application.PersonalInfo.EmergencyContact.js?ver=" + ver + "'><\/script>");    
	document.write("<script type='text/javascript' src='JScript/Application.AcademicInfo.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.AcademicInfo.CurEdu.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.AcademicInfo.EnglishProficiency.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.UploadDocuments.js?ver=" + ver + "'><\/script>");    
	document.write("<script type='text/javascript' src='JScript/Application.Declaration.js?ver=" + ver + "'><\/script>");
	document.write("<script type='text/javascript' src='JScript/Application.View.js?ver=" + ver + "'><\/script>");	
})();