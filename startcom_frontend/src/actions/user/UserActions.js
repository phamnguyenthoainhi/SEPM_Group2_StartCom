import {
    GET_ALL_BIS,
    LOADING_DATA,
    GET_PROFILE

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

export const getProfile = (id) => dispatch => {
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_profile/${id}`)
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: GET_PROFILE,
                    payload: data
                })
            })
        )
};










