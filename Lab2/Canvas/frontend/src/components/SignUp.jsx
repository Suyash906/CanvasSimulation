import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SignUpUser } from '../actions/SignUpAction';
import '../App.css';

class SignUp extends Component{

    constructor(props){
        super(props);
        this.state = {
            Name:"",
            Email:"",
            password:"",
            userType:"",
            SjsuId:0
        }
        this.onChange = this.onChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    registerUser = (e) => {
        e.preventDefault();
        this.props.SignUpUser(this.state,this.props.history);
    }

    render(){
        return(
            <div style={{width:"30%", marginTop: "10%", marginLeft: "35%"}}>
                <h3 className="h3">User Information</h3>
            <form method="post">
                <div className="form-group has-info">
                    <input type="number" className="form-control input-sm" name="SjsuId" placeholder="Enter your SJSU ID"  onChange={this.onChange} required />
                </div>
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

SignUp.propTypes = {
    SignUpUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    register: state.register.items
});

export default connect(mapStateToProps, { SignUpUser })(SignUp);