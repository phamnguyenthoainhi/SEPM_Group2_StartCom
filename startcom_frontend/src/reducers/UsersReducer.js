import {
    REGISTER_ACCOUNT,
    LOGIN,
    GET_PROFILE
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
        case GET_PROFILE:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;

    }
}
