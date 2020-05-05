import  {REGISTER_ACCOUNT, LOGIN, REGISTER_LOADING, LOGIN_LOADING} from '../actionTypes';
import {editProfile} from '../users/UserActions';
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
                const user = {
                    id: data.id,
                    token: data.token
                }
                console.log(JSON.stringify(user))
                dispatch(editProfile(user))
                dispatch ({
                    type: LOGIN,
                    payload: data
                })
                
              })
        }
        
    })        
}