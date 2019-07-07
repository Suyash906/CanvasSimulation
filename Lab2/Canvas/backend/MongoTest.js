
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://canvasUser:canvasPassword@cluster0-xdp1v.mongodb.net/canvas?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

// var course = {
//     SjsuId: "10004",
//     courseId:5
//   };
//   client.connect(err => {
//     const collection = client.db("canvas").collection("courses");
//         collection.findOne({courseId:course.courseId}, (error, result) => {
//             if(result){
//                 const userCollection = client.db("canvas").collection("user");
//                 const query = {SjsuId:course.SjsuId};
//                 const update = {$push:{courseEnrolled:{$each:[result]}}};
//                 client.connect(err => {
//                     userCollection.updateOne(query, update, (error, res) => {
//                         if(res){
//                             successCallback(`Student Enrolled`);
//                         } else {
//                             faliureCallback(`${error}`);
//                         }
//                     })
//                 });

//             } else {
//                 faliureCallback(`User Not Found`);
//             }
//     })
// })


module.exports = {client};

// var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb+srv://canvasUser:canvasPassword@cluster0-xdp1v.mongodb.net/test?retryWrites=true');

// module.exports = {mongoose};