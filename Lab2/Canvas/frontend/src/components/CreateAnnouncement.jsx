import React, { Component } from 'react'
import '../App.css';
import SideNavBar from './SideNavBar';
import axios from 'axios';
import Config from '../config';

class CreateAnnouncement extends Component {
    constructor(props){
        super(props);
        this.state ={
            navBarData:JSON.parse(`[{"displayName":"Account","hasIcon":true,"iconFileName":"dashboard.svg"},{"displayName":"Dashboard","hasIcon":true,"iconFileName":"dashboard.svg"},{"displayName":"Courses","hasIcon":true,"iconFileName":"courses.svg"},{"displayName":"Create Course","hasIcon":true,"iconFileName":"courses.svg"}]`),
            menu:["Home", "Announcement", "Assignment", "Grades", "People", "Files", "Quiz"],
            FacultyId:1,
            CourseId:1,
            AnnouncementSubject:"",
            Message:""
        }
    }

    componentWillMount() {
        let apiToken = localStorage.getItem('apiToken');
        let userType = localStorage.getItem('userType');
        let userId = localStorage.getItem('userId');
        
        this.setState ( {
            userType: userType,
            FacultyId : userId
        })
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    createCourseAnnouncement = (e) => {
        e.preventDefault();
        let params = {
            FacultyId : this.state.FacultyId,
            CourseId:this.state.CourseId,
            AnnouncementSubject:this.state.AnnouncementSubject,
            Message:this.state.Message
        };
        axios.post(`${Config.BASE_URL}/createAnnouncement`, params)
            .then(response => {
                console.log(response.status);
                console.log(response.data);
                if(response.data.success === true) {
                    
                } else {
                    alert("Error Connecting Server. Please try again later.");
                }
        });
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"120px" ,position:"relative"}}>
                    <SideNavBar navBarData ={this.state.navBarData} clickActionData={this.state.clickActionData}></SideNavBar>
                </div>
                <div className="col-md-2 col-sm-2 col-xs-2">
                    <ul className="nav nav-pills nav-stacked">
                    {this.state.menu.map((menuItem, index) => (
                        <li><a href="#">{menuItem}</a></li>
                    ))}
                    </ul>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-9">
                <form method="post">
                    <div className="form-group">
                        <input type="text" className="form-control input-sm" name="AnnouncementSubject" onChange={this.onChange} placeholder="Announcement Subject" required />
                    </div>
                    <div className="form-group">
                        <label for="Message">Message</label>
                        <textarea className="form-control" id="Message" name="Message" onChange={this.onChange} rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-secondary btn-lg" onClick={this.createCourseAnnouncement}>Create</button>
                </form>
                </div>
            </div>
        )
    }

}

export default CreateAnnouncement;