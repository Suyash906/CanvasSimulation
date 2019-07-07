import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../Config';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userIdentifier:``,
            phoneNumber:0,
            aboutMe:``,
            City:``,
            Country:``,
            School:``,
            Hometown:``,
            Languages:``
        }
        //this.onDrop = this.onDrop.bind(this);
    }

    // onDrop(picture) {
    //     console.log(this.state.pictures);
    //     if(this.state.pictures.length < 1) {
    //         this.setState({
    //             pictures: this.state.pictures.concat(picture),
    //         });
    //     }
        
    // }

    updateProfile = (event) => {
        event.preventDefault();
        const formData = new FormData()
         formData.append(
            'myFile',
            this.state.profileImage,
            this.state.profileImage.name
        )
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    fileChangedHandler = (event) => {
        this.setState({
            profileImage:event.target.files[0]
        });
    }

    fileUploadhandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.profileImage, this.state.profileImage.name);
        axios.post(`${Config.BASE_URL}/updateProfile`, {profileImage : this.state.profileImage})
            .then(response => {
                console.log(response.status);
        });
    }
    
    render(){
        return(
            <div>
                <h3 className="h3">Login Page</h3>
                <form encType="multipart/form-data">
                    <div className="form-group">
                        <input type="number" className="form-control input-sm" name="phoneNumber" onChange={this.onChange} placeholder="Phone Number" required />
                    </div>
                    <div className="form-group">
                        <textarea class="form-control" id="" placeholder="About Me" rows="4"></textarea>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control input-sm" name="City" onChange={this.onChange} placeholder="City" required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control input-sm" name="Country" onChange={this.onChange} placeholder="Country" required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control input-sm" name="School" onChange={this.onChange} placeholder="School" required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control input-sm" name="Hometown" onChange={this.onChange} placeholder="Hometown" required />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control input-sm" name="Languages" onChange={this.onChange} placeholder="Languages" required />
                    </div>
                    <div className="form-group">
                        <input type="file" name="profileImage" className="form-group" onChange={this.fileChangedHandler} id="profileImage" />
                    </div>

                    <button type="submit" className="btn btn-secondary btn-lg" onClick={this.fileUploadhandler}>Login</button>
                </form>
            </div>
        )
    }
}

export default UpdateProfile;