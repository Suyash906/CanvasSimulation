import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../config';
import SideNavBar from './SideNavBar';

class UploadProfileImage extends Component{
    constructor(props){
        super(props);
        this.state = {
            SjsuId:0,
            description: '',
            selectedFile: '',
            imageView: ''
        }
    }

    componentWillMount(){
        this.setState ({
            SjsuId:localStorage.getItem('SjsuId')
        })
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
        const { SjsuId, description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('SjsuId', SjsuId);
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
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                        type="file"
                        name="selectedFile"
                        onChange={this.onChange}
                    />
                        </div>
                        <button type="submit">Upload Profile Pic</button>
                </form>
            </div>
        );
    }


}


export default UploadProfileImage;