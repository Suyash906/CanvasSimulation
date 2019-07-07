const express = require('express');
const router = express.Router();
const Queries = require('../models/query');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');


router.post('/', (request,response,next) => {
    console.log(request.body);
    Queries.createNewAnnouncement(request.body, 
        (res)=> {
            response.json({success:true, message:"Announcement Created."});
        }, (err) =>{
            response.json({message:"Error connecting Server. Please try again later"});
        }
    )
});

module.exports = router;