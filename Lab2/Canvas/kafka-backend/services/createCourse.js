const jwt = require('jsonwebtoken');
const crypt = require('../../backend/encryption');
const Queries = require('../../backend/models/query');

function handle_request(course, callback){
    Queries.createCourse(course, 
        (result)=>{
            callback(null, {success:true,message:result});
        }, (error)=>{
            console.log(error);
            callback({success:false, message:error},null);
        })
}

exports.handle_request = handle_request;