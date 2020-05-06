import {SEND_MESSAGE_LOADING, SEND_MESSAGE_SUCCESS, GET_PROFILE_RECEIVER, GET_PROFILE_LOADING, GET_PROFILE_SENDER} from '../actionTypes';

export const sendMessage = (message) => dispatch => {
    
    dispatch({
        type: SEND_MESSAGE_LOADING
    })

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
    
}

export const editProfile = (user) => dispatch => {
    
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_profile/${user.id}`, {
        method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+ user.loginToken
            },
            body: JSON.stringify(user)
    }).
    then((res) => {
        if(res.status === 200) {
            console.log("Edit success")
        }
    })

} 
export const getProfile = (id, type) => dispatch => {
    
    dispatch({
        type: GET_PROFILE_LOADING
    })

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
}   

