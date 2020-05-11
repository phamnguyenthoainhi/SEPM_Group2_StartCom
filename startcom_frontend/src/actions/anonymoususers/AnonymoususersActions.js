import  {REGISTER_ACCOUNT, LOGIN, REGISTER_LOADING, LOGIN_LOADING, POST_EMAIL_RESET_SUCCESS, POST_EMAIL_RESET_LOADING, POST_EMAIL_RESET_FAIL} from '../actionTypes';
import {editProfile} from '../users/UserActions';

import firebase from '../../firebase'
export const registerAccount = (account) => dispatch => {
    dispatch({
        type: REGISTER_LOADING
    })
        fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/signup',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(account)
        })
        .then ((res) => {
            if (res.status === 200) {
                res.json().then(function(data) {
                    dispatch({
                        type: REGISTER_ACCOUNT,
                        payload: data
                    })
                    // console.log(data.message);
                  })
            }
            
        })        
}


export const postEmailResetPassword = (email) => dispatch => {
    console.log(JSON.stringify(email))
    dispatch({
        type: POST_EMAIL_RESET_LOADING
    })
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/reset_password', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(email)
    })
    .then((res) => {

        if (res.status === 200) {
            dispatch({
                type: POST_EMAIL_RESET_SUCCESS
            })
        }

    })
    .catch((err) => {
        dispatch({
            type: POST_EMAIL_RESET_FAIL
        })
    })



}

export const getToken = () => {
    const messaging = firebase.messaging();
    messaging.requestPermission().then((token) => {
      return messaging.getToken()
    }).then(token => {
      console.log('Token: '+ token)
    }).catch(()=> {
      console.log("error ")
    })
}

export const login = (account) => dispatch => {
    dispatch({
        type: LOGIN_LOADING
    });
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        
        },
        body: JSON.stringify(account)
    })
    .then((res) => {
        if (res.status === 200) {
            res.json().then(function(data) {
                const messaging = firebase.messaging();
                messaging.getToken().then((currentToken) => {
                    
                    if (currentToken) {
                        const user = {
                            id: data.id,
                            token: currentToken,
                        };
                        if (data.id !== null && data.id !== undefined) {
                            fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_profile/${data.id}`, {
                                method: 'PUT',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-type': 'application/json',
                                        'Authorization': 'Bearer '+ data.token
                                    },
                                    body: JSON.stringify(user)
                            }).
                            then((res) => {
                                if(res.status === 200) {
                                    console.log("Edit success")
                                    dispatch ({
                                            type: LOGIN,
                                            payload: data
                                    })
                                }
                            })
                        } else {
                            dispatch ({
                                type: LOGIN,
                                payload: data
                            })
                        }

                    } else {
                      // Show permission request.
                      console.log('No Instance ID token available. Request permission to generate one.');
                      // Show permission UI.
                    //   updateUIForPushPermissionRequired();
                    //   setTokenSentToServer(false);
                    }
                  }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    
                  });
                
              })
        }
        
    })        
}
