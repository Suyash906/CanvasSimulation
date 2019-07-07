
var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

/*
  * Test the /GET route
  */
describe('SEARCH Courses', () => {
    it('View Profile API',function(){
        agent.get('/searchCourse?viewProfile?SjsuId=1003')
            .then(function(res){    
                expect(res.status).to.equal(200);
            });
    });
});