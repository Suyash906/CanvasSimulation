import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../config';
import SideNavBar from './SideNavBar';

class EnrollCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
            FacultyId : 0,
            StudentId : 0,
            userType:"Student",
            navBarData:Config.studentNavbarData,
            CourseCode :0,
            CourseId:4,
            CourseDept: "",
            CourseTerm:"",
            CourseName:"",
            errorMessage:"",
            searchResultData:[],
            CurrentCourseInfo:{}
        }
    }

    hideSearchResult  = () => {
        document.getElementById('courseSearchResult').style.display="none";
    }

    showSearchResult  = () => {
        console.log("showSearchResult Start");
        document.getElementById('courseSearchResult').style.display="block";
        console.log("showSearchResult End");
    }

    hideErrorMessage  = () => {
        document.getElementById('errorMessage').style.display="none";
    }

    showErrorMessage  = () => {
        document.getElementById('errorMessage').style.display="block";
    }

    componentWillMount() {

        let apiToken = localStorage.getItem('apiToken');
        let userType = localStorage.getItem('userType');
        let userId = localStorage.getItem('userId');
        this.setState({
            StudentId:userId
        });
        
    }
    
    searchClass = (event) => {
        event.preventDefault();
        axios.get(`${Config.BASE_URL}/searchCourse`, {params : { CourseTerm : this.state.CourseTerm, CourseCode:this.state.CourseCode, CourseName:this.state.CourseName, CourseDept:this.state.CourseDept}})
            .then(response => {
                if(response.data.success) {
                    this.showSearchResult();
                    this.hideErrorMessage();
                    console.log(`response.data.Courses`);
                    console.log(response.data);
                    this.setState = ({
                        searchResultData:response.data.courseDetails
                    })
                    console.log(`this.state.searchResultData`);
                    console.log(this.state.searchResultData);
                } else {
                    this.setState = {
                        errorMessage:response.data.message,
                    }
                    this.hideSearchResult();
                    this.showErrorMessage();
                }
            })        
    }

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

    enrollCourse = (Course, event) => {
        
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"100px" ,position:"relative"}}>
                    <SideNavBar navBarData ={this.state.navBarData} clickActionData={this.state.clickActionData}></SideNavBar>
                </div>
                <div className="col-md-2 col-sm-2 col-xs-2">
                </div>
                <div className="col-md-9 col-sm-9 col-xs-9">
                    <form method="POST">
                        <div className="form-group">
                            <label for="CourseDept">Department</label>
                            <select className="form-control" id="CourseDept" name="CourseDept" onChange={this.onChange}>
                                <option value="IE">IE</option>
                                <option value="EE">EE</option>
                                <option value="CMPE">CMPE</option>
                                <option value="EM">EM</option>
                                <option value="PHYSICS">PHYSICS</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="CourseCode">Course Code</label>
                            <input type="number" className="form-control" id="CourseCode" name="CourseCode" onChange={this.onChange} />
                        </div>
                        <div class="form-group">
                            <label for="CourseName">Course Name</label>
                            <input type="text" className="form-control" id="CourseName" name="CourseName" onChange={this.onChange} />
                        </div>
                        <div class="form-check">
                            <input className="form-check-input" type="radio" name="CourseTerm" id="SPRING" checked={this.state.userType === 'SPRING'} onChange={this.onChange} value="SPRING"/>
                            <label className="form-check-label" for="SPRING">
                                SPRING
                            </label>
                        </div>
                        <div class="form-check">
                            <input className="form-check-input" type="radio" name="CourseTerm" id="FALL" checked={this.state.userType === 'FALL'} onChange={this.onChange} value="FALL"/>
                            <label className="form-check-label" for="FALL">
                                FALL
                            </label>
                        </div>
                        <div className="clear"></div>
                        <button type="submit" className="btn btn-secondary btn-lg" onClick={this.searchClass}>Search Course</button>
                    </form>
                    <div className = "clear"></div>
                    <table className="table" id="courseSearchResult">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Faculty</th>
                                <th>Term</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="">
                        
                        {this.state.searchResultData.map((Course, index) => (
                            <tr>
                                <td>
                                    <input type="hidden" name="CourseCode" value={Course.coursecode} onChange={this.onChange} />
                                    {Course.coursecode}
                                </td>
                                <td>
                                    <input type="hidden" name="CourseName" value={Course.CourseName} onChange={this.onChange} />
                                    {Course.coursename}
                                </td>
                                <td>{Course.NAME}</td>
                                <td>{Course.courseterm}</td>
                                <td>
                                    <button type="button" class="btn btn-success" onClick={this.enrollCourse.bind(Course)}><b>Enroll</b></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        
                    </table>
                    <div className = "clear"></div>
                    <div class="alert alert-info" role="alert" id="errorMessage">
                        {this.state.errorMessage}
                    </div>
                </div>
                
            </div>
        )
    }

}

export default EnrollCourse;