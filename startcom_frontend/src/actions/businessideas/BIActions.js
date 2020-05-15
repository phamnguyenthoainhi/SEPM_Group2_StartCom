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
    DELETE_BI_SUCCESS, OPEN_AUTHENTICATION_SNACKBAR, CLOSE_AUTHENTICATION_SNACKBAR, UPDATE_USER, UPDATE_USER_SUCCESS

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
            dispatch({
                type: IS_REGISTERED_SUCCESS,
                payload: true
            });
            return res.json();
        } else {
            dispatch({
                type: IS_REGISTERED_SUCCESS,
                payload: false
            });
            return null;
        }
    })
};

export const updateBI = (BIData, id, history) => dispatch => {
    dispatch({ type: UPDATING_DATA});
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_business_idea/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(BIData)
    })
        .then( res => {
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
                        type: UPDATE_BI,
                        payload: data
                    });
                    dispatch({type: UPDATE_BI_SUCCESS});
                    setTimeout(() => {
                        dispatch({type: RESET_UI_STATE});
                    }, 2000);
                })
            }
        })
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




