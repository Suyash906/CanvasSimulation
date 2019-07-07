import React, { Component } from 'react'
import '../App.css';
import {enrollCourse} from '../mutations/mutation';
import Config from '../Config';
import {withApollo,graphql,compose} from 'react-apollo';
import {searchCourses} from '../queries/query';
import SideNavBar from './SideNavBar';

class EnrollCourseUpdated extends Component{
    constructor(props){
        super(props);
        this.state = {
            SjsuId:0,
            searchResultData:[],
            selectedIndex:0,
            showCourseSet:[]
        }
        this.enrollCourse = this.enrollCourse.bind(this);
        this.onloadPageClick = this.onloadPageClick.bind(this);
    }

    onloadPageClick = (e) => {
        let value = e.target.name;
        if(value === `/logout`){
            localStorage.clear();
            this.props.history.push('/login');
        } else {
            this.props.history.push(value);
        }
    }

    componentWillMount() {
        if(!localStorage.getItem('apiToken')){
            this.props.history.push('/login');
        } else {
            let apiToken = localStorage.getItem('apiToken');
            let userType = localStorage.getItem('userType');
            let SjsuId = localStorage.getItem('SjsuId');
            let params = {SjsuId:SjsuId}
            this.setState({SjsuId:SjsuId});
            this.props.client.query({
                query : searchCourses
            }).then((response)=>{
                if(response.data.success){
                    this.setState({
                        searchResultData:response.data.courseDetails
                    });
                }
    
            });
        }
    }

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

    enrollCourse = (e) => {
        console.log(`Course`);
        console.log(e.target.name);
        this.props.client.mutate({
            mutation: enrollCourse,
            variables:{
                courseId:e.target.name,
                SjsuId:this.state.SjsuId
            }

        }).then(
            response => {
                alert(`Course Enrolles`);
                this.props.history.push('/');
            }
        );
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"100px" ,position:"relative"}}>
                    <SideNavBar navBarData ={Config.studentNavbarData} onloadPageClick={this.onloadPageClick}></SideNavBar>
                </div>
                <div className="col-md-2 col-sm-2 col-xs-2">
                </div>
                <div className="col-md-9 col-sm-9 col-xs-9">
                    <table className="table" id="courseSearchResult"> 
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Term</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.searchResultData.map((Course, index) => (
                            <tr>
                                <td>
                                    {Course.CourseCode}
                                </td>
                                <td>
                                    {Course.CourseName}
                                </td>
                                <td>
                                    {Course.CourseTem}
                                </td>
                                <td>
                                    <button type="button" class="btn btn-success" name={Course.courseId} onClick={this.enrollCourse.bind(index)}><b>Enroll</b></button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>  
                </div> 
                
            </div>
        )
    }

}

export default compose(
    withApollo,graphql(enrollCourse,{name:"enrollCourse"})
  )(EnrollCourseUpdated);