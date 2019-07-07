const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://canvasUser:canvasPassword@cluster0-xdp1v.mongodb.net/canvas?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
module.exports = {client};