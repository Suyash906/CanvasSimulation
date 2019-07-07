'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const math = require("math");
var cors = require('cors');


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', function (request, response) {
    try{
        console.log(request.body);
        let arithmeticExpression = request.body.expression;
        var result = eval(arithmeticExpression);
        if (result !== undefined) {
            result = result.toFixed(2);
        }
    } catch(e){
        result = "Invalid";
    }
    console.log({ success: true, result: result });
    response.json({ success: true, result: result });

});

const port =  5001;
app.listen(port);
console.log(`Server listening on port: ${port}`);