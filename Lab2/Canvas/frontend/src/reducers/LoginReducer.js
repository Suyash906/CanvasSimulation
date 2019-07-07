import {LOGIN_USER} from '../actions/types';

const initialState = {
}

export default function(state = initialState, action) {
    switch (action.type) {
      case LOGIN_USER:
        console.log(`SignUpUser Reducer`);
        console.log(action.payload);
        localStorage.setItem("apiToken", action.payload.token);
        localStorage.setItem("userType", action.payload.userType);
        localStorage.setItem("SjsuId", action.payload.SjsuId);
        localStorage.setItem("isAuthenticated", true);
        return {
          ...state,
          apiToken: action.payload.token,
          userType:action.payload.userType,
          SjsuId:action.payload.SjsuId,
          isAuthenticated:true
        };
      default:
        return state;
    }
  }