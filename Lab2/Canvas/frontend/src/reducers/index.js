import { combineReducers } from 'redux';
import SignUpReducer from '../reducers/SignUpReducer';
import LoginReducer from '../reducers/LoginReducer';
import UpdateProfileReducer from '../reducers/UpdateProfileReducer';
import ViewProfileReducer from '../reducers/ViewProfileReducer';



export default combineReducers({
    register:SignUpReducer,
    login:LoginReducer,
    viewProfile:ViewProfileReducer,
    updateProfile:UpdateProfileReducer
});