/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๐๖/๒๕๖๑>
Modify date : <๑๒/๐๕/๒๕๖๕>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับพจนานุกรม>
=============================================
*/

(function () {
	"use strict";

	angular.module("dictMod", [])

	.service("dictServ", function () {
		var self = this;

		self.dict = {
			systemOwner: {
				TH: "",
				EN: "Mahidol University Student, Academic and International Services ( MUSAIS )",
				abbreviation: {
					TH: "",
					EN: "MUSAIS"
				},
				email: "musais@mahidol.ac.th"
			},
			systemName: {
				TH: "",
				EN: "Register for Exchange Program"
			},
			footer: {
				TH: "",
				EN: ("<span class='regular black f11'>Copyright <span class='f10'><i class='fa fa-copyright'></i></span> 2014 " + ((new Date().getFullYear() > 2017) ? (" - " + new Date().getFullYear()) : "") + " Mahidol University. All rights reserved.</span>")
			},
			processingSuccessful: {
				TH: "",
				EN: "Processing successful."
			},
			processingNotSuccessful: {
				TH: "",
				EN: "Processing was not successful, Please refresh this page or change web browser."
			},
			msgPreloading: {
				loading: {
					TH: "",
					EN: "Loading..."
				},
				checking: {
					TH: "",
					EN: "Checking"
				},
				saving: {
					TH: "",
					EN: "Saving..."
				},
				sending: {
					TH: "",
					EN: "Sending..."
				},
				signin: {
					TH: "",
					EN: "Sign In..."
				},
				uploading: {
					TH: "",
					EN: "Uploading..."
				},
				copying: {
					TH: "",
					EN: "Copying..."
				},
				submitting: {
					TH: "",
					EN: "Submitting..."
				},
				loadMore: {
					TH: "",
					EN: "Load more..."
				}
			},
			save: {
				TH: "",
				EN: "Save",
				confirm: {
					TH: "",
					EN: "Do you want to save changes ?"
				}
			},
			ok: {
				TH: "",
				EN: "OK"
			},
			cancel: {
				TH: "",
				EN: "Cancel"
			},
			discard: {
				TH: "",
				EN: "Discard"
			},
			submit: {
				TH: "",
				EN: "Submit",
				confirm: {
					TH: "",
					EN: "Do you want to submit application ?"
				}
			},
			close: {
				TH: "",
				EN: "Close"
			},
			send: {
				TH: "",
				EN: "Send",
				confirm: {
					TH: "",
					EN: "Do you want to send ?"
				}
			},
			modeUndefined: {
				TH: "",
				EN: "Mode undefined"
			},
			saveSuccess: {
				TH: "",
				EN: "Successfully saved."
			},
			saveNotSuccess: {
				TH: "",
				EN: "Not successfully saved."
			},
			deleteNotSuccess: {
				TH: "",
				EN: "Not successfully deleted."
			},
			uploadNotSuccess: {
				TH: "",
				EN: "Not successfully uploaded."
			},
			contact: {
				TH: "",
				EN: "Contact"
			},
			other: {
				TH: "",
				EN: "Other"
			},
			others: {
				TH: "",
				EN: "Others (..........)"
			},
			pleaseSpecify: {
				TH: "",
				EN: "please specify"
			},
			to: {
				TH: "",
				EN: "To"
			},
			sameAs: {
				TH: "",
				EN: "Same As"
			},
			copy: {
				TH: "",
				EN: "Copy"
			},
			placeholder: {
				nationality: {
					TH: "",
					EN: "Select or search a Nationality"
				},
				country: {
					TH: "",
					EN: "Select or search a Country"
				},
				university: {
					TH: "",
					EN: "Select or search a University"
				},
				faculty: {
					TH: "",
					EN: "Select or search a Faculty"
				},
				relationship: {
					TH: "",
					EN: "Select or search a Relationship"
				},
				discipline: {
					TH: "",
					EN: "Select or search a Discipline"
				},
				educationalBackground: {
					TH: "",
					EN: "Select or search a Level of Study"
				},
				yearStudy: {
					TH: "",
					EN: "Select or search a Year of Study"
				},
				TOEFLType: {
					TH: "",
					EN: "Select or search a TOEFL Type"
				}
			},
			dateFormat: {
				TH: "",
				EN: "Day/Month/Year ( A.D. )"
			},
			yes: {
				TH: "",
				EN: "Yes"
			},
			no: {
				TH: "",
				EN: "No"
			},
			browse: {
				TH: "",
				EN: "Browse"
			},
			upload: {
				TH: "",
				EN: "Upload",
				confirm: {
					before: {
						TH: "",
						EN: "Do you want to upload this file ?"
					},
					after: {
						TH: "",
						EN: "Do you want to upload another file ?"
					}
				}
			},
			delete: {
				TH: "",
				EN: "Delete"
			},
			view: {
				TH: "",
				EN: "View"
			},
			authen: {
				username: {
					TH: "",
					EN: "Username"
				},
				password: {
					TH: "",
					EN: "Password"
				},
				forgotPassword: {
					TH: "",
					EN: "Forgot Your Password!"
				},
				signin: {
					TH: "",
					EN: "Sign In"
				},
				signout: {
					TH: "",
					EN: "Sign Out",
					confirm: {
						TH: "",
						EN: "Confirm your would like to sign out."
					}
				},
				accessNotFound: {
					TH: "",
					EN: "Access not found."
				},
				accessInvalid: {
					TH: "",
					EN: "Access invalid."
				},
				userNotFound: {
					TH: "",
					EN: "User not found."
				},
				userNotVerify: {
					TH: "",
					EN: "Please click on the link in the email we sent you to verify your account."
				},
				reqSignin: {
					TH: "",
					EN: "Please sign in."
				}
			},
			createNewAccount: {
				TH: "",
				EN: "Create New Account",
				infoImportantRecommendMsg: {
					TH: "",
					EN: "Click \"SAVE\" we send you an email to make sure it was really you who entered the email address in form. Either click on the link in the email we sent you to verify your account."
				},
				infoImportantSuccessMsg: {
					TH: "",
					EN: "<span class='f8'>Thank you for create new account.</span><br />We send you an email to make sure it was really you who entered the email address in form. Either click on the link in the email we sent you to verify your account."
				},
				save: {
					TH: "",
					EN: "Error saving data.",
					emailError: {
						1: {
							TH: "",
							EN: "Please enter email address."
						},
						2: {
							TH: "",
							EN: "Invalid email address format specified."
						}
					},
					passwordError: {
						1: {
							TH: "",
							EN: "Please enter password."
						},
						2: {
							TH: "",
							EN: "Your password is too short."
						}
					},
					verifyPasswordError: {
						1: {
							TH: "",
							EN: "Please enter verify password."
						},
						2: {
							TH: "",
							EN: "Password do not match."
						}
					},
					titlePrefixError: {
						TH: "",
						EN: "Please select title prefix."
					},
					firstNameError: {
						TH: "",
						EN: "Please enter first name."
					},
					lastNameError: {
						TH: "",
						EN: "Please enter last name."
					},
					genderError: {
						TH: "",
						EN: "Please select gender."
					},
					nationalityError: {
						TH: "",
						EN: "Please select nationality / citizenship."
					},
					countryError: {
						TH: "",
						EN: "Please select country of home university."
					},
					userExistError: {
						TH: "",
						EN: "Duplicate email address or password"
					}
				}
			},
			activateAccount: {
				TH: "",
				EN: "Activate Your Account",
				infoImportantSuccessMsg: {
					TH: "",
					EN: "<span class='f8'>Thank you for activate your account.</span><br />Please sign in to online registration.<br /><div class='marginTop10'><a class='link' href='#/SignIn'>Sign In</a></div>"
				},
				activate: {
					TH: "",
					EN: "Activate"
				},
				confirm: {
					TH: "",
					EN: "Do you want to activate account ?"
				}
			},
			editAccount: {
				TH: "",
				EN: "Edit Your Account",
				infoImportantRecommendMsg: {
					TH: "",
					EN: "Click \"SAVE\" we send you an email to make sure it was really you who entered the email address in form."
				},
				save: {
					TH: "",
					EN: "Error saving data.",
					usernameError: {
						TH: "",
						EN: "Please enter username."
					},
					userExistError: {
						TH: "",
						EN: "Duplicate username or password"
					}
				}
			},
			requestPassword: {
				TH: "",
				EN: "Request Password",
				infoImportantSuccessMsg: {
					TH: "",
					EN: "Send password to email complete."
				},
				sendMail: {
					TH: "",
					EN: "Send To Email Address"
				},
				send: {
					TH: "",
					EN: "Error sending data.",
					usernameError: {
						TH: "",
						EN: "Please enter username."
					},
					verifyCodeError: {
						TH: "",
						EN: "Please enter verify code."
					},
					emailError: {
						1: {
							TH: "",
							EN: "Please enter email address."
						},
						2: {
							TH: "",
							EN: "Invalid email address format specified."
						}
					}
				}
			},
			user: {
				table: {
					username: {
						TH: "",
						EN: "Username"
					},
					password: {
						TH: "",
						EN: "Password"
					},
					verifyPassword: {
						TH: "",
						EN: "Verify Password"
					},
					newPassword: {
						TH: "",
						EN: "New Password"
					},
					verifyNewPassword: {
						TH: "",
						EN: "Verify New Password"
					},
					verifyCode: {
						TH: "",
						EN: "Verify Code"
					},
					fullName: {
						TH: "",
						EN: "Name"
					},
					titlePrefix: {
						TH: "",
						EN: "Title Prefix"
					},
					firstName: {
						TH: "",
						EN: "First Name"
					},
					middleName: {
						TH: "",
						EN: "Middle Name"
					},
					lastName: {
						TH: "",
						EN: "Last Name"
					},
					gender: {
						TH: "",
						EN: "Gender"
					},
					email: {
						TH: "",
						EN: "Email Address"
					},
					nationality: {
						TH: "",
						EN: "Nationality / Citizenship"
					},
					countryUniversity: {
						TH: "",
						EN: "Country of Home University"
					}
				}
			},
			application: {
				applicationNotFound: {
					TH: "",
					EN: "You application not found."
				},
				applicationStatusNotValid: {
					TH: "",
					EN: "Status you application is not valid."
				},
				save: {
					TH: "",
					EN: "Error saving data."
				},
				upload: {
					TH: "",
					EN: "Error uploading data."
				},
				infoImportantRecommendMsg: {
					TH: "",
					EN: "Your application will not be processed until you have submitted your application. Until then you are free modify your application.",
					university: {
						TH: "",
						EN: "Due to the high amount of university names, it is advisable to use keywords when looking up university names."
					}
				},
				infoImportantSuccessMsg: {
					TH: "",
					EN: "<span class='f8'>Thank you for your submission.</span><br />Your online application form has been successfully submitted. Once your application is approved, the Faculty will notify you via email.<br /><div class='marginTop10'><a class='link' href='#/Application/View'>View Application</a></div>"
				},
				studentInfo: {
					TH: "",
					EN: "Student Exchange Information",
					save: {
						studentCategoryError: {
							1: {
								TH: "",
								EN: "Please select student category."
							},
							2: {
								TH: "",
								EN: "Please enter specify student category."
							}
						},
						countryError: {
							TH: "",
							EN: " Please select country of home university."
						},
						universityError: {
							TH: "",
							EN: "Please select university of home university."
						},
						universityOtherError: {
							TH: "",
							EN: "Please enter university other of home university."
						},
						facultyError: {
							TH: "",
							EN: "Please select MU host faculty / college / institution."
						},
						semesterError: {
							TH: "",
							EN: "Please enter period of intended stay in MU to complete."
						}
					},
					submit: {
						TH: "",
						EN: "Student exchange information not complete."
					}
				},
				personalInfo: {
					TH: "",
					EN: "Personal Information",
					profile: {
						TH: "",
						EN: "Profile",
						infoImportantRecommendMsg: {
							TH: "",
							EN: "As shown in your passport or identity card."
						},
						save: {
							titlePrefixError: {
								TH: "",
								EN: "Please select title prefix."
							},
							firstNameError: {
								TH: "",
								EN: "Please enter first name."
							},
							lastNameError: {
								TH: "",
								EN: "Please enter last name."
							},
							birthDateError: {
								TH: "",
								EN: "Please enter date of birth."
							},
							genderError: {
								TH: "",
								EN: "Please select gender."
							},
							nationalityError: {
								TH: "",
								EN: "Please select nationality / citizenship."
							},
							maritalStatusError: {
								TH: "",
								EN: "Please select marital status."
							},
							passportNumberError: {
								TH: "",
								EN: "Please enter passport number."
							},
							passportExpiryDateError: {
								TH: "",
								EN: "Please enter passport expiry date."
							}
						}
					},
					homeAddress: {
						TH: "",
						EN: "Permanent Home Address",
						infoImportantRecommendMsg: {
							TH: "",
							EN: "You must enter a living."
						},
						save: {
							addressError: {
								TH: "",
								EN: "Please enter address."
							},
							cityError: {
								TH: "",
								EN: "Please enter city."
							},
							provinceError: {
								TH: "",
								EN: "Please enter state / province."
							},
							countryError: {
								TH: "",
								EN: "Please select country."
							}
						}
					},
					mailingAddress: {
						TH: "",
						EN: "Mailing Address",
						infoImportantRecommendMsg: {
							TH: "",
							EN: "You must enter a mailing address. If your mailing address same as the permanent home address, click copy button."
						},
						save: {
							addressError: {
								TH: "",
								EN: "Please enter address."
							},
							cityError: {
								TH: "",
								EN: "Please enter city."
							},
							provinceError: {
								TH: "",
								EN: "Please enter state / province."
							},
							countryError: {
								TH: "",
								EN: "Please select country."
							}
						}
					},
					contact: {
						TH: "",
						EN: "Contact",
						infoImportantRecommendMsg: {
							TH: "",
							EN: "Add country and area codes for telephone numbers."
						},
						save: {
							emailError: {
								1: {
									TH: "",
									EN: "Please enter email address."
								},
								2: {
									TH: "",
									EN: "Invalid email address format specified."
								}
							}
						}
					},
					emergencyContact: {
						TH: "",
						EN: "Emergency Contact",
						infoImportantRecommendMsg: {
							TH: "",
							EN: "<div class='error-list'>" +
								"	<ul>" +
								"		<li>" +
								"			Please give the name of a contact person, who can be contacted in the event of an emergency and can speak English." +
								"		</li>" +
								"		<li>" +
								"			Make sure that he/she provides permission before you add his/her personal information." +
								"		</li>" +			
								"	</ul>" +
								"</div>"
						},
						save: {
							nameError: {
								TH: "",
								EN: "Please enter name of the contact person."
							},
							relationshipError: {
								TH: "",
								EN: "Please select relationship to you."
							},
							mailingAddressError: {
								TH: "",
								EN: "Please enter mailing address."
							},
							cityError: {
								TH: "",
								EN: "Please enter city."
							},
							provinceError: {
								TH: "",
								EN: "Please enter state / province."
							},
							countryError: {
								TH: "",
								EN: "Please select country."
							},
							homeTelError: {
								TH: "",
								EN: "Please enter home telephone number."
							},
							mobileError: {
								TH: "",
								EN: "Please enter mobile number."
							},
							emailError: {
								1: {
									TH: "",
									EN: "Please enter email address."
								},
								2: {
									TH: "",
									EN: "Invalid email address format specified."
								}
							}
						}
					},
					submit: {
						TH: "",
						EN: "Personal information not complete."
					}
				},
				academicInfo: {
					TH: "",
					EN: "Academic Information",
					curEdu: {
						TH: "",
						EN: "Current Education",
						infoImportantRecommendMsg: {
							TH: "",
							EN: "Write the name of the institute / school for you level of study."
						},
						save: {
							eduInstitutionError: {
								TH: "",
								EN: "Please enter name of home university."
							},
							eduFacultyError: {
								TH: "",
								EN: "Please enter name of faculty / college / institution / school."
							},
							disciplineError: {
								TH: "",
								EN: "Please select discipline."
							},
							educationalBackgroundError: {
								TH: "",
								EN: "Please select level of study."
							},
							yearStudyError: {
								TH: "",
								EN: "Please select year of study."
							}
						}
					},
					englishProficiency: {
						TH: "",
						EN: "English Language Proficiency",
						save: {
							TOEFLScoreError: {
								TH: "",
								EN: "Please enter TOEFL score."
							},
							TOEFLTypeError: {
								TH: "",
								EN: "Please select TOEFL type."
							},
							IELTSResultError: {
								TH: "",
								EN: "Please enter IELTS result."
							},
							englishProficiencyOther: {
								TH: "",
								EN: "Please enter english proficiency other."
							}
						}
					},
					submit: {
						TH: "",
						EN: "Academic information not complete."
					}
				},
				uploadDocuments: {
					TH: "",
					EN: "Upload Supporting Documents",
					upload: {
						documentError: {
							1: {
								TH: "",
								EN: "Please browse to select a file."
							},
							2: {
								TH: "",
								EN: "Invalid file type."
							},
							3: {
								TH: "",
								EN: "File size not found."
							}
						}
					},
					submit: {
						TH: "",
						EN: "Upload supporting documents not complete."
					}
				},
				declaration: {
					TH: "",
					EN: "Declaration",
					save: {
						declarationAError: {
							TH: "",
							EN: "Please select you to require special assistance or facilities while studying at Mahidol University."
						},
						declarationBError: {
							TH: "",
							EN: "Please enter provide further details and any relevant information."
						},
						declarationCError: {
							TH: "",
							EN: "Please select items ( c )"
						},
						declarationDError: {
							TH: "",
							EN: "Please select items ( d )"
						},
						declarationEError: {
							1: {
								TH: "",
								EN: "Please select have any dietary requirements."
							},
							2: {
								TH: "",
								EN: "Please enter have any dietary requirements."
							}
						}
					},
					submit: {
						TH: "",
						EN: "Declaration not complete."
					}
				},
				table: {
					studentCategory: {
						TH: "",
						EN: "Student Category"
					},
					homeUniversity: {
						TH: "",
						EN: "Home University"
					},
					university: {
						TH: "",
						EN: "University"
					},
					muFaculty: {
						TH: "",
						EN: "MU Host Faculty / College / Institution"
					},
					department: {
						TH: "",
						EN: "Department ( optional )"
					},
					periodStayMU: {
						TH: "",
						EN: "Period of Intended Stay in MU"
					},
					birthDate: {
						TH: "",
						EN: "Date of Birth"
					},
					maritalStatus: {
						TH: "",
						EN: "Marital Status"
					},
					passportNumber: {
						TH: "",
						EN: "Passport Number"
					},
					passportExpiryDate: {
						TH: "",
						EN: "Passport Expiry Date"
					},
					address: {
						TH: "",
						EN: "Address"
					},
					district: {
						TH: "",
						EN: "District"
					},
					city: {
						TH: "",
						EN: "City"
					},
					province: {
						TH: "",
						EN: "State / Province"
					},
					postalCode: {
						TH: "",
						EN: "Postal Code ( if any... )"
					},
					country: {
						TH: "",
						EN: "Country"
					},
					contactTel: {
						TH: "",
						EN: "Telephone Number"
					},
					emergencyName: {
						TH: "",
						EN: "Name of the Contact Person"
					},
					relationship: {
						TH: "",
						EN: "Relationship to You"
					},
					mailingAddress: {
						TH: "",
						EN: "Mailing Address"
					},
					homeTel: {
						TH: "",
						EN: "Home Telephone Number"
					},
					officeTel: {
						TH: "",
						EN: "Office Telephone Number"
					},
					mobile: {
						TH: "",
						EN: "Mobile Number"
					},
					fax: {
						TH: "",
						EN: "Fax Number"
					},
					eduInstitution: {
						TH: "",
						EN: "Name of Home University"
					},
					eduFaculty: {
						TH: "",
						EN: "Name of Faculty / Institution / School"
					},
					discipline: {
						TH: "",
						EN: "Discipline"
					},
					educationalBackground: {
						TH: "",
						EN: "Level of Study"
					},
					yearStudy: {
						TH: "",
						EN: "Year of Study"
					},
					notEnglish: {
						TH: "",
						EN: "Not required for English Native Speakers"
					},
					TOEFLScore: {
						TH: "",
						EN: "TOEFL Score"
					},
					TOEFLType: {
						TH: "",
						EN: "TOEFL Type"
					},
					IELTSResult: {
						TH: "",
						EN: "IELTS Result"
					},
					passportFile: {
						TH: "",
						EN: "Copy of Passport",
						format: {
							TH: "",
							EN: "pdf / jpg / jpeg format"
						},
						description: {
							TH: "",
							EN: "The page showing your personal details."
						},
						fileName: "Passport"
					},
					facePhotographsFile: {
						TH: "",
						EN: "Full Face Photographs",
						format: {
							TH: "",
							EN: "jpg format"
						},
						description: {
							TH: "",
							EN: "Photo size 4 x 6 cm, Taken within the last six months."
						},
						fileName: "FacePhotographs"
					},
					transcriptFile: {
						TH: "",
						EN: "Latest Academic Transcript",
						format: {
							TH: "",
							EN: "pdf / jpg / jpeg format"
						},
						fileName: "Transcript"
					},
					travelInsuranceFile: {
						TH: "",
						EN: "Travel Insurance / Health Insurance",
						format: {
							TH: "",
							EN: "pdf / jpg / jpeg format"
						},
						description: {
							TH: "",
							EN: "It's compulsory to purchase a travel insurance or a health insurance from your home country."
						},
						fileName: "TravelInsurance"
					},
					letterHomeUniversityFile: {
						TH: "",
						EN: "Letter From the Home University",
						format: {
							TH: "",
							EN: "pdf / jpg / jpeg format"
						},
						fileName: "LetterHomeUniversity"
					},
					curriculumVitaeFile: {
						TH: "",
						EN: "Curriculum Vitae",
						format: {
							TH: "",
							EN: "pdf / jpg / jpeg format"
						},
						fileName: "CurriculumVitae"
					},
					TOEFLIELTSFile: {
						TH: "",
						EN: "Copy of TOEFL / IELTS",
						format: {
							TH: "",
							EN: "pdf / jpg / jpeg format"
						},
						fileName: "TOEFLIELTS"
					},
					letterIntentFile: {
						TH: "",
						EN: "Letter of Intent",
						format: {
							TH: "",
							EN: "pdf / jpg / jpeg format"
						},
						fileName: "LetterIntent"
					},
					declarationA: {
						order: {
							TH: "",
							EN: "a)"
						},
						subject: {
							TH: "",
							EN: "Have you had or do you have any medical, physical or psychological conditions  which may cause you to require special assistance or facilities while studying at Mahidol University ?"
						}
					},
					declarationB: {
						order: {
							TH: "",
							EN: "b)"
						},
						subject: {
							TH: "",
							EN: "If “Yes”, please provide further details and any relevant information below.",
							declarationAYes: {
								TH: "",
								EN: "Provide further details and any relevant information."
							}
						}
					},
					declarationC: {
						order: {
							TH: "",
							EN: "d)"
						},
						subject: {
							TH: "",
							EN: "I declare that the information provided in this application is accurate to the best of my knowledge."
						}
					},
					declarationD: {
						order: {
							TH: "",
							EN: "e)"
						},
						subject: {
							TH: "",
							EN: "I understand that any inaccurate or false information may render this application invalid.Furthermore, if I am admitted on the basis of such inaccurate or false information, I may be expelled from Mahidol University."
						}
					},
					declarationE: {
						order: {
							TH: "",
							EN: "c)"
						},
						subject: {
							TH: "",
							EN: "Do you have any dietary requirements ?"
						}
					}
				}
			},
			agree: {
				TH: "",
				EN: "Agree"
			},
			privacyPolicy: {
				TH: "",
				EN: "Privacy Policy"
			},
			read: {
				TH: "",
				EN: "Read"
			}
		};
	});
})();