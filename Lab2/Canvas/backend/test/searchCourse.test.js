
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
    it('GET SEARCH Courses Result',function(){
        agent.get('/searchCourse?CourseTerm&CourseName&CourseCode=273&CourseDept=CMPE')
            .then(function(res){    
                expect(res.status).to.equal(200);
            });
    });
});