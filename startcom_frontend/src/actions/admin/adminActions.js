import {
    FETCH_INVESTOR_EMAIL,
    FETCH_INVESTOR_EMAIL_LOADING,
    VERIFY_SUCCESS,
    ADMIN_VERIFY,
    DELETE_USER_LOADING,
    DELETE_USER_SUCCESS,
    OPEN_AUTHENTICATION_SNACKBAR, CLOSE_AUTHENTICATION_SNACKBAR
} from '../actionTypes';

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
export const VerifiedEmails = (id, history) => dispatch => {
    dispatch({
        type: ADMIN_VERIFY
    })
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/verify/${id}`, {
        method: 'GET'
    })

    .then ((res) => {
        if (res.status === 403) {
            dispatch({ type: OPEN_AUTHENTICATION_SNACKBAR });
            history.push("/auth");
            setTimeout(() => {
                dispatch({ type: CLOSE_AUTHENTICATION_SNACKBAR})
            }, 2000);
        }
        if (res.status === 200) {
                dispatch({
                    type: VERIFY_SUCCESS,
                })                            
        }  
    })     
}

export const deleteUser = (id, history) => dispatch => {
   
    dispatch({
        type: DELETE_USER_LOADING
    });
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/decline/${id}`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },
        method: 'DELETE'
    })
    .then(res => {
        if (res.status === 403) {
            dispatch({ type: OPEN_AUTHENTICATION_SNACKBAR });
            history.push("/auth");
            setTimeout(() => {
                dispatch({ type: CLOSE_AUTHENTICATION_SNACKBAR})
            }, 2000);
        }
        if (res.status === 200) {
            dispatch({
                type: DELETE_USER_SUCCESS
            });
            dispatch(fetchUnverifiedEmails()) 
        }
    })
    
}
