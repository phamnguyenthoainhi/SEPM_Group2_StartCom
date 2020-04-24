import {READ_BI, IS_REGISTERED_SUCCESS, RESET_REGISTER, REGISTER_BI_LOADING} from '../actions/actionTypes';

const initialState = {
    businessIdea: {},
    businessIdeas: [],
    isRegisteredSuccess: false,
    isRegisteredLoading: false

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
                isRegisteredSuccess: action.payload,
                isRegisteredLoading: false
            }
        case RESET_REGISTER:
            return {
                ...state,
                isRegisteredSuccess: false,
                isRegisteredLoading: false
            }
        case REGISTER_BI_LOADING:
            return {
                ...state,
                isRegisteredLoading: true
            }

        default:
            return state;                
    }
}