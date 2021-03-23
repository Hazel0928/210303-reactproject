import { combineReducers } from 'redux'
import { LOGOUT, VERIFYLOGIN,SET_HEAD_TITLE } from '../types/const'
import { isAuthenticated, authenticateSuccess, logout,login } from '../../utils/session';
import users from '../../utils/users'

const initHeadTitle=""
function headTitle(state=initHeadTitle,action){
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state;
    }
}

const initState = {
    isLogin: !!isAuthenticated(),
    users: localStorage.users ? JSON.parse(localStorage.users) : users,
    loginUser: isAuthenticated() ? { username: isAuthenticated() } : {}
}

function userStore(state = initState, action) {
    switch (action.type) {
        case LOGOUT:
            return {
                ...state, isLogin: false, loginUser: {}
            };
        case VERIFYLOGIN:
            return {
                ...state, isLogin: true, loginUser: action.username
            };
        default:
            return state
    }
}

export default combineReducers({
    userStore,
    headTitle
})