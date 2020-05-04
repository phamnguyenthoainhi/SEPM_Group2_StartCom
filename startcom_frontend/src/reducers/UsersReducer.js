import {
    REGISTER_ACCOUNT,
    LOGIN,
    REGISTER_LOADING,
    LOGIN_LOADING,
    SEND_MESSAGE_LOADING,
    SEND_MESSAGE_SUCCESS,
    GET_PROFILE_LOADING,
    GET_PROFILE_RECEIVER,
    GET_PROFILE_SENDER,
    GET_USER,
    UPDATE_USER
} from '../actions/actionTypes';

const initialState = {
    user: {},
    registerMessage: {},
    loginMessage: {},
    registerLoading: {},
    loginLoading: {},
    sendMessageLoading: false,
    sendMessageSuccess: false,
    profileReceiver: {},
    profileSender: {},
    profileLoading: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case REGISTER_ACCOUNT:
            return {

                ...state,
                registerMessage: action.payload,
                registerLoading: false
            };
        case LOGIN:
            return {
                ...state,
                loginMessage: action.payload
                ,
                loginLoading: false
            };
        case REGISTER_LOADING:
            return {
                ...state,
                registerLoading: true
            };
        case GET_PROFILE_LOADING:
            return {
                ...state,
                profileLoading: true
            };
        case GET_PROFILE_SENDER:
            return {
                ...state,
                profileLoading: false,
                profileSender: action.payload
            };
        case GET_PROFILE_RECEIVER:
            return {
                ...state,
                profileLoading: false,
                profileReceiver: action.payload
            };
        case SEND_MESSAGE_LOADING:
            return {
                ...state,
                sendMessageLoading: true
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                sendMessageLoading: false,
                sendMessageSuccess: true
            };
        case LOGIN_LOADING:
            return {
                ...state,
                loginLoading: true
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
            };

        default:
            return state;

    }
}
