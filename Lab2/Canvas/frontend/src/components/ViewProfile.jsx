import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import Config from '../config';
import SideNavBar from './SideNavBar';
import {GetProfileData} from '../actions/ProfileAction';
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
        let SjsuId = localStorage.getItem('SjsuId');
        let params = {};
        if(userType === "Student") {
            params = {
                SjsuId : SjsuId
            };
            this.setState ({
                userType: userType,
                SjsuId : SjsuId
            } )
        } else {
            params = {
                SjsuId : SjsuId
            };
            this.setState ( {
                userType: userType,
                SjsuId : SjsuId,
                navBarData:Config.facultyNavbarData
            })
        }
        this.props.GetProfileData(params,apiToken);
    }
    render(){
        console.log(this.props);
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"100px" ,position:"relative"}}>
                    <SideNavBar navBarData ={this.state.navBarData} clickActionData={this.state.clickActionData}></SideNavBar>
                </div>
                <div className="col-md-11 col-sm-11 col-xs-11">
                    <form>
                    <div className="form-group">
                        <label for="Name">Name</label>
                        <input type="text" className="form-control input-sm" name="Name" id="Name" onChange={this.onChange} placeholder="Name" required  value={this.props.Name} disabled/>
                    </div>
                    <div className="form-group">
                        <label for="Email">Email</label>
                        <input type="email" className="form-control input-sm" name="Email" id="Email" onChange={this.onChange} placeholder="Phone Number" required  value={this.props.Email} disabled/>
                    </div>
                    <div className="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="number" className="form-control input-sm" name="phoneNumber" onChange={this.onChange} placeholder="Phone Number" required  value={this.props.phoneNumber} disabled/>
                    </div>
                    <div className="form-group">
                        <label for="aboutMe">About Me</label>
                        <textarea class="form-control" id="" placeholder="About Me" name="aboutMe" rows="4"  value={this.props.aboutMe} disabled></textarea>
                    </div>
                    <div className="form-group">
                        <label for="City">City</label>
                        <input type="text" className="form-control input-sm" name="City" onChange={this.onChange} value={this.props.city} placeholder="City" required  disabled/>
                    </div>
                    <div className="form-group">
                        <label for="Country">Country</label>
                        <input type="text" className="form-control input-sm" name="Country" onChange={this.onChange} value={this.props.country} placeholder="Country" required  disabled/>
                    </div>
                    <div className="form-group">
                        <label for="School">School</label>
                        <input type="text" className="form-control input-sm" name="School" onChange={this.onChange}value={this.props.school} placeholder="School" required  disabled/>
                    </div>
                    <div className="form-group">
                        <label for="Hometown">Hometown</label>
                        <input type="text" className="form-control input-sm" name="Hometown" onChange={this.onChange} value={this.props.hometown} placeholder="Hometown" required  disabled/>
                    </div>
                    <div className="form-group">
                        <label for="Languages">Languages</label>
                        <input type="text" className="form-control input-sm" name="Languages" onChange={this.onChange} value={this.props.languages} placeholder="Languages" required  disabled/>
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

ViewProfile.propTypes = {
    GetProfileData: PropTypes.func.isRequired,
    Name:PropTypes.string.isRequired,
    Email:PropTypes.string.isRequired,
    phoneNumber:PropTypes.number.isRequired, 
    aboutMe:PropTypes.string.isRequired, 
    city:PropTypes.string.isRequired,
    country:PropTypes.string.isRequired, 
    school:PropTypes.string.isRequired, 
    hometown:PropTypes.string.isRequired, 
    languages:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    Name:state.viewProfile.Name,
    Email:state.viewProfile.Email,
    phoneNumber:state.viewProfile.phoneNumber,
    aboutMe:state.viewProfile.aboutMe,
    city:state.viewProfile.city,
    country:state.viewProfile.country,
    school:state.viewProfile.school,
    hometown:state.viewProfile.hometown,
    languages:state.viewProfile.languages

  });

export default connect(mapStateToProps, { GetProfileData })(ViewProfile);