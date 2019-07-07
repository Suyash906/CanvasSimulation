const jwt = require('jsonwebtoken');
const crypt = require('../../backend/encryption');
const Queries = require('../../backend/models/query');
const {client} = require(`../../backend/MongoTest`);
const {UserModel} = require(`../../backend/models/user`);

function handle_request(user, callback){
    console.log(`user kafka`);
    console.log(user);
    Queries.updateUserProfile(user, 
        (result)=>{
            console.log(result);
            callback(null, {success:true,message:`Profile Updated`});
        }, (error)=>{
            console.log(error);
            callback({success:false, message:error},null);
        })
}

exports.handle_request = handle_request;