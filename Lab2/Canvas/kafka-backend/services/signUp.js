const jwt = require('jsonwebtoken');
const crypt = require('../../backend/encryption');
const Queries = require('../../backend/models/query');
const {client} = require(`../../backend/MongoTest`);
const {UserModel} = require(`../../backend/models/user`);

function handle_request(user, callback){
    console.log(`user kafka`);
    console.log(user);
    crypt.createHash(user.password, function (passwordResponse) {
        Object.keys(UserModel).forEach(function (item) {
            UserModel[item] = user[item];
        });
        UserModel.password = passwordResponse;
        console.log(`UserModel`);
        console.log(UserModel);
        client.connect(err => {
            const collection = client.db("canvas").collection("user");
            collection.findOne({Email:user.Email}, (error, result) => {
                if(result){
                    callback("User already registered");
                } else {
                    console.log(`collection.insertOne`);
                    collection.insertOne(UserModel, function(err, res) {
                        if (err) {
                            console.log(`${err}`);
                        } 
                        callback("1 document inserted");
                    });
                }
            })
        })    
    }, function (err) {
        callback({success:false, message: "Sign Up error"});
    });
}

exports.handle_request = handle_request;