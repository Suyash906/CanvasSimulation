const express = require('express');
const router = express.Router();
const applicationConfig = require('../config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const passport  = require('passport');
var verifyToken = require('./auth');
const Queries = require('../models/query');

router.get('/', (req,res) => {
    console.log(req.query);
        Queries.findQuiz(req.query, 
                (result)=>{
                    res.status(200).json({success:true, data:result});
                },
                (error) => {
                    res.status(200).json({success:false, message:error});
                }
            )
    // Queries.findQuizId({QuizId:quizId},
    //     (result) => {
    //         let today = new Date();
    //         let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //         let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //         let dateTime = date+' '+time;
    //         if(dateTime<result.StartDate) {
    //             res.status(200).json({success:true, quizFlag:0 , message:"Quiz cannot be delivered before start date"});    
    //         }
    //         else if(dateTime>result.DueDate){
    //             res.status(200).json({success:true, quizFlag:0, message:"Quiz is closed now"});
    //         } else {
    //             Queries.findQuizQuestionsData({QuizId:quizId},
    //                 (quizQuestionResult) => {
    //                     res.status(200).json({success:true, quizFlag:1, message:"Quiz can be delivered", QuizData: { QuizId:quizId,  QuizTime:result.QuizData.QuizTime, questionData:quizQuestionResult.QuizQuestions}});
    //                 }, 
    //                 (quizQuestionError) => {
    //                     res.status(204).json({success:false, message: applicationConfig.errorConnectingServer});
    //                 })
    //         }
    //     },
    //     (error) => {
    //         res.status(204).json({success:false, message: applicationConfig.errorConnectingServer});
    //     } );
})

module.exports= router;