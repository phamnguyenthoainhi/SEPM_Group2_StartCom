import {
    UPDATE_BI_SUCCESS,
    DELETE_BI_SUCCESS,
    RESET_UI_STATE, LOADING_DATA, STOP_LOADING_DATA
} from "../actions/actionTypes";

const initialState = {
    loading: false,
    doneUpdateBI: false,
    doneDeleteBI: false
};

const defaultState = {
    loading: false,
    doneUpdateBI: false,
    doneDeleteBI: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case STOP_LOADING_DATA:
            return {
                ...state,
                loading: false
            };

        case UPDATE_BI_SUCCESS:
            return {
                ...state,
                doneUpdateBI: true
            };

        case DELETE_BI_SUCCESS:
            return {
                ...state,
                doneDeleteBI: true
            };
        case RESET_UI_STATE:
            return state = defaultState;
        default:
            return state;
    }

}
