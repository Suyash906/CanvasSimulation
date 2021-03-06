const express = require('express');
const router = express.Router();
const applicationConfig = require('../config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../encryption');
const passport  = require('passport');
var verifyToken = require('./auth');
const Queries = require('../models/query');

router.post('/', (req,res,next) => {
    getQuestionDetails(req.body,
        (quizQuestionData)=>{
            Queries.createQuiz({FacultyId:req.body.FacultyId, CourseId:req.body.CourseId, Startdate:req.body.Startdate, DueDate:req.body.DueDate, quizQuestionData:quizQuestionData, QuizTime:10, NumberOfQuestions:quizQuestionData.length}, 
                (success) => {
                    console.log(applicationConfig.errorConnectingServer);
                    res.status(200).json({success:true,message:`Quiz Created`})
                }, 
                (faliure) => {
                    console.log(applicationConfig.errorConnectingServer);
                    res.status(204).json({success:false, message:applicationConfig.errorConnectingServer});
                })
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