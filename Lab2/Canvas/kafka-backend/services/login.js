const applicationConfig = require('../../backend/config/application');
const jwt = require('jsonwebtoken');
const crypt = require('../../backend/encryption');
const passport  = require('passport');
const {client} = require(`../../backend/MongoTest`);
const {UserModel} = require(`../../backend/models/user`);

function handle_request(user, callback){
    console.log(`user kafka`);
    console.log(user);
        client.connect(err => {
            const collection = client.db("canvas").collection("user");
            collection.findOne({Email:user.Email, userType:user.userType}, (error, result) => {
                if(result){
                    crypt.compareHash(user.password, result.password, (err, passwordMatched) => {
                        if (passwordMatched && !err) {
                            var token = jwt.sign({ SjsuId:result.SjsuId },                           applicationConfig.secretKey, {
                                expiresIn: 10800 // in seconds
                            });
                            //let cookieData = { useremail:user.name, userName:user.name, userType:user.userType };
                            console.log(`Login result`);
                            console.log(result);
                            console.log({ success: true, userType: user.userType, token:  token , SjsuId:result.SjsuId});
                            callback(null, { success: true, userType: user.userType, token:  token , SjsuId:result.SjsuId});                
                        } else {
                            callback(null, { success: false, message:"Authentication failed. Passwords did not match."});
                        }
                    })                    
                }    
            })
        }
    )}

exports.handle_request = handle_request;