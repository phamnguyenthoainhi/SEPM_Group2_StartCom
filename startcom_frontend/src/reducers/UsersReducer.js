import {REGISTER_ACCOUNT, LOGIN, REGISTER_LOADING, LOGIN_LOADING, SEND_MESSAGE_LOADING, SEND_MESSAGE_SUCCESS} from '../actions/actionTypes';
const initialState = {
    registerMessage: {},
    loginMessage: {},
    registerLoading: {},
    loginLoading: {},
    sendMessageLoading: false,
    sendMessageSuccess: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case REGISTER_ACCOUNT:
            

            return {

                ...state,
                registerMessage: action.payload
                ,
                registerLoading: false

            }
        case LOGIN:
            
            return {
                ...state,
                loginMessage: action.payload
                ,
                loginLoading: false
            }
        case REGISTER_LOADING: 
            return {
                ...state,
                registerLoading: true
            }
        case SEND_MESSAGE_LOADING: 
            return {
                ...state,
                sendMessageLoading: true
            }
        case SEND_MESSAGE_SUCCESS: 
            return {
                ...state,
                sendMessageLoading: false,
                sendMessageSuccess: true
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