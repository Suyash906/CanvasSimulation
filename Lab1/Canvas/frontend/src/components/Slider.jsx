import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Config from '../Config';

class Slider extends Component{
    constructor(props){
        super(props);
        this.state={
            width:0,
            sliderData:{}
        }
    }

    render(){
        return(
            <div>
            </div>
        )
    }
}

export default Slider;