const crypt = require('../encryption');
const {client} = require(`../MongoTest`);
const {UserModel} = require(`../models/user`);
const {CourseModel} = require(`../models/course`);

var Queries = {};

Queries.findUser = (user, successCallBack, failureCallback) => {
    console.log(user);
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({SjsuId:user.SjsuId}, (error, result) => {
            if(result){
                failureCallback(error);
            } else {
                successCallBack(result);
            }
        })
        
    })
}

Queries.registerUser = (user, successCallBack, failureCallback) => {
    crypt.createHash(user.password, function (passwordResponse) {
        let passwordHash = passwordResponse;
        Object.keys(UserModel).forEach(function (item) {
            UserModel[item] = user[item];
        });
        var newUser = {
            Email: user.Email,
            Name: user.Name,
            password: passwordHash,
            userType:user.userType
        };
        client.connect(err => {
            const collection = client.db("canvas").collection("user");
            collection.findOne({Email:user.Email}, (error, result) => {
                if(result){
                    failureCallback("User already registered");
                } else {
                    collection.insertOne(UserModel, function(err, res) {
                        if (err) throw err;
                        successCallBack("1 document inserted");
                      });
                }
            })
            
        })
    }, function (err) {
        faliureCallback({success:false, message: "Sign Up error"});
    });
}

Queries.findQuiz = (quiz, successCallBack, failureCallback) => {

}

// Queries.findNumberOfEnrolledStudents = (course, successCallback) => {
//     let sql = ` SELECT 	COUNT(1) as StudentCount
//     FROM 	CourseEnrollment
//     where 	CourseId = ? and FacultyId = ? and isWaitListed = ? and isActive = ?`;
//     let values = [course.CourseId, course.FacultyId, 0, 1];

//     connection.query(sql, values, (err, rows) => {
//         if (err) {
//             console.log("failure callback 50");
//             return;
//         }
//         if (rows.length > 0) {
//             console.log("successCallback callback 2")
//             successCallback(rows[0]);
//         } else {
//             console.log("failure callback 57")
//         }
//     });
// }

// Queries.findIfStudentAlreadyEnrolled = (student, successResultCallback, faliureCallback) => {
//     let findSudentSql = ` SELECT 	COUNT(1) as StudentCount
//     FROM 	CourseEnrollment
//     where 	CourseId = ? and FacultyId = ? and isWaitListed = ? and isActive = ? and StudentId = ?`;
//     let values = [student.CourseId, student.FacultyId, 0, 1, student.StudentId];

//     connection.query(findSudentSql, values, (err, rows) => {
//         if (err) {
//             console.log("failure callback 70");
//             faliureCallback({message:"Error Connecting Server"});
//             return;
//         }
//         if (rows.length > 0) {
//             successResultCallback({message:"Student already enrolled for the course.", existStatus:true});
//         } else {
//             successResultCallback({message:"Student not enrolled for the course.", existStatus:false})
//         }
//     }); 
// }
 
// Queries.enrollCourse = (student, successResultCallback, faliureCallback) => {
//     Queries.findCourseAndWaitlistCapacity({
//             CourseId: student.CourseId
//         },
//         (rows) => {
//             console.log("68");
//             var capacity = rows;
//             Queries.findNumberOfEnrolledStudents({
//                     CourseId: student.CourseId,
//                     FacultyId: student.FacultyId
//                 },
//                 (rows) => {
//                     if(rows.StudentCount < capacity.CourseCapacity + capacity.CourseCapacity) {
//                         if(rows.StudentCount < capacity.CourseCapacity){
//                             var addStudentSql = `INSERT INTO CourseEnrollment( StudentId, CourseId, EnrollmentStatus, FacultyId, CourseTerm, isWaitlisted ) values (? )`;
//                             let courseEnrollmentvalues = [student.StudentId, student.CourseId, 'ENROLLED', student.FacultyId, student.CourseTerm, 0];
//                             connection.query(addStudentSql, [courseEnrollmentvalues], function (err, result) {
//                                 if(err) {
//                                     console.log(err);
//                                 } else{
//                                     console.log("Record Inserted!!!");
//                                     successResultCallback({
//                                         message:"Student Enrolled Suucessfully"
//                                     });
//                                 }
//                             });   
//                             console.log(courseEnrollmentvalues);
//                         } else {
//                             var addStudentSql = `INSERT INTO CourseEnrollment( StudentId, CourseId, EnrollmentStatus, FacultyId, CourseTerm, isWaitlisted, isActive ) values (?, ? ,?, ?, ?, ? )`;
//                             let courseEnrollmentvalues = [student.StudentId, student.CourseId, "WAITLISTED", student.FacultyId, student.CourseTerm, 1, 0];
//                             connection.query(addStudentSql, [courseEnrollmentvalues], function (err, result) {
//                                 if(err) {
//                                     console.log(err);
//                                 } else{
//                                     console.log("Record Inserted!!!");
//                                     successResultCallback({
//                                         message:"Student waitlisted"
//                                     });
//                                 }
//                             });
//                         }
//                     } else {
//                         successResultCallback({
//                             message:"The class is closed",
//                             isClosed:true
//                         });
//                     }
//                 }, (err) => {
//                     console.log(err);
//                     faliureCallback({message:"Student cannot be enroled"});
//                 })
//         }, (err) => {
//             console.log(err);
//             faliureCallback({message:"Student cannot be enroled"})
//         });
// }

Queries.searchCourse = (course, successCallback, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("courses");
        collection.find({}).toArray((err, res) => {
            if (err){
                faliureCallback("DB Connection Failed");
            } else {
                successCallback(res);
            }
        })
    });
}

Queries.insertAssignment = (courseId, assignment, successCallback, faliureCallback) => {
    client.connect(err => {
        const courseCollection = client.db("canvas").collection("courses");
        const query = {courseId:courseId};
        const update = {$push:{assignments:{$each:[assignment]}}};
        client.connect(err => {
            courseCollection.updateOne(query, update, (error, result) => {
                if(result){
                    successCallback(`Assignment Successfully Added`);
                } else {
                    faliureCallback(`Assignment Cannot Be Added`);
                }
            })
        })
    })
}

Queries.createAssignment = (assignment,successCallback, faliureCallback) => { 
    client.connect(err => {
        const userCollection = client.db("canvas").collection("user");
        userCollection.findOne({SjsuId:assignment.SjsuId}, (error, result) => {
            if(result){
                let courseCreated = result.courseCreated;
                let courseData = courseCreated.find( (element) => {
                    if(element.courseId && element.courseId == assignment.courseId) {
                        Queries.insertAssignment(element.courseId, assignment, 
                            (insertResult) => {
                                console.log(insertResult);
                                successCallback(insertResult);
                            },
                            (insertError) => {
                                console.log(insertError);
                                faliureCallback(insertError);
                            });
                    }
                });
                
            } else {
                failureCallback(error);
            }
        })        
    })
}

Queries.enrollCourse = (course, successCallback, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("courses");
            collection.findOne({courseId:course.courseId}, (error, result) => {
                if(result){
                    console.log(result);
                    const userCollection = client.db("canvas").collection("user");
                    const query = {SjsuId:course.SjsuId};
                    const update = {$push:{courseEnrolled:{$each:[result]}}};
                    client.connect(err => {
                        userCollection.updateOne(query, update, (error, res) => {
                            if(res){
                                successCallback(`Student Enrolled`);
                            } else {
                                faliureCallback(`${error}`);
                            }
                        })
                    });
    
                } else {
                    console.log(`User Not Found`);
                    faliureCallback(`User Not Found`);
                }
        })
    })
}

Queries.findEnrolledCourses = (user, successCallBack, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({SjsuId:user.SjsuId}, (error, result) => {
            if(result){
                if(result.courseEnrolled)
                    successCallBack(result.courseEnrolled);
                else if(result.courseCreated)
                    successCallBack(result.courseCreated);
                else
                    successCallBack([]);
            } else {
                
                    faliureCallback(error);    
            }
        })
        
    })
}

Queries.findCreatedCourses = (user, successCallBack, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({SjsuId:user.SjsuId}, (error, result) => {
            if(result){
                successCallBack(result.courseCreated);
            } else {
                failureCallback(error);
            }
        })    
    })
}

Queries.createCourse = (course, successCallback, faliureCallback) => {
    Object.keys(CourseModel).forEach(function (item) {
        CourseModel[item] = course[item];
    });
    client.connect(err => {
        const collection = client.db("canvas").collection("courses");
        collection.find({}).toArray((err, res) => {
            if (err){
                faliureCallback("DB Connection Failed");
            } else {
                let courseId = res.length + 1;
                CourseModel.courseId = courseId;
                collection.insertOne(CourseModel, function(err, res) {
                    if (err) 
                        faliureCallback(err);
                    else{
                        const userCollection = client.db("canvas").collection("user");
                        const query = {SjsuId:CourseModel.SjsuId};
                        const update = {$push:{courseCreated:{$each:[CourseModel]}}};
                        client.connect(err => {
                        userCollection.updateOne(query, update, (error, result) => {
                            if(result){
                                successCallback(`Course Successfully Added`);
                            } else {
                                faliureCallback(`User with SJSU ID ${CourseModel.SjsuId} Not Found : ${error}`);
                            }
                        })
                    });            
                    }
                })
            }
        })  
    })
}

// Queries.createCourse = (course, successCallback, faliureCallback) => {
//     Object.keys(CourseModel).forEach(function (item) {
//         CourseModel[item] = course[item];
//     });
//     client.connect(err => {
//         const collection = client.db("canvas").collection("courses");
//         collection.insertOne(CourseModel, function(err, res) {
//             if (err){
//                 faliureCallback("DB Connection Failed");
//             } else {
//                 const userCollection = client.db("canvas").collection("user");
//                 const query = {SjsuId:course.SjsuId};
//                 const update = {$push:{courseCreated:{$each:[CourseModel]}}};
//                 client.connect(err => {
//                     userCollection.updateOne(query, update, (error, result) => {
//                         if(result){
//                             successCallback(`Course Successfully Added`);
//                         } else {
//                             faliureCallback(`User with SJSU ID ${user.SjsuId} Not Found : ${error}`);
//                         }
//                     })
//                 });
//             }
//           });
//     })
// }

// Queries.findCourseId = (course, successCallback, faliureCallback) => {
//     let findCourseSql = `SELECT CourseId
//                         FROM 	Course
//                         WHERE 	CourseDept = ? and CourseCode = ?`;
//     let findCourseValues = [course.CourseDept, course.CoureCode];
//     connection.query(findCourseSql, findCourseValues, (err, rows) => {
//         if (err) {
//             faliureCallback({message:"Error Connecting Server"});
//             return;
//         }
//         if (rows.length > 0) {
//             successCallback({message:"Course Id found.", existStatus:true, CourseId:rows.CourseId});
//         } else {
//             successCallback({message:"Course Id not found.", existStatus:false})
//         }
//     });
// }

// Queries.createCourse = (course, successCallback, faliureCallback) => {
//     let sql =  `INSERT INTO Course (CourseName,CourseDept,CourseDescription,CourseRoom,CourseCapacity,WaitlistCapacity,CourseCode) values (?)`;
//     let values = [ req.body.CourseName, req.body.CourseDept, req.body.CourseDescription , req.body.CourseRoom, req.body.CourseCapacity, req.body.WaitlistCapacity, req.body.CourseCode];
//     connection.query(sql, [values], (err, result) => {
//         if(err) {
//             faliureCallback({success:false, message:"Error Connecting Server. Could not create course faculty map."});
//         } else{
//             Queries.findCourseId(course, 
//                 (resultCourseId) => {
//                     Queries.createCourseTermMap({CourseId:resultCourseId.CourseId ,CourseTerm:course.CourseTerm}, 
//                         (resultCourseTermMap) => {
//                             Queries.createCourseFacultyMap({CourseId:resultCourseId.CourseId ,CourseTerm:course.FacultyId}, 
//                                 (resultCourseFacultyMap) => {
//                                     successCallback({success:true, message:"Course information successfully added."});
//                                 }, (errorCourseFacultyMap) => {
//                                     faliureCallback({success:false, message:"Error Connecting Server. Could not create course faculty map."});
//                                 }
//                             )
//                         }, (errorCourseTermMap) => {
//                             faliureCallback({success:false, message:"Error Connecting Server. Could not create course term map."});
//                         }
//                     )
//                 },(errorCourseId) => {
//                     faliureCallback({success:false, message:"Course Id not found in the database."});
//                 } )

            
//         }
//     });
// }

// Queries.createCourseTermMap = (course, successCallback, faliureCallback) => {
//     let sqlCourseTermMap = `INSERT INTO CourseTermMapping ( CourseId, CourseTerm ) VALUES (?)`;
//     let valuesCourseTermMap = [course.CourseId, course.CourseTerm];
//     connection.query(sqlCourseTermMap, [valuesCourseTermMap], (err, result) => {
//         if(err) {
//             faliureCallback({success:false, message:"Error Connecting Server. Could not create course term map."});
//         } else{
//             successCallback({success:true, message:"Cousre Term Map Successfully created."});
//         }
//     })

// }

// Queries.createCourseFacultyMap = (course, successCallback, faliureCallback) => {
//     let sqlCourseTermMap = `INSERT INTO CourseFacultyMap ( CourseId, FacultyId ) VALUES (?)`;
//     let valuesCourseTermMap = [course.CourseId, course.FacultyId];
//     connection.query(sqlCourseTermMap, [valuesCourseTermMap], (err, result) => {
//         if(err) {
//             faliureCallback({success:false, message:"Error Connecting Server. Could not create course Faculty map."});
//         } else{
//             successCallback({success:true, message:"Cousre Faculty Map Successfully created."});
//         }
//     })
// }

// Queries.findEnrolledCourses = (Student, successCallback, faliureCallback) => {
//     let findCourseSql = `SELECT 	StudentId,C.CourseId,CourseName,CE.CourseTerm, C.CourseDept, C.CourseCode 
//                         FROM 	courseEnrollment as CE
//                                 inner join
//                                 Course as C
//                                     ON C.CourseId = CE.CourseId
//                         where 	StudentId = ? and isActive = ?`;
//     let findCourseValues = [Student.StudentId, 1];
//     console.log(findCourseValues);
//     connection.query(findCourseSql, findCourseValues, (err, rows) => {
//         if (err) {
//             faliureCallback({message:"Error Connecting Server"});
//             return;
//         }
//         if (rows.length > 0) {
//             console.log(rows);
//             successCallback({message:"Course Id found.", existStatus:true, CourseData:rows});
//         } else {
//             successCallback({message:"Course Id not found.", existStatus:false})
//         }
//     });    
// }

// Queries.findCreatedCourses = (Faculty, successCallback, faliureCallback) => {
//     let findCourseSql = `SELECT 	C.CourseId, C.CourseName, CTM.Courseterm, C.CourseDept, CourseCode
//                         FROM 	CourseFacultymap as CFM
//                                 inner join
//                                 Course C 
//                                     on C.CourseId = CFM.CourseId
//                                 inner join
//                                 coursetermmapping as CTM
//                                     on C.Courseid = CTM.CourseId
//                         where 	CFM.FacultyId = ?`;
//     let findCourseValues = [Faculty.FacultyId];
//     console.log(findCourseValues);
//     connection.query(findCourseSql, findCourseValues, (err, rows) => {
//         if (err) {
//             faliureCallback({message:"Error Connecting Server"});
//             return;
//         }
//         if (rows.length > 0) {
//             console.log(rows);
//             successCallback({message:"Course Id found.", existStatus:true, CourseData:rows});
//         } else {
//             successCallback({message:"Course Id not found.", existStatus:false})
//         }
//     });
// }

// Queries.createNewAnnouncement = (Announcement, successCallback, faliureCallback) => {
//     let sql =  `INSERT INTO Announcement(FacultyId, CourseId, AnnouncementSubject, Message) VALUES (?)`;
//     let values = [ Announcement.FacultyId, Announcement.CourseId, Announcement.AnnouncementSubject , Announcement.Message];
//     connection.query(sql, [values], (err, result) => {
//         if(err) {
//             faliureCallback({success:false, message:"Error Connecting Server. Could not create course faculty map."});
//         } else{
//             successCallback({success:true, message:"Annoncement successfully created"});
//         }
//     });
// }

// Queries.findCourseAnnouncement = (Student, successCallback, faliureCallback) => {
//     let findCourseAnnouncementSql = `SELECT 	AnnouncementId, AnnouncementSubject, Message 
//                                     FROM 	Announcement as A
//                                             inner join
//                                             courseenrollment as CE
//                                                 on A.CourseId = CE.CourseId
//                                     where 	CE.CourseId = ? and CE.StudentId = ?`;
//     let findCourseAnnouncementValues = [Student.CourseId, Student.StudentId];
//     console.log(findCourseAnnouncementValues);
//     connection.query(findCourseAnnouncementSql, findCourseAnnouncementValues, (err, rows) => {
//         if (err) {
//             faliureCallback({message:"Error Connecting Server"});
//             return;
//         }
//         if (rows.length > 0) {
//             console.log(rows);
//             successCallback({message:"Course Id found.", existStatus:true, AnnouncementData:rows});
//         } else {
//             successCallback({message:"Course Id not found.", existStatus:false})
//         }
//     });
// }

// Queries.findAnnouncementCreated = (Faculty, successCallback, faliureCallback) => {
//    let findAnnouncementCreatedSql = `SELECT AnnouncementId, AnnouncementSubject, Message 
//                                     FROM Announcement
//                                     WHERE FacultyId = ? and CourseId =?`;
//     let findAnnouncementCreatedValues = [Faculty.FacultyId, Faculty.CourseId];
//     console.log(findAnnouncementCreatedValues);
//     connection.query(findAnnouncementCreatedSql, findAnnouncementCreatedValues, (err, rows) => {
//         if (err) {
//             faliureCallback({message:"Error Connecting Server"});
//             return;
//         }
//         if (rows.length > 0) {
//             console.log(rows);
//             successCallback({message:"List of Annoncement Found.", existStatus:true, AnnouncementData:rows});
//         } else {
//             successCallback({message:"No announcement available for this course.", existStatus:false})
//         }
//     });
    
// }

Queries.findStudentProfile = (user, successCallback, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
            collection.findOne({Email:user.Email,userType:user.userType}, (error, result) => {
                if(result){
                    successCallback({success:true, profileData:result});
                } else {
                    faliureCallback(`User Not Found`);
                }
        })
    })
}

Queries.insertQuiz = (courseId, quiz, successCallback, faliureCallback) => {
    client.connect(err => {
        const courseCollection = client.db("canvas").collection("courses");
        const query = {courseId:courseId};
        const update = {$push:{quiz:{$each:[quiz]}}};
        client.connect(err => {
            courseCollection.updateOne(query, update, (error, result) => {
                if(result){
                    successCallback(`Quiz Successfully Added`);
                } else {
                    faliureCallback(`Quiz Cannot Be Added`);
                }
            })
        })
    })
}

Queries.createQuiz = (quiz,successCallback, faliureCallback) => { 
    client.connect(err => {
        const userCollection = client.db("canvas").collection("user");
        userCollection.findOne({SjsuId:quiz.SjsuId}, (error, result) => {
            if(result){
                let courseCreated = result.courseCreated;
                let courseData = courseCreated.find( (element) => {
                    if(element.courseId && element.courseId == quiz.courseId) {
                        Queries.insertQuiz(element.courseId, quiz, 
                            (insertResult) => {
                                console.log(insertResult);
                                successCallback(insertResult);
                            },
                            (insertError) => {
                                console.log(insertError);
                                faliureCallback(insertError);
                            });
                    }
                });
                
            } else {
                failureCallback(error);
            }
        })        
    })
}

Queries.findFacultyProfile = (user, successCallback, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
            collection.findOne({Email:user.Email,userType:user.userType}, (error, result) => {
                if(result){
                    successCallback({success:true, profileData:result});
                } else {
                    faliureCallback(`User Not Found`);
                }
        })
    })
}

Queries.findUserProfile = (user, successCallback, faliureCallback) => {
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.findOne({SjsuId:user.SjsuId}, (error, result) => {
            if(result){
                console.log(`result query`);
                console.log(result);
                successCallback({profileData:result});
            } else {
                faliureCallback(`User with SJSU ID ${user.SjsuId} Not Found : ${error}`);
            }
        })
    });
}

Queries.updateUserProfile = (user, successCallback, faliureCallback) => {
    const query = {SjsuId:user.SjsuId};
    Object.keys(UserModel).forEach(function (item) {
        UserModel[item] = user[item];
    });
    const update = {$set:UserModel};
    client.connect(err => {
        const collection = client.db("canvas").collection("user");
        collection.updateOne(query, update, (error, result) => {
            if(result){
                console.log(`result query`);
                console.log(result);
                successCallback({profileData:result});
            } else {
                faliureCallback(`User with SJSU ID ${user.SjsuId} Not Found : ${error}`);
            }
        })
    });
}
module.exports = Queries;