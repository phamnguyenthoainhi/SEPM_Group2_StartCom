import { READ_BI, IS_REGISTERED_SUCCESS, RESET_REGISTER, UPDATE_BI, DELETE_BI, FILTER_BI_BY_CATEGORY, FILTER_BI_BY_CONSULTANT, FILTER_BI_BY_INVESTOR } from '../actionTypes';


export const fetchBI = () => dispatch => {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas')
        .then(res => res.json())
        .then(businessIdeas =>
            dispatch({
                type: READ_BI,
                payload: businessIdeas
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
            console.log("res " + res.status);
            if (res.status === 200) {
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
            fetchBI()
        ))
};

export const updateBI = (BIData, id) => dispatch => {
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_business_idea/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(BIData)
    })
        .then((res) => {
            console.log("res " + res.status);
            if (res.status === 200) {
                dispatch({
                    type: UPDATE_BI,
                    payload: res.data
                });
                return res.json();
            } else
                return res.error;
        })
        .then(() => dispatch(
            fetchBI()
        ))
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
            console.log("res " + res.status);
            if (res.status === 200) {
                dispatch({
                    type: DELETE_BI,
                    payload: id
                });
            } else
                return res.error;
        })
        .then(() => dispatch(
            fetchBI()
        ))
};

export const filterBICategory = (BIData, category) => dispatch => {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas')
        .then(res => res.json())
        .then(businessIdeas =>
            dispatch({
                type: FILTER_BI_BY_CATEGORY,
                payload: {
                    category: category,
                    items: category === ""? businessIdeas: businessIdeas.filter( a => a.avaiableConsultant.indexOf(category.toLowerCase())>=0)
                }
            }))
};

export const filterBIConsultant = (BIData, needConsultant) => dispatch => {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas')
        .then(res => res.json())
        .then(businessIdeas =>
            dispatch({
                type: FILTER_BI_BY_CONSULTANT,
                payload: {
                    needConsultant: needConsultant,
                    items: needConsultant === ""? businessIdeas: businessIdeas.filter(b => b.avaiableConsultant(needConsultant) === true)
                }
            }))
};

export const filterBIInvestor = (BIData, needInvestor) => dispatch => {
    fetch('https://asia-east2-startcom-sepm.cloudfunctions.net/api/get_all_business_ideas')
        .then(res => res.json())
        .then(businessIdeas =>
            dispatch({
                type: FILTER_BI_BY_INVESTOR,
                payload: {
                    needInvestor: needInvestor,
                    items: needInvestor === ""? businessIdeas: businessIdeas.filter(c => c.avaiableInvestor(needInvestor) === true)
                }
            }))
};




