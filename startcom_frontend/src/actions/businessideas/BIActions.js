import {
    GET_ALL_BIS,
    GET_BI,
    IS_REGISTERED_SUCCESS,
    RESET_REGISTER,
    UPDATE_BI,
    DELETE_BI,
    UPDATING_BI,
    UPDATE_BI_SUCCESS, RESET_UI_STATE, GETTING_ALL_BIS, GET_ALL_BIS_SUCCESS

} from '../actionTypes';


export const getAllBIS = () => dispatch =>  {
    dispatch({ type: GETTING_ALL_BIS});
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas')
        .then (res => res.json())
        .then(businessIdeas =>
            dispatch({
                type: GET_ALL_BIS,
                payload: businessIdeas
            }));
            dispatch({ type: GET_ALL_BIS_SUCCESS })
};

export const getBI = (id) => dispatch => {
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_business_idea/${id}`)
        .then (res => res.json())
        .then(businessIdea =>
            dispatch({
                type: GET_BI,
                payload: businessIdea
            }))
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
    .then(() => dispatch(
        getAllBIS()
    )) 
};

export const updateBI = (BIData, id) => dispatch => {
    dispatch({ type: UPDATING_BI});
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_business_idea/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(BIData)
    })
        .then((res) => {
            dispatch({
                type: UPDATE_BI,
                payload: res.data
            });
            dispatch({type: UPDATE_BI_SUCCESS});
        })
};


// NOTE: future improvement: changing payload to filter out the delete business ideas
export const deleteBI = (id) => dispatch => {
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/delete_business_idea/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
        .then((res) => {
            console.log("res "+ res.status);
            if(res.status === 200) {
                dispatch({
                    type: DELETE_BI,
                    payload: id
                });
            } else
                return res.error;
        })
        .then(() => dispatch(
            getAllBIS()
        ))
};




