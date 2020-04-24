import {
    GETTING_ALL_BIS,
    GET_ALL_BIS_SUCCESS,
    GET_BI_SUCCESS,
    GETTING_BI,
    UPDATING_BI,
    UPDATE_BI_SUCCESS,
    DELETING_BI,
    DELETE_BI_SUCCESS,
    RESET_UI_STATE
} from "../actions/actionTypes";

const initialState = {
    loading: false,
    doneGettingBIS: false,
    doneGettingBI: false,
    doneUpdateBI: false,
    doneDeleteBI: false
};

const defaultState = {
    loading: false,
    doneGettingBIS: false,
    doneGettingBI: false,
    doneUpdateBI: false,
    doneDeleteBI: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GETTING_ALL_BIS:
            return {
                ...state,
                loading: true
            };
        case GETTING_BI:
            return {
            ...state,
                loading: true
            };
        case UPDATING_BI:
            return {
                ...state,
                loading: true
            };
        case DELETING_BI:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_BIS_SUCCESS:
            return {
                ...state,
                loading: false,
                doneGettingBIS: true
            };
        case GET_BI_SUCCESS:
            return {
                ... state,
                loading: false,
                doneGettingBI: true
            };
        case RESET_UI_STATE:
            return state = defaultState;
        default:
            return state;
    }

}
