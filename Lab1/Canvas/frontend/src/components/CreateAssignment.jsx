import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../Config';
import SideNavBar from './SideNavBar';

class CreateAssignment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            CourseId:1,
            FacultyId:localStorage.getItem('userId'),
            Startdate:"", 
            DueDate:"", 
            MaximummMarks:10, 
            Description:""
        }
    }

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

    onSubmit = (e) => {
        e.preventDefault();
        let params = this.state;
        console.log(JSON.stringify(params));
        axios.post(`${Config.BASE_URL}/createAssignment`, params)
            .then(response => {
                console.log(response.data);
                console.log(`Response status - ${response.status}`);
            })
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"105px" ,position:"relative"}}>
                    <SideNavBar navBarData ={Config.facultyNavbarData} clickActionData={this.state.clickActionData}></SideNavBar>
                </div>
                <div className="col-md-2 col-sm-2 col-xs-2">
                    dsjfljnfljn
                </div>
                <div className="col-md-9 col-sm-9 col-xs-9">
                    <form onSubmit={this.onSubmit} onChange={this.onChange}>
                        <div class="form-group row">
                            <label for="Startdate" class="col-2 col-form-label">Start Date</label>
                            <div class="col-3">
                               <input class="form-control" type="datetime-local" id="Startdate" name="Startdate"/>
                            </div>
                            <label for="DueDate" class="col-2 col-form-label">Due Date</label>
                            <div class="col-3">
                               <input class="form-control" type="datetime-local" id="DueDate" name="DueDate"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                <label for="MaximummMarks" class="col-2 col-form-label">Maximumm Grade</label>
                                <input class="form-control" type="number" id="MaximummMarks" name="MaximummMarks"/>   
                            </div>
                            <div className="col-5">
                                <label for="Description">Description</label>
                                <textarea className="form-control" id="Description" name="Description" onChange={this.onChange} rows="3"></textarea>   
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-auto">
                                <input type="submit" value="Create Assignment" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateAssignment;