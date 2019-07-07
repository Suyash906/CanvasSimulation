import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UpdateProfile from './components/UpdateProfile';
import ViewProfile from './components/ViewProfile';
import Dashboard from './components/Dashboard';
import CreateCourse from './components/CreateCourse';
import EnrollCourse from './components/EnrollCourse';
import CreateAnnouncement from './components/CreateAnnouncement';
import ViewAnnouncement from './components/ViewAnnoncement';
import CreateQuiz from './components/CreateQuiz';
import CreateAssignment from './components/CreateAssignment';
import UploadProfileImage from './components/UploadProfileImage';

import {Provider} from 'react-redux';
import store from './store'


ReactDOM.render(
    <Provider store = {store}>
        <Router>
        <div>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/viewProfile" component={ViewProfile} />
            <Route path="/updateProfile" component={UpdateProfile} />
            <Route path="/createCourse" component={CreateCourse} />
            <Route path="/enrollCourse" component={EnrollCourse} />
            <Route path="/createAnnouncement" component={CreateAnnouncement} />
            <Route path="/viewAnnouncement" component={ViewAnnouncement} />
            <Route path="/createQuiz" component={CreateQuiz} />
            <Route path="/createAssignment" component={CreateAssignment} />
            <Route path="/uploadProfileImage" component={UploadProfileImage} />
        </div>
    </Router>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
