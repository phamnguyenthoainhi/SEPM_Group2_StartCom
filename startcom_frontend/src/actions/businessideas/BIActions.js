import { READ_BI,FILTER_BI, CLEAR_FILTER, IS_REGISTERED_SUCCESS,RESET_FILTER, RESET_REGISTER, UPDATE_BI, DELETE_BI, SEARCH_BI } from '../actionTypes';


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

export const resetFilter = ()=>dispatch=>{
    dispatch({
        type:RESET_FILTER
    })
}

export const searchBI = (keyword,businessIdeas) => dispatch => {
    dispatch({
        type:CLEAR_FILTER
    })
    const searchResults = businessIdeas.filter((idea => idea.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1))
    
    dispatch({
        type:FILTER_BI,
        payload:searchResults
    })
};

export const filterBI = (categories,consultant, investor,sort, businessIdeas) => dispatch => {
    dispatch({
        type:CLEAR_FILTER
    })
    var filteredIdeas = businessIdeas
    if(categories.length > 0){
        var filteredByCategories = filteredIdeas.filter(idea=> categories.includes(idea.category))
        filteredIdeas = filteredByCategories
    }
    if(consultant.length===1){
        console.log(consultant[0])
        var filteredByConsultant = []
        switch (consultant[0]){
            case 'needed':
                filteredByConsultant = filteredIdeas.filter(idea => idea.needConsultant === true)
                filteredIdeas = filteredByConsultant
                console.log(filteredIdeas)
                break
            case 'not needed':
                filteredByConsultant = filteredIdeas.filter(idea => idea.needConsultant === false)
                filteredIdeas = filteredByConsultant
                console.log(filteredIdeas)
                break
            default:
                break
            
        }
    }
    if(investor.length===1){
        console.log(investor[0])
        var filteredByInvestor = []
        switch(investor[0]){
            case 'needed':
                filteredByInvestor = filteredIdeas.filter(idea => idea.needInvestor === true)
                filteredIdeas = filteredByInvestor
                console.log(filteredIdeas)
                break
            case 'not needed':
                filteredByInvestor = filteredIdeas.filter(idea => idea.needInvestor === false)
                filteredIdeas = filteredByInvestor
                console.log(filteredIdeas)
                break
            default:
                break
            

        }
    }

    switch (sort){
        case 'nameAscending':
            filteredIdeas.sort((a,b)=> (a.name.toLowerCase()).localeCompare((b.name.toLowerCase())))
            break
        case 'nameDescending':
            filteredIdeas.sort((a,b)=>(b.name.toLowerCase()).localeCompare((a.name.toLowerCase())))
            break
        case 'ascending':
            filteredIdeas.sort((a,b)=>a.targetFunding-b.targetFunding)
            break
        case 'descending':
            filteredIdeas.sort((a,b)=>b.targetFunding-a.targetFunding)
            break
    }

    dispatch({
        type:FILTER_BI,
        payload: filteredIdeas
    })
};





