import {FETCH_INVESTOR_EMAIL, FETCH_INVESTOR_EMAIL_LOADING, VERIFY_SUCCESS, ADMIN_VERIFY, DELETE_USER_SUCCESS, DELETE_USER_LOADING} from '../actions/actionTypes';

const initialState = {
    unverifiedEmails: [],
    emailLoading: false,
    verifySuccess: false,
    loadingVerify: false,
    deleteSuccess: false,
    deleteLoading: false


}

export default function (state = initialState, action) {
    switch(action.type) {
   
        case FETCH_INVESTOR_EMAIL:
            return {
                ...state,
                unverifiedEmails: action.payload,
                emailLoading: false,
                verifySuccess: false,
                loadingVerify: false,
                deleteSuccess: false,
                deleteLoading: false
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
        case DELETE_USER_SUCCESS: 
            return {
                ...state,
                deleteSuccess: true
            }
        case DELETE_USER_LOADING: 
            return {
                ...state,
                deleteLoading: true
            }
        default:
            return state;                
    }
}