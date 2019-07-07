import { VIEW_PROFILE, UPDATE_PROFILE } from '../actions/types';

const initialState = {
    Name:"", 
    Email:"", 
    phoneNumber:0, 
    aboutMe:"", 
    city:"", 
    country:"", 
    school:"", 
    hometown:"", 
    languages:""
}

export default function(state = initialState, action) {
    switch (action.type) {
      case VIEW_PROFILE:
        return {
          ...state,
          Name:action.payload.Name,
        Email:action.payload.Email,
        phoneNumber:action.payload.phoneNumber, 
        aboutMe:action.payload.aboutMe, 
        city:action.payload.city,
        country:action.payload.country, 
        school:action.payload.school, 
        hometown:action.payload.hometown, 
        languages:action.payload.languages
        };
        case UPDATE_PROFILE:
        return {
          ...state
        };
      default:
        return state;
    }
  }

