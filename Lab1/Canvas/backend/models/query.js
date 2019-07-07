const connection = require('../db');

var Queries = {};

Queries.findCourseAndWaitlistCapacity = (course, successCallback) => {
    let sql = ` SELECT 	CourseCapacity,WaitlistCapacity
                FROM 	Course as C
                where 	C.Courseid = ?`;
    let values = [course.CourseId];
    console.log(values);
    connection.query(sql,values, (err, rows) => {
        if (err) {
            console.log("failure callback 30")
            return;
        }
        if (rows.length > 0) {
            console.log("successCallback callback 2")
            successCallback(rows[0]);
        } else {
            console.log("failure callback 37")
        }
    });
}

Queries.findNumberOfEnrolledStudents = (course, successCallback) => {
    let sql = ` SELECT 	COUNT(1) as StudentCount
    FROM 	CourseEnrollment
    where 	CourseId = ? and FacultyId = ? and isWaitListed = ? and isActive = ?`;
    let values = [course.CourseId, course.FacultyId, 0, 1];

    connection.query(sql, values, (err, rows) => {
        if (err) {
            console.log("failure callback 50");
            return;
        }
        if (rows.length > 0) {
            console.log("successCallback callback 2")
            successCallback(rows[0]);
        } else {
            console.log("failure callback 57")
        }
    });
}

Queries.findIfStudentAlreadyEnrolled = (student, successResultCallback, faliureCallback) => {
    let findSudentSql = ` SELECT 	COUNT(1) as StudentCount
    FROM 	CourseEnrollment
    where 	CourseId = ? and FacultyId = ? and isWaitListed = ? and isActive = ? and StudentId = ?`;
    let values = [student.CourseId, student.FacultyId, 0, 1, student.StudentId];

    connection.query(findSudentSql, values, (err, rows) => {
        if (err) {
            console.log("failure callback 70");
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            successResultCallback({message:"Student already enrolled for the course.", existStatus:true});
        } else {
            successResultCallback({message:"Student not enrolled for the course.", existStatus:false})
        }
    }); 
}
 
Queries.enrollCourse = (student, successResultCallback, faliureCallback) => {
    Queries.findCourseAndWaitlistCapacity({
            CourseId: student.CourseId
        },
        (rows) => {
            console.log("68");
            var capacity = rows;
            Queries.findNumberOfEnrolledStudents({
                    CourseId: student.CourseId,
                    FacultyId: student.FacultyId
                },
                (rows) => {
                    if(rows.StudentCount < capacity.CourseCapacity + capacity.CourseCapacity) {
                        if(rows.StudentCount < capacity.CourseCapacity){
                            var addStudentSql = `INSERT INTO CourseEnrollment( StudentId, CourseId, EnrollmentStatus, FacultyId, CourseTerm, isWaitlisted ) values (? )`;
                            let courseEnrollmentvalues = [student.StudentId, student.CourseId, 'ENROLLED', student.FacultyId, student.CourseTerm, 0];
                            connection.query(addStudentSql, [courseEnrollmentvalues], function (err, result) {
                                if(err) {
                                    console.log(err);
                                } else{
                                    console.log("Record Inserted!!!");
                                    successResultCallback({
                                        message:"Student Enrolled Suucessfully"
                                    });
                                }
                            });   
                            console.log(courseEnrollmentvalues);
                        } else {
                            var addStudentSql = `INSERT INTO CourseEnrollment( StudentId, CourseId, EnrollmentStatus, FacultyId, CourseTerm, isWaitlisted, isActive ) values (?, ? ,?, ?, ?, ? )`;
                            let courseEnrollmentvalues = [student.StudentId, student.CourseId, "WAITLISTED", student.FacultyId, student.CourseTerm, 1, 0];
                            connection.query(addStudentSql, [courseEnrollmentvalues], function (err, result) {
                                if(err) {
                                    console.log(err);
                                } else{
                                    console.log("Record Inserted!!!");
                                    successResultCallback({
                                        message:"Student waitlisted"
                                    });
                                }
                            });
                        }
                    } else {
                        successResultCallback({
                            message:"The class is closed",
                            isClosed:true
                        });
                    }
                }, (err) => {
                    console.log(err);
                    faliureCallback({message:"Student cannot be enroled"});
                })
        }, (err) => {
            console.log(err);
            faliureCallback({message:"Student cannot be enroled"})
        });
}

Queries.findIfCourseAlreadyExist = (course, successCallback, faliureCallback) => {
    let findCourseSql = `SELECT 	COUNT(1) as CourseCount
                        FROM 	Course
                        WHERE 	CourseDept = ? and CourseCode = ?`;
    let findCourseValues = [course.CourseDept, course.CoureCode];
    connection.query(findCourseSql, findCourseValues, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            successCallback({message:"Course already exist.", existStatus:true});
        } else {
            successCallback({message:"Course does not exist.", existStatus:false})
        }
    });

}

Queries.findCourseId = (course, successCallback, faliureCallback) => {
    let findCourseSql = `SELECT CourseId
                        FROM 	Course
                        WHERE 	CourseDept = ? and CourseCode = ?`;
    let findCourseValues = [course.CourseDept, course.CoureCode];
    connection.query(findCourseSql, findCourseValues, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            successCallback({message:"Course Id found.", existStatus:true, CourseId:rows.CourseId});
        } else {
            successCallback({message:"Course Id not found.", existStatus:false})
        }
    });
}

Queries.createCourse = (course, successCallback, faliureCallback) => {
    let sql =  `INSERT INTO Course (CourseName,CourseDept,CourseDescription,CourseRoom,CourseCapacity,WaitlistCapacity,CourseCode) values (?)`;
    let values = [ req.body.CourseName, req.body.CourseDept, req.body.CourseDescription , req.body.CourseRoom, req.body.CourseCapacity, req.body.WaitlistCapacity, req.body.CourseCode];
    connection.query(sql, [values], (err, result) => {
        if(err) {
            faliureCallback({success:false, message:"Error Connecting Server. Could not create course faculty map."});
        } else{
            Queries.findCourseId(course, 
                (resultCourseId) => {
                    Queries.createCourseTermMap({CourseId:resultCourseId.CourseId ,CourseTerm:course.CourseTerm}, 
                        (resultCourseTermMap) => {
                            Queries.createCourseFacultyMap({CourseId:resultCourseId.CourseId ,CourseTerm:course.FacultyId}, 
                                (resultCourseFacultyMap) => {
                                    successCallback({success:true, message:"Course information successfully added."});
                                }, (errorCourseFacultyMap) => {
                                    faliureCallback({success:false, message:"Error Connecting Server. Could not create course faculty map."});
                                }
                            )
                        }, (errorCourseTermMap) => {
                            faliureCallback({success:false, message:"Error Connecting Server. Could not create course term map."});
                        }
                    )
                },(errorCourseId) => {
                    faliureCallback({success:false, message:"Course Id not found in the database."});
                } )

            
        }
    });
}

Queries.createCourseTermMap = (course, successCallback, faliureCallback) => {
    let sqlCourseTermMap = `INSERT INTO CourseTermMapping ( CourseId, CourseTerm ) VALUES (?)`;
    let valuesCourseTermMap = [course.CourseId, course.CourseTerm];
    connection.query(sqlCourseTermMap, [valuesCourseTermMap], (err, result) => {
        if(err) {
            faliureCallback({success:false, message:"Error Connecting Server. Could not create course term map."});
        } else{
            successCallback({success:true, message:"Cousre Term Map Successfully created."});
        }
    })

}

Queries.createCourseFacultyMap = (course, successCallback, faliureCallback) => {
    let sqlCourseTermMap = `INSERT INTO CourseFacultyMap ( CourseId, FacultyId ) VALUES (?)`;
    let valuesCourseTermMap = [course.CourseId, course.FacultyId];
    connection.query(sqlCourseTermMap, [valuesCourseTermMap], (err, result) => {
        if(err) {
            faliureCallback({success:false, message:"Error Connecting Server. Could not create course Faculty map."});
        } else{
            successCallback({success:true, message:"Cousre Faculty Map Successfully created."});
        }
    })
}

Queries.findEnrolledCourses = (Student, successCallback, faliureCallback) => {
    let findCourseSql = `SELECT 	StudentId,C.CourseId,CourseName,CE.CourseTerm, C.CourseDept, C.CourseCode 
                        FROM 	courseEnrollment as CE
                                inner join
                                Course as C
                                    ON C.CourseId = CE.CourseId
                        where 	StudentId = ? and isActive = ?`;
    let findCourseValues = [Student.StudentId, 1];
    console.log(findCourseValues);
    connection.query(findCourseSql, findCourseValues, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            console.log(rows);
            successCallback({message:"Course Id found.", existStatus:true, CourseData:rows});
        } else {
            successCallback({message:"Course Id not found.", existStatus:false})
        }
    });    
}

Queries.findCreatedCourses = (Faculty, successCallback, faliureCallback) => {
    let findCourseSql = `SELECT 	C.CourseId, C.CourseName, CTM.Courseterm, C.CourseDept, CourseCode
                        FROM 	CourseFacultymap as CFM
                                inner join
                                Course C 
                                    on C.CourseId = CFM.CourseId
                                inner join
                                coursetermmapping as CTM
                                    on C.Courseid = CTM.CourseId
                        where 	CFM.FacultyId = ?`;
    let findCourseValues = [Faculty.FacultyId];
    console.log(findCourseValues);
    connection.query(findCourseSql, findCourseValues, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            console.log(rows);
            successCallback({message:"Course Id found.", existStatus:true, CourseData:rows});
        } else {
            successCallback({message:"Course Id not found.", existStatus:false})
        }
    });
}

Queries.createNewAnnouncement = (Announcement, successCallback, faliureCallback) => {
    let sql =  `INSERT INTO Announcement(FacultyId, CourseId, AnnouncementSubject, Message) VALUES (?)`;
    let values = [ Announcement.FacultyId, Announcement.CourseId, Announcement.AnnouncementSubject , Announcement.Message];
    connection.query(sql, [values], (err, result) => {
        if(err) {
            faliureCallback({success:false, message:"Error Connecting Server. Could not create course faculty map."});
        } else{
            successCallback({success:true, message:"Annoncement successfully created"});
        }
    });
}

Queries.findCourseAnnouncement = (Student, successCallback, faliureCallback) => {
    let findCourseAnnouncementSql = `SELECT 	AnnouncementId, AnnouncementSubject, Message 
                                    FROM 	Announcement as A
                                            inner join
                                            courseenrollment as CE
                                                on A.CourseId = CE.CourseId
                                    where 	CE.CourseId = ? and CE.StudentId = ?`;
    let findCourseAnnouncementValues = [Student.CourseId, Student.StudentId];
    console.log(findCourseAnnouncementValues);
    connection.query(findCourseAnnouncementSql, findCourseAnnouncementValues, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            console.log(rows);
            successCallback({message:"Course Id found.", existStatus:true, AnnouncementData:rows});
        } else {
            successCallback({message:"Course Id not found.", existStatus:false})
        }
    });
}

Queries.findAnnouncementCreated = (Faculty, successCallback, faliureCallback) => {
   let findAnnouncementCreatedSql = `SELECT AnnouncementId, AnnouncementSubject, Message 
                                    FROM Announcement
                                    WHERE FacultyId = ? and CourseId =?`;
    let findAnnouncementCreatedValues = [Faculty.FacultyId, Faculty.CourseId];
    console.log(findAnnouncementCreatedValues);
    connection.query(findAnnouncementCreatedSql, findAnnouncementCreatedValues, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            console.log(rows);
            successCallback({message:"List of Annoncement Found.", existStatus:true, AnnouncementData:rows});
        } else {
            successCallback({message:"No announcement available for this course.", existStatus:false})
        }
    });
    
}

Queries.findQuizId = (QuizData, successCallback, faliureCallback) => {
    let quizIdSql = `SELECT QuizId FROM Quiz where CourseId=? and FacultyId=? and Startdate=? and DueDate = ? and NumberOfQuestions = ? and QuizTime = ? `;
    let valuesQuizId = [QuizData.CourseId, QuizData.FacultyId, QuizData.Startdate, QuizData.DueDate, QuizData.NumberOfQuestions, QuizData.QuizTime];
    console.log(valuesQuizId);
    connection.query(quizIdSql, valuesQuizId, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            console.log(rows);
            successCallback({message:"Quiz Id found.", existStatus:true, Quiz:rows[rows.length-1]});
        } else {
            faliureCallback({message:"Quiz Id not found.", existStatus:false})
        }
    });

}

Queries.createQuiz = (QuizData, successCallback, faliureCallback) => {
    let sqlNewQuiz = `INSERT INTO Quiz ( CourseId, FacultyId, Startdate, DueDate, MaximummMarks, NumberOfQuestions, QuizTime) VALUES (?)`;
    let valuesNewQuiz = [QuizData.CourseId, QuizData.FacultyId, QuizData.Startdate, QuizData.DueDate, QuizData.MaximummMarks, QuizData.NumberOfQuestions, QuizData.QuizTime];
    connection.query(sqlNewQuiz, [valuesNewQuiz], (err, result) => {
        if(err) {
            faliureCallback({success:false, message:"Error Connecting Server. Could not create course Faculty map."});
        } else{
            Queries.findQuizId(QuizData,
                (result)=>{
                    for(let i=0;i<QuizData.quizQuestionData.length; i++){
                        Queries.createQuizQuestion(
                            {QuizId:result.Quiz.QuizId, QuestionStatement:QuizData.quizQuestionData[i].QuestionStatement, optionA:QuizData.quizQuestionData[i].optionA, optionB:QuizData.quizQuestionData[i].optionB, optionC:QuizData.quizQuestionData[i].optionC, optionD:QuizData.quizQuestionData[i].optionD, correctAnswer:QuizData.quizQuestionData[i].correctAnswer, MaxScore:QuizData.quizQuestionData[i].MaxScore}
                        )                        
                    }
                },(error) => {
                    faliureCallback({success:false, message:error.message});
                }
            )
        }
    })
}

Queries.createQuizQuestion = (QuizQuestionData) => {
    let createQuizQuestionSql = `INSERT INTO QuizQuestions (QuizId, QuestionStatement, optionA, optionB, optionC, optionD, correctAnswer, MaxScore) VALUES (?)`;
    let createQuizQuestionValues = [QuizQuestionData.QuizId, QuizQuestionData.QuestionStatement, QuizQuestionData.optionA, QuizQuestionData.optionB, QuizQuestionData.optionC, QuizQuestionData.optionD, QuizQuestionData.correctAnswer, QuizQuestionData.MaxScore];
    connection.query(createQuizQuestionSql, [createQuizQuestionValues]);
}

Queries.createAssignment = (AssignmentData, successCallback, faliureCallback) => {
    let sqlNewAssignment = `INSERT INTO Assignment (CourseId, FacultyId, Startdate, DueDate, MaximummMarks, Description) values (?)`;
    let valuesNewAssignment = [AssignmentData.CourseId, AssignmentData.FacultyId, AssignmentData.Startdate, AssignmentData.DueDate, AssignmentData.MaximummMarks, AssignmentData.Description];
    connection.query(sqlNewAssignment, [valuesNewAssignment], (err, result) => {
        if(err) {
            faliureCallback({success:false, message:"Error Connecting Server. Could not create course Faculty map."});
        } else{
            successCallback({success:true, message:"Assignment Created"});
        }
    })
}

Queries.findQuizId = (Quiz, successCallback, faliureCallback) => {
    let findQuizSql = `SELECT 	QuizId, StartDate, DueDate, QuizTime FROM Quiz WHERE QuizId =?`
    let findQuizValues = [Quiz.QuizId];
    connection.query(findQuizSql, findQuizValues, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            console.log(rows);
            successCallback({message:"Quiz found.", success:true, QuizData:rows});
        } else {
            successCallback({message:"Course Id not found.", success:false})
        }
    });
}

Queries.findQuizQuestionsData =  (Quiz, successCallback, faliureCallback) => {
    let findQuizSql = `SELECT 	QuestionStatement, optionA, optionB, optionC, optionD, MaxScore FROM QuizQuestions where QuizId =?`
    let findQuizValues = [Quiz.QuizId];
    connection.query(findQuizSql, findQuizValues, (err, rows) => {
        if (err) {
            faliureCallback({message:"Error Connecting Server"});
            return;
        }
        if (rows.length > 0) {
            console.log(rows);
            successCallback({message:"Quiz found.", success:true, QuizQuestions:rows});
        } else {
            successCallback({message:"Course Id not found.", success:false})
        }
    });
}

module.exports = Queries;