import {
    CLEAR_FILTER,
    CLOSE_AUTHENTICATION_SNACKBAR,
    DELETE_BI,
    DELETE_BI_SUCCESS,
    DELETING_DATA,
    FILTER_BI,
    GET_ALL_BIS,
    GET_BI,
    GET_BI_BY_OWNER,
    IS_REGISTERED_SUCCESS,
    LOADING_DATA,
    OPEN_AUTHENTICATION_SNACKBAR, RESET_FILTER,
    RESET_REGISTER,
    RESET_UI_STATE,
    UPDATE_BI,
    UPDATE_BI_SUCCESS,
    UPDATING_DATA
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
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+ sessionStorage.getItem('token')
        },
        body: JSON.stringify(BIData)
        
    })
    .then((res) => {
        // console.log("res "+ res.status);
        if(res.status === 200) {
            if (sessionStorage.getItem('id') !== null && sessionStorage.getItem('id') !== ''
            && sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== ''
            ) {
                let id = sessionStorage.getItem('id');
                let token = sessionStorage.getItem('token');
                const user = {
                    "haveBI": true
                };
                fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_profile/${id}`, {
                    method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer '+ token
                        },
                        body: JSON.stringify(user)
                }).then((res) => {
                    if(res.status === 200) {
                        console.log("Edit success")
                        dispatch({
                            type: IS_REGISTERED_SUCCESS,
                            payload: true
                        });
                    }
                })
            }
            return res.json();
        } else {
           
            
        }
    })
};

export const updateBI = (BIData, id, history) => dispatch => {
    dispatch({ type: UPDATING_DATA});
    fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_business_idea/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+ sessionStorage.getItem('token')
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
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+ sessionStorage.getItem('token')
        },
    })
        .then((res) => {
                // console.log("res "+ res.status);
                if(res.status === 200) {
                    if (sessionStorage.getItem('id') !== null && sessionStorage.getItem('id') !== ''
                        && sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== ''
                    ) {
                        let id = sessionStorage.getItem('id');
                        let token = sessionStorage.getItem('token');
                        const user = {
                            "haveBI": false
                        };
                        fetch(`https://asia-east2-startcom-sepm.cloudfunctions.net/api/edit_profile/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json',
                                'Authorization': 'Bearer '+ token
                            },
                            body: JSON.stringify(user)
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
                                }, 1000);
                                setTimeout(() => {
                                    window.location.reload()
                                }, 1000);
                            })
                        )
                    }
                    return res.json();
                }
            })

};

export const searchBI = (keyword,businessIdeas) => dispatch => {
    dispatch({
        type:CLEAR_FILTER
    });
    const searchResults = businessIdeas.filter((idea => idea.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));

    dispatch({
        type:FILTER_BI,
        payload: searchResults
    })
};

export const resetFilter = () => dispatch=>{
    dispatch({ type:RESET_FILTER })
};

export const filterBI = (categories, consultant, investor,sort, businessIdeas) => dispatch => {
    dispatch({ type:CLEAR_FILTER });
    let filteredIdeas = businessIdeas;
    if(categories.length > 0){
        filteredIdeas = filteredIdeas.filter(idea => categories.includes(idea.category))
    }
    if(consultant.length===1){
        // console.log(consultant[0]);
        let filteredByConsultant = [];
        switch (consultant[0]){
            case 'needed':
                filteredByConsultant = filteredIdeas.filter(idea => idea.needConsultant === true);
                filteredIdeas = filteredByConsultant;
                // console.log(filteredIdeas);
                break;
            case 'not needed':
                filteredByConsultant = filteredIdeas.filter(idea => idea.needConsultant === false);
                filteredIdeas = filteredByConsultant;
                // console.log(filteredIdeas);
                break;
            default:
                break

        }
    }
    if (investor.length === 1){
        // console.log(investor[0]);
        let filteredByInvestor = [];
        switch(investor[0]){
            case 'needed':
                filteredByInvestor = filteredIdeas.filter(idea => idea.needInvestor === true);
                filteredIdeas = filteredByInvestor;
                // console.log(filteredIdeas);
                break;
            case 'not needed':
                filteredByInvestor = filteredIdeas.filter(idea => idea.needInvestor === false);
                filteredIdeas = filteredByInvestor;
                // console.log(filteredIdeas);
                break;
            default:
                break
        }
    }

    switch (sort){
        case 'nameAscending':
            filteredIdeas.sort((a,b)=> (a.name.toLowerCase()).localeCompare((b.name.toLowerCase())));
            break;
        case 'nameDescending':
            filteredIdeas.sort((a,b)=>(b.name.toLowerCase()).localeCompare((a.name.toLowerCase())));
            break;
        case 'ascending':
            filteredIdeas.sort((a,b)=>a.targetFunding-b.targetFunding);
            break;
        case 'descending':
            filteredIdeas.sort((a,b)=>b.targetFunding-a.targetFunding);
            break
    }

    dispatch({
        type: FILTER_BI,
        payload: filteredIdeas
    })
};




