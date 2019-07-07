import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../Config';

class UserLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            userId:0,
            password:"",
            userType:""
        }
    }

    authenticateUser = (e) => {
        console.log("authemticate user");
        e.preventDefault();
        axios.post(`${Config.BASE_URL}/login`, this.state)
            .then(response => {
                if(response.data.success) {
                    localStorage.setItem('apiToken', response.data.token);
                    localStorage.setItem('userType',response.data.userType);
                    localStorage.setItem('userIdentifier',response.data.userIdentifier);
                    localStorage.setItem('userId',response.data.userId);
                    window.location.href = "/";
                }
        });
    }

    redirectSignUpPage = (e) => {
        window.location.href = `${Config.BASE_URL}/signUp`;
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    render(){
        return(
            <div style={{width:"30%", marginTop: "10%", marginLeft: "35%", border: "2px #000000"}}>
                <h3 className="h3">Login Page</h3>
                <form method="post">
                    <div className="form-group">
                        <input type="number" className="form-control input-sm" name="userId" onChange={this.onChange} placeholder="User Id" required />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control input-sm" name="password" onChange={this.onChange} placeholder="Password" required />
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

                    <button type="submit" className="btn btn-secondary btn-lg" onClick={this.authenticateUser}>Login</button>
                </form>
                <button className="btn btn-link btn-lg float-right" style={{fontSize:"90%"}} onClick={this.redirectSignUpPage}>Not Registered? Sign Up</button>
            </div>
        )
    }
}

export default UserLogin;