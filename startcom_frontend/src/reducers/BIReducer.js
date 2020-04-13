import {READ_BI} from '../actions/actionTypes';

const initialState = {
    businessIdea: {},
    businessIdeas: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case READ_BI:
            return {
                ...state,
                businessIdeas: action.payload
            }
        default:
            return state;                
    }
}