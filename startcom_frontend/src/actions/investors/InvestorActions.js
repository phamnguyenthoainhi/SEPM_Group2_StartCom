import {
    LOADING_DATA,
    GET_ALL_INVESTORS
} from '../actionTypes';


export const getAllInvestors = () => dispatch =>  {
    dispatch({ type: LOADING_DATA});
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_investors')
        .then (res =>
            res.json().then(function (data) {
                dispatch({
                    type: GET_ALL_INVESTORS,
                    payload: data
                })
            })
        )
};






