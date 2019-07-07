import { VIEW_PROFILE, UPDATE_PROFILE } from './types';
import axios from 'axios';
import Config from '../config';

export const GetProfileData = (userData,token) => dispatch => {
  console.log(`${userData}`);
  axios.get(`${Config.BASE_URL}/viewProfile`, {params:userData}, {headers:{"Authorization" : `Bearer ${token}`}} )
  .then(response => {
    dispatch({
      type: VIEW_PROFILE,
      payload:response.data.profileDetails
    })
});
}

export const UpdateProfileData = (userData,history) => dispatch => {
    console.log(`${userData}`);
    axios.post(`${Config.BASE_URL}/editProfile`, userData)
    .then(response => {
      dispatch({
        type: UPDATE_PROFILE,
        payload:response.data
      })
      history.push('/viewProfile');
  });
  }