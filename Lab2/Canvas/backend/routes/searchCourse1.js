const express = require('express');
const router = express.Router();
//const connection = require('../db');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const kafka = require("../kafka/client");

router.get('/', (req,res) => {
    if(req.query.CourseDept==''){
        res.status(401).json({success:false, message:`Course Department is mandatory!`});
    } else {
        kafka.make_request("searchCourse", req.query, function(err, results) {
            if (err){
                res.status(401).json({success:false, message:err.message});
            }else{
                res.status(200).json({success:true,courseDetails:results.courseDetails});
            }
        })
    }
    
//     console.log(req.query);
//     let CourseTerm = req.query.CourseTerm;
//     let CourseName = req.query.CourseName;
//     let CourseCode = req.query.CourseCode;
//     let CourseDepartment = req.query.CourseDept;
//     let sql = `SELECT F.NAME,
//     F.Facultyid, 
//     C.courseid, 
//     C.coursecode, 
//     C.coursename, 
//     C.coursedept, 
//     C.coursedescription, 
//     C.courseroom, 
//     C.coursecapacity, 
//     C.waitlistcapacity, 
//     CTM.courseterm 
// FROM   coursetermmapping AS CTM 
//     INNER JOIN course AS C 
//             ON C.courseid = CTM.courseid 
//     INNER JOIN coursefacultymap AS CFM 
//             ON CFM.courseid = C.courseid 
//     INNER JOIN faculty AS F 
//             ON CFM.facultyid = F.facultyid 
//     WHERE C.CourseDept = '${CourseDepartment}' `;
    
//     if(CourseTerm!==""){
//         sql =  sql + ` and CTM.CourseTerm = '${CourseTerm}' `;
//     } 
//     if(CourseCode!= 0) {
//         sql =  sql + ` and	C.CourseCode = ${CourseCode} `;
//     } 
//     if(CourseName!== "") {
//         sql =  sql + ` and C.CourseName = '${CourseName}' `;
//     }
    // connection.query(sql, function (err, result) {
    //     if(err) {
    //         res.status(200).json({success:false, message:"No courses found for the search criteria"});
    //     } else{
    //         console.log({success:true, message:"Courses Found", Courses:result});
    //         res.status(200).json({success:true, message:"Courses Found", Courses:result});
    //     }
    // });
});

module.exports = router;