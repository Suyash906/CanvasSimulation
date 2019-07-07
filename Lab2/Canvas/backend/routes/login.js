const express = require('express');
const router = express.Router();
// const connection = require('../db');
const applicationConfig = require('../config/application');

//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate("jwt", {session: false});

const kafka = require("../kafka/client");

router.post('/', function(req,res,next){
    console.log(`req.body`);
    console.log(req.body);
    kafka.make_request("login", req.body, function(err, results) {
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log(`results`);
                console.log(results);
            res.status(200).json({ success: true, userType: results.userType, token:  'JWT ' + results.token , SjsuId:results.SjsuId});
                res.end();
            } 
    });
})

module.exports = router;