const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const Queries = require('../models/query');
const kafka = require("../kafka/client");

router.post('/', function(req,res,next){
    console.log(`req.body`);
    console.log(req.body);
    kafka.make_request("signUp", req.body, function(err, results) {
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            res.json({
                    status:`Success!!!!!`
                });
                res.end();
            } 
    });
    // Queries.registerUser(req.body,
    //     (result) => {
    //         console.log(`result`);
    //         console.log(result);
    //         res.status(200).json({"success":true, "message": `User Registered`});
    //     },
    //     (error) => {
    //         console.log(`error`);
    //         console.log(error);
    //         res.status(204).json({"success":false, "message": "User already present"});
    //     } );
})

module.exports = router;