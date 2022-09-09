USE [Bermuda]
GO
/****** Object:  StoredProcedure [dbo].[sp_sexSetApplication]    Script Date: 09/09/2565 14:24:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		: <ยุทธภูมิ ตวันนา>
-- Create date	: <๒๖/๐๖/๒๕๖๑>
-- Description	: <สำหรับบันทึกข้อมูลตาราง sexApplication ครั้งละ ๑ เรคคอร์ด>
-- Parameter
--  1. action						เป็น varchar	รับค่าการกระทำกับฐานข้อมูล
--  2. id 							เป็น varchar	รับค่ารหัสใบสมัคร
--  3. userId						เป็น varchar	รับค่ารหัสผู้ใช้งาน
--  4. verifyCode					เป็น varchar	รับค่ารหัสยืนยันตัวตน
--  5. titlePrefixId				เป็น varchar	รับค่ารหัสคำนำหน้าชื่อ
--  6. firstName 					เป็น nvarchar	รับค่าชื่อ
--	7. middleName 					เป็น nvarchar	รับค่าชื่อกลาง
--  8. lastName 					เป็น nvarchar	รับค่านามสกุล
--  9. nationalityId				เป็น varchar	รับค่ารหัสสัญชาติ
-- 10. genderId						เป็น varchar	รับค่าเพศ
-- 11. email						เป็น nvarchar	รับค่าอีเมล์
-- 12. studentCategoryId			เป็น varchar	รับค่าประเภทของนักศึกษาแลกเปลี่ยน
-- 13. studentCategorySpecify		เป็น nvarchar	รับค่าประเภทของนักศึกษาแลกเปลี่ยนที่ต้องระบุ
-- 14. studentCategoryOther			เป็น nvarchar	รับค่าประเภทของนักศึกษาแลกเปลี่ยนอื่น ๆ
-- 15. countryId					เป็น varchar	รับค่ารหัสประเทศของมหาวิทยาลัย
-- 16. universityId					เป็น varchar	รับค่ารหัสมหาวิทยาลัย
-- 17. universityOther				เป็น nvarchar	รับค่าชื่อมหาวิทยาลัยอื่น ๆ
-- 18. facultyId					เป็น varchar	รับค่ารหัสคณะที่ต้องการศึกษา
-- 19. department					เป็น nvarchar	รับค่ารหัสภาควิชาที่ต้องการศึกษา
-- 20. semesterDateStart			เป็น varchar	รับค่าช่วงเวลาเริ่มต้นที่เข้ามาเป็นนักศึกษาแลกเปลี่ยน
-- 21. semesterDateEnd				เป็น varchar	รับค่าช่วงเวลาสิ้นสุดที่เข้ามาเป็นนักศึกษาแลกเปลี่ยน
-- 22. homeAddress					เป็น nvarchar	รับค่าที่อยู่ตามทะเบียนบ้าน
-- 23. homeDistrict					เป็น nvarchar	รับค่าชื่อตำบลในที่อยู่ตามทะเบียนบ้าน
-- 24. homeCity						เป็น nvarchar	รับค่าชื่อเมืองในที่อยู่ตามทะเบียนบ้าน
-- 25. homeProvince					เป็น nvarchar	รับค่าชื่อรัฐในที่อยู่ตามทะเบียนบ้าน
-- 26. homePostalCode				เป็น nvarchar	รับค่ารหัสไปรษณีย์ของที่อยู่ตามทะเบียนบ้าน
-- 27. countryHomeId				เป็น varchar	รับค่ารหัสประเทศของที่อยู่ตามทะเบียนบ้าน
-- 28. mailingAddress				เป็น nvarchar	รับค่าที่อยู่ที่ต้องการให้ติดต่อทางไปรษณีย์
-- 29. mailingDistrict				เป็น nvarchar	รับค่าชื่อตำบลในที่อยู่ที่ต้องการให้ติดต่อทางไปรษณีย์
-- 30. mailingCity					เป็น nvarchar	รับค่าชื่อเมืองในที่อยู่ที่ต้องการให้ติดต่อทางไปรษณีย์
-- 31. mailingProvince				เป็น nvarchar	รับค่าชื่อรัฐในที่อยู่ที่ต้องการให้ติดต่อทางไปรษณีย์
-- 32. mailingPostalCode			เป็น nvarchar	รับค่ารหัสไปรษณีย์ของที่อยู่ที่ต้องการให้ติดต่อทางไปรษณีย์
-- 33. countryMailingId				เป็น varchar	รับค่ารหัสประเทศของที่อยู่ที่ต้องการให้ติดต่อทางไปรษณีย์
-- 34. contactTel					เป็น nvarchar	รับค่าเบอร์โทรศัพท์
-- 35. birthdate					เป็น varchar	รับค่าวันเกิด
-- 36. maritalStatusId				เป็น varchar	รับค่ารหัสสถานภาพสมรส
-- 37. passportNumber				เป็น nvarchar	รับค่าหมายเลขพาสปอร์ต
-- 38. passportExpiryDate			เป็น varchar	รับค่าวันหมดอายุของพาสปอร์ต
-- 39. emergencyName				เป็น nvarchar	รับค่าชื่อผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 40. relationshipId				เป็น varchar	รับค่าความสัมพันธ์ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 41. emergencyMailingAddress		เป็น nvarchar	รับค่าที่อยู่ที่ติดต่อได้ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 42. emergencyMailingDistrict		เป็น nvarchar	รับค่าชื่อตำบลในที่อยู่ที่ติดต่อได้ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 43. emergencyMailingCity			เป็น nvarchar	รับค่าชื่อเมืองในที่อยู่ที่ติดต่อได้ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 44. emergencyMailingProvince		เป็น nvarchar	รับค่าชื่อรัฐในที่อยู่ที่ติดต่อได้ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 45. emergencyMailingPostalCode	เป็น nvarchar	รับค่ารหัสไปรษณีย์ที่อยู่ที่ติดต่อได้ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 46. countryMailingEmergencyId	เป็น varchar	รับค่ารหัสประเทศที่อยู่ที่ติดต่อได้ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 47. emergencyHomeTel				เป็น nvarchar	รับค่าเบอร์โทรศัพท์บ้านของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 48. emergencyOfficeTel			เป็น nvarchar	รับค่าเบอร์โทรศัพท์ที่ทำงานของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 49. emergencyMobile				เป็น nvarchar	รับค่าเบอร์โทรศัพท์มือถือของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 50. emergencyFax					เป็น nvarchar	รับค่าเบอร์แฟกซ์ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 51. emergencyEmail				เป็น nvarchar	รับค่าอีเมล์ของผู้ที่ติดต่อได้ในกรณีฉุกเฉิน
-- 52. curEduInstitution			เป็น nvarchar	รับค่าชื่อสถาบันการศึกษาปัจจุบัน
-- 53. curEduFaculty				เป็น nvarchar	รับค่าชื่อคณะที่ศึกษาของการศึกษาปัจจุบัน
-- 54. disciplineId					เป็น varchar	รับค่ารหัสความสนใจ
-- 55. educationalBackgroundId		เป็น varchar	รับค่ารหัสระดับการศึกษา
-- 56. curEduYear					เป็น varchar	รับค่าจำนวนปีที่ศึกษา
-- 57. TOEFLScore					เป็น varchar	รับค่าคะแนน TOEFL
-- 58. TOEFLTypeId					เป็น varchar	รับค่ารหัสประเภทของ TOEFL
-- 59. IELTSResult					เป็น varchar	รับค่าคะแนน IELTS
-- 60. englishNativeOther			เป็น nvarchar	รับค่าความสามารถทางด้านภาษาอังกฤษอื่น ๆ
-- 61. passportFile					เป็น varchar	รับค่าชื่อไฟล์ของพาสปอร์ต
-- 62. facePhotographsFile			เป็น varchar	รับค่าชื่อไฟล์ของภาพถ่ายครึ่งตัว
-- 63. transcriptFile				เป็น varchar	รับค่าชื่อไฟล์ของทรานสคริปต์
-- 64. travelInsuranceFile			เป็น varchar	รับค่าชื่อไฟล์ของกรมธรรม์
-- 65. letterHomeUniversityFile		เป็น varchar	รับค่าชื่อไฟล์ของหนังสือจากมหาวิทยาลัย
-- 66. curriculumVitaeFile			เป็น varchar	รับค่าชื่อไฟล์ของประวัติโดยย่อ
-- 67. TOEFLIELTSFile				เป็น varchar	รับค่าชื่อไฟล์ของคะแนน TOEFL, IELTS
-- 68. letterIntentFile				เป็น varchar	รับค่าชื่อไฟล์ของหนังสือแสดงเจตจำนง
-- 69. declarationA					เป็น varchar	รับค่าการตอบคำถามในหัวข้อ Declaration ข้อ A
-- 70. declarationB					เป็น nvarchar	รับค่าการตอบคำถามในหัวข้อ Declaration ข้อ B
-- 71. declarationC					เป็น varchar	รับค่าการตอบคำถามในหัวข้อ Declaration ข้อ D
-- 72. declarationD					เป็น varchar	รับค่าการตอบคำถามในหัวข้อ Declaration ข้อ E
-- 73. declarationE					เป็น varchar	รับค่าการตอบคำถามในหัวข้อ Declaration ข้อ C
-- 74. declarationESpecify			เป็น nvarchar	รับค่าการตอบคำถามเพิ่มเติมในหัวข้อ Declaration ข้อ C 
-- 75. submitStatus					เป็น varchar	รับค่าสถานะการ Submit ใบสมัคร
-- 76. submitDate					เป็น varchar	รับค่าวันที่ Submit ใบสมัคร
-- 77. submitBy						เป็น nvarchar	รับค่าชื่อผู้ที่ Submit ใบสมัคร
-- 78. submitIp						เป็น varchar	รับค่าหมายเลขไอพีของผู้ที่ Submit ใบสมัคร
-- 79. applicationStatus			เป็น varchar	รับค่าสถานะของใบสมัคร
-- 80. centralApprovalStatus		เป็น varchar	รับค่าสถานะของใบสมัครที่อนุมัติในส่วนกลาง
-- 81. centralApprovalDate			เป็น varchar	รับค่าวันที่อนุมัติใบสมัครในส่วนกลาง
-- 82. centralApprovalBy			เป็น nvarchar	รับค่าชื่อผู้ที่อนุมัติใบสมัครในส่วนกลาง
-- 83. centralApprovalIp			เป็น varchar	รับค่าหมายเลขไอพีของผู้ที่อนุมัติใบสมัครในส่วนกลาง
-- 84. divisionApprovalStatus		เป็น varchar	รับค่าสถานะของใบสมัครที่อนุมัติในส่วนของคณะ
-- 85. divisionApprovalDate			เป็น varchar	รับค่าวันที่อนุมัติใบสมัครในส่วนของคณะ
-- 86. divisionApprovalBy			เป็น nvarchar	รับค่าชื่อผู้ที่อนุมัติใบสมัครในส่วนของคณะ
-- 87. divisionApprovalIp			เป็น varchar	รับค่าหมายเลขไอพีของผู้ที่อนุมัติใบสมัครในส่วนของคณะ
-- 88. reason						เป็น nvarchar	รับค่าเหตุผลที่ใบสมัครไม่สมบูรณ์
-- 89. cancelledStatus				เป็น varchar	รับค่าสถานะการยกเลิก
-- 90. by							เป็น varchar	รับค่าชื่อของผู้ที่กระทำกับฐานข้อมูล
-- 91. ip							เป็น varchar	รับค่าหมายเลขไอพีของผู้ที่กระทำกับฐานข้อมูล
-- =============================================
ALTER procedure [dbo].[sp_sexSetApplication]
(
	@action varchar(10) = null,
	@id varchar(10) = null,
	@userId varchar(10) = null,
	@verifyCode varchar(50) = null,
	@titlePrefixId varchar(5) = null,
	@firstName nvarchar(50) = null,
	@middleName nvarchar(50) = null,
	@lastName nvarchar(50) = null,
	@nationalityId varchar(5) = null,
	@genderId varchar(5) = null,
	@email nvarchar(255) = null,
	@studentCategoryId varchar(5) = null,
	@studentCategorySpecify nvarchar(255) = null,
	@studentCategoryOther nvarchar(255) = null,
	@countryId varchar(5) = null,
	@universityId varchar(6) = null,
	@universityOther nvarchar(255) = null,
	@facultyId varchar(5) = null,
	@department nvarchar(3000) = null,
	@semesterDateStart varchar(50) = null,
	@semesterDateEnd varchar(50) = null,
	@homeAddress nvarchar(500) = null,
	@homeDistrict nvarchar(255) = null,
	@homeCity nvarchar(255) = null,
	@homeProvince nvarchar(255) = null,
	@homePostalCode nvarchar(50) = null,
	@countryHomeId varchar(5) = null,
	@mailingAddress nvarchar(500) = null,
	@mailingDistrict nvarchar(255) = null,
	@mailingCity nvarchar(255) = null,
	@mailingProvince nvarchar(255) = null,
	@mailingPostalCode nvarchar(50) = null,
	@countryMailingId varchar(5) = null,
	@contactTel nvarchar(50) = null,
	@birthdate varchar(50) = null,
	@maritalStatusId varchar(5) = null,
	@passportNumber nvarchar(50) = null,
	@passportExpiryDate varchar(50) = null,
	@emergencyName nvarchar(255) = null,
	@relationshipId varchar(5) = null,
	@emergencyMailingAddress nvarchar(500) = null,
	@emergencyMailingDistrict nvarchar(255) = null,
	@emergencyMailingCity nvarchar(255) = null,
	@emergencyMailingProvince nvarchar(255) = null,
	@emergencyMailingPostalCode	nvarchar(50) = null,
	@countryMailingEmergencyId varchar(5) = null,
	@emergencyHomeTel nvarchar(50) = null,
	@emergencyOfficeTel nvarchar(50) = null,
	@emergencyMobile nvarchar(50) = null,
	@emergencyFax nvarchar(50) = null,
	@emergencyEmail nvarchar(255) = null,
	@curEduInstitution nvarchar(255) = null,
	@curEduFaculty nvarchar(255) = null,
	@disciplineId varchar(5) = null,
	@educationalBackgroundId varchar(5) = null,
	@curEduYear varchar(5) = null,
	@TOEFLScore varchar(5) = null,
	@TOEFLTypeId varchar(5) = null,
	@IELTSResult varchar(5) = null,
	@englishNativeOther nvarchar(255) = null,
	@passportFile varchar(100) = null,
	@facePhotographsFile varchar(100) = null,
	@transcriptFile	varchar(100) = null,
	@travelInsuranceFile varchar(100) = null,
	@letterHomeUniversityFile varchar(100) = null,
	@curriculumVitaeFile varchar(100) = null,
	@TOEFLIELTSFile varchar(100) = null,
	@letterIntentFile varchar(100) = null,
	@declarationA varchar(5) = null,
	@declarationB nvarchar(1000) = null,
	@declarationC varchar(5) = null,
	@declarationD varchar(5) = null,
	@declarationE varchar(5) = null,
	@declarationESpecify nvarchar(1000) = null,
	@submitStatus varchar(5) = null,
	@submitBy nvarchar(255) = null,
	@submitIp varchar(50) = null,
	@applicationStatus varchar(5) = null,
	@centralApprovalStatus varchar(5) = null,
	@centralApprovalBy nvarchar(255) = null,
	@centralApprovalIp varchar(50) = null,
	@divisionApprovalStatus varchar(5) = null,
	@divisionApprovalBy nvarchar(255) = null,
	@divisionApprovalIp varchar(50) = null,
	@reason nvarchar(3000) = null,
	@cancelledStatus varchar(5) = null,
	@by varchar(255) = null,
	@ip varchar(255) = null
)
as
begin
	set concat_null_yields_null off

	set @action = upper(ltrim(rtrim(isnull(@action, ''))))
	set @id = ltrim(rtrim(isnull(@id, '')))
	set @userId = ltrim(rtrim(isnull(@userId, ''))) 
	set @verifyCode = ltrim(rtrim(isnull(@verifyCode, ''))) 
	set @titlePrefixId = ltrim(rtrim(isnull(@titlePrefixId, '')))
	set @firstName = ltrim(rtrim(isnull(@firstName, '')))
	set @middleName = ltrim(rtrim(isnull(@middleName, '')))
	set @lastName = ltrim(rtrim(isnull(@lastName, '')))
	set @nationalityId = ltrim(rtrim(isnull(@nationalityId, ''))) 
	set @genderId = ltrim(rtrim(isnull(@genderId, ''))) 
	set @email = ltrim(rtrim(isnull(@email, ''))) 
	set @studentCategoryId = ltrim(rtrim(isnull(@studentCategoryId, ''))) 
	set @studentCategorySpecify = ltrim(rtrim(isnull(@studentCategorySpecify, ''))) 
	set @studentCategoryOther = ltrim(rtrim(isnull(@studentCategoryOther, ''))) 
	set @countryId = ltrim(rtrim(isnull(@countryId, ''))) 
	set @universityId = ltrim(rtrim(isnull(@universityId, ''))) 
	set @universityOther = ltrim(rtrim(isnull(@universityOther, ''))) 
	set @facultyId = ltrim(rtrim(isnull(@facultyId, '')))
	set @department = ltrim(rtrim(isnull(@department, '')))
	set @semesterDateStart = ltrim(rtrim(isnull(@semesterDateStart, ''))) 
	set @semesterDateEnd = ltrim(rtrim(isnull(@semesterDateEnd, ''))) 
	set @homeAddress = ltrim(rtrim(isnull(@homeAddress, ''))) 
	set @homeDistrict = ltrim(rtrim(isnull(@homeDistrict, ''))) 
	set @homeCity = ltrim(rtrim(isnull(@homeCity, ''))) 
	set @homeProvince = ltrim(rtrim(isnull(@homeProvince, ''))) 
	set @homePostalCode = ltrim(rtrim(isnull(@homePostalCode, ''))) 
	set @countryHomeId = ltrim(rtrim(isnull(@countryHomeId, ''))) 
	set @mailingAddress = ltrim(rtrim(isnull(@mailingAddress, ''))) 
	set @mailingDistrict = ltrim(rtrim(isnull(@mailingDistrict, ''))) 
	set @mailingCity = ltrim(rtrim(isnull(@mailingCity, ''))) 
	set @mailingProvince = ltrim(rtrim(isnull(@mailingProvince, ''))) 
	set @mailingPostalCode = ltrim(rtrim(isnull(@mailingPostalCode, ''))) 
	set @countryMailingId = ltrim(rtrim(isnull(@countryMailingId, ''))) 
	set @contactTel = ltrim(rtrim(isnull(@contactTel, ''))) 
	set @birthdate = ltrim(rtrim(isnull(@birthdate, ''))) 
	set @maritalStatusId = ltrim(rtrim(isnull(@maritalStatusId, ''))) 
	set @passportNumber = ltrim(rtrim(isnull(@passportNumber, ''))) 
	set @passportExpiryDate = ltrim(rtrim(isnull(@passportExpiryDate, ''))) 
	set @emergencyName = ltrim(rtrim(isnull(@emergencyName, ''))) 
	set @relationshipId = ltrim(rtrim(isnull(@relationshipId, ''))) 
	set @emergencyMailingAddress = ltrim(rtrim(isnull(@emergencyMailingAddress, ''))) 
	set @emergencyMailingDistrict = ltrim(rtrim(isnull(@emergencyMailingDistrict, ''))) 
	set @emergencyMailingCity = ltrim(rtrim(isnull(@emergencyMailingCity, ''))) 
	set @emergencyMailingProvince = ltrim(rtrim(isnull(@emergencyMailingProvince, ''))) 
	set @emergencyMailingPostalCode = ltrim(rtrim(isnull(@emergencyMailingPostalCode, ''))) 
	set @countryMailingEmergencyId = ltrim(rtrim(isnull(@countryMailingEmergencyId, ''))) 
	set @emergencyHomeTel = ltrim(rtrim(isnull(@emergencyHomeTel, ''))) 
	set @emergencyOfficeTel = ltrim(rtrim(isnull(@emergencyOfficeTel, ''))) 
	set @emergencyMobile = ltrim(rtrim(isnull(@emergencyMobile, ''))) 
	set @emergencyFax = ltrim(rtrim(isnull(@emergencyFax, ''))) 
	set @emergencyEmail = ltrim(rtrim(isnull(@emergencyEmail, ''))) 
	set @curEduInstitution = ltrim(rtrim(isnull(@curEduInstitution, ''))) 
	set @curEduFaculty = ltrim(rtrim(isnull(@curEduFaculty, ''))) 
	set @disciplineId = ltrim(rtrim(isnull(@disciplineId, ''))) 
	set @educationalBackgroundId = ltrim(rtrim(isnull(@educationalBackgroundId, ''))) 
	set @curEduYear = ltrim(rtrim(isnull(@curEduYear, ''))) 
	set @TOEFLScore = ltrim(rtrim(isnull(@TOEFLScore, ''))) 
	set @TOEFLTypeId = ltrim(rtrim(isnull(@TOEFLTypeId, ''))) 
	set @IELTSResult = ltrim(rtrim(isnull(@IELTSResult, ''))) 
	set @englishNativeOther = ltrim(rtrim(isnull(@englishNativeOther, ''))) 
	set @passportFile = ltrim(rtrim(isnull(@passportFile, ''))) 
	set @facePhotographsFile = ltrim(rtrim(isnull(@facePhotographsFile, ''))) 
	set @transcriptFile = ltrim(rtrim(isnull(@transcriptFile, ''))) 
	set @travelInsuranceFile = ltrim(rtrim(isnull(@travelInsuranceFile, ''))) 
	set @letterHomeUniversityFile = ltrim(rtrim(isnull(@letterHomeUniversityFile, ''))) 
	set @curriculumVitaeFile = ltrim(rtrim(isnull(@curriculumVitaeFile, ''))) 
	set @TOEFLIELTSFile = ltrim(rtrim(isnull(@TOEFLIELTSFile, ''))) 
	set @letterIntentFile = ltrim(rtrim(isnull(@letterIntentFile, ''))) 
	set @declarationA = ltrim(rtrim(isnull(@declarationA, ''))) 
	set @declarationB = ltrim(rtrim(isnull(@declarationB, ''))) 
	set @declarationC = ltrim(rtrim(isnull(@declarationC, ''))) 
	set @declarationD = ltrim(rtrim(isnull(@declarationD, ''))) 
	set @declarationE = ltrim(rtrim(isnull(@declarationE, ''))) 
	set @declarationESpecify = ltrim(rtrim(isnull(@declarationESpecify, ''))) 
	set @submitStatus = ltrim(rtrim(isnull(@submitStatus, ''))) 
	set @submitBy = ltrim(rtrim(isnull(@submitBy, ''))) 
	set @submitIp = ltrim(rtrim(isnull(@submitIp, ''))) 
	set @applicationStatus = ltrim(rtrim(isnull(@applicationStatus, ''))) 
	set @centralApprovalStatus = ltrim(rtrim(isnull(@centralApprovalStatus, ''))) 
	set @centralApprovalBy = ltrim(rtrim(isnull(@centralApprovalBy, ''))) 
	set @centralApprovalIp = ltrim(rtrim(isnull(@centralApprovalIp, ''))) 
	set @divisionApprovalStatus = ltrim(rtrim(isnull(@divisionApprovalStatus, ''))) 
	set @divisionApprovalBy = ltrim(rtrim(isnull(@divisionApprovalBy, ''))) 
	set @divisionApprovalIp = ltrim(rtrim(isnull(@divisionApprovalIp, ''))) 
	set @reason = ltrim(rtrim(isnull(@reason, ''))) 
	set @cancelledStatus = ltrim(rtrim(isnull(@cancelledStatus, '')))
	set @by = ltrim(rtrim(isnull(@by, '')))
	set @ip = ltrim(rtrim(isnull(@ip, '')))	
	
	declare @table varchar(50) = 'sexApplication'
	declare @rowCount int = 0
	declare @rowCountUpdate int = 0
	declare @recordCount int = 0
	declare @value nvarchar(max) = null
	declare	@strBlank varchar(50) = '----------**********.........0.0000000000000000000'	
	declare @applicationId varchar(10) = NULL
	declare @submitDate varchar(50) = (case when (dbo.fnc_utilCheckString(1, @submitStatus, @submitStatus, null) is not null) then convert(varchar, getdate()) else null end)
	declare @centralApprovalDate varchar(50) = (case when (dbo.fnc_utilCheckString(1, @centralApprovalStatus, @centralApprovalStatus, null) is not null) then convert(varchar, getdate()) else null end)
	declare @divisionApprovalDate varchar(50) = (case when (dbo.fnc_utilCheckString(1, @divisionApprovalStatus, @divisionApprovalStatus, null) is not null) then convert(varchar, getdate()) else null end)			
	declare @recipients varchar(max) = null
	declare @subject nvarchar(255) = null
	declare @mail nvarchar(max) = null
	declare @titlePrefixName nvarchar(50) = null
	declare @link varchar(255) = null

	if (@action = 'INSERT' or @action = 'UPDATE' or @action = 'DELETE')
	begin
		set @value = 'id='							+ dbo.fnc_utilCheckString(1, @id, @id, 'null') + ', ' +
					 'userId='						+ dbo.fnc_utilCheckString(1, @userId, ('"' + @userId + '"'), 'null') + ', ' +
					 'titlePrefixId='				+ dbo.fnc_utilCheckString(1, @titlePrefixId, ('"' + @titlePrefixId + '"'), 'null') + ', ' +					 
					 'firstName='					+ dbo.fnc_utilCheckString(1, @firstName, ('"' + @firstName + '"'), 'null') + ', ' +
					 'middleName='					+ dbo.fnc_utilCheckString(1, @middleName, ('"' + @middleName + '"'), 'null') + ', ' +
					 'lastName='					+ dbo.fnc_utilCheckString(1, @lastName, ('"' + @lastName + '"'), 'null') + ', ' +
					 'nationalityId='				+ dbo.fnc_utilCheckString(1, @nationalityId, ('"' + @nationalityId + '"'), 'null') + ', ' +
					 'genderId='					+ dbo.fnc_utilCheckString(1, @genderId, ('"' + @genderId + '"'), 'null') + ', ' +
					 'email='						+ dbo.fnc_utilCheckString(1, @email, ('"' + @email + '"'), 'null') + ', ' +					 
					 'studentCategoryId='			+ dbo.fnc_utilCheckString(1, @studentCategoryId, ('"' + @studentCategoryId + '"'), 'null') + ', ' +
					 'studentCategorySpecify='		+ dbo.fnc_utilCheckString(1, @studentCategorySpecify, ('"' + @studentCategorySpecify + '"'), 'null') + ', ' +
					 'studentCategoryOther='		+ dbo.fnc_utilCheckString(1, @studentCategoryOther, ('"' + @studentCategoryOther + '"'), 'null') + ', ' +
					 'countryId='					+ dbo.fnc_utilCheckString(1, @countryId, ('"' + @countryId + '"'), 'null') + ', ' +
					 'universityId='				+ dbo.fnc_utilCheckString(1, @universityId, ('"' + @universityId + '"'), 'null') + ', ' +
					 'universityOther='				+ dbo.fnc_utilCheckString(1, @universityOther, ('"' + @universityOther + '"'), 'null') + ', ' +
					 'facultyId='					+ dbo.fnc_utilCheckString(1, @facultyId, ('"' + @facultyId + '"'), 'null') + ', ' +
					 'department='					+ dbo.fnc_utilCheckString(1, @department, ('"' + @department + '"'), 'null') + ', ' +
					 'semesterDateStart='			+ dbo.fnc_utilCheckString(1, @semesterDateStart, ('"' + @semesterDateStart + '"'), 'null') + ', ' +
					 'semesterDateEnd='				+ dbo.fnc_utilCheckString(1, @semesterDateEnd, ('"' + @semesterDateEnd + '"'), 'null') + ', ' +
					 'homeAddress='					+ dbo.fnc_utilCheckString(1, @homeAddress, ('"' + @homeAddress + '"'), 'null') + ', ' +
					 'homeDistrict='				+ dbo.fnc_utilCheckString(1, @homeDistrict, ('"' + @homeDistrict + '"'), 'null') + ', ' +
					 'homeCity='					+ dbo.fnc_utilCheckString(1, @homeCity, ('"' + @homeCity + '"'), 'null') + ', ' +
					 'homeProvince='				+ dbo.fnc_utilCheckString(1, @homeProvince, ('"' + @homeProvince + '"'), 'null') + ', ' +
					 'homePostalCode='				+ dbo.fnc_utilCheckString(1, @homePostalCode, ('"' + @homePostalCode + '"'), 'null') + ', ' +
					 'countryHomeId='				+ dbo.fnc_utilCheckString(1, @countryHomeId, ('"' + @countryHomeId + '"'), 'null') + ', ' +
					 'mailingAddress='				+ dbo.fnc_utilCheckString(1, @mailingAddress, ('"' + @mailingAddress + '"'), 'null') + ', ' +
					 'mailingDistrict='				+ dbo.fnc_utilCheckString(1, @mailingDistrict, ('"' + @mailingDistrict + '"'), 'null') + ', ' +
					 'mailingCity='					+ dbo.fnc_utilCheckString(1, @mailingCity, ('"' + @mailingCity + '"'), 'null') + ', ' +
					 'mailingProvince='				+ dbo.fnc_utilCheckString(1, @mailingProvince, ('"' + @mailingProvince + '"'), 'null') + ', ' +
					 'mailingPostalCode='			+ dbo.fnc_utilCheckString(1, @mailingPostalCode, ('"' + @mailingPostalCode + '"'), 'null') + ', ' +
					 'countryMailingId='			+ dbo.fnc_utilCheckString(1, @countryMailingId, ('"' + @countryMailingId + '"'), 'null') + ', ' +
					 'contactTel='					+ dbo.fnc_utilCheckString(1, @contactTel, ('"' + @contactTel + '"'), 'null') + ', ' +
					 'birthdate='					+ dbo.fnc_utilCheckString(1, @birthdate, ('"' + @birthdate + '"'), 'null') + ', ' +
					 'maritalStatusId='				+ dbo.fnc_utilCheckString(1, @maritalStatusId, ('"' + @maritalStatusId + '"'), 'null') + ', ' +
					 'passportNumber='				+ dbo.fnc_utilCheckString(1, @passportNumber, ('"' + @passportNumber + '"'), 'null') + ', ' +
					 'passportExpiryDate='			+ dbo.fnc_utilCheckString(1, @passportExpiryDate, ('"' + @passportExpiryDate + '"'), 'null') + ', ' +
					 'emergencyName='				+ dbo.fnc_utilCheckString(1, @emergencyName, ('"' + @emergencyName + '"'), 'null') + ', ' +
					 'relationshipId='				+ dbo.fnc_utilCheckString(1, @relationshipId, ('"' + @relationshipId + '"'), 'null') + ', ' +
					 'emergencyMailingAddress='		+ dbo.fnc_utilCheckString(1, @emergencyMailingAddress, ('"' + @emergencyMailingAddress + '"'), 'null') + ', ' +
					 'emergencyMailingDistrict='	+ dbo.fnc_utilCheckString(1, @emergencyMailingDistrict, ('"' + @emergencyMailingDistrict + '"'), 'null') + ', ' +
					 'emergencyMailingCity='		+ dbo.fnc_utilCheckString(1, @emergencyMailingCity, ('"' + @emergencyMailingCity + '"'), 'null') + ', ' +
					 'emergencyMailingProvince='	+ dbo.fnc_utilCheckString(1, @emergencyMailingProvince, ('"' + @emergencyMailingProvince + '"'), 'null') + ', ' +
					 'emergencyMailingPostalCode='	+ dbo.fnc_utilCheckString(1, @emergencyMailingPostalCode, ('"' + @emergencyMailingPostalCode + '"'), 'null') + ', ' +
					 'countryMailingEmergencyId='	+ dbo.fnc_utilCheckString(1, @countryMailingEmergencyId, ('"' + @countryMailingEmergencyId + '"'), 'null') + ', ' +
					 'emergencyHomeTel='			+ dbo.fnc_utilCheckString(1, @emergencyHomeTel, ('"' + @emergencyHomeTel + '"'), 'null') + ', ' +
					 'emergencyOfficeTel='			+ dbo.fnc_utilCheckString(1, @emergencyOfficeTel, ('"' + @emergencyOfficeTel + '"'), 'null') + ', ' +
					 'emergencyMobile='				+ dbo.fnc_utilCheckString(1, @emergencyMobile, ('"' + @emergencyMobile + '"'), 'null') + ', ' +
					 'emergencyFax='				+ dbo.fnc_utilCheckString(1, @emergencyFax, ('"' + @emergencyFax + '"'), 'null') + ', ' +
					 'emergencyEmail='				+ dbo.fnc_utilCheckString(1, @emergencyEmail, ('"' + @emergencyEmail + '"'), 'null') + ', ' +
					 'curEduInstitution='			+ dbo.fnc_utilCheckString(1, @curEduInstitution, ('"' + @curEduInstitution + '"'), 'null') + ', ' +
					 'curEduFaculty='				+ dbo.fnc_utilCheckString(1, @curEduFaculty, ('"' + @curEduFaculty + '"'), 'null') + ', ' +
					 'disciplineId='				+ dbo.fnc_utilCheckString(1, @disciplineId, ('"' + @disciplineId + '"'), 'null') + ', ' +
					 'educationalBackgroundId='		+ dbo.fnc_utilCheckString(1, @educationalBackgroundId, ('"' + @educationalBackgroundId + '"'), 'null') + ', ' +
					 'curEduYear='					+ dbo.fnc_utilCheckString(1, @curEduYear, ('"' + @curEduYear + '"'), 'null') + ', ' +
					 'TOEFLScore='					+ dbo.fnc_utilCheckString(1, @TOEFLScore, ('"' + @TOEFLScore + '"'), 'null') + ', ' +
					 'TOEFLTypeId='					+ dbo.fnc_utilCheckString(1, @TOEFLTypeId, ('"' + @TOEFLTypeId + '"'), 'null') + ', ' +
					 'IELTSResult='					+ dbo.fnc_utilCheckString(1, @IELTSResult, ('"' + @IELTSResult + '"'), 'null') + ', ' +
					 'englishNativeOther='			+ dbo.fnc_utilCheckString(1, @englishNativeOther, ('"' + @englishNativeOther + '"'), 'null') + ', ' +
					 'passportFile='				+ dbo.fnc_utilCheckString(1, @passportFile, ('"' + @passportFile + '"'), 'null') + ', ' +
					 'facePhotographsFile='			+ dbo.fnc_utilCheckString(1, @facePhotographsFile, ('"' + @facePhotographsFile + '"'), 'null') + ', ' +
					 'transcriptFile='				+ dbo.fnc_utilCheckString(1, @transcriptFile, ('"' + @transcriptFile + '"'), 'null') + ', ' +
					 'travelInsuranceFile='			+ dbo.fnc_utilCheckString(1, @travelInsuranceFile, ('"' + @travelInsuranceFile + '"'), 'null') + ', ' +
					 'letterHomeUniversityFile='	+ dbo.fnc_utilCheckString(1, @letterHomeUniversityFile, ('"' + @letterHomeUniversityFile + '"'), 'null') + ', ' +
					 'curriculumVitaeFile='			+ dbo.fnc_utilCheckString(1, @curriculumVitaeFile, ('"' + @curriculumVitaeFile + '"'), 'null') + ', ' +
					 'TOEFLIELTSFile='				+ dbo.fnc_utilCheckString(1, @TOEFLIELTSFile, ('"' + @TOEFLIELTSFile + '"'), 'null') + ', ' +
					 'letterIntentFile='			+ dbo.fnc_utilCheckString(1, @letterIntentFile, ('"' + @letterIntentFile + '"'), 'null') + ', ' +
					 'declarationA='				+ dbo.fnc_utilCheckString(1, @declarationA, ('"' + @declarationA + '"'), 'null') + ', ' +
					 'declarationB='				+ dbo.fnc_utilCheckString(1, @declarationB, ('"' + @declarationB + '"'), 'null') + ', ' +
					 'declarationC='				+ dbo.fnc_utilCheckString(1, @declarationC, ('"' + @declarationC + '"'), 'null') + ', ' +
					 'declarationD='				+ dbo.fnc_utilCheckString(1, @declarationD, ('"' + @declarationD + '"'), 'null') + ', ' +
					 'declarationE='				+ dbo.fnc_utilCheckString(1, @declarationE, ('"' + @declarationE + '"'), 'null') + ', ' +
					 'declarationESpecify='			+ dbo.fnc_utilCheckString(1, @declarationESpecify, ('"' + @declarationESpecify + '"'), 'null') + ', ' +
					 'submitStatus='				+ dbo.fnc_utilCheckString(1, @submitStatus, ('"' + @submitStatus + '"'), 'null') + ', ' +
					 'submitDate='					+ dbo.fnc_utilCheckString(1, @submitDate, ('"' + @submitDate + '"'), 'null') + ', ' +
					 'submitBy='					+ dbo.fnc_utilCheckString(1, @submitBy, ('"' + @submitBy + '"'), 'null') + ', ' +
					 'submitIp='					+ dbo.fnc_utilCheckString(1, @submitIp, ('"' + @submitIp + '"'), 'null') + ', ' +
					 'applicationStatus='			+ dbo.fnc_utilCheckString(1, @applicationStatus, ('"' + @applicationStatus + '"'), 'null') + ', ' +
					 'centralApprovalStatus='		+ dbo.fnc_utilCheckString(1, @centralApprovalStatus, ('"' + @centralApprovalStatus + '"'), 'null') + ', ' +
					 'centralApprovalDate='			+ dbo.fnc_utilCheckString(1, @centralApprovalDate, ('"' + @centralApprovalDate + '"'), 'null') + ', ' +
					 'centralApprovalBy='			+ dbo.fnc_utilCheckString(1, @centralApprovalBy, ('"' + @centralApprovalBy + '"'), 'null') + ', ' +
					 'centralApprovalIp='			+ dbo.fnc_utilCheckString(1, @centralApprovalIp, ('"' + @centralApprovalIp + '"'), 'null') + ', ' +
					 'divisionApprovalStatus='		+ dbo.fnc_utilCheckString(1, @divisionApprovalStatus, ('"' + @divisionApprovalStatus + '"'), 'null') + ', ' +
					 'divisionApprovalDate='		+ dbo.fnc_utilCheckString(1, @divisionApprovalDate, ('"' + @divisionApprovalDate + '"'), 'null') + ', ' +
					 'divisionApprovalBy='			+ dbo.fnc_utilCheckString(1, @divisionApprovalBy, ('"' + @divisionApprovalBy + '"'), 'null') + ', ' +
					 'divisionApprovalIp='			+ dbo.fnc_utilCheckString(1, @divisionApprovalIp, ('"' + @divisionApprovalIp + '"'), 'null') + ', ' +
					 'reason='						+ dbo.fnc_utilCheckString(1, @reason, ('"' + @reason + '"'), 'null') + ', ' +
					 'cancelledStatus='				+ dbo.fnc_utilCheckString(1, @cancelledStatus, ('"' + @cancelledStatus + '"'), 'null')

		begin try
			begin tran
				if (@action = 'INSERT')
				begin
					if ((dbo.fnc_utilCheckString(1, @userId, @userId, null) is not null) and
						(dbo.fnc_utilCheckString(1, @verifyCode, @verifyCode, null) is not null))
					begin
						set @recordCount = (
							select	count(id)
							from	Bermuda..sexUser with(nolock)
							where	(id = @userId) and
									(verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS) and
									(verifiedStatus = 'Y')
						)

						if (@recordCount > 0)
						begin
							set @rowCountUpdate = (
								select	count(sexapp.id)
								from	Bermuda..sexApplication as sexapp with(nolock) left join
										Bermuda..sexUser as sexusr with(nolock) on sexapp.sexUserId = sexusr.id
								where	(sexapp.cancelledStatus = 'N') and
										(sexusr.id = @userId) and
										(sexusr.verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS) and
										(sexusr.verifiedStatus = 'Y')
							)							

							if (@rowCountUpdate = 0)
							begin
								exec sp_sexGenerateApplicationId
									@applicationId = @applicationId output
					
								set @id = @applicationId
								set @applicationStatus = 'WA'

								insert into Bermuda..sexApplication
								(
									id,
									sexUserId,
									perTitlePrefixId,
									firstName,
									middleName,
									lastName,
									perNationalityId,
									perGenderId,
									email,									
									plcCountryId,
									submitStatus,
									applicationStatus,
									cancelledStatus,
									createDate,
									createBy,
									createIp
								)
								select	@id,
										id,
										perTitlePrefixId,
										firstName,
										middleName,
										lastName,
										perNationalityId,
										perGenderId,
										email,										
										plcCountryId,
										'N',
										@applicationStatus,
										'N',
										getdate(),
										dbo.fnc_utilCheckString(1, @by, @by, null),
										dbo.fnc_utilCheckString(1, @ip, @ip, null)
								from	Bermuda..sexUser with(nolock)
								where	(id = @userId) and
										(verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS) and
										(verifiedStatus = 'Y')

								set @rowCount = @rowCount + 1
							end
						end
					end
				end
						
				if (@action = 'UPDATE' or @action = 'DELETE')					
				begin
					if ((dbo.fnc_utilCheckString(1, @id, @id, null) is not null) and
						(dbo.fnc_utilCheckString(1, @userId, @userId, null) is not null) and
						(dbo.fnc_utilCheckString(1, @verifyCode, @verifyCode, null) is not null))
					begin
						set @rowCountUpdate = (
							select	count(sexapp.id)
							from	Bermuda..sexApplication as sexapp with(nolock) left join
									Bermuda..sexUser as sexusr with(nolock) on sexapp.sexUserId = sexusr.id
							where	(sexapp.id = @id) and
									(sexusr.id = @userId) and
									(sexusr.verifyCode = @verifyCode COLLATE SQL_Latin1_General_CP1_CS_AS) and
									(sexusr.verifiedStatus = 'Y')
						)

						if (@rowCountUpdate > 0)
						begin
							if (@action = 'UPDATE')
							begin
								update Bermuda..sexApplication set
									sexUserId						= dbo.fnc_utilCheckString(1, @userId, @userId, dbo.fnc_utilCheckString(2, @userId, null, sexUserId)),
									perTitlePrefixId				= dbo.fnc_utilCheckString(1, @titlePrefixId, @titlePrefixId, dbo.fnc_utilCheckString(2, @titlePrefixId, null, perTitlePrefixId)),
									firstName						= dbo.fnc_utilCheckString(1, @firstName, @firstName, dbo.fnc_utilCheckString(2, @firstName, null, firstName)),
									middleName						= dbo.fnc_utilCheckString(1, @middleName, @middleName, dbo.fnc_utilCheckString(2, @middleName, null, middleName)),
									lastName						= dbo.fnc_utilCheckString(1, @lastName, @lastName, dbo.fnc_utilCheckString(2, @lastName, null, lastName)),
									perNationalityId				= dbo.fnc_utilCheckString(1, @nationalityId, @nationalityId, dbo.fnc_utilCheckString(2, @nationalityId, null, perNationalityId)),
									perGenderId						= dbo.fnc_utilCheckString(1, @genderId, @genderId, dbo.fnc_utilCheckString(2, @genderId, null, perGenderId)),
									email							= dbo.fnc_utilCheckString(1, @email, @email, dbo.fnc_utilCheckString(2, @email, null, email)),									
									sexStudentCategoryId			= dbo.fnc_utilCheckString(1, @studentCategoryId, @studentCategoryId, dbo.fnc_utilCheckString(2, @studentCategoryId, null, sexStudentCategoryId)),
									studentCategorySpecify 			= dbo.fnc_utilCheckString(1, @studentCategorySpecify, @studentCategorySpecify, dbo.fnc_utilCheckString(2, @studentCategorySpecify, null, studentCategorySpecify)),
									studentCategoryOther 			= dbo.fnc_utilCheckString(1, @studentCategoryOther, @studentCategoryOther, dbo.fnc_utilCheckString(2, @studentCategoryOther, null, studentCategoryOther)),
									plcCountryId					= dbo.fnc_utilCheckString(1, @countryId, @countryId, dbo.fnc_utilCheckString(2, @countryId, null, plcCountryId)),
									plcUniversityId					= dbo.fnc_utilCheckString(1, @universityId, @universityId, dbo.fnc_utilCheckString(2, @universityId, null, plcUniversityId)),
									universityOther					= dbo.fnc_utilCheckString(1, @universityOther, @universityOther, dbo.fnc_utilCheckString(2, @universityOther, null, universityOther)),
									acaFacultyId					= dbo.fnc_utilCheckString(1, @facultyId, @facultyId, dbo.fnc_utilCheckString(2, @facultyId, null, acaFacultyId)),
									department						= dbo.fnc_utilCheckString(1, @department, @department, dbo.fnc_utilCheckString(2, @department, null, department)),
									semesterDateStart				= (case when (dbo.fnc_utilCheckString(1, @semesterDateStart, @semesterDateStart, null) is not null) then convert(datetime, @semesterDateStart, 103) else dbo.fnc_utilCheckString(2, @semesterDateStart, null, semesterDateStart) end),
									semesterDateEnd					= (case when (dbo.fnc_utilCheckString(1, @semesterDateEnd, @semesterDateEnd, null) is not null) then convert(datetime, @semesterDateEnd, 103) else dbo.fnc_utilCheckString(2, @semesterDateEnd, null, semesterDateEnd) end),
									homeAddress						= dbo.fnc_utilCheckString(1, @homeAddress, @homeAddress, dbo.fnc_utilCheckString(2, @homeAddress, null, homeAddress)),
									homeDistrict					= dbo.fnc_utilCheckString(1, @homeDistrict, @homeDistrict, dbo.fnc_utilCheckString(2, @homeDistrict, null, homeDistrict)),
									homeCity						= dbo.fnc_utilCheckString(1, @homeCity, @homeCity, dbo.fnc_utilCheckString(2, @homeCity, null, homeCity)),
									homeProvince					= dbo.fnc_utilCheckString(1, @homeProvince, @homeProvince, dbo.fnc_utilCheckString(2, @homeProvince, null, homeProvince)),
									homePostalCode					= dbo.fnc_utilCheckString(1, @homePostalCode, @homePostalCode, dbo.fnc_utilCheckString(2, @homePostalCode, null, homePostalCode)),
									plcCountryHomeId				= dbo.fnc_utilCheckString(1, @countryHomeId, @countryHomeId, dbo.fnc_utilCheckString(2, @countryHomeId, null, plcCountryHomeId)),
									mailingAddress					= dbo.fnc_utilCheckString(1, @mailingAddress, @mailingAddress, dbo.fnc_utilCheckString(2, @mailingAddress, null, mailingAddress)),
									mailingDistrict					= dbo.fnc_utilCheckString(1, @mailingDistrict, @mailingDistrict, dbo.fnc_utilCheckString(2, @mailingDistrict, null, mailingDistrict)),
									mailingCity						= dbo.fnc_utilCheckString(1, @mailingCity, @mailingCity, dbo.fnc_utilCheckString(2, @mailingCity, null, mailingCity)),
									mailingProvince					= dbo.fnc_utilCheckString(1, @mailingProvince, @mailingProvince, dbo.fnc_utilCheckString(2, @mailingProvince, null, mailingProvince)),
									mailingPostalCode				= dbo.fnc_utilCheckString(1, @mailingPostalCode, @mailingPostalCode, dbo.fnc_utilCheckString(2, @mailingPostalCode, null, mailingPostalCode)),
									plcCountryMailingId				= dbo.fnc_utilCheckString(1, @countryMailingId, @countryMailingId, dbo.fnc_utilCheckString(2, @countryMailingId, null, plcCountryMailingId)),
									contactTel						= dbo.fnc_utilCheckString(1, @contactTel, @contactTel, dbo.fnc_utilCheckString(2, @contactTel, null, contactTel)),
									birthDate						= (case when (dbo.fnc_utilCheckString(1, @birthdate, @birthdate, null) is not null) then convert(datetime, @birthdate, 103) else dbo.fnc_utilCheckString(2, @birthdate, null, birthDate) end),
									perMaritalStatusId				= dbo.fnc_utilCheckString(1, @maritalStatusId, @maritalStatusId, dbo.fnc_utilCheckString(2, @maritalStatusId, null, perMaritalStatusId)),
									passportNumber					= dbo.fnc_utilCheckString(1, @passportNumber, @passportNumber, dbo.fnc_utilCheckString(2, @passportNumber, null, passportNumber)),
									passportExpiryDate				= (case when (dbo.fnc_utilCheckString(1, @passportExpiryDate, @passportExpiryDate, null) is not null) then convert(datetime, @passportExpiryDate, 103) else dbo.fnc_utilCheckString(2, @passportExpiryDate, null, passportExpiryDate) end),
									emergencyName					= dbo.fnc_utilCheckString(1, @emergencyName, @emergencyName, dbo.fnc_utilCheckString(2, @emergencyName, null, emergencyName)),
									perRelationshipId				= dbo.fnc_utilCheckString(1, @relationshipId, @relationshipId, dbo.fnc_utilCheckString(2, @relationshipId, null, perRelationshipId)),
									emergencyMailingAddress			= dbo.fnc_utilCheckString(1, @emergencyMailingAddress, @emergencyMailingAddress, dbo.fnc_utilCheckString(2, @emergencyMailingAddress, null, emergencyMailingAddress)),
									emergencyMailingDistrict		= dbo.fnc_utilCheckString(1, @emergencyMailingDistrict, @emergencyMailingDistrict, dbo.fnc_utilCheckString(2, @emergencyMailingDistrict, null, emergencyMailingDistrict)),
									emergencyMailingCity			= dbo.fnc_utilCheckString(1, @emergencyMailingCity, @emergencyMailingCity, dbo.fnc_utilCheckString(2, @emergencyMailingCity, null, emergencyMailingCity)),
									emergencyMailingProvince		= dbo.fnc_utilCheckString(1, @emergencyMailingProvince, @emergencyMailingProvince, dbo.fnc_utilCheckString(2, @emergencyMailingProvince, null, emergencyMailingProvince)),
									emergencyMailingPostalCode		= dbo.fnc_utilCheckString(1, @emergencyMailingPostalCode, @emergencyMailingPostalCode, dbo.fnc_utilCheckString(2, @emergencyMailingPostalCode, null, emergencyMailingPostalCode)),
									plcCountryMailingEmergencyId	= dbo.fnc_utilCheckString(1, @countryMailingEmergencyId, @countryMailingEmergencyId, dbo.fnc_utilCheckString(2, @countryMailingEmergencyId, null, plcCountryMailingEmergencyId)),
									emergencyHomeTel				= dbo.fnc_utilCheckString(1, @emergencyHomeTel, @emergencyHomeTel, dbo.fnc_utilCheckString(2, @emergencyHomeTel, null, emergencyHomeTel)),
									emergencyOfficeTel				= dbo.fnc_utilCheckString(1, @emergencyOfficeTel, @emergencyOfficeTel, dbo.fnc_utilCheckString(2, @emergencyOfficeTel, null, emergencyOfficeTel)),
									emergencyMobile					= dbo.fnc_utilCheckString(1, @emergencyMobile, @emergencyMobile, dbo.fnc_utilCheckString(2, @emergencyMobile, null, emergencyMobile)),
									emergencyFax					= dbo.fnc_utilCheckString(1, @emergencyFax, @emergencyFax, dbo.fnc_utilCheckString(2, @emergencyFax, null, emergencyFax)),
									emergencyEmail					= dbo.fnc_utilCheckString(1, @emergencyEmail, @emergencyEmail, dbo.fnc_utilCheckString(2, @emergencyEmail, null, emergencyEmail)),
									curEduInstitution				= dbo.fnc_utilCheckString(1, @curEduInstitution, @curEduInstitution, dbo.fnc_utilCheckString(2, @curEduInstitution, null, curEduInstitution)),
									curEduFaculty					= dbo.fnc_utilCheckString(1, @curEduFaculty, @curEduFaculty, dbo.fnc_utilCheckString(2, @curEduFaculty, null, curEduFaculty)),
									sexDisciplineId					= dbo.fnc_utilCheckString(1, @disciplineId, @disciplineId, dbo.fnc_utilCheckString(2, @disciplineId, null, sexDisciplineId)),
									perEducationalBackgroundId		= dbo.fnc_utilCheckString(1, @educationalBackgroundId, @educationalBackgroundId, dbo.fnc_utilCheckString(2, @educationalBackgroundId, null, perEducationalBackgroundId)),
									curEduYear						= dbo.fnc_utilCheckString(1, @curEduYear, @curEduYear, dbo.fnc_utilCheckString(2, @curEduYear, null, curEduYear)),
									TOEFLScore						= dbo.fnc_utilCheckString(1, @TOEFLScore, @TOEFLScore, dbo.fnc_utilCheckString(2, @TOEFLScore, null, TOEFLScore)),
									sexTOEFLTypeId					= dbo.fnc_utilCheckString(1, @TOEFLTypeId, @TOEFLTypeId, dbo.fnc_utilCheckString(2, @TOEFLTypeId, null, sexTOEFLTypeId)),
									IELTSResult						= dbo.fnc_utilCheckString(1, @IELTSResult, @IELTSResult, dbo.fnc_utilCheckString(2, @IELTSResult, null, IELTSResult)),
									englishNativeOther				= dbo.fnc_utilCheckString(1, @englishNativeOther, @englishNativeOther, dbo.fnc_utilCheckString(2, @englishNativeOther, null, englishNativeOther)),
									passportFile					= dbo.fnc_utilCheckString(1, @passportFile, @passportFile, dbo.fnc_utilCheckString(2, @passportFile, null, passportFile)),
									facePhotographsFile				= dbo.fnc_utilCheckString(1, @facePhotographsFile, @facePhotographsFile, dbo.fnc_utilCheckString(2, @facePhotographsFile, null, facePhotographsFile)),
									transcriptFile					= dbo.fnc_utilCheckString(1, @transcriptFile, @transcriptFile, dbo.fnc_utilCheckString(2, @transcriptFile, null, transcriptFile)),
									travelInsuranceFile				= dbo.fnc_utilCheckString(1, @travelInsuranceFile, @travelInsuranceFile, dbo.fnc_utilCheckString(2, @travelInsuranceFile, null, travelInsuranceFile)),
									letterHomeUniversityFile		= dbo.fnc_utilCheckString(1, @letterHomeUniversityFile, @letterHomeUniversityFile, dbo.fnc_utilCheckString(2, @letterHomeUniversityFile, null, letterHomeUniversityFile)),
									curriculumVitaeFile				= dbo.fnc_utilCheckString(1, @curriculumVitaeFile, @curriculumVitaeFile, dbo.fnc_utilCheckString(2, @curriculumVitaeFile, null, curriculumVitaeFile)),
									TOEFLIELTSFile					= dbo.fnc_utilCheckString(1, @TOEFLIELTSFile, @TOEFLIELTSFile, dbo.fnc_utilCheckString(2, @TOEFLIELTSFile, null, TOEFLIELTSFile)),
									letterIntentFile				= dbo.fnc_utilCheckString(1, @letterIntentFile, @letterIntentFile, dbo.fnc_utilCheckString(2, @letterIntentFile, null, letterIntentFile)),
									declarationA					= dbo.fnc_utilCheckString(1, @declarationA, @declarationA, dbo.fnc_utilCheckString(2, @declarationA, null, declarationA)),
									declarationB					= dbo.fnc_utilCheckString(1, @declarationB, @declarationB, dbo.fnc_utilCheckString(2, @declarationB, null, declarationB)),
									declarationC					= dbo.fnc_utilCheckString(1, @declarationC, @declarationC, dbo.fnc_utilCheckString(2, @declarationC, null, declarationC)),
									declarationD					= dbo.fnc_utilCheckString(1, @declarationD, @declarationD, dbo.fnc_utilCheckString(2, @declarationD, null, declarationD)),
									declarationE					= dbo.fnc_utilCheckString(1, @declarationE, @declarationE, dbo.fnc_utilCheckString(2, @declarationE, null, declarationE)),
									declarationESpecify 			= dbo.fnc_utilCheckString(1, @declarationESpecify, @declarationESpecify, dbo.fnc_utilCheckString(2, @declarationESpecify, null, declarationESpecify)),
									submitStatus					= dbo.fnc_utilCheckString(1, @submitStatus, @submitStatus, dbo.fnc_utilCheckString(2, @submitStatus, null, submitStatus)),
									submitDate						= (case when (dbo.fnc_utilCheckString(1, @submitDate, @submitDate, null) is not null) then convert(datetime, @submitDate, 103) else dbo.fnc_utilCheckString(2, @submitStatus, null, submitDate) end),
									submitBy						= dbo.fnc_utilCheckString(1, @submitStatus, @submitBy, dbo.fnc_utilCheckString(2, @submitStatus, null, submitBy)),
									submitIp						= dbo.fnc_utilCheckString(1, @submitStatus, @submitIp, dbo.fnc_utilCheckString(2, @submitStatus, null, submitIp)),
									applicationStatus				= dbo.fnc_utilCheckString(1, @applicationStatus, @applicationStatus, dbo.fnc_utilCheckString(2, @applicationStatus, null, applicationStatus)),
									centralApprovalStatus			= dbo.fnc_utilCheckString(1, @centralApprovalStatus, @centralApprovalStatus, dbo.fnc_utilCheckString(2, @centralApprovalStatus, null, centralApprovalStatus)),
									centralApprovalDate				= (case when (dbo.fnc_utilCheckString(1, @centralApprovalDate, @centralApprovalDate, null) is not null) then convert(datetime, @centralApprovalDate, 103) else dbo.fnc_utilCheckString(2, @centralApprovalStatus, null, centralApprovalDate) end),
									centralApprovalBy				= dbo.fnc_utilCheckString(1, @centralApprovalStatus, @centralApprovalBy, dbo.fnc_utilCheckString(2, @centralApprovalStatus, null, centralApprovalBy)),
									centralApprovalIp				= dbo.fnc_utilCheckString(1, @centralApprovalStatus, @centralApprovalIp, dbo.fnc_utilCheckString(2, @centralApprovalStatus, null, centralApprovalIp)),
									divisionApprovalStatus			= dbo.fnc_utilCheckString(1, @divisionApprovalStatus, @divisionApprovalStatus, dbo.fnc_utilCheckString(2, @divisionApprovalStatus, null, divisionApprovalStatus)),
									divisionApprovalDate			= (case when (dbo.fnc_utilCheckString(1, @divisionApprovalDate, @divisionApprovalDate, null) is not null) then convert(datetime, @divisionApprovalDate, 103) else dbo.fnc_utilCheckString(2, @divisionApprovalDate, null, divisionApprovalDate) end),
									divisionApprovalBy				= dbo.fnc_utilCheckString(1, @divisionApprovalStatus, @divisionApprovalBy, dbo.fnc_utilCheckString(2, @divisionApprovalStatus, null, divisionApprovalBy)),
									divisionApprovalIp				= dbo.fnc_utilCheckString(1, @divisionApprovalStatus, @divisionApprovalIp, dbo.fnc_utilCheckString(2, @divisionApprovalStatus, null, divisionApprovalIp)),
									reason							= dbo.fnc_utilCheckString(1, @reason, @reason, dbo.fnc_utilCheckString(2, @reason, null, reason)),
									cancelledStatus					= dbo.fnc_utilCheckString(1, @cancelledStatus, @cancelledStatus, dbo.fnc_utilCheckString(2, @cancelledStatus, null, cancelledStatus)),
									modifyDate						= getdate(),
									modifyBy						= dbo.fnc_utilCheckString(1, @by, @by, dbo.fnc_utilCheckString(2, @by, null, modifyBy)),
									modifyIp						= dbo.fnc_utilCheckString(1, @ip, @ip, dbo.fnc_utilCheckString(2, @ip, null, modifyIp))
								where (id = @id) and (sexUserId = @userId)
							end
							
							if (@action = 'DELETE')
							begin
								delete from Bermuda..sexApplication where (id = @id) and (sexUserId = @userId)
							end
							
							set @rowCount = @rowCount + 1							
						end
					end
				end
			commit tran
		end try
		begin catch
			rollback tran
			insert into BermudaLog..sexErrorLog
			(
				errorDatabase,
				errorTable,
				errorAction,
				errorValue,
				errorMessage,
				errorNumber,
				errorSeverity,
				errorState,
				errorLine,
				errorProcedure,
				errorActionDate,
				errorActionBy,
				errorIp
			)
			values
			(
				db_name(),
				@table,
				@action,
				@value,
				error_message(),
				error_number(),
				error_severity(),
				error_state(),
				error_line(),
				error_procedure(),
				getdate(),
				dbo.fnc_utilCheckString(1, @by, @by, null),
				dbo.fnc_utilCheckString(1, @ip, @ip, null)
			)			
		end catch
	end
	/*
	if (@rowCount = 1)
	begin
		if (@action = 'UPDATE' and @submitStatus = 'Y')
		begin
			begin try
				select	@titlePrefixId = perTitlePrefixId,
						@firstName = firstName,
						@middleName = middleName,
						@lastName = lastName,
						@email = email
				from	Bermuda..sexUser
				where	(id = @userId) and (verifyCode = @verifyCode)

				set @titlePrefixName = (select enTitleInitials from Infinity..perTitlePrefix with(nolock) where id = @titlePrefixId)
				set @link = 'https://musais.mahidol.ac.th/OnlineApplication/#/Application/View/'
				--set @link = 'http://10.90.101.101:8080/MUSAIS.OnlineApplication/#/Application/View/'
				set @recipients = @email
				set @subject = 'MUSAIS : Submit Application'
				set @mail =  
					N'Hi, ' + (isnull(@titlePrefixName, '') + @firstName + ' ' + (case when (len(@middleName) > 0) then (@middleName + ' ') else '' end) + @lastName) + '<br /><br />' +  
					N'<strong>Thank you for your submission.</strong><br />' +  
					N'Your online application form has been successfully submitted. Once your application is approved, the Faculty will notify you via email.<br />' +  
					N'<a href="' + @link + '">View Application</a>' +
					N'<br /><br />Regards,<br />Mahidol University Student, Academic and International Services ( MUSAIS )<br />Email : musais@mahidol.ac.th'
				/*
				exec msdb.dbo.sp_send_dbmail
					@profile_name = 'MUSAIS',  
					@recipients = @recipients,
					@subject = 'MUSAIS : Submit Application',  
					@body = @mail, 
					@body_format = 'HTML'
				*/
			end try
			begin catch
			end catch
		end
	end
	*/
	select	(case when (@rowCount = 1) then 'Y' else 'N' end) as success,
			@id as applicationId,
			@applicationStatus as applicationStatus,
			@submitStatus as submitStatus,
			@recipients as mailRecipients,
			@subject as mailSubject,
			@mail as mailMessage
end