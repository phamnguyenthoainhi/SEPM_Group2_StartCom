import {
    GETTING_ALL_BIS,
    GET_ALL_BIS_SUCCESS,
    GET_BI_SUCCESS,
    GETTING_BI,
    UPDATING_BI,
    UPDATE_BI_SUCCESS,
    DELETING_BI,
    DELETE_BI_SUCCESS,
    RESET_UI_STATE, LOADING_DATA, STOP_LOADING_DATA
} from "../actions/actionTypes";

const initialState = {
    loading: false,

    doneGettingBI: false,
    doneUpdateBI: false,
    doneDeleteBI: false
};

const defaultState = {
    loading: false,
    doneGettingBI: false,
    doneUpdateBI: false,
    doneDeleteBI: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };

        case STOP_LOADING_DATA:
            return {
                ...state,
                loading: false
            };

        case GETTING_ALL_BIS:
            return {
                ...state,
                loading: true
            };


        case GET_ALL_BIS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case GETTING_BI:
            return {
                ...state,
                loading: true
            };
        case GET_BI_SUCCESS:
            return {
                ... state,
                loading: false,
                doneGettingBI: true
            };
        case UPDATING_BI:
            return {
                ...state,
                loading: true
            };
        case UPDATE_BI_SUCCESS:
            return {
                ...state,
                loading: false,
                doneUpdateBI: true
            };
        case DELETING_BI:
            return {
                ...state,
                loading: true
            };
        case DELETE_BI_SUCCESS:
            return {
                ...state,
                loading: false,
                doneDeleteBI: true
            };
        case RESET_UI_STATE:
            return state = defaultState;
        default:
            return state;
    }

}
