import { SideNav, Nav } from 'react-sidenav';
import React, { Component } from 'react';

class SidePanel extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){

    }

    render(){
        return(
            <SideNav defaultSelectedPath="1">
                <Nav id="1">
                    Dashboard
                </Nav>
                <Nav id="2">
                    Courses
                </Nav>
                <Nav id="3">
                    Enroll Course
                </Nav>
            </SideNav>
        )
    }
}

export default SidePanel;