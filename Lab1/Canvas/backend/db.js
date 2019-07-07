'user strict';

var mysql = require('mysql');
const dbConfig  = require('./config/database');

//local mysql db connection
var connection = mysql.createConnection({
    host     : dbConfig.host,
    user     : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database

});

connection.connect(function(err) {
    if(err)
        console.log(err);
    else
        console.log("Database Connected");
});

module.exports = connection;