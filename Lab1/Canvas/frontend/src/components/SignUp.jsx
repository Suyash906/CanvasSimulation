import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../Config';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            emailId:"",
            password:"",
            userType:""
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    registerUser = (e) => {
        e.preventDefault();
        axios.post(`${Config.BASE_URL}/SignUp`, this.state)
            .then(response => {
                console.log(response.status);
                console.log(response.data);
                if(response.data.success === true) {
                    this.setState({
                        name:"",
                        emailId:"",
                        password:"",
                        userType:""
                    });
                    this.props.history.push("/login");
                } else {
                    alert("Error Connecting Server. Please try again later.");
                }
        });
    }

    render(){
        return(
            <div style={{width:"30%", marginTop: "10%", marginLeft: "35%"}}>
                <h3 className="h3">User Information</h3>
            <form method="post">
                <div className="form-group has-success">
                    <input type="text" className="form-control input-sm" name="name" placeholder="Enter your full name" onChange={this.onChange} required />
                </div>
                <div className="form-group has-warning">
                    <input type="email" className="form-control input-sm" name="emailId" placeholder="Enter your email id"  onChange={this.onChange} required />
                </div>
                <div className="form-group has-info">
                    <input type="password" className="form-control input-sm" name="password" placeholder="Enter your password"  onChange={this.onChange} required />
                </div>
                <div class="form-check">
                    <input className="form-check-input" type="radio" name="userType" id="Student" checked={this.state.userType === 'Student'} onChange={this.onChange} value="Student"/>
                    <label className="form-check-label" for="Student">
                        Student
                    </label>
                </div>
                <div class="form-check">
                    <input className="form-check-input" type="radio" name="userType" id="Faculty" checked={this.state.userType === 'Faculty'} onChange={this.onChange} value="Faculty"/>
                    <label className="form-check-label" for="Faculty">
                        Faculty
                    </label>
                </div>
                <div className="clear"></div>
                <button type="submit" className="btn btn-secondary btn-lg" onClick={this.registerUser}>Sign Up</button>
                &nbsp;&nbsp;&nbsp;
                <button type="reset" className="btn btn-secondary btn-lg">Clear</button>
            </form>
        </div>
        )
    }

}

export default SignUp;