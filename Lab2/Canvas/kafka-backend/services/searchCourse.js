const Queries = require('../../backend/models/query');

function handle_request(user, callback){
    console.log(`user kafka`);
    console.log(user);
    Queries.searchCourse(user, 
        (result)=>{
            console.log(result);
            callback(null,{success:true,courseDetails:result});
        }, (error)=>{
            console.log(error);
            callback({success:false, message:error},null);
        })
}
exports.handle_request = handle_request;