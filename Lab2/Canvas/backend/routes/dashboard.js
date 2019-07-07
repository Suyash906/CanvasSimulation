const express = require('express');
const router = express.Router();
const applicationConfig = require('../config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const passport  = require('passport');
var verifyToken = require('./auth');
const Queries = require('../models/query');


router.get('/', (req,res,next) => {
    console.log("req.query");
    console.log(req.query);
    Queries.findEnrolledCourses(req.query, 
        (result)=> {
                res.status(200).json({"success":true, "courseDetails":result});
        }, (error) =>{
                res.json({message:"Error connecting Server. Please try again later"});
        }
    )
});

module.exports = router;