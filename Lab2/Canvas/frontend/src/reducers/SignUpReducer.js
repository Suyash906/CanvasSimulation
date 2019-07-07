import {SIGN_UP_USERS} from '../actions/types';

const initialState = {
    SjsuId:0,
    name:"",
    emailId:"",
    password:"",
    userType:""
}

export default function(state = initialState, action) {
    switch (action.type) {
      case SIGN_UP_USERS:
        console.log(`SignUpUser Reducer`);
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
  }