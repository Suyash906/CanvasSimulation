import { SIGN_UP_USERS } from './types';
import axios from 'axios';
import Config from '../config';

export const SignUpUser = (userData,history) => dispatch => {
  console.log(`SignUpUser Action`);
  axios.post(`${Config.BASE_URL}/SignUp`, userData)
      .then(response => {
          dispatch({
            type: SIGN_UP_USERS,
            payload:response.data
          })
          console.log(`Status = ${response.status}`);
          console.log(`${response}`);
          if(response.status === 200)
            history.push('/login');
          else{
            alert(`User already redistered`);
          }
      });
}