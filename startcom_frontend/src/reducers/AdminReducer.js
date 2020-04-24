import {FETCH_INVESTOR_EMAIL, FETCH_INVESTOR_EMAIL_LOADING, VERIFY_SUCCESS, ADMIN_VERIFY} from '../actions/actionTypes';

const initialState = {
    unverifiedEmails: [],
    emailLoading: false,
    verifySuccess: false,
    loadingVerify: false


}

export default function (state = initialState, action) {
    switch(action.type) {
   
        case FETCH_INVESTOR_EMAIL:
            return {
                ...state,
                unverifiedEmails: action.payload,
                emailLoading: false,
                verifySuccess: false,
                loadingVerify: false
            }
        case FETCH_INVESTOR_EMAIL_LOADING: 

            return {
                ...state,
                emailLoading: true
            }
        case VERIFY_SUCCESS:
            return {
                ...state,
                verifySuccess: true
            }
        case ADMIN_VERIFY:
            return {
                ...state,
                loadingVerify: true
            }
        default:
            return state;                
    }
}