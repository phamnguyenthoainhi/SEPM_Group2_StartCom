import  {REGISTER_ACCOUNT, LOGIN, REGISTER_LOADING, LOGIN_LOADING} from '../actionTypes';
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
    })
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
                
                // sessionStorage.setItems('pushServerSubscriptionId', data.token)
                // sessionStorage.setItems('pushNotificationSupported', )
                    const messaging = firebase.messaging();
                        messaging.requestPermission().then((token) => {
                        return messaging.getToken()
                        
                        }).then(token => {
                            const user = {
                                id: data.id,
                                token: token
                            }
                            console.log(JSON.stringify(user))
                            // editProfile(user)
                            dispatch ({
                                type: LOGIN,
                                payload: data
                            })
                        }).catch(()=> {
                        console.log("error ")
                        })
                // serviceWorker.createNotificationSubscription()
               
                
              })
        }
        
    })        
}