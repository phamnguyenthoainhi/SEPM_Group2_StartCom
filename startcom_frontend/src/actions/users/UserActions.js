import {SEND_MESSAGE_LOADING, SEND_MESSAGE_SUCCESS} from '../actionTypes';

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