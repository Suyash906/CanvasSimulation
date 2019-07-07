const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');

router.get('/', (req,res) => {
    console.log(req.query);
    let CourseTerm = req.query.CourseTerm;
    let CourseName = req.query.CourseName;
    let CourseCode = req.query.CourseCode;
    let CourseDepartment = req.query.CourseDept;
    let sql = `SELECT F.NAME,
    F.Facultyid, 
    C.courseid, 
    C.coursecode, 
    C.coursename, 
    C.coursedept, 
    C.coursedescription, 
    C.courseroom, 
    C.coursecapacity, 
    C.waitlistcapacity, 
    CTM.courseterm 
FROM   coursetermmapping AS CTM 
    INNER JOIN course AS C 
            ON C.courseid = CTM.courseid 
    INNER JOIN coursefacultymap AS CFM 
            ON CFM.courseid = C.courseid 
    INNER JOIN faculty AS F 
            ON CFM.facultyid = F.facultyid 
    WHERE C.CourseDept = '${CourseDepartment}' `;
    
    if(CourseTerm!==""){
        sql =  sql + ` and CTM.CourseTerm = '${CourseTerm}' `;
    } 
    if(CourseCode!= 0) {
        sql =  sql + ` and	C.CourseCode = ${CourseCode} `;
    } 
    if(CourseName!== "") {
        sql =  sql + ` and C.CourseName = '${CourseName}' `;
    }
    connection.query(sql, function (err, result) {
        if(err) {
            res.status(200).json({success:false, message:"No courses found for the search criteria"});
        } else{
            res.status(200).json({success:true, message:"Courses Found", Courses:result});
        }
    });
});

module.exports = router;