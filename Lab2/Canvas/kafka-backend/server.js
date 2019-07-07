var connection =  new require('./kafka/Connection');
//topics files
var login = require('./services/login.js');
var signUp = require('./services/signUp.js');
var viewProfile = require('./services/viewProfile.js');
var updateProfile = require('./services/updateProfile.js');
var createCourse = require('./services/createCourse');
var searchCourse = require('./services/searchCourse');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login",login);
handleTopicRequest("signUp",signUp);
handleTopicRequest("viewProfile",viewProfile);
handleTopicRequest("updateProfile",updateProfile);
handleTopicRequest("createCourse",createCourse);
handleTopicRequest("searchCourse",searchCourse);