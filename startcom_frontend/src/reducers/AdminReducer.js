import {FETCH_INVESTOR_EMAIL, FETCH_INVESTOR_EMAIL_LOADING, VERIFY_SUCCESS} from '../actions/actionTypes';

const initialState = {
    unverifiedEmails: [],
    emailLoading: '',
    verifySuccess: false

}

export default function (state = initialState, action) {
    switch(action.type) {
   
        case FETCH_INVESTOR_EMAIL:
            return {
                ...state,
                unverifiedEmails: action.payload,
                emailLoading: false,
                verifySuccess: false
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
        default:
            return state;                
    }
}