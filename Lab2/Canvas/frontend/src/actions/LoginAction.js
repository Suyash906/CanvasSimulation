import { LOGIN_USER } from './types';
import axios from 'axios';
import Config from '../config';
import { push } from 'react-router-redux';

export const LoginUser = (userData,history) => dispatch => {
    console.log(`Login Action`);
    axios.post(`${Config.BASE_URL}/login`, userData)
        .then(response => {
            if(response.data.success) {
                dispatch({
                    type: LOGIN_USER,
                    payload:response.data
                })
                history.push('/viewProfile')
            }
    });
}