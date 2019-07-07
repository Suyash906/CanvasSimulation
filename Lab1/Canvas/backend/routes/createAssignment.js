const express = require('express');
const router = express.Router();
const applicationConfig = require('../config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const passport  = require('passport');
var verifyToken = require('./auth');
const Queries = require('../models/query');

router.post('/', (req,res,next) => {
    Queries.createAssignment({FacultyId:req.body.FacultyId, CourseId:req.body.CourseId, Startdate:req.body.Startdate, DueDate:req.body.DueDate, Description:req.body.Description, MaximummMarks:req.body.MaximummMarks}, 
        (success) => {
            res.status(200).json({success:true, message:success.message})
        }, 
        (faliure) => {
            console.log(applicationConfig.errorConnectingServer);
            res.status(204).json({success:false, message:applicationConfig.errorConnectingServer});
        })
});

module.exports = router;