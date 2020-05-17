import {
    GET_ALL_CONSULTANTS, LOADING_DATA
} from '../actions/actionTypes';

const initialState = {
    consultants: [],
    loading: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_CONSULTANTS:
            return {
                ...state,
                consultants: action.payload,
                loading: false
            };
        default:
            return state;

    }
}
