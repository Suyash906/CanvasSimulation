import React, { Component } from 'react'
import '../App.css';

class SideNavBar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            navBarData:[]
        }
    }

    componentWillMount(){
        this.setState({
            navBarData : this.props.navBarData
        })
    }
    
    render(){
        return(
            <ul className="nav flex-column width100Percent">
                <li className="nav-item backgroundColorWhite navHeightWidth">                      
                <img src={require(`../`)} alt="SJSU" style={{width:"100%",marginTop:"20%"}}></img>
                </li>
                {this.props.navBarData.map((navOption, index) => (
                    <li className="nav-item  navHeightWidth" style={{marginBottom:"10px"}}>
                        <button type="button" className="btn btn-link" style={{color:"#FFFFFF"}}><img src={require(`../svg/${navOption.iconFileName}`)} alt="icon" style={{maxHeight:"10%"}}></img> {navOption.displayName}</button>
                    </li>
                ))}
            </ul>   
        )
    }

}

export default SideNavBar;