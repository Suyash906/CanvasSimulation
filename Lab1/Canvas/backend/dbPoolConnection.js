'use strict';
var mysql = require('mysql');
const dbConfig  = require('./config/database');

// Creating a connection object for connecting to mysql database
var pool = mysql.createPool({
    connectionLimit: 100,
    host: dbConfig.host,
    port: 3306,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

//Connecting to database
pool.getConnection(function (error, connection) {
    if (error) {
        console.error('error connecting to database: ' + error.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

console.log(connection);