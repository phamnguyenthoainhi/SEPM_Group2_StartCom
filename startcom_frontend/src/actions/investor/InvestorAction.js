import {READ_INVESTOR } from '../actionTypes';

export const fetchInvestor = () => dispatch => {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_investors ')
        .then(res => res.json())
        .then(investors =>
            dispatch({
                type: READ_INVESTOR,
                payload: investors
            }))
};
