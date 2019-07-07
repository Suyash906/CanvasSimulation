import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../config';
class Question extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Question Statement"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Option A"/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Option B"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Option C"/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Option D"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question;