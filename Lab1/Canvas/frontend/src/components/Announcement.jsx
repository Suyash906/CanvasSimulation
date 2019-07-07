import React, { Component } from 'react'
import '../App.css';
//import axios from 'axios';

class Announcement extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            AnnouncementSubject:this.props.AnnouncementSubject,
            Message:this.props.Message
        }
    }

    render() {
        return(
            <div>
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {this.state.AnnouncementSubject}</button>
                        </h5>
                    </div>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#Annoncement">
                    <div className="card-body">
                    {this.state.Message}
                    </div>
                </div>
            </div>
        )
    }
}

export default Announcement;