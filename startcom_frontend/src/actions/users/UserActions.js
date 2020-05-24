import {
    SEND_MESSAGE_LOADING,
    SEND_MESSAGE_SUCCESS,
    GET_PROFILE_RECEIVER,
    GET_PROFILE_LOADING,
    GET_PROFILE_SENDER,
    GET_USER,
    FETCHING_USER,
    RESET_UI_STATE,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATING_DATA,
    OPEN_AUTHENTICATION_SNACKBAR, CLOSE_AUTHENTICATION_SNACKBAR, FETCHING_PROFILE, GET_PROFILE
} from '../actionTypes';

export const sendMessage = (message, history) => dispatch => {
    console.log("testt  "+ history)
    const token = sessionStorage.getItem("token");
    dispatch({
        type: SEND_MESSAGE_LOADING
    });

    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/send_email',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            body: JSON.stringify(message)
    })
    .then ((res) => {
        if (res.status === 403) {
            dispatch({ type: OPEN_AUTHENTICATION_SNACKBAR });
            history.push("/auth");
            setTimeout(() => {
                dispatch({ type: CLOSE_AUTHENTICATION_SNACKBAR})
            }, 2000);
        }
        else {
                dispatch({
                    type: SEND_MESSAGE_SUCCESS,
                })   
        }
    })
        .catch(err => console.log(err))
    
};
export const editProfile = (userData, userID, history) => dispatch => {
   
    const token = sessionStorage.getItem("token");
    dispatch({ type: UPDATING_DATA});
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_profile/${userID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        body: JSON.stringify(userData)
    })

        .then ((res) => {
            if (res.status === 403) {
                dispatch({ type: OPEN_AUTHENTICATION_SNACKBAR });
                history.push("/auth");
                setTimeout(() => {
                    dispatch({ type: CLOSE_AUTHENTICATION_SNACKBAR})
                }, 2000);
            }
            else {
                res.json().then(function (data) {
                    dispatch({
                        type: UPDATE_USER,
                        payload: data
                    });
                    dispatch({type: UPDATE_USER_SUCCESS});
                    setTimeout(() => {
                        dispatch({type: RESET_UI_STATE});
                    }, 2000);
                })
            }
        })
        .catch(err => console.log(err))
};

export const getProfile = (id, type) => dispatch => {
    dispatch({
        type: GET_PROFILE_LOADING
    });

    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_profile/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
    })
    .then (res => res.json())
    .then(profile => 
        {
            if(type === 'receiver') {
                dispatch({
                    type: GET_PROFILE_RECEIVER,
                    payload: profile
                })
            } else if(type === 'sender') {
                dispatch({
                    type: GET_PROFILE_SENDER,
                    payload: profile
                })
            }
    })
};


export const getUser = (id) => dispatch => {
    dispatch({ type: FETCHING_USER });
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_profile/${id}`)
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: GET_USER,
                    payload: data
                })
            })
        )
};

export const getChosenProfile = (id) => dispatch => {
    dispatch({ type: FETCHING_PROFILE });
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_profile/${id}`)
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: GET_PROFILE,
                    payload: data
                })
            })
        )
}


