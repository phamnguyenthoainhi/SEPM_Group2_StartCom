import {REGISTER_BI, READ_BI} from '../actions/actionTypes';

const initialState = {
    businessIdea: {},
    businessIdeas: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REGISTER_BI:
            console.log(action.payload)
            return {
                ...state,
                businessIdea: action.payload
            }
        case READ_BI:
            return {
                ...state,
                businessIdeas: action.payload
            }
        default:
            return state;                
    }
}