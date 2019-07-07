import React, { Component } from 'react';
import '../App.css';
import Config from '../Config';
import SideNavBar from './SideNavBar';
import {withApollo} from 'react-apollo';
import {profile} from '../queries/query';
import Axios from 'axios';

class ViewProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            navBarData:Config.studentNavbarData,
            Name:"", 
            Email:"", 
            phoneNumber:0, 
            aboutMe:"", 
            city:"", 
            country:"", 
            school:"", 
            hometown:"", 
            languages:""
        }
    }

    editProfile = (e) => {
        e.preventDefault();
        this.props.history.push('/updateProfile');
    }

    componentWillMount(){

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
        this.props.client.query({
            query : profile,
            variables: {
                SjsuId: this.state.SjsuId
            }
        }).then((response)=>{
            if(response.data.success){
                this.setState({
                    Name:response.data.Name, 
                    Email:response.data.Email, 
                    phoneNumber:response.data.phoneNumber, 
                    aboutMe:response.data.aboutMe, 
                    city:response.data.city, 
                    country:response.data.country, 
                    school:response.data.school, 
                    hometown:response.data.hometown, 
                    languages:response.data.languages
                })
            }

          });
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"100px" ,position:"relative"}}>
                    <SideNavBar navBarData ={this.state.navBarData} clickActionData={this.state.clickActionData}></SideNavBar>
                </div>
                <div className="col-md-11 col-sm-11 col-xs-11">
                    <form>
                    <div className="form-group">
                        <label for="Name">Name</label>
                        <input type="text" className="form-control input-sm" name="Name" id="Name" onChange={this.onChange} placeholder="Name" required  value={this.state.Name} disabled/>
                    </div>
                    <div className="form-group">
                        <label for="Email">Email</label>
                        <input type="email" className="form-control input-sm" name="Email" id="Email" onChange={this.onChange} placeholder="Phone Number" required  value={this.state.Email} disabled/>
                    </div>
                    <div className="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="number" className="form-control input-sm" name="phoneNumber" onChange={this.onChange} placeholder="Phone Number" required  value={this.state.phoneNumber} disabled/>
                    </div>
                    <div className="form-group">
                        <label for="aboutMe">About Me</label>
                        <textarea class="form-control" id="" placeholder="About Me" name="aboutMe" rows="4"  value={this.state.aboutMe} disabled></textarea>
                    </div>
                    <div className="form-group">
                        <label for="City">City</label>
                        <input type="text" className="form-control input-sm" name="City" onChange={this.onChange} value={this.state.city} placeholder="City" required  disabled/>
                    </div>
                    <div className="form-group">
                        <label for="Country">Country</label>
                        <input type="text" className="form-control input-sm" name="Country" onChange={this.onChange} value={this.state.country} placeholder="Country" required  disabled/>
                    </div>
                    <div className="form-group">
                        <label for="School">School</label>
                        <input type="text" className="form-control input-sm" name="School" onChange={this.onChange}value={this.state.school} placeholder="School" required  disabled/>
                    </div>
                    <div className="form-group">
                        <label for="Hometown">Hometown</label>
                        <input type="text" className="form-control input-sm" name="Hometown" onChange={this.onChange} value={this.state.hometown} placeholder="Hometown" required  disabled/>
                    </div>
                    <div className="form-group">
                        <label for="Languages">Languages</label>
                        <input type="text" className="form-control input-sm" name="Languages" onChange={this.onChange} value={this.state.languages} placeholder="Languages" required  disabled/>
                    </div>
                    <div className="form-group">
                        <button onClick={this.editProfile}>Edit Profile</button>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withApollo(ViewProfile);