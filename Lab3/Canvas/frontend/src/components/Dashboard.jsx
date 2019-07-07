import React, { Component } from 'react'
import {withApollo} from 'react-apollo';
import '../App.css';
import axios from 'axios';
import Config from '../Config';
import CourseTile from './CourseTile';
import SideNavBar from './SideNavBar';
import {dashboard} from '../queries/query';


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            userType:"Student",
            navBarData:Config.studentNavbarData,
            courseDetails:[]
        }
        this.onloadPageClick = this.onloadPageClick.bind(this);
        this.clickActionData = this.clickActionData.bind(this);
    }

    componentWillMount() {
        if(!localStorage.getItem('apiToken')){
            this.props.history.push('/login');
        } else{
            let apiToken = localStorage.getItem('apiToken');
            let userType = localStorage.getItem('userType');
            let SjsuId = localStorage.getItem('SjsuId');
            let params = {};
            if(userType === "Student") {
                params = {
                    userType: userType,
                    SjsuId : SjsuId
                };
                this.setState ({
                    userType: userType,
                    SjsuId : SjsuId
                } )
            } else {
                params = {
                    userType: userType,
                    SjsuId : SjsuId
                };
                this.setState ( {
                    userType: userType,
                    SjsuId : SjsuId,
                    navBarData:Config.facultyNavbarData
                })
            }

            let headers = {
                'Content-Type': 'application/json',
                'Authorization': apiToken 
            };

            this.props.client.query({
                query : dashboard,
                variables: {
                    SjsuId : this.state.SjsuId
                }
            }).then((response)=>{
                if(response.data.success) {
                    this.setState( {
                        courseDetails:response.data.courseDetails
                    });
                } else {
                    window.location.href="/login";
                }
    
              });
            }
        }

    clickActionData = (e) => {
        console.log(`clickActionData`);
        console.log(e.target);        
    }
    
    componentWillReceiveProps(nextProps){
        console.log(`nextProps`);
        console.log(nextProps);
    }
    
    onloadPageClick = (e) => {
        let value = e.target.name;
        if(value === `/logout`){
            localStorage.clear();
            this.props.history.push('/login');
        } else {
            this.props.history.push(value);
        }
    } // e ke andar context. mtlb pura data child ka

    render(){
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"100px" ,position:"relative"}}>
                    <SideNavBar navBarData ={this.state.navBarData} onloadPageClick={this.onloadPageClick}></SideNavBar>
                </div>
                <div className="col-md-11 col-sm-11 col-xs-11">
                {this.state.courseDetails.map((course, index) => (
                    <div className="float-right" style={{marginRight:"20%",marginBottom:"5%"}}><CourseTile clickActionData={this.clickActionData} CourseId={course.courseId} CourseCode={course.CourseCode} CourseDept={course.CourseDept} CourseTerm={course.CourseTem} CourseName = {course.CourseName}></CourseTile></div>
                ))}
                </div>
            </div>
        )
    }
}


export default withApollo(Dashboard);