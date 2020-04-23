import {FETCH_INVESTOR_EMAIL, FETCH_INVESTOR_EMAIL_LOADING, VERIFY_SUCCESS} from '../actionTypes';

export const fetchUnverifiedEmails = () => dispatch => {
    dispatch({
        type: FETCH_INVESTOR_EMAIL_LOADING
    })
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_unverified', {
        method: 'GET'
    })
    .then(res => 
        res.json())

    .then(email => 
        dispatch({
            type: FETCH_INVESTOR_EMAIL,
            payload: email
        }))  
}
export const VerifiedEmails = (id) => dispatch => {
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/verify/${id}`, {
        method: 'GET'
    })
   
    .then(res => 
        res.json())
    .then(
        dispatch({
            type: VERIFY_SUCCESS
        })) 
    .then(dispatch(fetchUnverifiedEmails()) )
}