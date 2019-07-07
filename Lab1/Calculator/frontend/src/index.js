import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Calculator from './components/Calculator'


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Calculator} />
        </div>
    </Router>, 
    document.getElementById('root')
);