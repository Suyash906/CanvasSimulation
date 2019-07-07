import React, { Component } from 'react'
import '../App.css';

class CourseTile extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state ={
            courselink:"https://stackoverflow.com/questions/47474448/react-router-v4-warning-you-tried-to-redirect-to-the-same-route-youre-curren",
            CourseId:0,
            CourseCode:0,
            CourseDept:"",
            CourseTerm:"",
            CourseName:"default"
        }
    }
    componentWillMount(){
        this.setState({
            CourseId:this.props.CourseId,
            CourseCode:this.props.CourseCode,
            CourseDept:this.props.CourseDept,
            CourseTerm:this.props.CourseTerm,
            CourseName:this.props.CourseName        
        })
    }

    componentWillReceiveProps(){
        console.log(`componentWillReceiveProps`);
    }

    render(){
        return(
            <div className="card" style={{width: "18rem"}}>
                <div className="card-img-top" style={{backgroundColor:"blueviolet", height:"200px"}}></div>
                <div className="card-body">
                <button type="button" onClick={this.props.onloadPageClick.bind(this.state.CourseId)} className="btn btn-link"><h5 className="card-title">{this.state.CourseTerm}: {this.state.CourseDept}-{this.state.CourseCode} - {this.state.CourseName}</h5></button>
                </div>
            </div>
        )
    }
}

export default CourseTile;