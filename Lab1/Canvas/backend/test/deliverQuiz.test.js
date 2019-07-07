var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

/*
  * Test the /GET route
  */
 describe('/GET quiz', () => {
    it('GET /quiz/14',function(){
        agent.get('/quiz/14')
            .then(function(res){    
                expect(res.status).to.equal(200);
            });
    });
});