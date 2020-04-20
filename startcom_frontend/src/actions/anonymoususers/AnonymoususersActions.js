import  {REGISTER_ACCOUNT, LOGIN} from '../actionTypes';

export const registerAccount = (account) => dispatch => {
    // console.log(JSON.stringify(account));
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