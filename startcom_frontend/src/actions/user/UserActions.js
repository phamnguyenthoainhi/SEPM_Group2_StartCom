import {
    GET_ALL_BIS,
    LOADING_DATA,
    GET_PROFILE

} from '../actionTypes';

export const getUser = (id) => dispatch => {
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










