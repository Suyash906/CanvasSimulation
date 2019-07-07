import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Annoncement from './Announcement';
import Config from '../config';

class ViewAnnouncement extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            userType:"Student",
            CourseId:1,
            announcementDetails:[]
        }
    }

    componentWillMount(){
        let apiToken = localStorage.getItem('apiToken');
        let userType = localStorage.getItem('userType');
        let userId = localStorage.getItem('userId');
        let params = {};
        if(userType === "Student") {
            params = {
                userType: userType,
                StudentId : userId,
                CourseId:this.state.CourseId
            };
            this.setState ({
                userType: userType,
                StudentId : userId
            } )
        } else {
            params = {
                userType: userType,
                FacultyId : userId,
                CourseId:this.state.CourseId
            };
            this.setState ( {
                userType: userType,
                FacultyId : userId,
                navBarData:JSON.parse(`[{"displayName":"Account","hasIcon":true,"iconFileName":"dashboard.svg"},{"displayName":"Dashboard","hasIcon":true,"iconFileName":"dashboard.svg"},{"displayName":"Courses","hasIcon":true,"iconFileName":"courses.svg"},{"displayName":"Create Course","hasIcon":true,"iconFileName":"courses.svg"}]`)
            })
        }

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': apiToken 
        };

        axios.get(`${Config.BASE_URL}/viewAnnouncement`, {params :params})
            .then(response => {
                console.log(response.data);
                if(response.data.success) {
                    this.setState( {
                        announcementDetails:response.data.announcementDetails
                    });
                } else {
                    this.props.history.push(`/login`);
                }
            }
        );
    }

    render() {
        return(
            <div className="accordion" id="Annoncement">
                {this.state.announcementDetails.map((annoncement, index) => (
                    <Annoncement AnnouncementSubject={annoncement.AnnouncementSubject} Message={annoncement.Message}></Annoncement>
                ))}
            </div>
        )
    }
}

export default ViewAnnouncement;