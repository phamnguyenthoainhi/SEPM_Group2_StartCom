import {
    SEND_MESSAGE_LOADING,
    SEND_MESSAGE_SUCCESS,
    GET_PROFILE_RECEIVER,
    GET_PROFILE_LOADING,
    GET_PROFILE_SENDER,
    GET_USER,
    FETCHING_USER
} from '../actionTypes';

export const sendMessage = (message) => dispatch => {
    
    dispatch({
        type: SEND_MESSAGE_LOADING
    });

    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/send_email',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(message)
    })
    .then ((res) => {
        
        if (res.status === 200) {
                dispatch({
                    type: SEND_MESSAGE_SUCCESS,
                })   
        }
        
    })  
    
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



