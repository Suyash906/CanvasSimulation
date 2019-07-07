var assert = require('chai').assert;
var app = require('./index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

/*
  * Test the /GET route
  */
 describe('GET Student Enrolled Courses', () => {
    it('GET Student Enrolled Courses',function(){
        agent.get('/dashboard?userType=Student&StudentId=6')
            .then(function(res){    
                expect(res.status).to.equal(200);
            });
    });
});