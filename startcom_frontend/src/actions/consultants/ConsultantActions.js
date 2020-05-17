import {
    LOADING_DATA,
    GET_ALL_CONSULTANTS
} from '../actionTypes';


export const getAllConsultants = () => dispatch =>  {
    dispatch({ type: LOADING_DATA});
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_consultants')
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: GET_ALL_CONSULTANTS,
                    payload: data
                })
            })
        )
};





