'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var db = require('./db');
var applicationConfig = require('./config/application');

module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: applicationConfig.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        db.findUser({ username: jwt_payload.username }, function (res) {
            var user = res;
            delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};