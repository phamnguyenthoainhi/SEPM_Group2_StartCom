import {READ_CONSULTANT } from '../actionTypes';

export const fetchConsultant = () => dispatch => {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_consultants')
        .then(res => res.json())
        .then(consultants =>
            dispatch({
                type: READ_CONSULTANT,
                payload: consultants
            }))
};
