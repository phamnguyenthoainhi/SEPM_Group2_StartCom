import {REGISTER_ACCOUNT, LOGIN} from '../actions/actionTypes';
const initialState = {
    registerMessage: {},
    loginMessage: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case REGISTER_ACCOUNT:
            // console.log('reducer '+ action.payload.message)

            return {

                ...state,
                registerMessage: action.payload
                
            }
        case LOGIN:
            
            return {
                ...state,
                loginMessage: action.payload
            }

            
        default:
            return state;

    }
}