import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import UserLogin from './components/UserLogin';
import Dashboard  from './components/Dashboard';
import CreateCourse from './components/CreateCourse';
import EnrollCourse from './components/EnrollCourse';
import UpdateProfile from './components/UpdateProfile';
import CreateAnnouncement from './components/CreateAnnouncement';
import ViewAnnouncement from './components/ViewAnnoncement';
import UpdateProfileImage from './components/UpdateProfileImage';
import CreateQuiz from './components/CreateQuiz';
import CreateAssignment from './components/CreateAssignment';
import UploadFiles from './components/UploadFiles';
//import axios from 'axios';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/login" component={UserLogin} />
            <Route path="/createCourse" component={CreateCourse} />
            <Route path="/enrollCourse" component={EnrollCourse} />
            <Route path="/UpdateProfile" component={UpdateProfile} />
            <Route path="/createAnnouncement" component={CreateAnnouncement} />
            <Route path="/viewAnnouncement" component={ViewAnnouncement} />
            <Route path="/updateProfileImage" component={UpdateProfileImage} />
            <Route path="/createQuiz" component={CreateQuiz} />
            <Route path="/createAssignment" component={CreateAssignment} />
            <Route path="/files" component={UploadFiles}/>
        </div>
    </Router>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
