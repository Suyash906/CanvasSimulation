const express = require('express');
const router = express.Router();
const applicationConfig = require('../config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const passport  = require('passport');
var verifyToken = require('./auth');
const Queries = require('../models/query');

router.post('/', (req,res,next) => {
    console.log(req.body);
    Queries.createAssignment(req.body, 
        (success) => {
            res.status(200).json({success:true, message:success})
        }, 
        (faliure) => {
            console.log(applicationConfig.errorConnectingServer);
            res.status(204).json({success:false, message:applicationConfig.errorConnectingServer});
        })
    //res.status(200).json({success:true, message:`Assignment Created`})
});

module.exports = router;