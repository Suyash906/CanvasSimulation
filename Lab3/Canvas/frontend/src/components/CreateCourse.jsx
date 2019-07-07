import React, { Component } from 'react'
import {graphql,compose} from 'react-apollo';
import {createCourse} from '../mutations/mutation';
import '../App.css';
import axios from 'axios';
import Config from '../Config';
import SideNavBar from './SideNavBar';

class CreateCourse extends Component{
    constructor(props){
        super(props);
        this.state = {
                CourseName: "",
                CourseDept: "",
                CourseDescription: "",
                CourseRoom: "",
                CourseCapacity: 0,
                WaitlistCapacity: 0,
                CourseCode: 0,
                CourseTem: "",
                SjsuId:0,
                menu:["Home", "Announcement", "Assignment", "Grades", "People", "Files", "Quiz"]
        }
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

    addCourse = (event) => {
        event.preventDefault();
        this.props.createCourse({
            variables:{
                CourseName: this.state.CourseName,
                CourseDept: this.state.CourseDept,
                CourseDescription: this.state.CourseDescription,
                CourseRoom: this.state.CourseRoom,
                CourseCapacity: this.state.CourseCapacity,
                WaitlistCapacity: this.state.WaitlistCapacity,
                CourseCode: this.state.CourseCode,
                CourseTem: this.state.CourseTem,
                SjsuId:this.state.SjsuId
            }

        }).then(
            response => {
                alert(`Course Successfully Added`);
                this.props.history.push('/');
            }
        );
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    componentWillMount(){
        if(!localStorage.getItem('apiToken')){
            //this.props.history.push('/login');
        } else{
            this.setState({SjsuId:localStorage.getItem(`SjsuId`)});
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"100px" ,position:"relative"}}>
                    <SideNavBar navBarData ={Config.facultyNavbarData} onloadPageClick={this.onloadPageClick}></SideNavBar>
                </div>
                <div className="col-md-2 col-sm-2 col-xs-2">
                <ul className="nav nav-pills nav-stacked">
                    {this.state.menu.map((menuItem, index) => (
                        <li><a href="#">{menuItem}</a></li>
                    ))}
                    </ul>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-9">
                <form>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" name="CourseName" onChange={this.onChange} placeholder="Course Name"/>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" name="CourseDept" onChange={this.onChange} placeholder="Course Department"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea class="form-control" id="" placeholder="Enter the course description here"  onChange={this.onChange} name="CourseDescription" rows="4"></textarea>
                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="number" class="form-control" name="CourseCapacity" onChange={this.onChange} placeholder="Course Capacity"/>
                        </div>
                        <div class="col">
                            <input type="number" class="form-control" name="WaitlistCapacity" onChange={this.onChange} placeholder="Waitlist Capacity"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" name="CourseRoom" onChange={this.onChange} placeholder="Course Room"/>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" name="CourseTem" onChange={this.onChange} placeholder="Course Term"/>
                        </div>
                        <div class="col">
                            <input type="number" class="form-control" name="CourseCode" onChange={this.onChange} placeholder="Course Code"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-lg" onClick={this.addCourse}>Add Course</button>
                </form>
                </div>
            </div>
        )
    }

}

export default compose(
    graphql(createCourse,{name:"createCourse"})
  )(CreateCourse);

