const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');

router.post('/', function(req,res,next){
    crypt.createHash(req.body.password, function (passwordResponse) {
        let passwordHash = passwordResponse;
        let user = req.body.userType;
        let sql =  `INSERT INTO ${user} (name,email,password) values (?)`;
        let values = [req.body.name, req.body.emailId, passwordHash];
        connection.query(sql, [values], function (err, result) {
            if(err) {
                res.status(200).json({success:false, message: "Invalid Credentials"});
            } else{
                res.status(200).json({success:true, message: "Successful Sign Up"});
            }
        });
    }, function (err) {
        res.status(200).json({success:false, message: "Sign Up error"});
    });
})

module.exports = router;