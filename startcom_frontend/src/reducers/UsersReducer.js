import {REGISTER_ACCOUNT, LOGIN, REGISTER_LOADING, LOGIN_LOADING} from '../actions/actionTypes';
const initialState = {
    registerMessage: {},
    loginMessage: {},
    registerLoading: {},
    loginLoading: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case REGISTER_ACCOUNT:
            // console.log('reducer '+ action.payload.message)

            return {

                ...state,
                registerMessage: action.payload,
                registerLoading: false

            }
        case LOGIN:
            
            return {
                ...state,
                loginMessage: action.payload,
                loginLoading: false
            }
        case REGISTER_LOADING: 
            return {
                ...state,
                registerLoading: true
            }
        case LOGIN_LOADING: 
        return {
            ...state,
            loginLoading: true
        }

        default:
            return state;

    }
}