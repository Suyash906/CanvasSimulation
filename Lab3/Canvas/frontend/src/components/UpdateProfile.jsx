import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {updateProfile} from '../mutations/mutation';
import '../App.css';
import Config from '../Config';
import SideNavBar from './SideNavBar';
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
        this.onloadPageClick = this.onloadPageClick.bind(this);   
    }

    updateProfile = (e) => {
        e.preventDefault();
        this.props.updateProfile({
            variables:{
                Name:this.state.Name, 
                Email:this.state.Name, 
                phoneNumber:this.state.Name, 
                aboutMe:this.state.Name, 
                city:this.state.Name, 
                country:this.state.Name, 
                school:this.state.Name, 
                hometown:this.state.Name, 
                languages:this.state.Name,
                SjsuId:this.state.SjsuId     
            }

        }).then(
            response=>{
                this.props.history.push('/viewProfile');
            }
        );
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

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

    componentWillMount(){
        if(!localStorage.getItem('apiToken')){
            this.props.history.push('/login');
        }
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

export default compose(
    graphql(updateProfile,{name:"updateProfile"})
  )(UpdateProfile);