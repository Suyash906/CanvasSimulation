const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');


router.post('/', function(request,response,next){

    Queries.findIfCourseAlreadyExist(request.body, 
        (res) => {
            if(!res.existStatus) {
                Queries.createCourse( request.body, 
                    (result) => {
                        response.status(200).json({success:true, message:"New Course Created"})
                    },(error) => {
                        response.status(204).json({success:false, message:"Error Connecting Database while creating course. Please try again later."});        
                    })    
            }else {
                response.status(204).json({success:false, message:"The Course already exist. Cannot add the same course again"});    
            }
        }, (err) => {
            response.status(204).json({success:false, message:"Error Connecting Server"});
        })
});

module.exports = router;