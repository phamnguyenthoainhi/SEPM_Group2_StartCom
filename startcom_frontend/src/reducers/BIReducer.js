import {READ_BI, IS_REGISTERED_SUCCESS, RESET_REGISTER} from '../actions/actionTypes';

const initialState = {
    businessIdea: {},
    businessIdeas: [],
    isRegisteredSuccess: false

}

export default function (state = initialState, action) {
    switch(action.type) {
        case READ_BI:
            return {
                ...state,
                businessIdeas: action.payload
            }
        case IS_REGISTERED_SUCCESS:
            return {
                ...state,
                isRegisteredSuccess: action.payload
            }
        case RESET_REGISTER:
            return {
                ...state,
                isRegisteredSuccess: false
            }

        default:
            return state;                
    }
}