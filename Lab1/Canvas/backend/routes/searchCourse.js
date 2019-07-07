const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');

router.get('/', (req,res) => {
    let CourseTerm = req.query.CourseTerm;
    let CourseName = req.query.CourseName;
    let CourseCode = req.query.CourseCode;
    let CourseDepartment = req.query.CourseDept;
    var searchCourseList = {};
    let values = [];
    let sql = ``;
    if(CourseTerm!==""){
        sql =  `SELECT 	C.CourseId, C.CourseCode, C.CourseName, C.CourseDept, C.CourseDescription, C.CourseRoom, C.CourseCapacity,C.WaitlistCapacity, CTM.CourseTerm
                    FROM 	CourseTermMapping as CTM
                            inner join
                            course as C
                                on C.CourseId  = CTM.CourseId
                    where 	CTM.CourseTerm = ? and C.CourseDept = ?`;
        values = [CourseTerm, CourseDepartment];  
    } else if(CourseCode!== 0) {
        sql =  `SELECT 	C.CourseId, C.CourseCode, C.CourseName, C.CourseDept, C.CourseDescription, C.CourseRoom, C.CourseCapacity,C.WaitlistCapacity, CTM.CourseTerm
                    FROM 	CourseTermMapping as CTM
                            inner join
                            course as C
                                on C.CourseId  = CTM.CourseId
                    where 	C.CourseCode = ? and C.CourseDept = ?`;
        values = [CourseCode, CourseDepartment];
    } else if(CourseName!== "") {
        sql =  `SELECT 	C.CourseId, C.CourseCode, C.CourseName, C.CourseDept, C.CourseDescription, C.CourseRoom, C.CourseCapacity,C.WaitlistCapacity, CTM.CourseTerm
                    FROM 	CourseTermMapping as CTM
                            inner join
                            course as C
                                on C.CourseId  = CTM.CourseId
                    where 	C.CourseName = ? and C.CourseDept = ?`;
        values = [CourseName, CourseDepartment];
    }
    connection.query(sql, values, function (err, result) {
        if(err) {
            console.log(err);
        } else{
            var CourseFaultyMapping = {};
            result.forEach(element => {
                let facultySql = `SELECT 	CFM.CourseId, F.name
                FROM 	Faculty as F
                        inner join
                        CourseFacultyMap as CFM
                            on F.FacultyId = CFM.FacultyId
                where 	CFM.CourseId = ?`;
                connection.query(facultySql, [element.CourseId], function (err, facultyResult) {
                    if(err) {
                        console.log(err);
                    } else{
                        var coursefacultyMapObject = [];
                        facultyResult.forEach(facultyElement => {
                            coursefacultyMapObject.push({CourseCode:element.CourseCode, CourseName:element.CourseName, CourseDept:element.CourseDept, CourseDescription:element.CourseDescription, CourseRoom:element.CourseRoom, CourseCapacity:element.CourseCapacity,WaitlistCapacity:element.WaitlistCapacity, CourseTerm:element.CourseTerm, FacultyName:facultyElement.name});
                        });
                        CourseFaultyMapping[element.CourseId] = coursefacultyMapObject;
                        console.log("inside");
                        console.log(JSON.stringify(CourseFaultyMapping));
                        console.log("\n\n\n");
                    }
                    
                })
            });
            console.log("outside");
            console.log(JSON.stringify(CourseFaultyMapping));
            console.log("\n\n\n");    
            res.status(200).json({ success: true, data : CourseFaultyMapping});
        }
    });
    
});

module.exports = router;