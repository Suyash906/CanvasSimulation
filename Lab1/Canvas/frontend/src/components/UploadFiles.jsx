import React, { Component } from 'react';
import '../App.css';
import SideNavBar from './SideNavBar';
import Config from '../Config';
import axios from 'axios';

class UploadFiles extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            description: '',
            selectedFile: ''
        }
    }
    componentWillMount(){
        console.log(this.props.dataname);
    }

    onChange = (e) => {
        if (e.target.name == 'selectedFile') {
            this.setState({
                selectedFile: e.target.files[0]
            })
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('description', description);
        formData.append('selectedFile', selectedFile);

        axios.post(`${Config.BASE_URL}/profilePhoto`, formData)
            .then((response) => {
                console.log("here is the response body")
                console.log(response.body)
                console.log("here is the response data")
                console.log(response.data)
            });

    }

    render(){
        return(
            <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1 float-left backgroundColorBlue" style={{minHeight:"700px",minWidth:"100px" ,position:"relative"}}>
                    <SideNavBar navBarData ={Config.facultyNavbarData} clickActionData={this.state.clickActionData}></SideNavBar>
                </div>
                <div className="col-md-11 col-sm-11 col-xs-11">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor:"#1D1D1D"}}>
                        <div class="collapse navbar-collapse" style={{fontWeight:"bold",fontSize: "200%", color: "#5C34AF"}}>
                            <p><u>CMPE 273 : Enterprise Distributed System</u></p>
                        </div>
                    </nav>
                    <div className="row">
                        <div className="col-md-2 col-sm-2 col-xs-2 bg-light" style={{backgroundColor:"#1D1D1D"}}>
                            <nav className="navbar navbar-light" style={{minHeight:"700px"}}>
                                {
                                    Config.facultyMenuData.map((menuitem, index) => (
                                        <li className="nav">
                                            <form className="form-inline">
                                                <button className="btn btn-outline-success" type="button">{menuitem.displayname}</button>
                                            </form>
                                        </li>    
                                    ))
                                }
                            </nav>
                        </div>
                        <div class="col-md-10 col-sm-10 col-xs-10">
                            <form className="form">
                                <div className="form-group">
                                    <label for="selectedFile">Assignment File</label>
                                    <input type="file" class="form-control-file" id="selectedFile" name="selectedFile" onChange={this.onChange}/>
                                </div>
                                <button type="button" class="btn btn-success" >Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFiles;