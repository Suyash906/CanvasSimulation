import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';

class CreateCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            FacultyId : 1,
            CourseName : "Enterprise Distributed System",
            CourseDept: "CMPE",
            CourseDescription:"Introduction to application protocols for large scale distributed systems including object request brokers, asynchronous messaging, and Web services. Lab is based on using protocols to build distributed systems. Prerequisites: Java programming or instructor consent. Computer Engineering and Software Engineering majors only. Corequisites: CMPE 272",
            CourseRoom:"ENG 189",
            CourseCapacity:50,
            WaitlistCapacity:15,
            courseTerm:"Spring 2019",
            CourseCode:273
        }
    }

    addCourse = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/createCourse', this.state)
            .then(response => {
               console.log("Status Code : ",response.status);
        });
    }

    render(){
        return(
            <div style={{width:"30%", marginTop: "10%", marginLeft: "35%", border: "2px #000000"}}>
                <h3 className="h3">Add Courses</h3>
                <form method="post">
                    <button type="submit" className="btn btn-secondary btn-lg" onClick={this.addCourse}>Login</button>
                </form>
            </div>
        )
    }

}

export default CreateCourse;