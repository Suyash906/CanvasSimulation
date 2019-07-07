var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback){
    console.log('in make request');
	console.log(msg_payload);
	console.log(`queue ${queue_name}`);
	rpc.makeRequest(queue_name, msg_payload, function(err, response){
		console.log(`makeRequest`);
		if(err){
			console.log(`error in client.js 11 ${err}`);
			console.error(err);
		}
		else{
			console.log(`response 15 client.js`);
			console.log(`response ${response}`);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;