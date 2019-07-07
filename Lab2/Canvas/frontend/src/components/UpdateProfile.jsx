import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import Config from '../config';
import SideNavBar from './SideNavBar';
import {GetProfileData, UpdateProfileData} from '../actions/ProfileAction';
import Axios from 'axios';

class UpdateProfile extends Component{
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

    updateProfile = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.UpdateProfileData(this.state, this.props.history);
    }

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

    componentWillMount(){

        let apiToken = localStorage.getItem('apiToken');
        let userType = localStorage.getItem('userType');
        let SjsuId = localStorage.getItem('SjsuId');
        let params = {};
        if(userType === "Student") {
            params = {
                SjsuId:SjsuId
            };
            this.setState ({
                userType: userType,
                SjsuId:SjsuId
            } )
        } else {
            params = {
                SjsuId:SjsuId
            };
            this.setState ( {
                userType: userType,
                navBarData:Config.facultyNavbarData,
                SjsuId:SjsuId
            })
        }
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
                        <input type="text" className="form-control input-sm" name="Name" id="Name" onChange={this.onChange} placeholder="Name" required/>
                    </div>
                    <div className="form-group">
                        <label for="Email">Email</label>
                        <input type="email" className="form-control input-sm" name="Email" id="Email" onChange={this.onChange} placeholder="Email Id" required/>
                    </div>
                    <div className="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="number" className="form-control input-sm" name="phoneNumber" onChange={this.onChange} placeholder="Phone Number" required/>
                    </div>
                    <div className="form-group">
                        <label for="aboutMe">About Me</label>
                        <textarea class="form-control" id="" placeholder="About Me"  onChange={this.onChange} name="aboutMe" rows="4"></textarea>
                    </div>
                    <div className="form-group">
                        <label for="City">City</label>
                        <input type="text" className="form-control input-sm" name="city" onChange={this.onChange} placeholder="City" required/>
                    </div>
                    <div className="form-group">
                        <label for="Country">Country</label>
                        <input type="text" className="form-control input-sm" name="country" onChange={this.onChange}  placeholder="Country" required/>
                    </div>
                    <div className="form-group">
                        <label for="School">School</label>
                        <input type="text" className="form-control input-sm" name="School" onChange={this.onChange} placeholder="School" required/>
                    </div>
                    <div className="form-group">
                        <label for="Hometown">Hometown</label>
                        <input type="text" className="form-control input-sm" name="hometown" onChange={this.onChange} placeholder="Hometown" required/>
                    </div>
                    <div className="form-group">
                        <label for="Languages">Languages</label>
                        <input type="text" className="form-control input-sm" name="languages" onChange={this.onChange} placeholder="Languages" required/>
                    </div>
                    <div className="form-group">
                        <button onClick={this.updateProfile}>Update</button>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

UpdateProfile.propTypes = {
    GetProfileData: PropTypes.func.isRequired,
    UpdateProfileData: PropTypes.func.isRequired,
    Name:PropTypes.string.isRequired,
    Email:PropTypes.string.isRequired,
    phoneNumber:PropTypes.number.isRequired, 
    aboutMe:PropTypes.string.isRequired, 
    city:PropTypes.string.isRequired,
    country:PropTypes.string.isRequired, 
    school:PropTypes.string.isRequired, 
    hometown:PropTypes.string.isRequired, 
    languages:PropTypes.string.isRequired,
    SjsuId:PropTypes.number.isRequired
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
    languages:state.viewProfile.languages,
    SjsuId:state.viewProfile.SjsuId
  });

export default connect(mapStateToProps, { GetProfileData, UpdateProfileData })(UpdateProfile);