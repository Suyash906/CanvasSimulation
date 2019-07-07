const express = require('express');
const router = express.Router();
//const connection = require('../db');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const Queries = require('../models/query');
const kafka = require("../kafka/client");


router.post('/', function(request,response,next){
    console.log(`request.body`);
    console.log(request.body);
    kafka.make_request("createCourse", request.body, function(err, results) {
        if (err){
            response.status(401).json({success:false, message:err.message});
        }else{
            console.log({success:true,message:results.message});
            response.status(200).json({success:true,message:results.message});
        }
    });
});

module.exports = router;