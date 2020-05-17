import {
    GET_ALL_INVESTORS, LOADING_DATA
} from '../actions/actionTypes';

const initialState = {
    investors: {},
    loading: false

};

export default function (state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_INVESTORS:
            return {
                ...state,
                investors: action.payload,
                loading: false
            };

        default:
            return state;

    }
}
