import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ViewProfile from './components/ViewProfile';
import UpdateProfile from './components/UpdateProfile';
import EnrollCourseUpdated from './components/EnrollCourseUpdated';
import CreateCourse from './components/CreateCourse'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
    uri:'http://localhost:4000/graphql'
})

ReactDOM.render(
<Router>
    <div>
    <ApolloProvider client={client}>
        <Route exact path="/" component={Dashboard} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/viewProfile" component={ViewProfile} />
        <Route path="/updateProfile" component={UpdateProfile} />
        <Route path="/createCourse" component={CreateCourse} />
        <Route path="/enrollCourse" component={EnrollCourseUpdated} />
    </ApolloProvider>
    </div>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
