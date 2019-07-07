const express = require('express');
const router = express.Router();
const applicationConfig = require('../config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const passport  = require('passport');
var verifyToken = require('./auth');
const Queries = require('../models/query');
const kafka = require("../kafka/client");

var requireAuth = passport.authenticate('jwt', {session: false});

router.get('/', (req,res,next) => {
    console.log("req.query");
    console.log(req.query);

    kafka.make_request("viewProfile", req.query, function(err, results) {
        if (err){
            res.status(401).json({success:false, message:err.message});
        }else{
            res.status(200).json({success:true,profileDetails:results.profileDetails});
        }
    })
});

module.exports = router;