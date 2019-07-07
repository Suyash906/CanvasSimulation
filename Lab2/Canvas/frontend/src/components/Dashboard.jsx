import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../config';
//import Assignment from './Assignment';
import CourseTile from './CourseTile';
//import Announcement from './Announcement';
import SideNavBar from './SideNavBar';


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            userType:"Student",
            navBarData:Config.studentNavbarData,
            courseDetails:[]
        }
        this.onloadPageClick = this.onloadPageClick.bind(this);
    }

    componentWillMount() {

        let apiToken = localStorage.getItem('apiToken');
        let userType = localStorage.getItem('userType');
        let userId = localStorage.getItem('userId');
        let params = {};
        if(userType === "Student") {
            params = {
                userType: userType,
                StudentId : userId
            };
            this.setState ({
                userType: userType,
                StudentId : userId
            } )
        } else {
            params = {
                userType: userType,
                FacultyId : userId
            };
            this.setState ( {
                userType: userType,
                FacultyId : userId,
                navBarData:Config.facultyNavbarData
            })
        }

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': apiToken 
        };
        axios.get(`${Config.BASE_URL}/dashboard`, {params :params})
            .then(response => {
                console.log(response.data);
                if(response.data.success) {
                    this.setState( {
                        courseDetails:response.data.courseDetails
                    });
                } else {
                    window.location.href="/login";
                }
            });
        
        console.log("Component will mount of Dashboard page");
    }
    
    onloadPageClick = (data) => {
        
    } // e ke andar context. mtlb pura data child ka

    render(){
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"100px" ,position:"relative"}}>
                    <SideNavBar navBarData ={this.state.navBarData} clickActionData={this.state.clickActionData}></SideNavBar>
                </div>
                <div className="col-md-11 col-sm-11 col-xs-11">
                {this.state.courseDetails.map((course, index) => (
                    <div className="float-right" style={{marginRight:"20%",marginBottom:"5%"}}><CourseTile onloadPageClick={this.onloadPageClick} CourseId={course.CourseId} CourseCode={course.CourseCode} CourseDept={course.CourseDept} CourseTerm={course.CourseTerm} CourseName = {course.CourseName}></CourseTile></div>
                ))}
                </div>
            </div>
        )
    }
}


export default Dashboard;