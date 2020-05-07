import {
    UPDATING_DATA,
    UPDATE_BI_SUCCESS,
    DELETING_DATA,
    DELETE_BI_SUCCESS,
    RESET_UI_STATE, UPDATE_USER_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
    updating: false,
    deleting: false,
    doneUpdateBI: false,
    doneDeleteBI: false,
    doneUpdateProfile: false,
};

const defaultState = {
    updating: false,
    doneUpdateProfile: false,
    deleting: false,
    doneUpdateBI: false,
    doneDeleteBI: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case UPDATING_DATA:
            return {
                ...state,
                updating: true
            };

        case UPDATE_BI_SUCCESS:
            return {
                ...state,
                updating: false,
                doneUpdateBI: true
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                updating: false,
                doneUpdateProfile: true
            };
        case DELETING_DATA:
            return {
                ...state,
                deleting: true
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
