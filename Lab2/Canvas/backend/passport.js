'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var Queries = require('./models/query');
var applicationConfig = require('./config/application');

module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: applicationConfig.secret
    };
    console.log(`opts`);
    console.log(opts);
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log(`jwt_payload`);
        console.log(jwt_payload);
        // Queries.findUser({ SjsuId:jwt_payload.SjsuId}, function (res) {
        //     var user = res;
        //     delete user.password;
        //     callback(null, user);
        // }, function (err) {
        //     return callback(err, false);
        // });
    }));
};