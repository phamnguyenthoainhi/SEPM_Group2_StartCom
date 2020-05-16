import {
    GET_ALL_BIS,
    GET_BI,
    IS_REGISTERED_SUCCESS,
    RESET_REGISTER,
    UPDATE_BI,
    DELETE_BI,
    UPDATE_BI_SUCCESS,
    RESET_UI_STATE,
    LOADING_DATA,
    STOP_LOADING_DATA,
    UPDATING_DATA,
    GET_BI_BY_OWNER,
    DELETING_DATA,
    DELETE_BI_SUCCESS

} from '../actionTypes';


export const getAllBIS = () => dispatch =>  {
    dispatch({ type: LOADING_DATA});
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas')
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: GET_ALL_BIS,
                    payload: data
                })
            })
        )

};

export const getBI = (id) => dispatch => {
    dispatch({ type: LOADING_DATA});
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_business_idea/${id}`)
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: GET_BI,
                    payload: data
                })
            })
        )
};

export const getBIByOwnerID = (ownerID) => dispatch => {
    dispatch({ type: LOADING_DATA});
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_business_idea_by_owner/${ownerID}`)
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: GET_BI_BY_OWNER,
                    payload: data
                })
            })
        )
};

export const resetRegisterStatus = () => dispatch => {
    dispatch({
        type: RESET_REGISTER
    })
};

export const registerBI = (BIData) => dispatch => {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/post_business_idea', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(BIData)
        
    })
    .then((res) => {
        console.log("res "+ res.status);
        if(res.status === 200) {
            if (sessionStorage.getItem('id') !== null && sessionStorage.getItem('id') !== ''
            && sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== ''
            ) {
                console.log("Hello hell0")
                let id = sessionStorage.getItem('id');
                let token = sessionStorage.getItem('token')
                const user = {
                    "haveBI": true
                }
                fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_profile/${id}`, {
                                method: 'PUT',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-type': 'application/json',
                                        'Authorization': 'Bearer '+ token
                                    },
                                    body: JSON.stringify(user)
                            }).
                            then((res) => {
                                if(res.status === 200) {
                                    console.log("Edit success")
                                    dispatch({
                                        type: IS_REGISTERED_SUCCESS,
                                        payload: true
                                    });
                                }
                            })
            } else {
                
            }
            
            return res.json();
        } else {
           
            
        }
    })
};

export const updateBI = (BIData, id) => dispatch => {
    dispatch({ type: UPDATING_DATA});
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_business_idea/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(BIData)
    })
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: UPDATE_BI,
                    payload: data
                });
                dispatch({type: UPDATE_BI_SUCCESS});
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE});
                }, 2000);
            })
        )



};

export const deleteBI = (id) => dispatch => {
    dispatch({ type: DELETING_DATA });
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/delete_business_idea/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: DELETE_BI,
                    payload: data
                });
                dispatch({type: DELETE_BI_SUCCESS});
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE});
                }, 2000);
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            })
        )
};




