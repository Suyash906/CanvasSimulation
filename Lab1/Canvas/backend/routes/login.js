const express = require('express');
const router = express.Router();
const connection = require('../db');
const applicationConfig = require('../config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const passport  = require('passport');

router.post('/', function(req,res,next){
    let user = req.body.userType;
    let userIdentifier = req.body.userType === `Student` ? `StudentId` : `FacultyId`;
    let sql =  `SELECT ${userIdentifier}, password FROM ${user} where ${userIdentifier} = ?`;
    let values = [req.body.userId];
    connection.query(sql, values, function (err, result) {
        if(err) {
            res.status(204).json({ success: false, message:"Error connectiog server. Please try again later"});
        } else{
            row = result[0];
            crypt.compareHash(req.body.password, row.password, function (err, passwordMatched) {
                if (passwordMatched && !err) {
                    var token = jwt.sign({ useremail:req.body.name, userName:req.body.name, userType:req.body.userType }, applicationConfig.secretKey, {
                        expiresIn: 10800 // in seconds
                    });
                    let cookieData = { useremail:req.body.name, userName:req.body.name, userType:req.body.userType };
                    res.cookie('cookieName', cookieData, { maxAge: 90000000, httpOnly: false, path: '/' });
                    res.status(200).json({ success: true, userType: req.body.userType, token:  token , userId:req.body.userId, userIdentifier:userIdentifier});
            
                }
                else {
                    res.status(401).json({ success: false, message:"Authentication failed. Passwords did not match."});
                }
            },function (err) {
                res.status(204).json({ success: false, message:"Authentication failed. Passwords did not match."});
            
            });
        }
    });
})

module.exports = router;