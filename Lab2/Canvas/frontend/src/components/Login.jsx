import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginUser } from '../actions/LoginAction';
import '../App.css';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            Email:"",
            password:"",
            userType:""
        }
        this.onChange = this.onChange.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
        this.redirectSignUpPage = this.redirectSignUpPage.bind(this);
    }

    authenticateUser = (e) => {
        console.log("authenticate User");
        e.preventDefault();
        this.props.LoginUser(this.state,this.props.history);
    }

    redirectSignUpPage = (e) => {
        this.props.history.push(`/signUp`);
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    render(){
        return(
            <div style={{width:"30%", marginTop: "10%", marginLeft: "35%", border: "2px #000000"}}>
                <h3 className="h3">Login Page</h3>
                <form method="post">
                    <div className="form-group">
                        <input type="email" className="form-control input-sm" name="Email" onChange={this.onChange} placeholder="Email Id" required />
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

Login.propTypes = {
    LoginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps, { LoginUser })(Login);