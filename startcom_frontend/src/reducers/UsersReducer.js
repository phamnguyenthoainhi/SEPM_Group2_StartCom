import {
    REGISTER_ACCOUNT,
    LOGIN,
    GET_USER,
    UPDATE_USER
} from '../actions/actionTypes';
const initialState = {
    user: {},
    registerMessage: {}
};

export default function (state = initialState, action) {
    switch(action.type) {
        case REGISTER_ACCOUNT:
            return {
                ...state,
                registerMessage: action.payload
                
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
