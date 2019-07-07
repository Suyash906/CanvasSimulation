import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {signUp} from '../mutations/mutation';
import '../App.css';

class SignUp extends Component{

    constructor(props){
        super(props);
        this.state = {
            Name:"",
            Email:"",
            password:"",
            userType:""
        }
        this.onChange = this.onChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    registerUser = (e) => {
        e.preventDefault();
        this.props.signUp({
            variables:{
                Name:this.state.Name,
                Email:this.state.Email,
                password:this.state.password,
                userType:this.state.userType
            }}

        ).then(
            response=>{
                this.props.history.push('/login');
            }
        );
    }

    render(){
        return(
            <div style={{width:"30%", marginTop: "10%", marginLeft: "35%"}}>
                <h3 className="h3">User Information</h3>
            <form method="post">
                <div className="form-group has-success">
                    <input type="text" className="form-control input-sm" name="Name" placeholder="Enter your full name" onChange={this.onChange} required />
                </div>
                <div className="form-group has-warning">
                    <input type="email" className="form-control input-sm" name="Email" placeholder="Enter your email id"  onChange={this.onChange} required />
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
export default compose(
    graphql(signUp,{name:"signUp"})
  )(SignUp);