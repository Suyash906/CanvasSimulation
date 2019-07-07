const express = require('express');
const router = express.Router();
const Queries = require('../models/query');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');


router.post('/', (req,response,next) => {
    console.log(req.body);
    Queries.enrollCourse(req.body,  (res, err) => {
        response.json({message:"Student enrolled successfully"});
    }, (err) => {
        response.json({message:"Error connecting Server while enrolling student. Please try again later"});
    });
});

module.exports = router;