import React, { Component } from 'react'
import '../App.css';
//import axios from 'axios';

class Assignment extends Component {
    constructor(props){
        super(props);
        this.state ={

        }
    }

    componentWillReceiveProps(){

    }

    render(){
        return(
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">Assignments</h6>
                <div className="media text-muted pt-3">  
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong className="d-block text-gray-dark">Lab 1</strong>
                        Available until Mar 17 | Due Mar 10 at 11:59pm Mar 10 at 11:59pm | -/30 pts
                    </p>
                </div>
            </div>
        )
    }
}

export default Assignment;