const express = require('express');
const router = express.Router();
const applicationConfig = require('../config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const passport  = require('passport');
var verifyToken = require('./auth');
const Queries = require('../models/query');

router.post('/', (req,res,next) => {
    console.log(`req.body`);
    console.log(req.body);
    getQuestionDetails(req.body,
        (quizQuestionData)=>{
            console.log(`quizQuestionData`);
            console.log(quizQuestionData);
            Queries.createQuiz({SjsuId:req.body.SjsuId, name:req.body.name, courseId:req.body.courseId, Startdate:req.body.Startdate, DueDate:req.body.DueDate, quizQuestionData:quizQuestionData, QuizTime:req.body.QuizTime, NumberOfQuestions:quizQuestionData.length},
                (success) => {
                    res.status(200).json({success:true, message:success})
                },
                (faliure) => {
                    res.status(204).json({success:false, message:applicationConfig.errorConnectingServer});
                }
            )
            // Queries.createQuiz({FacultyId:req.body.FacultyId, CourseId:req.body.CourseId, Startdate:req.body.Startdate, DueDate:req.body.DueDate, quizQuestionData:quizQuestionData, QuizTime:10, NumberOfQuestions:quizQuestionData.length}, 
            //     (success) => {
            //         console.log({success:true,message:`Quiz Created`});
            //         res.status(200).json({success:true,message:`Quiz Created`})
            //     }, 
            //     (faliure) => {
            //         console.log(applicationConfig.errorConnectingServer);
            //         res.status(204).json({success:false, message:applicationConfig.errorConnectingServer});
            //     })
            //res.status(200).json({success:true,message:`Quiz Created`})
        })
});

getQuestionDetails = (quizData, successCallback) => {
    iterator = true;
    index = 0;
    let quizQuestionData = [];
    while(iterator) {
        if(!quizData.hasOwnProperty(`question-${index}`)) {
            iterator = false;
            console.log("loop stops");
        } else {
            quizQuestionData.push({QuestionStatement:quizData[`question-${index}`], optionA:quizData[`optionC-${index}`], optionB:quizData[`optionB-${index}`], optionC:quizData[`optionC-${index}`], optionD:quizData[`optionD-${index}`], correctAnswer:quizData[`correctAnswer-${index}`], MaxScore:quizData[`marks-${index}`] });
            index++;
            console.log("loop continues");
        }
    }
    successCallback(quizQuestionData);
}

module.exports = router;